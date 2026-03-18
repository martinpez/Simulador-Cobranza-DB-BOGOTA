
  // Guardamos base protegida
  sessionStorage.obsBaseMora = observacionesBase;

function ReflejaSoxMora(){

  const campoObs = document.getElementById('96c93177-4705-4bd2-ac50-e304c007afa3');
  if (!campoObs) return;

  campoObs.addEventListener('input', () => {

    const observacionesActuales = campoObs.value || '';

    const fechaPago = document.querySelector(
      "#ee8b70aa-2712-408c-a87a-b121e20564b3 input"
    ).value.replaceAll('/','');

    const pagoSNR      = getFieldValue('3539dba8-0c22-491e-a05b-84642d675d59') || '';
    const excepcion    = getFieldValue('d3b8782c-c94a-4b7a-a2aa-00baba7bfbd5') || '';
    const cuotaVencida = getFieldValue('fc42583f-067a-4bd6-9985-2962d447ad0f') || '';

 
    const soxActualizado =`FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX${pagoSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoSNR}LLLTIPONEGXXTELLLLCUOTAPROYECTADAXXNO APLICALLLOBSERVACIONESXX${observacionesActuales}LLLEXCEPCIONXX${excepcion}LLLCUOTAVENCIDAXX${cuotaVencida}LLL`;

    setFieldValue('b24357e4-d1be-443d-8fa0-5b8790a1c508', soxActualizado);
  });
}

function reflejarSoxConsolidado(){

  const campoObs = document.getElementById('be70a202-71a9-40ea-851b-945702693b51');
  if (!campoObs) return;

  campoObs.addEventListener('input', () => {

    const observacionesActuales = campoObs.value || '';

    let fechaPago = document
      .querySelector("#\\33 9505284-3650-4303-b564-747e7dd3a8e9 input")
      .value.replaceAll('/','');

    let pagoNegociacion = getFieldValue('0ee03528-b018-47d1-856b-9e30dbae2ddf') || '';
    let cuotaProyectada = getFieldValue('e74b2587-dccc-4395-8333-f6c2f34338aa') || '';
    let peorMarca = getFieldValue('183f4194-c998-41a4-9a8c-1436cc78132f') || '';
    let gestionTel = getFieldValue('8235c54b-36bd-4880-a29e-fa021ff71595') || '';
    let tipoGestion = gestionTel === "Si" ? "TEL" : "DOC";

    let actividadEconomica =
      document.querySelector("#c852f2a7-6f9c-48f6-96b5-6fdc26c399ef")
      ?.selectedOptions[0]?.textContent || '';

    if (actividadEconomica === 'Seleccione un registro...') actividadEconomica = '';

    let ingresoBruto = getFieldValue('67631aed-75e4-4b23-8601-17cadd1c7003') || '';
    let tasaEA = (getFieldValue('c9f5317e-9099-43f1-9b7f-78b93d99aa6a') || 0) * 100;

    let soxActualizado =`FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX0LLLVALORPAGOPRODUCTOXX${pagoNegociacion}LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoNegociacion}LLLTIPONEGXX${tipoGestion}LLLOCUPACIONXX${actividadEconomica}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresoBruto}LLLCUOTAPROYECTADAXX${cuotaProyectada}LLLMARCACR026XX${peorMarca}LLLOBSERVACIONESXX${observacionesActuales}TASA_NEGOCIACIONXX${tasaEA}LLL`;

    setFieldValue('f3979225-f563-48a2-a206-6b5866a7dc6c', soxActualizado);
  });
}

function reflejarSoxNovacion(){

  const campoObs = document.getElementById('637cda5e-a8da-499a-98be-564521dd6c25');
  if (!campoObs) return;

  campoObs.addEventListener('input', () => {

    const obsActual = campoObs.value || '';

    let fechaPago =
      document.querySelector("#\\35 c6f6251-9091-496a-966a-9bf0fb0eedcf input")
        .value.replaceAll('/','');

    let comprasAut = '';
    let plazoAut = '';
    let campoCompras =
      document.querySelector("#\\35 822926e-f256-4631-b01f-c63de416f711")
        .selectedOptions[0].textContent;

    if (campoCompras !== 'Seleccione un registro') {
      plazoAut = campoCompras.slice(6,8).trim();
      comprasAut = campoCompras.slice(1,3);
    }

    let codigoExp = getFieldValue('e1c2af3d-be0b-45ea-b91c-9add93cbf7f9') || '';
    let actividadEconomica =
      document.querySelector("#\\31 3a8a1c2-3026-481b-bddb-d62c2f321d2c")
        .selectedOptions[0].textContent || '';

    let ingresoBruto = getFieldValue('e1b74a38-af43-4dbe-ae4e-8430eda34573') || '';
    let ingresosAd = getFieldValue('3f181299-b8fb-437e-aaa1-e21af8c747d1') || '';
    let coutaBDB = getFieldValue('6bf36825-81e3-4383-8f78-ae13c7c394c6') || '';
    let marca =
      document.querySelector("#\\38 676efb4-1857-48d2-b604-8c4e23917fd0")
        .selectedOptions[0].textContent || '';

    let soxActualizado =`FECHAPAGOXX${fechaPago}LLLCOMPRASAUTXX${comprasAut}LLLPLAZOAUTXX${plazoAut}LLLCODEXCXX${codigoExp}LLLOCUPACIONXX${actividadEconomica}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresoBruto}LLINGRESOSADICIONALESXX${ingresosAd}LLLCUOTAS MENSUALESSECTOR FINANCIEROXX${coutaBDB}LLLMARCACR026XX${marca}LLLOBSERVACIONESXX${obsActual}LLL`;
    setFieldValue('07b4e087-95c8-4867-b91f-1f9e9a4a1ea0', soxActualizado);
  });
}

function reflejarSoxCancelacion(){

  const campoObs = document.getElementById('24e68f6c-b401-40d9-bb2d-ec6d246426f9');
  if (!campoObs) return;

  campoObs.addEventListener('input', () => {

    const obsActual = campoObs.value || '';

    let fecha =
      document.querySelector("#\\39 630246d-c683-4104-a141-391c9541b5cd input")
        ?.value.replaceAll('/','') || '';

    let pagoalSNR = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9') || '';
    let execpcion = getFieldValue('e99362f1-b8da-4cca-8982-c8af8dcb5caf') || '';
    let gestionTel = getFieldValue('8235c54b-36bd-4880-a29e-fa021ff71595') || '';
    let tipoGestion = gestionTel === "Si" ? "TEL" : "DOC";

    let soxActualizado =`FECHAPAGOXX${fecha}LLLVALORCONSIGSNRXX${pagoalSNR}LLLVALORPAGOPRODUCTOXX0LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoalSNR}LLLTIPONEGXX${tipoGestion}LLLCUOTAPROYECTADAXXNO APLICALLLOBSERVACIONESXX${obsActual}LLLEXCEPCIONXX${execpcion}LLL`;

    setFieldValue('d4f89a7c-0207-4756-9bd7-e2e669ac3ce0', soxActualizado);
  });
}

    function ReflejarSoxAmpliacion(){
    let observaciones = 
        getFieldValue('68d8ce24-c9fd-440b-995a-7ff027f628b6') || '';

    let plantillaSOX = 
        getFieldValue('eec3136d-46bf-438c-b7cc-4aaa5fba776b') || '';

    if(!plantillaSOX) return;

    // Reemplaza solo el bloque de observaciones dentro del SOX
    plantillaSOX = plantillaSOX.replace(
        /LLLOBSERVACIONESXX[\s\S]*?LLL/,
        `LLLOBSERVACIONESXX${observaciones}LLL`
    );

    setFieldValue('eec3136d-46bf-438c-b7cc-4aaa5fba776b', plantillaSOX);
    }
