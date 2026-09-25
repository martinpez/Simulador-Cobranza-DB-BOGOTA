async function ActualizarGrupos() {
  try {
    let ArregloUsuarios = obj.body.ArregloUsuarios;

    //funcionalidad insert a la tabla auxiliar
    let query = "";

    //recorrer  el arreglo de Arreglos
    
    ArregloUsuarios.forEach((Arreglo) => {
      //creación del insert concatenado para ingresar a la tabla auxiliar

     query += `UPDATE SimiladorDNC_Lappiz_Users 
          SET GRUPOSFK = (SELECT id FROM SimiladorDNC_Lappiz_GrupoUsuario WHERE CodigoGrupo = '${Arreglo.Grupo}')
          WHERE Email = '${Arreglo.Usuario}@bancodebogota.com.co' OR usuario = '${Arreglo.Usuario}';`
    });
    
    //funcionalidad para ejecutar el query
    let response = await controller.execQuery({ query });;
    return "se hizo el insert";
  } catch (err) {
    return err;
  }
}

(async () => {
  try {
    const result = await ActualizarGrupos();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
})();