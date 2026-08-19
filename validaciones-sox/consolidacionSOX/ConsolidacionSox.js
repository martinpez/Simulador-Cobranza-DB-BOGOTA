function observacionConsolidado() {
    const toggles = document.querySelectorAll('#consolidacion .toggle-switch input[type="checkbox"]');

    // Crear un arreglo para almacenar las obligaciones activas
    const obligacionesActivas = [];

    // Recorrer los toggles para encontrar los activos
    toggles.forEach((toggle) => {
        if (toggle.checked) {
            // Obtener el contenedor de la obligación
            const card = toggle.closest('.card1');

            // Extraer el número de la obligación del encabezado <h3>
            const obligacion = card.querySelector('h3').textContent.match(/Obligación: (\d+)/)[1];

            // Agregar al arreglo de obligaciones activas
            obligacionesActivas.push(obligacion);
        }
    });


    let obligacion = obligacionesActivas.join(' ');
    let plazo = getFieldValue('aa4de771-cbaf-486d-8de2-06941dc220d5') || '';
    let saldoDesembolsar = getFieldValue('69b7fc43-675b-4984-bd64-9fd68799a97b') || '';
    let porcDescuento = "100%";
    let pagoNegociacion = getFieldValue('0ee03528-b018-47d1-856b-9e30dbae2ddf') || '';
    let cuotaProyectada = getFieldValue('e74b2587-dccc-4395-8333-f6c2f34338aa') || '';
    let peorMarca = getFieldValue('183f4194-c998-41a4-9a8c-1436cc78132f')
    let observacion = `TITULAR TOMA CONSOLIDACION DE DEUDAS PARA LOS PRODUCTO TERMINADOS EN ${obligacion} A UN PLAZO DE ${plazo} MESES CUYO SALDO A DESEMBOLSAR A LA FECHA ES DE ${saldoDesembolsar} DE LOS CUALES PARA EL ABONO SE LE GENERARA UNA BAJA EN CUENTA DE INTERES MORATORIO DEL ${porcDescuento} DE INTERES CORRIENTE DE ${porcDescuento} DE EXTRACONTABLES (SI APLICA)${porcDescuento} DANDO VALOR A PAGAR DE ${pagoNegociacion} CUOTA APROXIMADA DE ${cuotaProyectada} MAS SEGUROS PAGO AL PRODUCTO CABEZA DE MORA SE LE INFORMA DE POLITICAS Y CONDICIONES ESTA DE ACUERDO SE LE INFORMA NEGOCIACION SUJETA A VERIFICACION APROBACION O NEGACION POR PARTE DEL BANCO`

    setFieldValue('be70a202-71a9-40ea-851b-945702693b51', observacion)

    let fechaPago = document.querySelector("#\\33 9505284-3650-4303-b564-747e7dd3a8e9 > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value
    fechaPago = fechaPago.replaceAll('/', '')
    let gestionTel = getFieldValue('8235c54b-36bd-4880-a29e-fa021ff71595') || '';
    let actividadEconomica = document.querySelector("#c852f2a7-6f9c-48f6-96b5-6fdc26c399ef").selectedOptions[0].textContent;

    if (actividadEconomica == 'Seleccione un registro...') {
        actividadEconomica = ''
    }

    let ingresoBruto = getFieldValue('67631aed-75e4-4b23-8601-17cadd1c7003') || '';
    let tasaEA = getFieldValue('c9f5317e-9099-43f1-9b7f-78b93d99aa6a') * 100;

    let tipoGestion = ""

    if (gestionTel == "Si") {
        tipoGestion = "TEL"
    } else {
        tipoGestion = "DOC"
    }

    let Gestion = `FECHAPAGOXX${fechaPago}LLLVALORCONSIGSNRXX0LLLVALORPAGOPRODUCTOXX${pagoNegociacion}LLLVALORHONORARIOSXX0LLLVALORPRODUCTOXX${pagoNegociacion}LLLTIPONEGXX${tipoGestion}LLLOCUPACIONXX${actividadEconomica}LLLSALARIOPENSIONOINGRESOBRUTOXX${ingresoBruto}LLLCUOTAS MENSUALESSECTOR FINANCIEROXX0LLLINGRESOSADICIONALESXXNO REFIERELLLOCUPACIONINGRESOS ADICIONALESXXNO REFIERE INGRESOS ADICIONALESLLLCUOTAPROYECTADAXX${cuotaProyectada}LLLCAPACIDADPAGOXXVIABLELLLPERIODOMUERTOXX0LLLPERIODODEGRACIAXXNOAPLICALLLMARCACR026XX${peorMarca}LLLOBSERVACIONESXX${observacion}OBSERVACIONESXX0TASA_NEGOCIACIONXX${tasaEA}LLL`
    setFieldValue('f3979225-f563-48a2-a206-6b5866a7dc6c', Gestion)
}