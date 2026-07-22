function valoresPoblamiento() {
  //Pantalla Principal
  debugger;
  delete sessionStorage.campanamora
  delete sessionStorage.UserCargado
  delete sessionStorage.MoraObl
  delete sessionStorage.PorcCartera

  setFieldValue('1ad60ed2-e515-4164-8270-54efa1e574fa', e.dataItem.NombreCompleto) // Nombre Completo
  e.dataItem.PosibilidadCambio026 == "SI" ? document.getElementById("4eedfe97-8bf2-499c-a05f-ff25e3ca9b95").selectedIndex = 1
    : document.getElementById("4eedfe97-8bf2-499c-a05f-ff25e3ca9b95").selectedIndex = 2; // Cambio PoP
  let id = getIdByPartialText(e.dataItem.MarcaObl026, '8676efb4-1857-48d2-b604-8c4e23917fd0');
  setFieldValue('8676efb4-1857-48d2-b604-8c4e23917fd0', id); // Marca Obl
  e.dataItem.GestionTelefonica == "SI" ? document.getElementById("8235c54b-36bd-4880-a29e-fa021ff71595").selectedIndex = 1
    : document.getElementById("8235c54b-36bd-4880-a29e-fa021ff71595").selectedIndex = 2; // Gestion Telefonica
  let mora = getIdByPartialText(e.dataItem.EdadMoraCl, '5b9ce178-27fe-4c52-b91d-ba6a898ff546');
  if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes("PAGOMORA")) {
    sessionStorage.campanamora = 'si'
  }
  sessionStorage.setItem("MoraObl", e.dataItem.DiasMoraObl); // dia de
  setFieldValue('5b9ce178-27fe-4c52-b91d-ba6a898ff546', mora) //edad mora


  // honorarios 
  let producto = e.dataItem.Producto
  let TipoCobro = e.dataItem.CustomChar3
  let Linea = e.dataItem.CustomChar2
  let honorariosValues = e.dataItem.CustomNumber1
  let TipoCartera = e.dataItem.CustomChar1
  sessionStorage.TipProducto = producto
  sessionStorage.TipoCobro = TipoCobro
  sessionStorage.Linea = Linea
  sessionStorage.honorariosValues = parseFloat(honorariosValues)
  sessionStorage.TipoCartera = TipoCartera


  //Mora
  CalculosMora()
  sessionStorage.edadMora = e.dataItem.EdadMoraCl
  sessionStorage.intCampaña = e.dataItem.DtoInteresesCampana
  sessionStorage.intMoraCampaña = e.dataItem.DtoInteresesMoraCampana
  setFieldValue("247db41e-ea0d-444b-b3d0-627aae51ecd0", e.dataItem.DiasMoraObl)
  //Ampliacion
  CalculosAmpliacion()
  setFieldValue("7ba8643d-9438-4ade-bb3f-bab7948e2cbf", e.dataItem.DiasMoraObl)

  //cancelacion
  poblarCancelacion()
  setFieldValue("27cfef98-5ca4-415e-8149-7149479d487a", e.dataItem.DiasMoraObl)

  //novaciones
  setFieldValue('616e6102-56e5-48e9-bfc2-fce8497e629d', e.dataItem.SaldoTotalObl);
  setFieldValue('1f7c2b79-87a6-402f-95f2-414aea88a4bf', e.dataItem.PagoMinObl);
  setFieldValue('e2c2ca76-e568-413d-8aac-b7bd2c3b9f52', e.dataItem.InteresCteObl);                    // Int Corriente
  setFieldValue('ce31f456-c5d9-4476-a56f-f5f44d2c8827', e.dataItem.InteresMoraObl);                   // Int Mora
  setFieldValue('a710006e-72a9-4388-84ed-cc3b743ef45f', e.dataItem.InteresesExtracontablesObl || 0);  // Int Extracontable
  setFieldValue('51440ec8-1f3c-49fa-8672-15870130cb90', e.dataItem.OtrosCargosExigibles || 0);        // Otros Cargos
  setFieldValue('0cb35f96-ddc9-40e7-b948-8f0d4d86bf79', e.dataItem.DiasMoraObl);                      // Días de mora

  // Seleccionar Tipo de Cartera (dispara calculoHonorariosNov -> línea + % honorarios)
  let idCarteraNov = getIdByPartialText(sessionStorage.TipoCartera, 'baa0e784-8248-45b8-9394-8932fe45094e');
  setFieldValue('baa0e784-8248-45b8-9394-8932fe45094e', idCarteraNov);

  // Seleccionar la lista Honorarios / Gastos / No aplica según TipoCobro
  if (typeof initGastoNov === 'function') { initGastoNov(); }

  // Consultar rango de días (topes, % abono, tasa GxC) y lanzar el cálculo
  if (typeof consultarRango === 'function') { consultarRango(); }
  let dropDownList1 = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
  let dataSource1 = dropDownList1.dataSource;

  // Define el ID del ítem que quieres eliminar
  let idToRemove = 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877CE';  // El ID que agregaste anteriormente

  // Busca el ítem en el DataSource y lo elimina
  let itemToRemove = dataSource1.data().find(item => item.Id === idToRemove);
  if (itemToRemove) {
    // Elimina el ítem del DataSource
    dataSource1.remove(itemToRemove);

    // También puedes forzar la actualización del dropdown para reflejar el cambio visualmente
    dropDownList1.refresh();
  }

  if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes("NOVACION")) {
    let dropDownList = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');

    if (!(sessionStorage.getItem("EdadMoraCl") === "0 - Al día")) {
      sessionStorage.campanaNovacion = 'si'
    }


    // Obtén el DataSource del DropDownList
    let dataSource = dropDownList.dataSource;

    // Define el nuevo objeto a agregar
    var newItem = {
      Id: 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877CE',
      Tasa: "TASA CAMPAÑA", // Campo Nombre
      TasaNovacion: e.dataItem.TasaCampana   // Campo Porcentaje
    };


    // Inserta el nuevo objeto al inicio del DataSource
    dataSource.insert(0, newItem);

    // Refresca el DropDownList para reflejar los cambios
    dropDownList.refresh();



    // Establece el nuevo elemento como seleccionado
    dropDownList.value(newItem.Id); // Usa el campo `Id` como valor (ajusta según tu configuración de `valueField`)

    // Opcional: Dispara el evento `change` si necesitas que se procese el cambio
    dropDownList.trigger("change");
  } else {
    var dropDownList2 = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    dropDownList2.value('1B8E59F0-A514-4EEE-92D7-C200D613A4B5')
    dropDownList2.trigger("change");
  }

  setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2', 0)

}



function getIdByPartialText(partialText, elemento) {
  const select = document.getElementById(elemento);
  const options = Array.from(select.options); // Convierte a un array
  const matchedOption = options.find(option => option.text.includes(partialText));
  return matchedOption ? matchedOption.value : null;
}