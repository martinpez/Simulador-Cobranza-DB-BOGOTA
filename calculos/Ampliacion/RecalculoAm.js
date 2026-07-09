function _recalcularTodo() {        
    debugger;
  var InteCte = parseFloat(getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167')) || 0;
  var IntMora = parseFloat(getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6')) || 0;
  var otrosCargos = parseFloat(getFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a')) || 0;
  var PrimaU = parseFloat(getFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a')) || 0;
  var pagoSNR = parseFloat(getFieldValue('44770cdb-4d75-4b2a-957f-400410e65e8d')) || 0;

  var maxPorcCte = parseFloat(sessionStorage.PorcAmpliacionIntCte) || 0;
  var maxPorcMora = parseFloat(sessionStorage.PorcAmpliacionIntMora) || 0;

  // Abono mínimo sin descuento
  var aboMinSinDesc = Math.floor(PrimaU) + Math.floor(InteCte) +
  Math.floor(IntMora) + Math.floor(otrosCargos);
  console.log('Abono mínimo sin descuento:', aboMinSinDesc);

  //   Descuento en Int Mora
  //    Usa el % MÁXIMO parametrizado, pero solo si hay IntMora que descontar
  var porcMora = IntMora > 0 ? maxPorcMora : 0;
  var descMora = Math.floor(IntMora * porcMora / 100);
  var IntMoraNeta = Math.floor(IntMora) - descMora;

  //  Abono con descuento MÁXIMO en Int Cte (para comparar con el pago ingresado y mostrar advertencia si es menor)
  var intCteNetoMaxDesc = Math.floor(InteCte * (1 - maxPorcCte / 100));
  var abonConDescMax = Math.floor(PrimaU) + Math.floor(otrosCargos) +
    IntMoraNeta + intCteNetoMaxDesc + 20000;
  console.log('Abono con descuento máximo:', abonConDescMax);

  // Descuento en Int Cte: se calcula el % que representa lo que NO alcanzó a pagar el pago ingresado de lo que se debía pagar de
  //  IntCte, después de cubrir PrimaU + OtrosCargos + IntMoraNeta + colchón de 20.000
  var porcCte = 0;
  if (InteCte > 0) {
    if (!pagoSNR || pagoSNR <= 0) {
      // Sin pago ingresado → mostrar el % máximo parametrizado
      porcCte = maxPorcCte;
    } else {
      // Cuánto del pago queda disponible para cubrir IntCte
      // después de pagar PrimaU + OtrosCargos + IntMoraNeta + colchón
      var pagoParaIntCte = pagoSNR - Math.floor(PrimaU) - Math.floor(otrosCargos) - IntMoraNeta - 20000;
      // % de descuento que representa lo que NO alcanzó a pagar de IntCte
      porcCte = (1 - pagoParaIntCte / InteCte) * 100;
      porcCte = Math.round(porcCte * 100) / 100;  // 2 decimales
      porcCte = Math.max(porcCte, 0);             // solo clamp inferior: nunca negativo
      // SIN clamp superior: si supera maxPorcCte el cliente lo verá
    }
  }

  var descCte = Math.floor(InteCte * porcCte / 100);
  var totalDesc = descCte + descMora;

  // honorarios 
  const safeNumber = val =>
        isNaN(parseFloat(val)) ? 0 : parseFloat(val)
  let HonorariosCalculados = Math.floor((aboMinSinDesc * sessionStorage.PorcCartera) / 100)
    setFieldValue('d647e41b-7a50-46b0-ba5f-e30eeb44b463', HonorariosCalculados)
    let honorariosPagados = safeNumber(getFieldValue('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b'))
    let sumaHonorarios = 0;
    if (honorariosPagados > 0) {
        //setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', abonoMinimo + pagoHonorarios)
        sumaHonorarios = aboMinSinDesc + honorariosPagados;
        setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', sumaHonorarios)

    } else {
        setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', aboMinSinDesc)
    }

  // Pintar todos los campos calculados
  setFieldValue('d8e6669a-3079-4248-88d5-5f01cca53106', porcCte);        // %Baja en cuenta Int Cte
  setFieldValue('4f9627f2-7ada-415b-bf0c-cf308407c82a', porcMora);       // % Descuento Int Mora
  setFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe', descCte);        // Baja en cuenta Int Cte ($)
  setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2', descMora);       // Baja en cuenta Int Mora ($)
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', totalDesc);      // Total Bajas en cuentas
  //setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', aboMinSinDesc);  // Abono Min sin Dcto
  setFieldValue('9b88d521-a3dd-4948-8c3f-6dece97a17a5', abonConDescMax); // Abono con Dtos Max

}

// EL ABONO ES ESTE 9b88d521-a3dd-4948-8c3f-6dece97a17a5