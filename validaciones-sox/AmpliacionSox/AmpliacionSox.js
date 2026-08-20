function soxAmpliacion() {

    let producto = '';
    if (document.querySelector("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0]) {
        producto = document.querySelector("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114")
            .selectedOptions[0].textContent;

        if (producto == 'Seleccione un registro...') {
            producto = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';
        }
    } else {
        producto = getFieldValue('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0') || '';
    }
    let honorarios = getFieldValue('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b') || 0;
    let plazo = getFieldValue('f43686aa-8f4e-4203-9733-b483660e6ab1') || '';
    let capital = getFieldValue('12671e00-a829-472f-b644-be49ea7ebdbf') || '';
    let intMora = getFieldValue('4f9627f2-7ada-415b-bf0c-cf308407c82a') || '';
    let intCte = getFieldValue('d8e6669a-3079-4248-88d5-5f01cca53106') || '';
    let pagoSNR = getFieldValue('44770cdb-4d75-4b2a-957f-400410e65e8d') || '';
    let cuotaPro = getFieldValue('2edec98b-a7b5-49a8-8cae-623f05fe0cd5') || '';
    let fechaPago = document.querySelector(
        "#\\33 d0f4be2-1bb6-446c-9ebb-b38a7eba0d5c > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input"
    ).value.replaceAll('/', '') || '';

    let ocupacion = document.querySelector("#\\35 1550b53-1a9f-49cd-8274-abd718d04b51")
        .selectedOptions[0]?.textContent || '';

    let ingresobruto = getFieldValue('f51fe08e-3b3b-4064-9ae0-fb9584fd93b3') || '';
    let cuotaSinBdb = getFieldValue('e637400b-996d-45b2-bccd-a360dcbc6fa7') || '';
    let ingAdicionales = getFieldValue('ee3c91d9-9f6c-4ea5-bd31-047686ce4c76') || '';

    let ocupacionIngA = document.querySelector("#\\33 a3c6541-bfed-459a-9a8d-608eebb2ad63")
        .selectedOptions[0]?.textContent || '';

    let marcaOB = document.querySelector("#\\38 676efb4-1857-48d2-b604-8c4e23917fd0")
        .selectedOptions[0].textContent;

    let excepcion = getFieldValue('13719b60-17be-4c9f-a190-d6fe27ab12f6') || '';

    if (marcaOB == 'Seleccione un registro...') {
        marcaOB = '';
    } else {
        marcaOB = marcaOB.split('(')[1].split(')')[0];
    }

    if (ocupacion == 'Seleccione un registro...') {
        ocupacion = '';
    }

    if (ocupacionIngA == 'Seleccione un registro...') {
        ocupacionIngA = '';
    }

    let tasa = getFieldValue('1540984f-2b52-4a6f-8b34-01236dfd291c') || '';
    let gestionTel = sessionStorage.GestionTelf || '';

    let tipoGestion = gestionTel == "1: Si" ? "TEL" : "DOC";


    // ===================== OBSERVACIONES =====================
    let observaciones = `TITULAR TOMA AMPLIACION DE PLAZO PARA EL PRODUCTO ${producto} A UN PLAZO DE ${plazo} MESES. CUYO CAPITAL TOTAL A LA FECHA ES DE ${capital} DE LOS CUALES PARA EL ABONO SE LE GENERARA UNA BAJA EN CUENTA DE INTERES MORATORIO DEL ${intMora} DE INTERES CORRIENTE DE ${intCte} DANDO VALOR A PAGAR DE ${pagoSNR}, CUOTA APROXIMADA DE ${cuotaPro} MAS SEGUROS . ABONO EN EFECTIVO OFICINAS BANCO DE BOGOTA Y AL SNR SE LE INFORMA DE POLITICAS Y CONDICIONES. ESTA DE ACUERDO. SE LE INFORMA NEGOCIACION SUJETA A VERIFICACION, APROBACION O NEGACION POR PARTE DEL BANCO.`;


    let plantillaSOX = `FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX${pagoSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX${honorarios}LLLVALORPRODUCTOXX${pagoSNR}LLLTIPONEGXX${tipoGestion}LLLCUOTAPROYECTADAXX${cuotaPro}LLLCUOTASMENSUALESSECTORFINANCIEROXXLLOCUPACIONXX${ocupacion}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresobruto}LLLCUOTASMENSUALESSECTORFINANCIEROXX${cuotaSinBdb}LLLINGRESOSADICIONALESXX${ingAdicionales}LLLOCUPACIONINGRESOSADICIONALESXX${ocupacionIngA}LLLCAPACIDADPAGOXXVIABLELLLPERIODODEGRACIAXX0LLLMARCACR026XX${marcaOB}LLLOBSERVACIONESXX${observaciones}LLLEXCEPCIONXX${excepcion}LLLCUOTAVENCIDAXX0LLLTASANEGOCIACIONXXLLL${tasa}LLL`;

    setFieldValue('eec3136d-46bf-438c-b7cc-4aaa5fba776b', plantillaSOX);
    setFieldValue('68d8ce24-c9fd-440b-995a-7ff027f628b6', observaciones);
    // delete sessionStorage.Obl;
}