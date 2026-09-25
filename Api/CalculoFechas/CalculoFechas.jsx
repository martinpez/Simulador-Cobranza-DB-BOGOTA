const fc = require("festivos-colombia");
async function calculo() {

  

  // fecha base de datos
  let fechaActual =new Date();
  fechaActual = fechaActual.getTime() - 18000000;
  let diasDesactivacion= 30
  let diasEliminacion = 90
  let fechaDesactivacion = await calculoFecha(fechaActual,diasDesactivacion)
  let fechaEliminacion = await calculoFecha(fechaActual,diasEliminacion)


  let fechaBD = {
    fechaDesactivacion: new Date(fechaDesactivacion),
    fechaEliminacion: new Date(fechaEliminacion)
  }
 
  

  return fechaBD;
}

(async () => {
  try {
    const result = await calculo();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
})();

async function calculoFecha(fecha,dias){
  let i = 0
  let fechaActual = fecha;
  
  let AnsDia = 86400000;
  for (i=0 ; i <= dias; i++) {
    fechaActual = fechaActual + AnsDia;
    
  }
 
  return fechaActual
}