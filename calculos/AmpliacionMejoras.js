function CalculosAmpliacion() {
  // Elimina la final para que se ejecute el cálculo completo al cargar los datos del cliente
  delete sessionStorage.final;
  // Guardar en sessionStorage la edad de mora para usarla en el cálculo de tasas
  sessionStorage.EdadMoraCl = e.dataItem.EdadMoraCl;
  // Determinar si el cliente aplica a campaña de ampliación por el campo MecanismoAplicaCampana
  const esCampana =e.dataItem.MecanismoAplicaCampana &&/AMPLIACION|AMPLI|ampliacion|AMPLIA/.test(e.dataItem.MecanismoAplicaCampana);
  //ejecuta ExecQuery para obtener las tasas de ampliación según la edad de mora del cliente, con un fallback a 0 si no se encuentran valores válidos en la base de datos
  execQuery(
    `SELECT PorcAmpliacionIntCte, PorcAmpliacionIntMora
     FROM SimiladorDNC_Lappiz_TasasVigentes
     WHERE RangoDias3 = '${e.dataItem.EdadMoraCl}'`
  ).then((response) => {

    const dbPorcCte = parseFloat(response[0][0].PorcAmpliacionIntCte) || 0;
    const dbPorcMora = parseFloat(response[0][0].PorcAmpliacionIntMora) || 0;
    console.log('Tasas de ampliación obtenidas de la base de datos:', response[0][0]);
    if (esCampana) {
      sessionStorage.campanaAmpliacion = 'Si';
      sessionStorage.PorcAmpliacionIntCte = parseFloat(sessionStorage.intCampaña) || 0;
      sessionStorage.PorcAmpliacionIntMora = parseFloat(sessionStorage.intMoraCampaña) || 0;
      setFieldValue('6b210c35-666b-47fa-bdff-66ffbc355c5f', 'CAMPAÑA');
      setFieldValue('1540984f-2b52-4a6f-8b34-01236dfd291c', e.dataItem.TasaCampana);
      console.log('Aplica a campaña de ampliación.' + e.dataItem.TasaCampana);
    } else {
      sessionStorage.campanaAmpliacion = 'No';
      sessionStorage.PorcAmpliacionIntCte = dbPorcCte;
      sessionStorage.PorcAmpliacionIntMora = dbPorcMora;
      var ddl = kendo.jQuery('#a27dc42b-08e7-4873-afc6-2cf6d006f5c6').data('kendoDropDownList');
      ddl.value('1B8E59F0-A514-4EEE-92D7-C200D613A4B5');
      ddl.trigger('change');
    }

    // Cargar valores del cliente en el formulario
    setFieldValue('12671e00-a829-472f-b644-be49ea7ebdbf', e.dataItem.CapitalTotalObl);
    setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6', e.dataItem.InteresMoraObl);
    setFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a', e.dataItem.OtrosCargosExigibles);
    setFieldValue('c54e9fde-a861-4446-ab8e-37b4473d231b', e.dataItem.IntGastosNofact);
    setFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a', e.dataItem.PrimaUnica);
    setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167', e.dataItem.InteresCteObl);

    sessionStorage.final = 'Si';
    _recalcularTodo();
  });
  // Cargar valores del cliente en el formulario (en caso de que la consulta a la base de datos falle, para no bloquear el proceso) antes bloqueaba y no cargaba la data y dejaba vacio
  setFieldValue('12671e00-a829-472f-b644-be49ea7ebdbf', e.dataItem.CapitalTotalObl)
  setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6', e.dataItem.InteresMoraObl)
  setFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a', e.dataItem.OtrosCargosExigibles)
  setFieldValue('c54e9fde-a861-4446-ab8e-37b4473d231b', e.dataItem.IntGastosNofact)
  setFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a', e.dataItem.PrimaUnica)
  setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167', e.dataItem.InteresCteObl)
  sessionStorage.final = 'Si'

}


function _recalcularTodo() {

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

  // Pintar todos los campos calculados
  setFieldValue('d8e6669a-3079-4248-88d5-5f01cca53106', porcCte);        // %Baja en cuenta Int Cte
  setFieldValue('4f9627f2-7ada-415b-bf0c-cf308407c82a', porcMora);       // % Descuento Int Mora
  setFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe', descCte);        // Baja en cuenta Int Cte ($)
  setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2', descMora);       // Baja en cuenta Int Mora ($)
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', totalDesc);      // Total Bajas en cuentas
  setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', aboMinSinDesc);  // Abono Min sin Dcto
  setFieldValue('9b88d521-a3dd-4948-8c3f-6dece97a17a5', abonConDescMax); // Abono con Dtos Max

}


function InteresCorrienteAmpliacion() {
  if (!sessionStorage.final) return;
  _recalcularTodo();
  // Seguro o Respaldo por si el % de los intereses corrientes o De Mora no se setean el el calculoAmpliacion 
  aplicarCampanaAmpliacion();
}


function InteresesMoraIcs() {
  if (!sessionStorage.final) return;
  _recalcularTodo();
}


function OtrosCargosAmpliacion() {
  if (!sessionStorage.final) return;
  _recalcularTodo();
}


function PrimaUnicaAmpliacion() {
  if (!sessionStorage.final) return;
  _recalcularTodo();
}


function DescIntCteAmpliacion() {
  var descCte = parseFloat(getFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe')) || 0;
  var descMora = parseFloat(getFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2')) || 0;
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', descCte + descMora);
}


function DescIntMora() {
  var descCte = parseFloat(getFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe')) || 0;
  var descMora = parseFloat(getFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2')) || 0;
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', descCte + descMora);
}


