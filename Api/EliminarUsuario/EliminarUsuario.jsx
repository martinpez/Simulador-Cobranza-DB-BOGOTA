
(async () => {
    try {
        const result = await consultaAuxiliar();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})();


async function consultaAuxiliar() {
    let fechaActual = new Date();
    fechaActual = fechaActual.getTime() - 18000000;
    fechaActual = new Date(fechaActual)
    let mes = fechaActual.getMonth() + 1;
    let dia = fechaActual.getDate();
    let year = fechaActual.getFullYear();
    let ahora = new Date();
    let utc5 = new Date(ahora.getTime() - 5 * 60 * 60 * 1000);

    // 2. Formatea a 'YYYY-MM-DD' para comparaciones de fecha
    let pad = n => n.toString().padStart(2, '0');
    let yyyy = utc5.getFullYear();
    let mm = pad(utc5.getMonth() + 1);
    let dd = pad(utc5.getDate());
    let fechaHoy = `${yyyy}-${mm}-${dd}`;
    let query = `select id, Email,FechaEliminacion,FechaDesactivacion from SimiladorDNC_Lappiz_Users  WHERE
    CONVERT(date, FechaEliminacion) <= '${fechaHoy}'
    AND (EstadoUsuario <> 'Eliminado' OR EstadoUsuario IS NULL);`

    let response = await consultar(query)
    if (response[0]) {
        for (let Datos of response) {
            query = `EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 8, @email = '${Datos.Email}'`
            await consultar(query)
        }
        return ('Usuarios Actualizados')
    } else {
        return ('No hay Usuarios por desactivar')
    }
}

async function consultar(query) {
    try {
        let response = await controller.execQuery({ query })
        if (response.result[0]) {
            return response.result[0]
        } else {
            return ('información actualizada')
        }
    } catch (error) {
        return ("Problemas al ejecutar el query, Error: " + error.message);
    }
}