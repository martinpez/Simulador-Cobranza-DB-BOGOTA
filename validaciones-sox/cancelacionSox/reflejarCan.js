function reflejarSoxCancelacion() {
    const campoObs = document.getElementById('24e68f6c-b401-40d9-bb2d-ec6d246426f9');
    if (!campoObs) return;

    campoObs.addEventListener('input', () => {

        const obsActual = campoObs.value || '';

        let fecha = document.querySelector("#\\39 630246d-c683-4104-a141-391c9541b5cd > div > div > div.dx-texteditor-input-container > input").value
        fecha = fecha.replaceAll('-', '');

        let pagoalSNR = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9') || '';
        let execpcion = getFieldValue('e99362f1-b8da-4cca-8982-c8af8dcb5caf') || '';
        let gestionTel = sessionStorage.GestionTelf || '';
        let tipoGestion = gestionTel === "1: Si" ? "TEL" : "DOC";
        let soxActualizado = `FECHAPAGOXX${fecha}LLLVALORCONSIGSNRXX${pagoalSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoalSNR}LLLTIPONEGXX${tipoGestion}LLLCUOTAPROYECTADAXXNOAPLICALLLOBSERVACIONESXX${obsActual}LLLEXCEPCIONXX${execpcion}LLL`;

        setFieldValue('d4f89a7c-0207-4756-9bd7-e2e669ac3ce0', soxActualizado);
    });
}