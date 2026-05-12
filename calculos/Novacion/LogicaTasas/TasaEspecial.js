function obligacionCU() {
    const ITEM_ID = 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877Q1';

    const userCargado = sessionStorage.getItem('UserCargado');
    const edadMora = sessionStorage.getItem("EdadMoraCl");
    const campanaNovacion = sessionStorage.getItem("campanaNovacion");

    // Si hay campaña de novación activa, no interferir con la selección
    if (campanaNovacion === 'si') return;

    let dropDownList = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    if (!dropDownList) return;

    let dataSource = dropDownList.dataSource;

    function removeItemIfExists() {
        let itemToRemove = dataSource.get(ITEM_ID);
        if (itemToRemove) {
            dataSource.remove(itemToRemove);
            dropDownList.refresh();
        }
    }

    if (userCargado === 'no' && edadMora === '0 - Al día') {
        // Al día y sin usuario cargado → limpiar item dinámico
        removeItemIfExists();

    } else if (userCargado === 'no') {
        // Con mora y sin usuario cargado → insertar "TASA CAMPAÑA" si no existe
        let existingItem = dataSource.get(ITEM_ID);
        if (!existingItem) {
            dataSource.insert(0, {
                id: ITEM_ID,
                Tasa: "TASA CAMPAÑA",
                TasaNovacion: 0
            });
            dropDownList.refresh();
            dropDownList.trigger("change");
        }

    } else {
        // Usuario cargado → limpiar item dinámico
        removeItemIfExists();
    }
}