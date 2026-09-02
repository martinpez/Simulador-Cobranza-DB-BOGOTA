/*
 * Bugs_Api_Insert
 * Función Lappiz (backend). Inserta únicamente el reporte de fallo.
 * Las imágenes NO se guardan en BD; se mantienen en memoria del navegador
 * y se envían por correo después de un insert exitoso (HTTP 200).
 *
 * Body esperado (obj.body):
 * {
 *   ModuloAfectado: "Pago mora",
 *   Descripcion: "...",
 *   UsuarioReporta: "MPERE41@bancodebogota.com.co",
 *   UserEmail: "MPERE41@bancodebogota.com.co",
 *   Evidencias: []   // 0 a 3 (no se persisten; solo viajan en el body)
 * }
 *
 * Respuesta éxito: { success: true, idRepote, id, moduloAfectado,
 *                    descripcion, usuarioReporta, userEmail }
 * Respuesta error: { success: false, errors: [ { campo, mensaje } ] }
 */
const MODULOS_PERMITIDOS = [
    'Pago mora', 'Ampliación', 'Cancelación', 'Itaú',
    'Novación', 'Consolidación', 'Formato Excepciones', 'Otro'
];

(async () => {
    try {
        const result = await insertBugsReports();
        return res.status(200).json(result);
    } catch (error) {
        let detalle = 'Error desconocido';

        if (error instanceof Error) {
            detalle = error.stack || error.message;
        } else if (typeof error === 'object') {
            detalle = JSON.stringify(error, Object.getOwnPropertyNames(error));
        } else if (typeof error === 'string') {
            detalle = error;
        }

        console.error('[Bugs_Api_Insert] Error completo:', detalle);

        return res.status(400).json({
            success: false,
            errors: [{ campo: 'Server', mensaje: detalle }]
        });
    }
})();

async function insertBugsReports() {
    const body = obj.body || {};

    const UserReporta = (body.UsuarioReporta || '').trim();
    const UserEmail = (body.UserEmail || '').trim();

    const errores = [];

    const modulo = (body.ModuloAfectado || '').trim();
    if (!modulo) {
        errores.push({ campo: 'ModuloAfectado', mensaje: 'El módulo afectado es obligatorio' });
    } else if (MODULOS_PERMITIDOS.indexOf(modulo) === -1) {
        errores.push({ campo: 'ModuloAfectado', mensaje: 'El módulo afectado no es válido' });
    }

    const descripcion = (body.Descripcion || '').trim();
    if (!descripcion) {
        errores.push({ campo: 'Descripcion', mensaje: 'La descripción es obligatoria' });
    } else if (descripcion.length > 1000) {
        errores.push({ campo: 'Descripcion', mensaje: 'La descripción no puede superar 1000 caracteres' });
    }

    const evidencias = Array.isArray(body.Evidencias) ? body.Evidencias : [];
    if (evidencias.length > 3) {
        errores.push({ campo: 'Evidencias', mensaje: 'Se permiten máximo 3 archivos de evidencia' });
    }

    if (errores.length > 0) {
        console.warn('[Bugs_Api_Insert] Intento rechazado por validación:',
            JSON.stringify(errores), '| Usuario:', UserReporta || '(desconocido)');
        return { success: false, errors: errores };
    }

    const query = `
BEGIN TRY
    BEGIN TRANSACTION;

    DECLARE @Id UNIQUEIDENTIFIER = NEWID();
    DECLARE @Anio VARCHAR(4) = CAST(YEAR(GETDATE()) AS VARCHAR(4));
    DECLARE @Consecutivo INT;

    SELECT @Consecutivo = ISNULL(MAX(CAST(RIGHT(IDrepote, 5) AS INT)), 0) + 1
    FROM Similador_DNC_Lappiz_Bugs_Reporteria WITH (UPDLOCK, HOLDLOCK)
    WHERE IDrepote LIKE 'REP-' + @Anio + '-%';

    DECLARE @IDrepote VARCHAR(21) = 'REP-' + @Anio + '-' + RIGHT('00000' + CAST(@Consecutivo AS VARCHAR(5)), 5);

    INSERT INTO Similador_DNC_Lappiz_Bugs_Reporteria
(
    Id,
    UserEmail,
    UsuarioReporta,
    ModuloAfectado,
    Descripcion,
    Estado,
    IDrepote
)
VALUES
(
    @Id,
    '${sqlEscape(UserEmail)}',
    '${sqlEscape(UserReporta)}',
    '${sqlEscape(modulo)}',
    '${sqlEscape(descripcion)}',
    'Nuevo',
    @IDrepote
);

    COMMIT TRANSACTION;

    SELECT @Id AS Id, @IDrepote AS IDrepote;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;`;

    console.log('[Bugs_Api_Insert] Query a ejecutar:', query);

    let response;
    try {
        response = await controller.execQuery({ query });
    } catch (errExec) {
        console.error('[Bugs_Api_Insert] Error en execQuery:', errExec);
        throw errExec;
    }

    console.log('[Bugs_Api_Insert] Response de execQuery:', JSON.stringify(response));

    const fila = extraerFilaResultado(response);
    if (!fila || !fila.Id) {
        const msg = 'No se pudo obtener el identificador del reporte insertado. Response: ' + JSON.stringify(response);
        console.error('[Bugs_Api_Insert]', msg);
        throw new Error(msg);
    }

    return {
        success: true,
        idRepote: fila.IDrepote,
        id: fila.Id,
        moduloAfectado: modulo,
        descripcion: descripcion,
        usuarioReporta: UserReporta,
        userEmail: UserEmail
    };
}

function sqlEscape(valor) {
    return String(valor == null ? '' : valor).replace(/'/g, "''");
}

function extraerFilaResultado(response) {
    const resultSets = response && response.result;
    if (!Array.isArray(resultSets)) return null;
    for (const rs of resultSets) {
        if (Array.isArray(rs) && rs.length > 0 && rs[0].Id) return rs[0];
    }
    return null;
}
