function tasaEspecial() {
    const idTasaInput = "b76668b5-0710-4eee-9718-a2633605c35e";
    const idEspecial = 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877CE0';
    const idVigente = '1B8E59F0-A514-4EEE-92D7-C200D613A4B5'; // produccion 
    
    // Obtenemos la edad de mora actual
    const edadMora = sessionStorage.getItem("EdadMoraCl");
    
    let dropDownList = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    if (!dropDownList) return;

    let dataSource = dropDownList.dataSource;
    let input = document.getElementById(idTasaInput);

    // CASO 1: Está al día
    if (edadMora === "0 - Al día") {
        let existingItem = dataSource.data().find(item => item.Id === idEspecial);
        if (!existingItem) {
            dataSource.insert(0, { 
                Id: idEspecial, 
                Tasa: "TASA ESPECIAL", 
                TasaNovacion: 0 
            });
        }

        dropDownList.value(idVigente);
        dropDownList.trigger("change");

        if (input) {
            input.disabled = false;
            input.removeAttribute("disabled");
            input.style.setProperty("background-color", "#ffffff", "important");
            input.style.setProperty("cursor", "text", "important");
            
            let numeric = kendo.jQuery(input).data("kendoNumericTextBox");
            if (numeric) numeric.enable(true);
        }
    } 
    // CASO 2: Tiene cualquier otra edad de mora (NO está al día)
    else if (edadMora !== "0 - Al día" && edadMora !== null) {
        
        // Buscar y eliminar físicamente la Tasa Especial si existe
        let itemToRemove = dataSource.data().find(item => item.Id === idEspecial);
        if (itemToRemove) {
            dataSource.remove(itemToRemove);
            console.log("Acción: Se eliminó Tasa Especial por mora detectada: " + edadMora);
        }
        
        // Forzar retorno a Tasa Vigente
        dropDownList.value(idVigente);
        dropDownList.trigger("change");

        // Bloquear el input nuevamente
        if (input) {
            input.disabled = true;
            input.setAttribute("disabled", "disabled");
            input.style.setProperty("background-color", "rgb(217, 217, 217)", "important");
            
            let numeric = kendo.jQuery(input).data("kendoNumericTextBox");
            if (numeric) numeric.enable(false);
        }
    }

}



let fecha = document.querySelector("#\\39 630246d-c683-4104-a141-391c9541b5cd > div > div > div.dx-texteditor-input-container > input").value
    fecha =fecha.replaceAll('/','');