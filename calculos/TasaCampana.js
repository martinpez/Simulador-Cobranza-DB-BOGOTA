function valoresPoblamiento(){
    //Pantalla Principal
    delete sessionStorage.campanamora
    setFieldValue('1ad60ed2-e515-4164-8270-54efa1e574fa',e.dataItem.NombreCompleto)
    setFieldValue('4eedfe97-8bf2-499c-a05f-ff25e3ca9b95',e.dataItem.PosibilidadCambio026)
    let id = getIdByPartialText(e.dataItem.MarcaObl026, '8676efb4-1857-48d2-b604-8c4e23917fd0');
    setFieldValue('8676efb4-1857-48d2-b604-8c4e23917fd0', id) //marca obligacion
    let mora = getIdByPartialText(e.dataItem.EdadMoraCl,'5b9ce178-27fe-4c52-b91d-ba6a898ff546');
    
     if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes("PAGOMORA")){
        sessionStorage.campanamora = 'si'
        }
    setFieldValue('5b9ce178-27fe-4c52-b91d-ba6a898ff546',mora) //edad mora
    
    
    
       //Mora
      CalculosMora()
      sessionStorage.edadMora = e.dataItem.EdadMoraCl
      sessionStorage.intCampaña =e.dataItem.DtoInteresesCampana
      sessionStorage.intMoraCampaña = e.dataItem.DtoInteresesMoraCampana
      //Ampliacion
      CalculosAmpliacion()
     //cancelacion
      poblarCancelacion()
  
  
    //novaciones
    setFieldValue('616e6102-56e5-48e9-bfc2-fce8497e629d',e.dataItem.SaldoTotalObl);
    setFieldValue('1f7c2b79-87a6-402f-95f2-414aea88a4bf',e.dataItem.PagoMinObl);
   
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
  }else{
    var dropDownList2 = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    dropDownList2.value('1B8E59F0-A514-4EEE-92D7-C200D613A4B5')
    dropDownList2.trigger("change");
  }

  setFieldValue('e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2',0)
  
  }
  
    