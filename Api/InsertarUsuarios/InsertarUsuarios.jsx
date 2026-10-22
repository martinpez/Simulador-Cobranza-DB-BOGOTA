const URLS = getConstants(obj, res);

/* ---------- Constantes ---------- */
const TABLA_AUX = 'SimiladorDNC_Lappiz_AuxiliarUsuario';
const TABLA_GRUPOS = 'SimiladorDNC_Lappiz_GrupoUsuario';
const ID_APP_ROLES = 'e402b0fe-7b28-462d-b313-545064751c21';
const ROL_POR_DEFECTO = '40b1e10d-4b7a-42ae-bf46-d5b6a74c30e7';
const LOTE = 50;

// Estados posibles en la tabla auxiliar (verifica que la columna Estado acepte estos valores)
const ESTADO = {
    PENDIENTE: 'Activo',
    PROGRESO: 'Progreso',   // prefijo: la marca real lleva timestamp -> 'Progreso|2026-10-21 10:15:00'
    INGRESADO: 'Ingresado',  // insertado y replicado en la API
    OK: 'OK',                // verificado tras la espera, listo para eliminar
    DUPLICADO: 'Duplicado',
    INCOMPLETO: 'Incompleto',
    ERROR: 'Error'
};

// Minutos que un lote puede permanecer en Progreso antes de considerarse abandonado
const MINUTOS_VIGENCIA_PROGRESO = 10;

// Tiempo de espera antes de verificar y eliminar los usuarios ingresados
const ESPERA_VERIFICACION_MS = 5000;

const INICIAL_DOCUMENTO = { CC: 'C', NIT: 'N', CE: 'E' };

/* ---------- Punto de entrada: es el ÚNICO que responde HTTP ---------- */
(async () => {
    try {
        const result = await consultaAuxiliar();
        if (res) return res.status(200).send(result);
    } catch (error) {
        if (res) return res.status(400).json({ error: error.message });
    }
})();

/* ---------- Flujo principal ---------- */
async function consultaAuxiliar() {
    let token;
    try {
        token = await obtenerToken();
    } catch (e) {
        throw new Error(`getToken lanzó un error: ${e.message}`);
    }
    if (!token) {
        throw new Error(`No se pudo obtener el token (getToken devolvió: ${JSON.stringify(token)})`);
    }
    // se hace un reintento para los que tengan el estado en ERROR, para que puedan reintentarse
    await cambiarEstadoLote(
        await consultar(`select Id from ${TABLA_AUX} where Estado = '${ESTADO.ERROR}'`),
        ESTADO.PENDIENTE,
        `Estado = '${ESTADO.ERROR}'`
    );

    // se recuperan los lotes abandonados: filas en Progreso cuya marca es mas antigua que la vigencia.
    // Las filas en Progreso de la ejecucion actual llevan timestamp, asi que nunca se recuperan.
    await consultar(
        `update ${TABLA_AUX} set Estado = '${ESTADO.PENDIENTE}' ` +
        `where Estado = '${ESTADO.PROGRESO}' ` +
        `or (Estado like '${ESTADO.PROGRESO}|%' and Estado < '${limiteProgreso()}'); select 1`
    );

    // se consulta para los usuarios con estado PENDIENTE, se procesan y se actualiza el estado en la tabla auxiliar
    const query = `select top ${LOTE}
        Id, Nombre, Apellidos, FechaCreacion, NumeroDocumento, TipoDocumento,
        Rol, CorreoElectronico, Contrasena,
        isnull(
            (select top 1 Id from ${TABLA_GRUPOS} where CodigoGrupo = a.Grupo),
            (select top 1 Id from ${TABLA_GRUPOS} where NombreGrupo = 'DEFAULT')
        ) as Grupo
        from ${TABLA_AUX} a
        where Estado = '${ESTADO.PENDIENTE}'
        order by FechaCreacion`;

    const pendientes = await consultar(query);
    if (!pendientes.length) return 'No hay usuarios pendientes';

    await marcarProgreso(pendientes);

    // Los roles se consultan UNA sola vez por ejecución
    let roles = [];
    try {
        roles = await obtenerRoles(token);
    } catch (err) {
        await cambiarEstadoLote(pendientes, ESTADO.ERROR, `Estado like '${ESTADO.PROGRESO}%'`);
        throw new Error(`No se pudieron obtener los roles: ${err.message}`);
    }

    let finalMessage = 'RESULTADOS: \n';

    for (const datos of pendientes) {
        let resultado;
        try {
            resultado = await procesar(datos, token, roles);
        } catch (err) {
            resultado = { estado: ESTADO.ERROR, mensaje: `Error inesperado: ${msgError(err)}` };
        }

        // Se actualiza el estado en TODOS los casos
        try {
            await cambiarEstado(datos.Id, resultado.estado);
        } catch (err) {
            // Se reintenta una vez; si vuelve a fallar, la fila se corrige al final de la ejecución
            try {
                await cambiarEstado(datos.Id, resultado.estado);
            } catch (err2) {
                resultado.mensaje += ` (no se pudo actualizar el estado: ${msgError(err2)})`;
            }
        }

        // Nunca se devuelve la contraseña
        finalMessage += `DATOS: ${datos.Nombre} ${datos.Apellidos || ''} - ${datos.TipoDocumento} ${datos.NumeroDocumento} | ${resultado.estado}: ${resultado.mensaje}\n`;
    }

    // Cualquier fila del lote que siga en Progreso significa que no se pudo escribir su estado final.
    // Se devuelven a Error para que la proxima ejecucion las reintente.
    try {
        await cambiarEstadoLote(pendientes, ESTADO.ERROR, `Estado like '${ESTADO.PROGRESO}%'`);
    } catch (err) {
        finalMessage += `No se pudieron recuperar los registros en Progreso: ${msgError(err)}\n`;
    }

    // Se espera antes de verificar el estado de los usuarios ingresados
    await esperar(ESPERA_VERIFICACION_MS);

    // Se consultan los usuarios que quedaron en estado Ingresado
    let ingresados = [];
    try {
        ingresados = await consultar(
            `select Id from ${TABLA_AUX} where Estado = '${ESTADO.INGRESADO}'`
        );
    } catch (err) {
        finalMessage += `No se pudieron consultar los usuarios ingresados: ${msgError(err)}\n`;
    }

    if (ingresados.length) {
        const ids = ingresados.map(d => `'${esc(d.Id)}'`).join(',');
        try {
            // Se marcan como OK y luego se eliminan de la tabla auxiliar
            await consultar(`update ${TABLA_AUX} set Estado = '${ESTADO.OK}' where Id in (${ids}); select 1`);
            await consultar(`delete from ${TABLA_AUX} where Id in (${ids}); select 1`);
            finalMessage += `Se eliminaron ${ingresados.length} registros de la tabla auxiliar\n`;
        } catch (err) {
            finalMessage += `No se pudieron eliminar ${ingresados.length} registros: ${msgError(err)}\n`;
        }
    }

    await consultar('EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 1');
    return finalMessage;
}

/* ---------- Procesa un usuario. Devuelve { estado, mensaje } ---------- */
async function procesar(datos, token, roles) {
    const requeridos = ['Nombre', 'TipoDocumento', 'NumeroDocumento', 'Contrasena', 'Grupo', 'Rol'];
    const faltantes = requeridos.filter(c => vacio(datos[c]));
    if (faltantes.length) {
        return { estado: ESTADO.INCOMPLETO, mensaje: `Faltan campos: ${faltantes.join(', ')}` };
    }

    const inicial = INICIAL_DOCUMENTO[datos.TipoDocumento];
    if (!inicial) {
        return { estado: ESTADO.INCOMPLETO, mensaje: `Tipo de documento no soportado: ${datos.TipoDocumento}` };
    }

    const nombre = String(datos.Nombre).trim();
    const apellidos = vacio(datos.Apellidos) ? '' : String(datos.Apellidos).trim();
    const numeroDocumento = String(datos.NumeroDocumento).trim();
    const usuario = `${inicial}${numeroDocumento}`;
    const email = `${usuario}@bdb.com`;
    const correo = vacio(datos.CorreoElectronico) ? email : String(datos.CorreoElectronico).trim();
    const fullName = [apellidos, nombre].filter(Boolean).join(', ');
    const fecha = vacio(datos.FechaCreacion) ? 'GETDATE()' : `'${esc(datos.FechaCreacion)}'`;

    /* ¿Ya existe? */
    // consulta la tabla de cada environment
    let tablaUsers = ''
    if(_appsettings.environment === 'TEST') {
        tablaUsers = 'SimiladorDNC_Lappiz_Users'
    } else if(_appsettings.environment === 'PROD') {
        tablaUsers = 'Lappiz_Users'
    }
    const existe = await consultar(
        `SELECT TOP 1 id FROM ${tablaUsers} WHERE Identification = '${esc(numeroDocumento)}'`
    );
    if (existe.length) {
        return { estado: ESTADO.DUPLICADO, mensaje: 'Ya se encuentra registrado en la aplicación' };
    }

    /* Rol */
    const { idRol, porDefecto } = buscarRol(roles, datos.Rol);

    /* Insertar usuario */
    const insertUsuario = `declare @Id uniqueidentifier set @Id = newId()
        INSERT INTO ${tablaUsers} (
            id, FullName, TipoDocumento, Identification, CorreoElectronico, Email,
            Usuario, Contrasena, GruposFk, FechaCreacion, Created_date, Activo, BanderaContrasena, AuthType
        ) VALUES (
            @Id,
            '${esc(fullName)}',
            '${esc(datos.TipoDocumento)}',
            '${esc(numeroDocumento)}',
            '${esc(correo)}',
            '${esc(email)}',
            '${esc(usuario)}',
            '${esc(datos.Contrasena)}',
            '${esc(datos.Grupo)}',
            ${fecha},
            ${fecha},
            1, 1, 'Lappiz'
        );
        select id from ${tablaUsers} where Id = @Id;`;

    const insertado = await consultar(insertUsuario);
    const idUser = insertado[0]?.id;
    if (!idUser) {
        return { estado: ESTADO.ERROR, mensaje: 'No se pudo insertar el usuario' };
    }

    try {
        /* Replicar usuario */
        await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${URLS.UrlAPI}/Api/api/Users/replicate?appCode=SimiladorDNC_Lappiz&languageApp=es&runtime=beta`,
            headers: { 'Content-Type': 'application/json', Authorization: token },
            data: {
                UserName: nombre,
                Email: email,
                FullName: fullName,
                PasswordHash: datos.Contrasena, // lo pasa a hash en la API
                Activo: true,
                AuthType: 'Lappiz',
                TwoFactorEnable: false,
                Id: String(idUser)
            }
        });

        /* Asignar rol */
        await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${URLS.UrlAPI}/Api/api/Roles/SaveChanges?idUser=${String(idUser).toUpperCase()}`,
            headers: { 'Content-Type': 'application/json', Authorization: token },
            data: [{ idRol: String(idRol), Action: 'Save' }]
        });
    } catch (err) {
        // Compensación: se borra el usuario local para que el registro pueda reintentarse
        try {
            // consultar si lo creo si lo creo en la tabla, si lo creo, se borra, si no, no hace nada
            const existe = await consultar(`SELECT TOP 1 id FROM ${tablaUsers} WHERE id = '${esc(idUser)}'`);
            if (existe.length) {
                await consultar(`DELETE FROM ${tablaUsers} WHERE id = '${esc(idUser)}'; select 1`);
            }
        } catch (_) { /* si falla el rollback queda reportado en el mensaje */ }
        const detalle = err.response?.data ? JSON.stringify(err.response.data) : msgError(err);
        return { estado: ESTADO.ERROR, mensaje: `Falló replicación/rol, se revirtió el insert: ${detalle}` };
    }
    // respuesta exitosa
    return {
        estado: ESTADO.INGRESADO,
        mensaje: porDefecto
            ? 'Usuario registrado (rol no encontrado, se asignó el rol por defecto)'
            : 'Usuario registrado correctamente'

    };

}       
/* ---------- Roles ---------- */
async function obtenerRoles(token) {
    const response = await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${URLS.UrlAPI}/Api/api/Roles/getRoles/${ID_APP_ROLES}`,
        headers: { Authorization: token }
    });
    return Array.isArray(response.data) ? response.data : [];
}

function buscarRol(roles, nombreRol) {
    const buscado = String(nombreRol).trim().toUpperCase();
    // Primero coincidencia exacta, luego parcial
    const encontrado =
        roles.find(r => String(r.Nombre).toUpperCase() === buscado) ||
        roles.find(r => String(r.Nombre).toUpperCase().includes(buscado));
    return encontrado
        ? { idRol: encontrado.id, porDefecto: false }
        : { idRol: ROL_POR_DEFECTO, porDefecto: true };
}

/* ---------- Estados ---------- */
async function marcarProgreso(lista) {
    // La marca incluye el timestamp para poder distinguir un lote en curso de uno abandonado
    await cambiarEstadoLote(lista, marcaProgreso(), `Estado = '${ESTADO.PENDIENTE}'`);
}

// estado: valor a asignar. filtro: condición SQL opcional sobre el estado actual
async function cambiarEstadoLote(lista, estado, filtro) {
    const ids = lista.map(d => `'${esc(d.Id)}'`).join(',');
    if (!ids) return;
    const extra = filtro ? ` and (${filtro})` : '';
    await consultar(`UPDATE ${TABLA_AUX} set Estado = '${estado}' where Id in (${ids})${extra}; select 1`);
}

async function cambiarEstado(id, estado) {
    await consultar(`UPDATE ${TABLA_AUX} set Estado = '${estado}' where Id = '${esc(id)}'; select 1`);
}

// Marca del estado Progreso: 'Progreso|yyyy-MM-dd HH:mm:ss'
function marcaProgreso() {
    return `${ESTADO.PROGRESO}|${selloFecha(new Date())}`;
}

// Límite anterior a la vigencia: las marcas menores que este valor se consideran abandonadas
function limiteProgreso() {
    return `${ESTADO.PROGRESO}|${selloFecha(new Date(Date.now() - MINUTOS_VIGENCIA_PROGRESO * 60000))}`;
}

// Formato ordenable lexicograficamente (yyyy-MM-dd HH:mm:ss)
function selloFecha(fecha) {
    const p = n => String(n).padStart(2, '0');
    return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())} ` +
           `${p(fecha.getHours())}:${p(fecha.getMinutes())}:${p(fecha.getSeconds())}`;
}

/* ---------- Utilidades ---------- */
// Siempre devuelve un arreglo
async function consultar(query) {
    try {
        const response = await controller.execQuery({ query });
        return response?.result?.[0] ?? [];
    } catch (err) {
        // Solo se muestra el inicio de la consulta para no exponer datos
        throw new Error(`SQL falló: ${msgError(err)} | ${query.trim().slice(0, 120)}`);
    }
}

// Escapa comillas simples para SQL (execQuery no admite parámetros)
function esc(valor) {
    return String(valor ?? '').replace(/'/g, "''");
}

// null, undefined, '', 'undefined' y 'null' cuentan como vacío
function vacio(valor) {
    if (valor === null || valor === undefined) return true;
    const s = String(valor).trim().toLowerCase();
    return s === '' || s === 'undefined' || s === 'null';
}
// obtiene el token de autorización para la API
async function obtenerToken() {
    const response = await axios.request({
        method: 'post',
        url: `${URLS.UrlTX}/SimiladorDNC_Lappiz.api/api/functions/getToken`,
        headers: { 'Content-Type': 'application/json' },
        data: {}
    });

    const d = response.data;
    // Acepta que venga como texto o dentro de un objeto
    return typeof d === 'string' ? d : (d?.token ?? d?.access_token ?? d?.result ?? null);
}

function msgError(err) {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    try { return JSON.stringify(err); } catch (_) { return String(err); }
}

// Espera el tiempo indicado en milisegundos
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}