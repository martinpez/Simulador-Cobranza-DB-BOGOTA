(async () => {
  try {
    const result = await eliminarPoblamiento();
     return res.status(200).json(result);
  } catch (error) {
    // return res.status(400).json(error.message);
  }
})();


async function eliminarPoblamiento() {
  let fechaActual = new Date();
  fechaActual = fechaActual.getTime() - 18000000;
  fechaActual = new Date(fechaActual)
  let mes = fechaActual.getMonth() + 1;
  let dia = fechaActual.getDate();
  let year = fechaActual.getFullYear();
  let query = `delete SimiladorDNC_Lappiz_PoblamientoDatos where (year(FechaVencimiento) = ${year}) and (month(FechaVencimiento) = ${mes}) and (day(FechaVencimiento)= ${dia})`
  controller.execQuery({query});
  return 'eliminado'
}
