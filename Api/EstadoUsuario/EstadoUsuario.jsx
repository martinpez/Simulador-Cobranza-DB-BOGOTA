async function ActualizarEstado() {
  try {
    let ArregloUsuarios = obj.body.ArregloUsuarios;

   
    //funcionalidad insert a la tabla auxiliar
    let query = "";

    //recorrer  el arreglo de Arreglos

    ArregloUsuarios.forEach((Arreglo) => {
      //creación del insert concatenado para ingresar a la tabla auxiliar
      query += `EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 9, @estado = '${Arreglo.estado}', @identificacion = '${Arreglo.identificacion}';`
      
    });
    
    await controller.execQuery({query})
    return "se hizo el insert";
  } catch (err) {
    return err;
  }
}

(async () => {
  try {
    const result = await ActualizarEstado();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
})();