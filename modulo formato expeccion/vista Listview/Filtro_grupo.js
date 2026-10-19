(function () {
    var grupo = String(sessionStorage.Grupo || '').trim();
    sessionStorage.setItem('grupoExp', grupo);
})();

(function () {
    if (window.__filtroFormatoExcepcionesActivo) return;
    window.__filtroFormatoExcepcionesActivo = true;

    var CAMPO_GRUPO = 'SimiladorDNC_Lappiz_FormatoExcepciones.GrupoAgencia';
    var CAMPO_FECHA = 'SimiladorDNC_Lappiz_FormatoExcepciones.Fechadenegociacionfe';

    function construirFiltro() {
        var filtros = [];
        var grupoExp = sessionStorage.getItem('grupoExp');
        if (grupoExp) {
            filtros.push({ field: CAMPO_GRUPO, operator: 'eq', value: grupoExp });
        }
        filtros.push({
            logic: 'or',
            filters: [
                { field: CAMPO_FECHA, operator: 'eq', value: sessionStorage.getItem('dateExep') || '' },
                { field: CAMPO_FECHA, operator: 'eq', value: sessionStorage.getItem('dateExepAyer') || '' }
            ]
        });
        return { logic: 'and', filters: filtros };
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
            try {
                var data = JSON.parse(body);
                data.filter = construirFiltro();
                body = JSON.stringify(data);
                console.log('Filtro_grupo: filtro reescrito', data.filter);
            } catch (error) {
                console.error('Filtro_grupo: no se pudo reescribir el filtro', error);
            }
        }
        return sendOriginal.call(this, body);
    };
})();
