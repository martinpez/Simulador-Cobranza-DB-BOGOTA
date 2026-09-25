async function insertTablaAuxiliar() {
  try {
    let ArregloUsuarios = obj.body.ArregloUsuarios;

    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() - 5); // Restar 5 horas
    const fechaISO = fechaActual.toISOString();
    //funcionalidad insert a la tabla auxiliar
    let query = "";

    //recorrer  el arreglo de Arreglos
    
    ArregloUsuarios.forEach((Arreglo) => {
      //creación del insert concatenado para ingresar a la tabla auxiliar

      query += `INSERT INTO SimiladorDNC_Lappiz_AuxiliarUsuario (id,Nombre,Apellidos,TipoDocumento,CorreoElectronico,NumeroDocumento,Contrasena,Grupo,Rol,Estado,FechaCreacion) values(NEWID(),'${Arreglo.nombre}',
        '${Arreglo.apellidos}',
        '${Arreglo.tipodocumento}',
        '${Arreglo.correoelectronico}',
        '${Arreglo.numerodocumento}',
        'Bdb.${Arreglo.numerodocumento}',
        '${Arreglo.grupo}',
        '${Arreglo.rol}',
        'Activo',
        '${fechaISO}'
      );
      `;
    });
    
    
    //funcionalidad para ejecutar el query
    let response = await insert(query);
    return "se hizo el insert";
  } catch (err) {
    return err;
  }
}

(async () => {
  try {
    const result = await insertTablaAuxiliar();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
})();



  async function insert(query) {
    await controller.execQuery({ query });
    return('insert')
  }
