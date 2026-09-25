const URLS = getConstants(obj, res);
(async () => {
    try {
        let result = await consultaAuxiliar();
        if(res)
            return res.status(200).json(result);
    } catch (error) {
        if(res)
            return res.status(400).json(error.message);
    }
})();


async function consultaAuxiliar() {
    // 1. Calcula la fecha actual ajustada a UTC-5
    let ahora = new Date();
    let utc5 = new Date(ahora.getTime() - 5 * 60 * 60 * 1000);

    // 2. Formatea a 'YYYY-MM-DD' para comparaciones de fecha
    let pad = n => n.toString().padStart(2, '0');
    let yyyy = utc5.getFullYear();
    let mm = pad(utc5.getMonth() + 1);
    let dd = pad(utc5.getDate());
    let fechaHoy = `${yyyy}-${mm}-${dd}`;

    // 3. Construye la consulta SQL usando <= para incluir hoy y todo lo anterior
    let query = `
  SELECT
    id,
    Email,
    FechaEliminacion,
    FechaDesactivacion
  FROM SimiladorDNC_Lappiz_Users
  WHERE
    CONVERT(date, FechaDesactivacion) <= '${fechaHoy}'
    AND (EstadoUsuario <> 'Desactivado' OR EstadoUsuario IS NULL);
`;
    let response = await consultar(query)
    if (response[0]) {
        for (let Datos of response) {
            query = `EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 7, @email = '${Datos.Email}'`
            await consultar(query)
        }
        return ('Usuarios Actualizados')
    } else {
        return ('No hay Usuarios por desactivar')
    }
}

async function consultar(query) {
    let response = await controller.execQuery({ query })
    if (response.result[0]) {
    return response.result[0]
  } else {
    return ('información actualizada')
  }
}