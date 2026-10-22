const URLS = getConstants(obj, res);

/* ---------- Constantes ---------- */
const ID_APP_ROLES = 'e402b0fe-7b28-462d-b313-545064751c21';
const CAMPO_GRUPO = 'SimiladorDNC_Lappiz_FormatoExcepciones.GrupoAgencia';
const CAMPO_FECHA = 'SimiladorDNC_Lappiz_FormatoExcepciones.Fechadenegociacionfe';
const PALABRAS_SOLO_FECHAS = ['ADMIN', 'ANALISTA'];

/* ---------- Punto de entrada: es el ÚNICO que responde HTTP ---------- */
(async function () {
    try {
        const result = await obtenerFiltro();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ success: false, error: msgError(error) });
    }
})();

/* ---------- Devuelve el filtro del listado según el rol del usuario ---------- */
async function obtenerFiltro() {
    let body = obj.body || {};
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
    }

    const rolesId = body.rolesId;
    const grupo = String(body.grupo || '').trim();
    const fecha = String(body.fecha || '').trim();
    const fechaAyer = String(body.fechaAyer || '').trim();

    let rol = null;
    let soloFechas = false;

    try {
        const token = await obtenerToken();
        const roles = await obtenerRoles(token);
        const encontrados = buscarRoles(roles, rolesId);

        // Basta con que uno de los roles sea ADMIN o ANALISTA
        for (let i = 0; i < encontrados.length; i++) {
            if (esRolSoloFechas(encontrados[i].Nombre)) {
                rol = encontrados[i];
                soloFechas = true;
                break;
            }
        }
        // Si ninguno es admin/analista se reporta el primero encontrado
        if (!rol && encontrados.length) rol = encontrados[0];

        if (!encontrados.length) {
            console.warn('[Api_Filtro_FormatoExcepciones] no se identificó el rol. rolesId:', rolesId,
                '| roles de la app:', roles.map(function (r) { return r.Nombre; }).join(', '));
        }
    } catch (error) {
        console.error('[Api_Filtro_FormatoExcepciones] error obteniendo el rol:', msgError(error));
    }

    const filtros = [];

    // CASO BORDE: usuario que no es admin/analista y llega sin grupo.
    // Hoy no se agrega la agencia y vería todos los registros.
    // Decidir si se debe devolver error o una lista vacía en este punto.
    if (!soloFechas && !grupo) {
        console.warn('[Api_Filtro_FormatoExcepciones] usuario sin grupo y sin rol solo-fechas');
    }

    if (!soloFechas && grupo) {
        filtros.push({ field: CAMPO_GRUPO, operator: 'eq', value: grupo });
    }

    const fechas = [];
    if (fecha) fechas.push(fecha);
    if (fechaAyer && fechaAyer !== fecha) fechas.push(fechaAyer);

    if (fechas.length === 1) {
        filtros.push({ field: CAMPO_FECHA, operator: 'eq', value: fechas[0] });
    } else if (fechas.length > 1) {
        const condiciones = [];
        for (let i = 0; i < fechas.length; i++) {
            condiciones.push({ field: CAMPO_FECHA, operator: 'eq', value: fechas[i] });
        }
        filtros.push({ logic: 'or', filters: condiciones });
    }

    return {
        success: true,
        rol: rol ? String(rol.Nombre || '').trim() : '',
        idRol: rol ? String(rol.id || '') : '',
        descripcionRol: rol && rol.Descripcion != null ? String(rol.Descripcion).trim() : '',
        soloFechas: soloFechas,
        filtro: { logic: 'and', filters: filtros }
    };
}

/* ---------- Regla de rol ---------- */
function esRolSoloFechas(nombre) {
    const texto = String(nombre || '').trim().toUpperCase();
    if (!texto) return false;
    for (let i = 0; i < PALABRAS_SOLO_FECHAS.length; i++) {
        if (texto.indexOf(PALABRAS_SOLO_FECHAS[i]) !== -1) return true;
    }
    return false;
}

/* ---------- Búsqueda del rol ---------- */
function buscarRoles(roles, valor) {
    const ids = parsearIds(valor);
    const encontrados = [];

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i].toLowerCase();
        for (let j = 0; j < roles.length; j++) {
            const r = roles[j];
            if (!r) continue;
            if (r.Status !== true) continue; // solo roles activos
            if (String(r.id || '').toLowerCase() === id) {
                if (encontrados.indexOf(r) === -1) encontrados.push(r);
                break;
            }
        }
    }

    return encontrados;
}

// Acepta un id, un id con comillas, varios separados por coma, punto y coma o barra, o un arreglo JSON
function parsearIds(valor) {
    if (Array.isArray(valor)) return limpiarIds(valor);

    const texto = String(valor == null ? '' : valor).trim();
    if (!texto) return [];

    if (texto.charAt(0) === '[') {
        try {
            const arr = JSON.parse(texto);
            if (Array.isArray(arr)) return limpiarIds(arr);
        } catch (e) { /* si no es JSON se sigue con el parseo por texto */ }
    }

    return limpiarIds(texto.split(/[,;|\/]/));
}

function limpiarIds(lista) {
    const ids = [];
    for (let i = 0; i < lista.length; i++) {
        const id = String(lista[i] == null ? '' : lista[i]).trim().replace(/^["']+|["']+$/g, '');
        if (id) ids.push(id);
    }
    return ids;
}

/* ---------- API de roles ---------- */
async function obtenerRoles(token) {
    const response = await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${URLS.UrlAPI}/Api/api/Roles/getRoles/${ID_APP_ROLES}`,
        headers: { Authorization: token }
    });
    return Array.isArray(response.data) ? response.data : [];
}

/* ---------- Token (misma API que usa InsertarUsuarios) ---------- */
async function obtenerToken() {
    const response = await axios.request({
        method: 'post',
        url: `${URLS.UrlTX}/SimuladorDNC_Lappiz.api/api/functions/getToken`,
        headers: { 'Content-Type': 'application/json' },
        data: {}
    });

    const d = response.data;
    // Acepta que venga como texto o dentro de un objeto
    if (typeof d === 'string') return d;
    if (d && typeof d === 'object') {
        if (d.token) return d.token;
        if (d.access_token) return d.access_token;
        if (d.result) return d.result;
    }
    return null;
}

/* ---------- Utilidades ---------- */
function msgError(err) {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    try { return JSON.stringify(err); } catch (e) { return String(err); }
}
