function CalculosAmpliacion() {
  //Ampliación
  delete sessionStorage.final

  debugger

  execQuery(`SELECT PorcAmpliacionIntCte,PorcAmpliacionIntMora FROM SimiladorDNC_Lappiz_TasasVigentes WHERE RangoDias3 = '${e.dataItem.EdadMoraCl}'`)
    .then((response) => {

      let PorcAmpliacionIntCte = response[0][0].PorcAmpliacionIntCte;
      let PorcAmpliacionIntMora = response[0][0].PorcAmpliacionIntMora;

      console.log(response)

      let InteCte = e.dataItem.InteresCteObl;
      let IntMora = e.dataItem.InteresMoraObl;
      let PrimaU = e.dataItem.PrimaUnica;
      let otrosCargos = e.dataItem.OtrosCargosExigibles;

      let porcDescIntCteIcs;
      let porcIntMora;
      if (e.dataItem.MecanismoAplicaCampana && /AMPLIACION|AMPLI|ampliacion|AMPLIA/.test(e.dataItem.MecanismoAplicaCampana)) {
        console.log("Aplica campaña Ampliacion")
        sessionStorage.campanaampliacion = 'Si';
        setFieldValue('6b210c35-666b-47fa-bdff-66ffbc355c5f', 'CAMPAÑA');
        setFieldValue('1540984f-2b52-4a6f-8b34-01236dfd291c', e.dataItem.TasaCampana);
        porcDescIntCteIcs = e.dataItem.DtoInteresesCampana;
        porcIntMora = e.dataItem.DtoInteresesMoraCampana;
      } else {
        var dropDownList2 = kendo.jQuery("#a27dc42b-08e7-4873-afc6-2cf6d006f5c6").data('kendoDropDownList');
        dropDownList2.value('1B8E59F0-A514-4EEE-92D7-C200D613A4B5');
        dropDownList2.trigger("change");
        porcDescIntCteIcs = PorcAmpliacionIntCte;
        porcIntMora = PorcAmpliacionIntMora;
        console.log("PorcAmpliacionIntCte campaña" + PorcAmpliacionIntCte + "y porcIntMora " + porcIntMora)
      }
      sessionStorage.EdadMoraCl = e.dataItem.EdadMoraCl;
      sessionStorage.PorcAmpliacionIntCte = porcDescIntCteIcs;
      sessionStorage.PorcAmpliacionIntMora = porcIntMora;
      sessionStorage.InteCte = InteCte;

      setFieldValue('4f9627f2-7ada-415b-bf0c-cf308407c82a', porcIntMora);
      setFieldValue('d8e6669a-3079-4248-88d5-5f01cca53106', porcDescIntCteIcs);

      let DescIntCte = parseInt(InteCte) * (porcDescIntCteIcs / 100);
      let DescIntMora = parseInt(IntMora) * (porcIntMora / 100);
      setFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe', DescIntCte);
      setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2', DescIntMora);
      setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', DescIntMora + DescIntCte);


      let AboMinSinDesc =
        parseInt(PrimaU ?? 0) +
        parseInt(InteCte ?? 0) +
        parseInt(IntMora ?? 0) +
        parseInt(otrosCargos ?? 0);
      setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', AboMinSinDesc)

      let AbonConDescMax;
      if (e.dataItem.EdadMoraCl == "1-30 Días") {
        // Sin descuento en intereses → paga la totalidad más colchón
        AbonConDescMax =
          parseInt(PrimaU ?? 0) +
          parseInt(InteCte ?? 0) +
          parseInt(IntMora ?? 0) +
          parseInt(otrosCargos ?? 0) +
          20000;
      } else {
        AbonConDescMax =
          parseInt(PrimaU ?? 0) +
          Math.round(parseInt(InteCte ?? 0) * (1 - porcDescIntCteIcs / 100)) +
          parseInt(otrosCargos ?? 0) +
          20000;
      }
      setFieldValue("9b88d521-a3dd-4948-8c3f-6dece97a17a5", AbonConDescMax);


    });
  // Seteos fuera del then (no dependen de la consulta)
  setFieldValue('12671e00-a829-472f-b644-be49ea7ebdbf', e.dataItem.CapitalTotalObl)
  setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6', e.dataItem.InteresMoraObl)
  setFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a', e.dataItem.OtrosCargosExigibles)
  setFieldValue('c54e9fde-a861-4446-ab8e-37b4473d231b', e.dataItem.IntGastosNofact)
  setFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a', e.dataItem.PrimaUnica)
  setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167', e.dataItem.InteresCteObl)
  sessionStorage.final = 'Si'
}


function DescIntCteAmpliacion() {
  let descuentocte = parseInt(getFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe')) || 0;
  let descuentomora = parseInt(getFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2')) || 0;
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', descuentocte + descuentomora);
}

function DescIntMora() {
  let descuentocte = parseInt(getFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe')) || 0;
  let descuentomora = parseInt(getFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2')) || 0;
  console.log(descuentomora)
  let operacion = descuentocte + descuentomora;
  setFieldValue('312df4ed-17a6-4e38-899a-e075171f9d84', operacion || 0);
}

function InteresesMoraIcs() {
  let int = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6')
  if (!sessionStorage.final) return;

  let pagoSNR = getFieldValue('44770cdb-4d75-4b2a-957f-400410e65e8d');
  let InteCte = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167');
  let otrosCargos = getFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a');
  let PrimaU = getFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a');
  let IntMora = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6');

  // Para 1-30 días no aplica descuento en mora
  let maxPorcIntMora = parseFloat(sessionStorage.PorcAmpliacionIntMora) || 0;

  let porcentajeMora;
  if ((PrimaU + InteCte + IntMora + otrosCargos - pagoSNR) > 0) {
    porcentajeMora = maxPorcIntMora;   // Hasta el máximo parametrizado (100% para >30 días)
  } else {
    porcentajeMora = 0;
  }

  let operacion = int * (porcentajeMora / 100);
  setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2', operacion);
  setFieldValue('4f9627f2-7ada-415b-bf0c-cf308407c82a', porcentajeMora);

  // Recalcular Abono con Dtos Max
  let maxPorcDescIntCte = parseFloat(sessionStorage.PorcAmpliacionIntCte) || 0;
  let AbonConDescMax;
  if (sessionStorage.EdadMoraCl == "1-30 Días") {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      parseInt(InteCte ?? 0) +
      parseInt(IntMora ?? 0) +
      parseInt(otrosCargos ?? 0) +
      20000;
  } else {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      Math.round(parseInt(InteCte ?? 0) * (1 - maxPorcDescIntCte / 100)) +
      parseInt(otrosCargos ?? 0) +
      20000;
  }
  setFieldValue("9b88d521-a3dd-4948-8c3f-6dece97a17a5", AbonConDescMax);

  let AboMinSinDesc =
    parseInt(PrimaU ?? 0) +
    parseInt(InteCte ?? 0) +
    parseInt(IntMora ?? 0) +
    parseInt(otrosCargos ?? 0);
  setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', AboMinSinDesc);

}



function OtrosCargosAmpliacion() {
  let otrosCargos = getFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a');
  let PrimaU = getFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a');
  let InteCte = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167');
  let IntMora = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6');

  let maxPorcDescIntCte = parseFloat(sessionStorage.PorcAmpliacionIntCte) || 0;

  let AbonConDescMax;
  if (sessionStorage.EdadMoraCl == "1-30 Días") {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      parseInt(InteCte ?? 0) +
      parseInt(IntMora ?? 0) +
      parseInt(otrosCargos ?? 0) +
      20000;
  } else {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      Math.round(parseInt(InteCte ?? 0) * (1 - maxPorcDescIntCte / 100)) +
      parseInt(otrosCargos ?? 0) +
      20000;
  }
  if (AbonConDescMax > 0) {
    setFieldValue("9b88d521-a3dd-4948-8c3f-6dece97a17a5", AbonConDescMax);
  }

  let AboMinSinDesc =
    parseInt(PrimaU ?? 0) +
    parseInt(InteCte ?? 0) +
    parseInt(IntMora ?? 0) +
    parseInt(otrosCargos ?? 0);
  setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', AboMinSinDesc);
}


function InteresCorrienteAmpliacion() {
  let pagoSNR = getFieldValue('44770cdb-4d75-4b2a-957f-400410e65e8d');
  let int = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167');
  let otrosCargos = getFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a');
  let PrimaU = getFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a');
  let IntMora = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6');

  let maxPorcDescIntCte = parseFloat(sessionStorage.PorcAmpliacionIntCte) || 0;  // p.ej. 50 para 61-120 días
  let maxPorcFraction = maxPorcDescIntCte / 100;                               // p.ej. 0.50

  let porcentaje;
  if (int <= 0 || (PrimaU + int + IntMora + otrosCargos - pagoSNR) <= 0) {
    porcentaje = 0;
  } else {
   
        // Fórmula: % real que genera el pago ingresado (SIN tope — el cliente
        // debe ver exactamente qué descuento le representa su pago)
        porcentaje = Math.round(((PrimaU + int + otrosCargos + 20000 - pagoSNR) / int) * 100) / 100;
        porcentaje = Math.max(porcentaje, 0);   // Solo evitar negativos
    }
  
  let operacion = int * porcentaje;
  setFieldValue('15a75d66-7dc0-4e25-b3e3-213a984a22fe', operacion);
  setFieldValue('d8e6669a-3079-4248-88d5-5f01cca53106', porcentaje * 100);

  let AbonConDescMax;
  if (sessionStorage.EdadMoraCl == "1-30 Días") {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      parseInt(int ?? 0) +
      parseInt(IntMora ?? 0) +
      parseInt(otrosCargos ?? 0) +
      20000;
  } else {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      Math.round(parseInt(int ?? 0) * (1 - maxPorcFraction)) +
      parseInt(otrosCargos ?? 0) +
      20000;
  }
  setFieldValue("9b88d521-a3dd-4948-8c3f-6dece97a17a5", AbonConDescMax);
  let AboMinSinDesc =
    parseInt(PrimaU ?? 0) +
    parseInt(int ?? 0) +
    parseInt(IntMora ?? 0) +
    parseInt(otrosCargos ?? 0);
  setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', AboMinSinDesc);
}


function PrimaUnicaAmpliacion() {

  let otrosCargos = getFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a');
let PrimaU = e.value;
  let InteCte = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167');
  let IntMora = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6');

  let maxPorcDescIntCte = parseFloat(sessionStorage.PorcAmpliacionIntCte) || 0;
  let AbonConDescMax;
  if (sessionStorage.EdadMoraCl == "1-30 Días") {

    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      parseInt(InteCte ?? 0) +
      parseInt(IntMora ?? 0) +
      parseInt(otrosCargos ?? 0) +
      20000;
  } else {
    AbonConDescMax =
      parseInt(PrimaU ?? 0) +
      Math.round(parseInt(InteCte ?? 0) * (1 - maxPorcDescIntCte / 100)) +
      parseInt(otrosCargos ?? 0) +
      20000;
  }
     if (AbonConDescMax) {
        setFieldValue("9b88d521-a3dd-4948-8c3f-6dece97a17a5", AbonConDescMax);
    }
  let AboMinSinDesc =
        parseInt(PrimaU      ?? 0) +
        parseInt(InteCte     ?? 0) +
        parseInt(IntMora     ?? 0) +
        parseInt(otrosCargos ?? 0);
    setFieldValue('3a14031a-7edd-4540-8e52-e199892cba9a', AboMinSinDesc);
}

console.log("Cliente usado:  75076028")