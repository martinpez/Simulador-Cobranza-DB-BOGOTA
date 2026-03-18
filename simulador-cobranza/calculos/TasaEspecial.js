function obligacionCU() {
    const userCargado = sessionStorage.getItem('UserCargado');
    const edadMora = sessionStorage.getItem("EdadMoraCl");
    const ITEM_ID = 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877Q1';

    let dropDownList = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    let dataSource = dropDownList.dataSource;

    // Helper para remover el item si existe
    function removeItemIfExists() {
        let itemToRemove = dataSource.get(ITEM_ID);
        if (itemToRemove) {
            dataSource.remove(itemToRemove);
            dropDownList.refresh();
        }
    }

    // Helper para deshabilitar input
    function disableInput(input) {
        input.disabled = true;
        input.style.cursor = "not-allowed";
        input.style.backgroundColor = "rgb(217, 217, 217)";
        input.style.color = "";
    }

    // Helper para habilitar input
    function enableInput(input) {
        input.disabled = false;
        input.style.backgroundColor = "#ffffff";
        input.style.color = "#000000";
        input.style.cursor = "text";
    }

    if (userCargado === 'no' && edadMora === '0 - Al día') {
        // Eliminar item del dropdownlist
        removeItemIfExists();

    } else if (userCargado === 'no') {
        //  Solo insertar si el item NO existe ya
        let existingItem = dataSource.get(ITEM_ID);
        if (!existingItem) {
            var newItem = {
                id: ITEM_ID,
                Tasa: "TASA CAMPAÑA",
                TasaNovacion: 0
            };
            dataSource.insert(0, newItem);
            dropDownList.refresh();
            dropDownList.trigger("change");
        }

        //  El input existe en este punto, habilitar correctamente
        let input = document.getElementById("b76668b5-0710-4eee-9718-a2633605c35e");
        if (input) {
            enableInput(input);
        }

    } else {
        // Eliminar item del dropdownlist
        removeItemIfExists();

        // Deshabilitar input cuando se cambia a otro item
        let input = document.getElementById("b76668b5-0710-4eee-9718-a2633605c35e");
        if (input) {
            disableInput(input);
        }
    }
   
}