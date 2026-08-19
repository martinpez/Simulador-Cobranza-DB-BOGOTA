function reflejarSoxConsolidado() {

    const campoObs = document.getElementById('be70a202-71a9-40ea-851b-945702693b51');
    if (!campoObs) return;

    campoObs.addEventListener('input', () => {

        const observacionesActuales = campoObs.value || '';

        let fechaPago = document.querySelector("#\\33 9505284-3650-4303-b564-747e7dd3a8e9 > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value
        fechaPago = fechaPago.replaceAll('/', '')

        let pagoNegociacion = getFieldValue('0ee03528-b018-47d1-856b-9e30dbae2ddf') || '';
        let cuotaProyectada = getFieldValue('e74b2587-dccc-4395-8333-f6c2f34338aa') || '';
        let peorMarca = getFieldValue('183f4194-c998-41a4-9a8c-1436cc78132f') || '';
        let gestionTel = sessionStorage.GestionTelf || '';
        let tipoGestion = gestionTel == "1: Si" ? "TEL" : "DOC";

        let actividadEconomica =
            document.querySelector("#c852f2a7-6f9c-48f6-96b5-6fdc26c399ef")
                ?.selectedOptions[0]?.textContent || '';

        if (actividadEconomica === 'Seleccione un registro...') actividadEconomica = '';

        let ingresoBruto = getFieldValue('67631aed-75e4-4b23-8601-17cadd1c7003') || '';
        let tasaEA = (getFieldValue('c9f5317e-9099-43f1-9b7f-78b93d99aa6a') || 0) * 100;

        let soxActualizado = `FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX0LLLVALORPAGOPRODUCTOXX${pagoNegociacion}LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoNegociacion}LLLTIPONEGXX${tipoGestion}LLLOCUPACIONXX${actividadEconomica}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresoBruto}LLLCUOTAPROYECTADAXX${cuotaProyectada}LLLMARCACR026XX${peorMarca}LLLOBSERVACIONESXX${observacionesActuales}TASA_NEGOCIACIONXX${tasaEA}LLL`;

        setFieldValue('f3979225-f563-48a2-a206-6b5866a7dc6c', soxActualizado);
    });
}