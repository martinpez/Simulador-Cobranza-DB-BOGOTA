function ReflejaSoxMora() {

    const campoObs = document.getElementById('96c93177-4705-4bd2-ac50-e304c007afa3');
    if (!campoObs) return;

    campoObs.addEventListener('input', () => {

        const observacionesActuales = campoObs.value || '';

        const fechaPago = document.querySelector("#ee8b70aa-2712-408c-a87a-b121e20564b3 > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value.replaceAll('-', '')
        const honorarios = getFieldValue('ae33bcc4-183a-47de-a6c8-f4ecc44be169') || 0;
        const pagoSNR = getFieldValue('3539dba8-0c22-491e-a05b-84642d675d59') || '';
        const excepcion = getFieldValue('d3b8782c-c94a-4b7a-a2aa-00baba7bfbd5') || '';
        const cuotaVencida = getFieldValue('fc42583f-067a-4bd6-9985-2962d447ad0f') || '';

        const gestionTel = sessionStorage.GestionTelf || '';
        const tipoGestion = gestionTel == "1: Si" ? "TEL" : "DOC";

        const soxActualizado = `FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX${pagoSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX${honorarios}LLLVALORPRODUCTOXX${pagoSNR}LLLTIPONEGXX${tipoGestion}LLLCUOTAPROYECTADAXXNO APLICALLLOBSERVACIONESXX${observacionesActuales}LLLEXCEPCIONXX${excepcion}LLLCUOTAVENCIDAXX${cuotaVencida}LLL`;

        setFieldValue('b24357e4-d1be-443d-8fa0-5b8790a1c508', soxActualizado);
    });
}