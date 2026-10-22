(function () {
    var grupo = String(sessionStorage.Grupo || '').trim();
    sessionStorage.setItem('grupoExp', grupo);
})();

(function () {
    if (window.__filtroFormatoExcepcionesActivo) return;
    window.__filtroFormatoExcepcionesActivo = true;

    // Reemplazar lappizFunctionId por el id de la funcion creada en Lappiz
    var CONFIG = {
        nameFunction: 'FiltroFormatoExcepciones',
        lappizFunctionId: '514f1d1e-4f4d-4798-af1f-6aaf1fc38d5a'
    };

    var CAMPO_GRUPO = 'SimiladorDNC_Lappiz_FormatoExcepciones.GrupoAgencia';
    var CAMPO_FECHA = 'SimiladorDNC_Lappiz_FormatoExcepciones.Fechadenegociacionfe';

    function quitarComillas(valor) {
        return String(valor == null ? '' : valor).trim().replace(/^["']+|["']+$/g, '');
    }

    function obtenerRolesId() {
        var valor = sessionStorage.getItem('userRoles');
        if (!valor) valor = sessionStorage.getItem('rolesId');
        if (!valor) return '';
        valor = String(valor).trim();
        // Arreglo JSON: se deja igual. Id suelto con comillas: se las quita.
        if (valor.charAt(0) === '[') return valor;
        return quitarComillas(valor);
    }

    function obtenerFechas() {
        var fecha = String(sessionStorage.getItem('dateExep') || '').trim();
        var fechaAyer = String(sessionStorage.getItem('dateExepAyer') || '').trim();
        var fechas = [];
        if (fecha) fechas.push(fecha);
        if (fechaAyer && fechaAyer !== fecha) fechas.push(fechaAyer);
        return fechas;
    }

    // Filtro local: se usa si la funcion no responde, para que la lista no quede vacia
    function construirFiltroLocal() {
        var filtros = [];
        var soloFechas = sessionStorage.getItem('soloFechas') === 'true';
        var grupoExp = String(sessionStorage.getItem('grupoExp') || '').trim();

        if (!soloFechas && grupoExp) {
            filtros.push({ field: CAMPO_GRUPO, operator: 'eq', value: grupoExp });
        }

        // CASO BORDE: usuario que no es admin/analista y llega sin grupo.
        // Hoy no se agrega la agencia y vería todos los registros.
        // Decidir si se debe bloquear la consulta o devolver una lista vacía.

        var fechas = obtenerFechas();
        if (fechas.length === 1) {
            filtros.push({ field: CAMPO_FECHA, operator: 'eq', value: fechas[0] });
        } else if (fechas.length > 1) {
            var condiciones = [];
            for (var i = 0; i < fechas.length; i++) {
                condiciones.push({ field: CAMPO_FECHA, operator: 'eq', value: fechas[i] });
            }
            filtros.push({ logic: 'or', filters: condiciones });
        }

        return { logic: 'and', filters: filtros };
    }

    function filtrarPromesa() {
        return new Promise(function (resolve) {
            var body = {
                rolesId: obtenerRolesId(),
                grupo: String(sessionStorage.getItem('grupoExp') || '').trim(),
                fecha: String(sessionStorage.getItem('dateExep') || '').trim(),
                fechaAyer: String(sessionStorage.getItem('dateExepAyer') || '').trim()
            };
            console.log('Filtro_grupo: body enviado a la funcion', body);

            if (typeof execLF !== 'function' ||
                !CONFIG.lappizFunctionId ||
                CONFIG.lappizFunctionId.indexOf('PENDIENTE') !== -1) {
                console.warn('Filtro_grupo: falta el lappizFunctionId de ' + CONFIG.nameFunction + ', se usa el filtro local');
                resolve(construirFiltroLocal());
                return;
            }

            execLF({
                nameFunction: CONFIG.nameFunction,
                lappizFunctionId: CONFIG.lappizFunctionId,
                body: body,
                method: 'POST'
            })
                .then(function (respuesta) {
                    console.log('Filtro_grupo: respuesta de la funcion', respuesta);

                    var datos = respuesta;
                    if (datos && !datos.filtro && datos.result) datos = datos.result;
                    if (datos && !datos.filtro && datos.data) datos = datos.data;
                    var filtro = datos ? datos.filtro : null;

                    if (filtro) {
                        var solo = datos.soloFechas === true || String(datos.soloFechas) === 'true';
                        sessionStorage.setItem('soloFechas', solo ? 'true' : 'false');
                        sessionStorage.setItem('rolFormatoExcepciones', String(datos.rol || ''));
                        sessionStorage.setItem('filtroOrigen', 'api');
                        resolve(filtro);
                        return;
                    }

                    console.warn('Filtro_grupo: la funcion no devolvio el filtro, se usa el filtro local', respuesta);
                    sessionStorage.setItem('filtroOrigen', 'local');
                    resolve(construirFiltroLocal());
                })
                .catch(function (error) {
                    console.error('Filtro_grupo: error llamando la funcion, se usa el filtro local', error);
                    sessionStorage.setItem('filtroOrigen', 'error');
                    resolve(construirFiltroLocal());
                });
        });
    }

    var openOriginal = XMLHttpRequest.prototype.open;
    var sendOriginal = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        this._metodo = method;
        this._url = String(url);
        return openOriginal.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (body) {
        if (this._metodo === 'POST' &&
            this._url.indexOf('/api/lappiz/get/SimiladorDNC_Lappiz_FormatoExcepciones') !== -1 &&
            typeof body === 'string') {
            var xhr = this;

            // Se lee la sesión aquí, cuando el listado ya tiene userRoles, dateExep y dateExepAyer
            filtrarPromesa().then(function (filtro) {
                var cuerpo = body;
                try {
                    var data = JSON.parse(body);
                    data.filter = filtro;
                    cuerpo = JSON.stringify(data);
                    console.log('Filtro_grupo: filtro aplicado', filtro);
                } catch (error) {
                    console.error('Filtro_grupo: no se pudo aplicar el filtro', error);
                }
                sendOriginal.call(xhr, cuerpo);
            });
            return;
        }
        return sendOriginal.call(this, body);
    };
})();
