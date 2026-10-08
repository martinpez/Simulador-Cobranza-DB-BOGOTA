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
    PROGRESO: 'Progreso',
    OK: 'Ingresado',
    DUPLICADO: 'Duplicado',
    INCOMPLETO: 'Incompleto',
    ERROR: 'Error'
};

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
        ESTADO.ERROR
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
        await cambiarEstadoLote(pendientes, ESTADO.ERROR);
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
            resultado.mensaje += ` (no se pudo actualizar el estado: ${msgError(err)})`;
        }

        if (resultado.estado === ESTADO.OK) {
            // consular todos los estados OK y eliminarlos de la tabla auxiliar
            try {
                await consultar(`DELETE FROM ${TABLA_AUX} WHERE Estado = '${ESTADO.OK}'; select 1`);
            } catch (err) {
                resultado.mensaje += ` (no se pudo eliminar el registro de la tabla auxiliar: ${msgError(err)})`;
            }
        }

        // Nunca se devuelve la contraseña
        finalMessage += `DATOS: ${datos.Nombre} ${datos.Apellidos || ''} - ${datos.TipoDocumento} ${datos.NumeroDocumento} | ${resultado.estado}: ${resultado.mensaje}\n`;
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
        estado: ESTADO.OK,
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
    await cambiarEstadoLote(lista, ESTADO.PROGRESO, ESTADO.PENDIENTE);
}

async function cambiarEstadoLote(lista, estado, soloDesde) {
    const ids = lista.map(d => `'${esc(d.Id)}'`).join(',');
    if (!ids) return;
    const filtro = soloDesde ? ` and Estado = '${soloDesde}'` : '';
    await consultar(`UPDATE ${TABLA_AUX} set Estado = '${estado}' where Id in (${ids})${filtro}; select 1`);
}

async function cambiarEstado(id, estado) {
    await consultar(`UPDATE ${TABLA_AUX} set Estado = '${estado}' where Id = '${esc(id)}'; select 1`);
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