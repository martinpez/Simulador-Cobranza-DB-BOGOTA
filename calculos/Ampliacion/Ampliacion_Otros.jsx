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


