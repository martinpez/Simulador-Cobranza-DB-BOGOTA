function ampliVAsia() {
}
async function CalculosAmpliacion() {
  debugger;
  delete sessionStorage.PorcAmpliacionIntCte;
  delete sessionStorage.final;
  sessionStorage.EdadMoraCl = e.dataItem.EdadMoraCl;

  const esCampana = e.dataItem.MecanismoAplicaCampana && /AMPLIACION|AMPLI|ampliacion|AMPLIA/.test(e.dataItem.MecanismoAplicaCampana);
  let dbPorcMora = 0;
  let dbPorcCte = 0;
  try {
    const response = await execQuery(
      `SELECT PorcAmpliacionIntCte, PorcAmpliacionIntMora
       FROM SimiladorDNC_Lappiz_TasasVigentes
       WHERE RangoDias3 = '${e.dataItem.EdadMoraCl}'`
    );
    if (response && response[0] && response[0][0]) {
      dbPorcMora = parseFloat(response[0][0].PorcAmpliacionIntMora) || 0;
      dbPorcCte = parseFloat(response[0][0].PorcAmpliacionIntCte) || 0;
      console.log('Tasas de ampliación obtenidas de la base de datos:', response[0][0]);
    }
  } catch (error) {
    console.error('Error al consultar tasas de ampliación:', error);
  }
  if (esCampana) {
    sessionStorage.campanaAmpliacion = 'Si';
    sessionStorage.PorcAmpliacionIntCte = parseFloat(sessionStorage.intCampaña) || 0;
    sessionStorage.PorcAmpliacionIntMora = parseFloat(sessionStorage.intMoraCampaña) || 0;
    setFieldValue('6b210c35-666b-47fa-bdff-66ffbc355c5f', 'CAMPAÑA');
    setFieldValue('1540984f-2b52-4a6f-8b34-01236dfd291c', e.dataItem.TasaCampana);
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

  // seteo de honorarios  
  if (sessionStorage.UserCargado != "no") {
    let honorarioslista = "020563ab-b407-433b-bcf3-c534456818f3"
    let idlineaKendo = "#8e1dc11f-e65c-4141-a1d5-42850fd9b214"
    let idTipoCarteraKendo = "#93f08e21-47c5-48ee-8acc-b093afe84a38"
    let tipocobro = sessionStorage.TipoCobro
    let tipolinea = sessionStorage.Linea
    let tipocartera = sessionStorage.TipoCartera
    let mecanismo = "ampliacion"
    if (sessionStorage.PorcAmpliacionIntCte == 100) {
      tipocartera = "CONSUMO"
    }
    CargaCamposHonorarios(honorarioslista, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera, mecanismo);
  }
  _recalcularTodo();
  // Cargar valores del cliente en el formulario (en caso de que la consulta a la base de datos falle, para no bloquear el proceso) antes bloqueaba y no cargaba la data y dejaba vacio
  setFieldValue('12671e00-a829-472f-b644-be49ea7ebdbf', e.dataItem.CapitalTotalObl)
  setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6', e.dataItem.InteresMoraObl)
  setFieldValue('e64cbac2-f6de-49eb-a9ec-79695d0e655a', e.dataItem.OtrosCargosExigibles)
  setFieldValue('c54e9fde-a861-4446-ab8e-37b4473d231b', e.dataItem.IntGastosNofact)
  setFieldValue('5954a70c-f39c-4356-bbcf-385a73d11e6a', e.dataItem.PrimaUnica)
  setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167', e.dataItem.InteresCteObl)
  sessionStorage.final = 'Si'

}