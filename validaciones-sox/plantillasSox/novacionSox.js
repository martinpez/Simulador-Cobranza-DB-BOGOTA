function llenarCampos() {

    let plazoAut = '';
    let comprasAut = '';
    let producto = sessionStorage.Obl;
    let obligacion = '';

    //llenar campo observacione
    // if la obligacion llega vacia y coloque undefined no genere errores por undefined
    if (obligacion == undefined) {
        obligacion = '';
    } else {
        obligacion = document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value === "" ? document.getElementById("caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0]?.innerText || '' : document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value;
    }
    // 
    let saldoDiferir = getFieldValue("c6923383-8eec-4efe-81a5-954ce52b8882") || '';
    let campoCompras = document.querySelector("#\\35 822926e-f256-4631-b01f-c63de416f711").selectedOptions[0].textContent;
    let plazo = document.querySelector("#\\39 382c5a1-0445-4ed9-a785-850d06da2cd2").selectedOptions[0].textContent;


    if (campoCompras == 'Seleccione un registro') {
        campoCompras = ''
    } else {
        plazoAut = campoCompras.slice(6, 8).replaceAll(' ', '');
        //plazo = plazo.slice(1,2).replaceAll(' ','');
        comprasAut = campoCompras.slice(1, 3);
    }

    //let tasa = document.querySelector("#\\39 1d24002-ea79-468e-8375-8fee8964b2f8").selectedOptions[0].textContent;
    let tasa = getFieldValue("b76668b5-0710-4eee-9718-a2633605c35e") || '';


    if (tasa == 'Seleccione un registro...') {
        tasa = ''
    }

    let cuotaProyectada = getFieldValue("d157fb29-fd6f-450b-b637-8fa18c824cd2") || '';
    let pagoNegociacion = getFieldValue("92bcba6d-4dab-459e-bd8f-164da7eeb526") || '';
    let fechaPago = document.querySelector("#\\35 c6f6251-9091-496a-966a-9bf0fb0eedcf > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value;
    let fechaPago2 = fechaPago.replaceAll('-', '');

    let codigoExp = getFieldValue('e1c2af3d-be0b-45ea-b91c-9add93cbf7f9')

    if (codigoExp == '   ') {
        codigoExp = 0
    } else if (codigoExp == 'Seleccione un registro') {
        codigoExp = ''
    }

    let actividadEconomica = document.querySelector("#\\31 3a8a1c2-3026-481b-bddb-d62c2f321d2c").selectedOptions[0].textContent;

    if (actividadEconomica == 'Seleccione un registro...') {
        actividadEconomica = ''
    }

    let ingresoBruto = getFieldValue('e1b74a38-af43-4dbe-ae4e-8430eda34573') || '';
    let ingresosAd = getFieldValue('3f181299-b8fb-437e-aaa1-e21af8c747d1') || '';

    let ocupacionIngresosAd = document.querySelector("#\\31 0d62ee5-6dc2-4452-9a91-e8acae95a3d3").selectedOptions[0].textContent;

    if (ocupacionIngresosAd == 'Seleccione un registro...') {
        ocupacionIngresosAd = ''
    }

    let coutaBDB = getFieldValue('6bf36825-81e3-4383-8f78-ae13c7c394c6') || '';
    let marca = document.querySelector("#\\38 676efb4-1857-48d2-b604-8c4e23917fd0").selectedOptions[0].textContent;
    if (marca == 'Seleccione un registro...') {
        marca = ''
    } else {
        const match = marca.match(/\((.)\)/); // Busca un solo carácter dentro de paréntesis
        marca = match ? match[1] : '';
    }

    let observaciones = `TITULAR TOMA NOVACION DE SALDO TOTAL PARA SU TC ${obligacion} CUYO SALDO TOTAL ES DE $${saldoDiferir} ESTO DISPUESTO A UN PLAZO DE ${plazo} MESES, CON ${tasa} NMV QUE LE GENERA UNA CUOTA APROXIMADA POR $${cuotaProyectada} SIN INCLUIR CUOTA DE MANEJO SEGURO O NUEVOS USOS. ACEPTA NOVACION CON ABONO DE $${pagoNegociacion} REALIZADO EL ${fechaPago} LA ALTERNATIVA QUEDA SUJETA A VERIFICACION, APROBACION O NEGACION POR PARTE DEL BANCO.`;

    let plantillaSOX = `FECHAPAGOXX${fechaPago2}LLLCOMPRASAUTXX${comprasAut}LLLPLAZOAUTXX${plazoAut}LLLCODEXCXX${codigoExp}LLLOCUPACIONXX${actividadEconomica}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresoBruto}LLINGRESOSADICIONALESXX${ocupacionIngresosAd}LLLOCUPACIONINGRESOS ADICIONALESXX${ingresosAd}LLLCUOTAS MENSUALESSECTOR FINANCIEROXX${coutaBDB}LLLMARCACR026XX${marca}LLLOBSERVACIONESXX${observaciones}LLL`

    setFieldValue('07b4e087-95c8-4867-b91f-1f9e9a4a1ea0', plantillaSOX)

    setFieldValue('637cda5e-a8da-499a-98be-564521dd6c25', observaciones)
}