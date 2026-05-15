function tasaEspecial() {
    const idEspecial = 'AE441B5A-3FB9-4E62-9FF6-96CAD6C877CE0';
    const idVigente = '1B8E59F0-A514-4EEE-92D7-C200D613A4B5';

    const edadMora = sessionStorage.getItem("EdadMoraCl");
    const campanaNovacion = sessionStorage.getItem("campanaNovacion");

    // Si hay campaña de novación activa, no interferir con la selección
    if (campanaNovacion === 'si') return;

    let dropDownList = kendo.jQuery("#91d24002-ea79-468e-8375-8fee8964b2f8").data('kendoDropDownList');
    if (!dropDownList) return;

    let dataSource = dropDownList.dataSource;

    // CASO 1: Está al día → insertar Tasa Especial si no existe y seleccionar vigente
    if (edadMora === "0 - Al día") {
        let existingItem = dataSource.data().find(item => item.Id === idEspecial);
        if (!existingItem) {
            dataSource.insert(0, {
                Id: idEspecial,
                Tasa: "TASA ESPECIAL",
                TasaNovacion: 0
            });
            dropDownList.refresh();
        }
        dropDownList.value(idVigente);
        dropDownList.trigger("change");

        // CASO 2: Tiene mora → eliminar Tasa Especial si existe y seleccionar vigente
    } else if (edadMora !== null) {
        let itemToRemove = dataSource.data().find(item => item.Id === idEspecial);
        if (itemToRemove) {
            dataSource.remove(itemToRemove);
            dropDownList.refresh();
        }
        dropDownList.value(idVigente);
        dropDownList.trigger("change");
    }
}