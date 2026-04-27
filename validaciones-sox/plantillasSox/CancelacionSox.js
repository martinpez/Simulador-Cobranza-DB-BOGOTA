function CancelacionSox() {
    //llenar campos
    let obligacion = ''
    if (document.querySelector("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0]) {
        obligacion = document.querySelector("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0].textContent
        if (obligacion == 'Seleccione un registro...') {

            obligacion = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';

        }
    } else {
        obligacion = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';
    }

    let saldoTotal = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca') || '';
    let descuentointcte = getFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8') || '';
    let descuentomora = getFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1') || '';
    let descuentoExtra = getFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7') || '';
    let descuentocapita = getFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e') || '';
    let totaldescuento = getFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d') || '';
    let pagoalSNR = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9') || '';
    let fecha = document.querySelector("#\\39 630246d-c683-4104-a141-391c9541b5cd > div > div > div.dx-texteditor-input-container > input").value
    fecha = fecha.replaceAll(/-|\//g, '');
    let execpcion = getFieldValue('e99362f1-b8da-4cca-8982-c8af8dcb5caf') || '';

    let gestionTel = getFieldValue('8235c54b-36bd-4880-a29e-fa021ff71595') || '';

    let tipoGestion = ""

    let cantDescExtra = Number(getFieldValue('a9977387-4683-4d89-9e58-851cb72f9886'));
    if (gestionTel == "Si") {
        tipoGestion = "TEL"
    } else {
        tipoGestion = "DOC"
    }

    if (cantDescExtra === 0) {
        descuentoExtra = 0;
    }
    if (descuentointcte === '') {
        descuentointcte = 0;
    }
    if (descuentocapita === '') {
        descuentocapita = 0;
    }

    // ===================== OBSERVACIONES =====================
    let observaciones = `TT GENERA CANCELACION TOTAL PARA EL CREDITO ${obligacion} CON SALDO TOTAL A LA FECHA DE ${saldoTotal} CON BAJA EN CUENTA DEL ${descuentointcte}% INTERES CORRIENTE ${descuentomora}% INTERES DE MORA, ${descuentoExtra}% EXTRACONTABLES, ${descuentocapita}% DEL CAPITAL Y BAJA EN CUENTA TOTAL DE ${totaldescuento} PARA UN PAGO TOTAL ${pagoalSNR} REALIZADOS AL SNR SE INFORMAN CONDICIONES Y RECOMENDACIONES BLOQUEO DE PRODUCTOS CON CUPO POR 120 DIAS ENTREGA DE PAZ Y SALVO EN 45 DIAS HABILES DESPUESDE APLICADO. SE LE INFORMA AL CLIENTE QUE PUEDEN QUEDAR SALDOS POR INTERESES NO FACTURADOS QUE DEBERA ASUMIR. SE LE INFORMA NEGOCIACION SUJETA A VERIFICACION, APROBACION O NEGACION POR PARTE DEL BANCO.`;


    // ===================== PLANTILLA =====================
    let plantillaSOX = `FECHAPAGOXX${fecha}LLLVALORCONSIGSNRXX${pagoalSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoalSNR}LLLTIPONEGXX${tipoGestion}LLLCUOTAPROYECTADAXXNO APLICALLLOBSERVACIONESXX${observaciones}LLLEXCEPCIONXX${execpcion}LLL`;

    setFieldValue('d4f89a7c-0207-4756-9bd7-e2e669ac3ce0', plantillaSOX);
    setFieldValue('24e68f6c-b401-40d9-bb2d-ec6d246426f9', observaciones);
}