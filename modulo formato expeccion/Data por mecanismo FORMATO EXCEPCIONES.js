function llenarFormatoExcepcionesVacio() {
}

async function llenarFormatoExcepciones() {
    const dropdown = kendo.jQuery("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").data('kendoDropDownList');
    const obligacion = dropdown ? dropdown.dataItem() : null;

    const mecanismo = sessionStorage.mecanismo || '';

    const idTipoDoc = '15fb0de1-4989-4986-a662-61fb88b3aba1';
    const idNumeroId = '75fda36b-9317-4062-93d7-26d45e6188d6';
    const idNumeroObligacion = 'c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0';

    const idsEdadMora = {
        novacion: '0cb35f96-ddc9-40e7-b948-8f0d4d86bf79'
    };

    const idsTipoProducto = {
        novacion: '46155d51-2885-490a-8a71-d75a35da95b4',
        pagomora: '9ccfa8bd-4060-4aa1-b437-4528d6f9bc35',
        cancelacion: '8e8d6cf2-299c-4b45-8059-64cf50b2bd11',
        ampliacion: '8e1dc11f-e65c-4141-a1d5-42850fd9b214'
    };

    const idsPorMecanismo = {
        consolidacion: {
            plazo: 'aa4de771-cbaf-486d-8de2-06941dc220d5',
            tasaEA: 'c9f5317e-9099-43f1-9b7f-78b93d99aa6a',
            fechaPago: '39505284-3650-4303-b564-747e7dd3a8e9',
            valorPago: '0ee03528-b018-47d1-856b-9e30dbae2ddf',
            valorPropuesta: '0ee03528-b018-47d1-856b-9e30dbae2ddf',
            honorarios: '4f89c370-65c2-43d8-90aa-6b3e3b29906b',
            marcaObl: '183f4194-c998-41a4-9a8c-1436cc78132f',
            saldoTotal: '69b7fc43-675b-4984-bd64-9fd68799a97b',
            pctCastigoIntCte: 'b42b41d8-cd57-4233-9bff-8a5ceec5af03',
            valorCastigoIntCte: '04dbcb19-8f74-4eac-81f3-6bcc76cd7f9a',
            pctCastigoIntMora: 'e079d101-5148-42ed-854e-9be982adc01e',
            valorCastigoIntMora: 'f848cad9-f94d-4e56-9468-863a2a55e402',
            pctCastigoExtrac: 'e970af6e-de8d-47b3-97d0-98e4950c9bdf',
            valorCastigoExtrac: 'dc9166ce-a5c8-4fc7-ad2b-4c6479d63f12'
        },
        novacion: {
            plazo: '9382c5a1-0445-4ed9-a785-850d06da2cd2',
            tasaEA: '0c009370-356b-461e-b19e-b510e82cef35',
            fechaPago: '5c6f6251-9091-496a-966a-9bf0fb0eedcf',
            valorPago: '92bcba6d-4dab-459e-bd8f-164da7eeb526',
            valorPropuesta: '92bcba6d-4dab-459e-bd8f-164da7eeb526',
            honorarios: '075c9be0-baad-48b2-864d-acae840b7256',
            saldoTotal: '616e6102-56e5-48e9-bfc2-fce8497e629d',
            interesCorriente: 'e2c2ca76-e568-413d-8aac-b7bd2c3b9f52',
            interesMora: 'ce31f456-c5d9-4476-a56f-f5f44d2c8827',
            interesesExtracontables: 'a710006e-72a9-4388-84ed-cc3b743ef45f',
            otrosCargos: '51440ec8-1f3c-49fa-8672-15870130cb90',
            pctCastigoIntCte: null,
            valorCastigoIntCte: 'e2c2ca76-e568-413d-8aac-b7bd2c3b9f52',
            pctCastigoIntMora: null,
            valorCastigoIntMora: 'ce31f456-c5d9-4476-a56f-f5f44d2c8827',
            pctCastigoExtrac: null,
            valorCastigoExtrac: 'a710006e-72a9-4388-84ed-cc3b743ef45f'
        },
        pagomora: {
            fechaPago: 'ee8b70aa-2712-408c-a87a-b121e20564b3',
            valorPago: 'af9911f8-4a06-4483-b25d-6bec9e1647fe',
            honorarios: 'ae33bcc4-183a-47de-a6c8-f4ecc44be169',
            pagoSNR: '3539dba8-0c22-491e-a05b-84642d675d59',
            valorPropuesta: '3539dba8-0c22-491e-a05b-84642d675d59',
            interesCorriente: '9b3ac68c-68ff-4928-864d-906e9d851621',
            interesMora: 'c13b3910-1960-422f-835d-7ea89982f8b6',
            interesesExtracontables: 'aef7fd98-0a00-4ec8-95d9-37840df1fe67',
            pctCastigoIntCte: 'e076d650-c5d6-48b1-920b-295d431604b0',
            valorCastigoIntCte: '49ed37fa-10f7-46d1-b2d3-bd4e28bef0db',
            pctCastigoIntMora: '64fcdf9f-c6b3-4742-b4b2-e259759290d9',
            valorCastigoIntMora: 'db8c0e77-0029-4bf9-ba9a-ebc141721c33',
            pctCastigoExtrac: '0456eeb3-8809-48a5-8726-87e416efdcb3',
            valorCastigoExtrac: 'a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8'
        },
        cancelacion: {
            fechaPago: '9630246d-c683-4104-a141-391c9541b5cd',
            honorarios: 'a0a2b9b0-17cc-41fe-be98-2ac2157e33ef',
            pagoSNR: 'b5c33a6d-9d65-4920-8a39-e73621b7daa9',
            valorPropuesta: 'b5c33a6d-9d65-4920-8a39-e73621b7daa9',
            saldoTotal: 'f47f1a89-6743-4f60-9cf6-0696e6c841ca',
            capitalTotal: '9dc154b0-5d64-4682-a76d-5e946415c253',
            interesCorriente: '48f8260e-5e81-43d3-b69c-d94808cb229e',
            interesMora: 'd85c85c3-2a7c-44db-b240-2420990d7375',
            interesesExtracontables: 'a9977387-4683-4d89-9e58-851cb72f9886',
            pctCastigoIntCte: 'bcfd54b6-d1cf-40dc-8677-686652eedbb8',
            valorCastigoIntCte: '86f86bd7-d119-4d2a-a6c0-e711b1d835a6',
            pctCastigoIntMora: '433ffa22-78e7-4004-be47-2b0ccf497ad1',
            valorCastigoIntMora: 'a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115',
            pctCastigoExtrac: 'a724067d-e7bf-435c-94ac-bf44f72575e7',
            valorCastigoExtrac: '8ea64929-53a9-41b4-a01f-a14b74293d01',
            pctCastigoCapital: 'aa7aeaf3-6bc8-4939-9896-212d5efcd93e',
            valorCastigoCapital: '60bebeab-d3ca-4547-9eff-00cc8db69b82'
        },
        ampliacion: {
            plazo: 'f43686aa-8f4e-4203-9733-b483660e6ab1',
            tasaEA: '1540984f-2b52-4a6f-8b34-01236dfd291c',
            fechaPago: '3d0f4be2-1bb6-446c-9ebb-b38a7eba0d5c',
            honorarios: 'e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b',
            pagoSNR: '44770cdb-4d75-4b2a-957f-400410e65e8d',
            valorPropuesta: '44770cdb-4d75-4b2a-957f-400410e65e8d',
            capitalTotal: '12671e00-a829-472f-b644-be49ea7ebdbf',
            otrosCargos: 'e64cbac2-f6de-49eb-a9ec-79695d0e655a',
            intGastosNoFact: 'c54e9fde-a861-4446-ab8e-37b4473d231b',
            interesCorriente: '70101be7-9330-44e4-913c-e6772c5b8167',
            interesMora: 'aea118a4-8a99-4d3a-adf9-ffd5151db4f6',
            pctCastigoIntCte: 'd8e6669a-3079-4248-88d5-5f01cca53106',
            valorCastigoIntCte: '15a75d66-7dc0-4e25-b3e3-213a984a22fe',
            pctCastigoIntMora: '4f9627f2-7ada-415b-bf0c-cf308407c82a',
            valorCastigoIntMora: 'e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2'
        }
    };

    const idsMecanismo = idsPorMecanismo[mecanismo] || {};

    function valorConFallback(idMecanismo, campoDataItem) {
        if (idMecanismo) {
            const valor = getFieldValue(idMecanismo);
            if (valor !== null && valor !== undefined && valor !== '') {
                return valor;
            }
        }
        if (obligacion && campoDataItem && obligacion[campoDataItem] != null) {
            return obligacion[campoDataItem];
        }
        return '';
    }

    function leerTextoSelect(id) {
        if (!id) return '';
        const el = document.getElementById(id);
        if (el) {
            const widget = window.kendo ? kendo.widgetInstance(kendo.jQuery(el)) : null;
            if (widget && typeof widget.text === 'function') {
                return widget.text() || '';
            }
            if (el.tagName === 'SELECT' && el.selectedIndex >= 0) {
                const opcionSeleccionada = el.options[el.selectedIndex];
                if (opcionSeleccionada) return opcionSeleccionada.text.trim() || '';
            }
        }
        return getFieldValue(id) || '';
    }

    function comoFraccion(valor) {
        const num = parseFloat(valor);
        if (isNaN(num)) return 0;
        return num / 100;
    }

    function leerCampoSeguro(id) {
        if (!id) { return ''; }
        return getFieldValue(id);
    }

    function formatearFecha(valor) {
        if (!valor) return '';
        if (valor instanceof Date) {
            const y = valor.getFullYear();
            const m = String(valor.getMonth() + 1).padStart(2, '0');
            const d = String(valor.getDate()).padStart(2, '0');
            return y + '-' + m + '-' + d;
        }
        return valor;
    }

    function formatearMarca026(valor) {
        const mapa = {
            'MODIFICADO': 'M',
            'PERFILADO': 'P',
            'SIN MARCA': 'SM',
            'REESTRUCTURADO': 'R'
        };
        const clave = (valor || '').trim().toUpperCase();
        return mapa[clave] || valor;
    }

    let valorHonorarios;
    if (sessionStorage.getItem('UserCargado') === 'si' && obligacion && obligacion.CustomNumber1) {
        valorHonorarios = obligacion.CustomNumber1;
    } else {
        valorHonorarios = leerCampoSeguro(idsMecanismo.honorarios) || 0;
    }

    const grupo = valorConFallback(null, 'Grupo');
    const areaGestion = (grupo || '').trim().toUpperCase() === 'TEMPRANA' ? 'TEMPRANA' : '';
    const fechaCastigo = areaGestion === 'JURIDICO' ? '' : '1900-01-01';
    const hoy = new Date();
    const fecha = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0');

    const idEdadMora = idsEdadMora[mecanismo];

    // TIPO_PRODUCTO: el campo del mecanismo puede traer el codigo (ej. "0044") o el nombre (ej. "Credito Libre Destino")
    // segun el mecanismo; se intenta primero por codigo, y si no hay match, por nombre
    let tipoProductoFormateado = '';
    const codigoTipoProducto = leerTextoSelect(idsTipoProducto[mecanismo]);
    if (codigoTipoProducto) {
        try {
            let respuestaProducto = await execQuery("SELECT ConsolidadoLineaProducto FROM SimiladorDNC_Lappiz_LineaProducto WHERE CodCodigo = '" + codigoTipoProducto + "'");
            if (!respuestaProducto || !respuestaProducto[0] || !respuestaProducto[0][0]) {
                respuestaProducto = await execQuery("SELECT ConsolidadoLineaProducto FROM SimiladorDNC_Lappiz_LineaProducto WHERE NomProductos = '" + codigoTipoProducto + "'");
            }
            if (respuestaProducto && respuestaProducto[0] && respuestaProducto[0][0]) {
                tipoProductoFormateado = respuestaProducto[0][0].ConsolidadoLineaProducto;
            } else {
                tipoProductoFormateado = codigoTipoProducto;
            }
        } catch (error) {
            console.error('llenarFormatoExcepciones: error resolviendo nombre de producto', error);
            tipoProductoFormateado = codigoTipoProducto;
        }
    }

    const datosNegociacion = {
        MECANISMO: mecanismo,
        TIPO_ID: getFieldValue(idTipoDoc) || '',
        NUMERO_ID: getFieldValue(idNumeroId) || '',
        FECHA_NEGOCIACION: fecha,
        AREA_GESTION: areaGestion,
        AGENCIA: grupo || '',
        NUMERO_OBLIGACION: getFieldValue(idNumeroObligacion) || (obligacion ? obligacion.Obligacion : '') || '',
        TIPO_OBLIGACION: valorConFallback(null, 'Producto'),
        TIPO_PRODUCTO: tipoProductoFormateado,
        FECHA_CASTIGO: fechaCastigo,
        EDAD_MORA: idEdadMora ? (getFieldValue(idEdadMora) || '') : valorConFallback(null, 'DiasMoraObl'),
        PLAZO: leerTextoSelect(idsMecanismo.plazo),
        CAPITAL_VENCIDO: valorConFallback(null, 'CapitalTotalObl'),
        CAPITAL_TOTAL: valorConFallback(idsMecanismo.capitalTotal, 'CapitalTotalObl'),
        INTERES_CORRIENTE: valorConFallback(idsMecanismo.interesCorriente, 'InteresCteObl'),
        INTERES_MORA: valorConFallback(idsMecanismo.interesMora, 'InteresMoraObl'),
        INTERESES_EXTRACONTABLES: valorConFallback(idsMecanismo.interesesExtracontables, 'InteresesExtracontablesObl'),
        OTROS_CARGOS: valorConFallback(idsMecanismo.otrosCargos, 'OtrosCargosExigibles'),
        SALDO_TOTAL: valorConFallback(idsMecanismo.saldoTotal, 'SaldoTotalObl'),
        TASA_INTERES_EA: comoFraccion(valorConFallback(idsMecanismo.tasaEA, 'TasaInteresEaIcs')),
        MARCA_C026: formatearMarca026(valorConFallback(idsMecanismo.marcaObl, 'MarcaObl026')),
        // FECHA_PROMESA_DE_PAGO recibe la fecha real del mecanismo; FECHA_PAGO se deja vacia (se llena manualmente cuando se confirme el pago real)
        FECHA_PROMESA_DE_PAGO: formatearFecha(leerCampoSeguro(idsMecanismo.fechaPago)),
        FECHA_PAGO: '',
        VALOR_PAGO: leerCampoSeguro(idsMecanismo.valorPago) || '',
        VALOR_PROPUESTA: leerCampoSeguro(idsMecanismo.valorPropuesta) || '',
        PAGO_SNR: leerCampoSeguro(idsMecanismo.pagoSNR) || '',
        VALOR_HONORARIOS: valorHonorarios,
        PCT_CASTIGO_INT_CTE: idsMecanismo.pctCastigoIntCte ? comoFraccion(leerCampoSeguro(idsMecanismo.pctCastigoIntCte)) : 1,
        VALOR_CASTIGO_INT_CTE: leerCampoSeguro(idsMecanismo.valorCastigoIntCte) || '',
        PCT_CASTIGO_INT_MORA: idsMecanismo.pctCastigoIntMora ? comoFraccion(leerCampoSeguro(idsMecanismo.pctCastigoIntMora)) : 1,
        VALOR_CASTIGO_INT_MORA: leerCampoSeguro(idsMecanismo.valorCastigoIntMora) || '',
        PCT_CASTIGO_EXTRAC: idsMecanismo.pctCastigoExtrac ? comoFraccion(leerCampoSeguro(idsMecanismo.pctCastigoExtrac)) : 1,
        VALOR_CASTIGO_EXTRAC: leerCampoSeguro(idsMecanismo.valorCastigoExtrac) || '',
        PCT_CASTIGO_CAPITAL: comoFraccion(leerCampoSeguro(idsMecanismo.pctCastigoCapital)),
        VALOR_CASTIGO_CAPITAL: leerCampoSeguro(idsMecanismo.valorCastigoCapital) || '',
        INT_GASTOS_NOFACT: valorConFallback(idsMecanismo.intGastosNoFact, 'IntGastosNofact'),
        DETALLE_PROPUESTA: '' // se construye del lado del formulario de destino, en poblarCamposFormatoExcepciones
    };

    localStorage.setItem('datosNegociacionFE', JSON.stringify(datosNegociacion));
    console.log('Formato de Excepciones: datos guardados en localStorage', datosNegociacion);
}