function soxMora() {

    let producto = '';
    const sel = document.querySelector("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114");
    if (sel && sel.selectedOptions[0]) {
        producto = sel.selectedOptions[0].textContent;
        if (producto === 'Seleccione un registro...') {
            producto = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';
        }
    } else {
        producto = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';
    }

    let pagoMinimo = getFieldValue('af9911f8-4a06-4483-b25d-6bec9e1647fe') || '';
    let descIntCte = getFieldValue('e076d650-c5d6-48b1-920b-295d431604b0') || '';
    let descTotal = getFieldValue('6af98cad-1f96-4ad5-b33c-b0ddc8f68133') || '';
    let pagoSNR = getFieldValue('3539dba8-0c22-491e-a05b-84642d675d59') || '';
    let excepcion = getFieldValue('d3b8782c-c94a-4b7a-a2aa-00baba7bfbd5') || '';
    let cuotaVencida = getFieldValue('fc42583f-067a-4bd6-9985-2962d447ad0f') || '';
    let fechaPago = document.querySelector("#ee8b70aa-2712-408c-a87a-b121e20564b3 > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value.replaceAll('/', '')
    //  TEXTO BASE (PROTEGIDO)
    const observacionesBase =
        `TITULAR TOMA PAGO MORA DE CONTADO PARA EL PRODUCTO ${producto} CUYO PAGO MINIMO A LA FECHA ES DE ${pagoMinimo} DE LOS CUALES SE LE GENERARA UNA BAJA EN CUENTA DE INTERES MORATORIO DEL 100%, DE INTERES CORRIENTE DE ${descIntCte}% Y BAJA EN CUENTA TOTAL DE ${descTotal} DANDO COMO ABONO A PAGAR UN MONTO DE ${pagoSNR} EFECTIVO OFICINAS BANCO DE BOGOTA Y AL SNR SE LE INFORMA DE POLITICAS Y CONDICIONES ESTA DE ACUERDO. SE LE INFORMA NEGOCIACION SUJETA A VERIFICACION, APROBACION O NEGACION POR PARTE DEL BANCO. SE RECUERDA BLOQUEO DE PRODUCTOS CON CUPO POR 120 DIAS`;

    setFieldValue('96c93177-4705-4bd2-ac50-e304c007afa3', observacionesBase);

    // Llenar SOX inicial
    const sox = `FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX${pagoSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoSNR}LLLTIPONEGXXTELLLLCUOTAPROYECTADAXXNO APLICALLLOBSERVACIONESXX${observacionesBase}LLLEXCEPCIONXX${excepcion}LLLCUOTAVENCIDAXX${cuotaVencida}LLL`;

    setFieldValue('b24357e4-d1be-443d-8fa0-5b8790a1c508', sox);
}