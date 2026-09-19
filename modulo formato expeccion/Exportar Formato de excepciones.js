function exportarExcelFormatoExcepciones() {
    function generarArchivo() {
        const columnas = [
            { nombre: 'MECANISMO', id: 'f707a4ad-ebde-49d9-914c-27406b8fb8eb' },
            { nombre: 'TIPO_ID', id: '8053b8b4-9a2b-47b4-9b6d-8faa3986b32c' },
            { nombre: 'NUMERO_ID', id: 'c2e7dd61-3c3d-4f87-aac9-667b09496897' },
            { nombre: 'FECHA DE NEGOCIACIÓN ', id: 'ce0ec03d-15e0-48e9-9fb5-12dc9de3116e' },
            { nombre: 'ÁREA DE GESTIÓN', id: 'fcd6b207-25e5-4d5c-9388-17cf357c1880' },
            { nombre: 'AGENCIA', id: '3b8dc74b-cad1-4c23-803f-77427ddb315f' },
            { nombre: 'NUMERO_OBLIGACIÓN', id: '316c8054-17af-4ccb-bdfa-85fb26584053' },
            { nombre: 'TIPO_OBLIGACIÓN', id: '5d9474e6-2d3e-46b6-af6f-c5f53347baa9' },
            { nombre: 'ESTADO_OBLIGACIÓN', id: 'bb9bc9c6-ca21-45e8-a539-3bbe80e9aeb4' },
            { nombre: 'TIPO_PRODUCTO', id: '2e812bd9-29cb-495c-a275-e7a833bae510' },
            { nombre: 'FECHA_CASTIGO', id: 'd73aa70d-f12d-4a29-bfb7-fbc5b4ae38e0' },
            { nombre: 'EDAD_MORA', id: '58091737-5ecd-4637-ae64-e66aa37f419e' },
            { nombre: 'PLAZO', id: '79407da3-e4f4-460f-84b3-541f540a0d68' },
            { nombre: 'COBERTURA', id: '9189be03-14d9-4cff-8cb0-5b2ff835e947' },
            { nombre: 'CAPITAL_VENCIDO', id: 'ddfd0417-b523-42b5-8038-ca3d25769caf' },
            { nombre: 'CAPITAL_TOTAL', id: 'e87bce24-141d-4328-b306-2e810628366b' },
            { nombre: 'INTERÉS_CORRIENTE', id: 'd6ddd037-e5b8-4f67-a2a2-6e6256b5ef6c' },
            { nombre: 'INTERÉS_MORA', id: '873dff4b-b6ef-47d0-b3d6-ad8ff35ab9d5' },
            { nombre: 'INTERESES_EXTRACONTABLES', id: '811dddcc-060c-4752-b4b4-ba3aee87530a' },
            { nombre: 'OTROS_CARGOS', id: '2a4d66d6-6924-44b2-ad63-2dbbc01d0f1a' },
            { nombre: 'SALDO_TOTAL', id: 'ced6329d-0943-4ca9-b5ac-1d3fec0458b6' },
            { nombre: 'FECHA_DESEMBOLSO', id: 'fa1b56c9-376c-4ad2-b3c2-cb7efd1c4e00' },
            { nombre: 'VALOR_INICIAL_CUPO', id: '8ec77a93-fe9c-4b5d-ae7f-b56f8fdd8d2b' },
            { nombre: 'TASA_INTERÉS_E.A', id: '34b709d9-9103-4939-9b83-0ebb1c13bbc5' },
            { nombre: 'GARANTÍA', id: 'f351eb9f-0ed0-46c4-a13e-0ac3f5f04c88' },
            { nombre: 'SNR', id: '82cc7235-51a2-44a2-9038-d2661f9ccfef' },
            { nombre: 'CUENTA', id: '14147d37-86b5-4f19-ba01-49062f584897' },
            { nombre: 'FECHA_PROMESA_DE_PAGO', id: 'e8787168-f162-479a-b094-cd33ab69af16' },
            { nombre: 'VALOR_PAGO', id: '6194963c-7051-4e3b-a9fb-4c1d9874d335' },
            { nombre: 'FECHA_PAGO', id: '37e118e1-5f67-4845-b522-4a8afb32d219' },
            { nombre: '% ADICIONAL CON BAJA CUENTA', id: '7c123120-194d-4a14-b252-48b8f8bf1f1c' },
            { nombre: '% ADICIONAL A POLITICA', id: 'e5fb73cc-151a-4936-bcde-6cb844bd80a3' },
            { nombre: 'VALOR_PROPUESTA', id: '4a8bcf2f-e6ed-475e-af74-bd106b224662' },
            { nombre: '% CASTIGO_PARCIAL_BAJA_CUENTA_CAPITAL', id: '35e5a8af-663f-423f-a6f4-b94c1c560556' },
            { nombre: 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_CAPITAL', id: 'c351ffc5-1f1f-41d8-8b40-d53936dd7e68' },
            { nombre: '% CASTIGO_PARCIAL_BAJA_CUENTA_INTERES_CORRIENTES', id: 'f1efc02a-90eb-4724-8c23-63653105751d' },
            { nombre: 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERES_CORRIENTES', id: '3b95db00-d04e-4122-9fb0-ca1fb8a93391' },
            { nombre: '% CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_MORA', id: '304cad5a-e1be-4958-a0f0-2fff1d8ccbd2' },
            { nombre: 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_MORA', id: '8aa4d791-2cc7-486d-af08-61c80f9a32fc' },
            { nombre: '% CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_EXTRACONTRABLES', id: '10e9b1ba-93d5-488e-9f41-336f016993d2' },
            { nombre: 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_EXTRACONTABLES', id: 'ae6a860a-04d0-4c67-94d4-ba75c5b629a6' },
            { nombre: '% HONORARIOS', id: '59fe89a7-c69c-4f57-bc7d-0e7e8807d9de' },
            { nombre: 'VALOR_HONORARIOS', id: 'e7abf0ab-9932-4879-a003-4d421a4fc81c' },
            { nombre: 'VALOR_TOTAL_CASTIGOS_PARCIAL_BAJA_CUENTA', id: '7e9ea683-0655-442d-a268-53414ea21538' },
            { nombre: 'FECHA INICIO DE PROCESO', id: 'caa5288f-4982-46a6-b719-516d467f2a99' },
            { nombre: 'ETAPA DE PROCESO', id: '6668d103-6e5d-4225-a578-9f9d144fb011' },
            { nombre: 'ESTADO_RECLAMACIÓN_FNG_FAG', id: '65e882e4-8b5e-40dc-b106-ead5adb26951' },
            { nombre: 'FECHA ETAPA PROCESAL', id: 'c1e7ccd1-3611-48ae-8c00-c6bdaea3ea1a' },
            { nombre: 'MEDIDAS CAUTELARES', id: '427b5b63-db83-416e-a1c5-566faad3384f' },
            { nombre: 'PROVISIÓN', id: 'f29bf6b3-fdd1-4fcb-94e0-5462bd6814ee' },
            { nombre: 'MARCA C026', id: 'ead0f463-f647-49d6-aab7-39738fcbc864' },
            { nombre: 'CALIFICACIÓN', id: '54509b6f-1f06-405b-8006-916a439f6213' },
            { nombre: 'CAUSA DE LA MORA', id: 'e435d78c-6c8b-49ff-b555-762f9cf42119' },
            { nombre: 'DETALLE DE LA PROPUESTA', id: '6e2616a1-ee70-4253-af29-c5dbe17b552c' },
            { nombre: 'PLAZO ACUERDO DE PAGO', id: '33af076c-4476-4831-af44-19d96fedb4f4' },
            { nombre: 'PAGO MINIMO INFERIOR', id: '306ffbfe-89c1-4f05-832b-52668d0c702a' },
            { nombre: 'CAPACIDAD DE PAGO INFERIOR A LA NUEVA CUOTA', id: '284d6094-a084-428f-a4b1-29c64982ef2a' },
            { nombre: 'TIEMPO ENTRE MECANISMOS MENOR', id: '92fe8bc6-e96c-4cd0-9b16-c61681ab39ad' },
            { nombre: 'EDAD MORA PARA APLICAR MECANISMO', id: '133fdc33-098e-4a78-b713-bc8d677ba906' },
            { nombre: '% BAJA DE SALDOS SUPERIORES A LA POLÍTICA', id: '2648e7cf-58f7-49d7-a42d-8593feddd770' },
            { nombre: 'SIN PAGO', id: '99660d2c-043a-4986-be20-795010f80000' },
            { nombre: 'EL PRODUCTO NO ES LA CABEZA DE MORA', id: 'e65b1a7a-baf9-4f4a-8e2d-83cfde29d424' },
            { nombre: 'EXTENSIONES DE PLAZO', id: '61be6ebc-c066-4ada-a89f-08bce9087061' }
        ];

        const columnasMoneda = [
            'CAPITAL_VENCIDO', 'CAPITAL_TOTAL', 'INTERÉS_CORRIENTE', 'INTERÉS_MORA', 'INTERESES_EXTRACONTABLES',
            'OTROS_CARGOS', 'SALDO_TOTAL', 'VALOR_INICIAL_CUPO', 'VALOR_PAGO', 'VALOR_PROPUESTA',
            'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_CAPITAL', 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERES_CORRIENTES',
            'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_MORA', 'VALOR CASTIGO_PARCIAL_BAJA_CUENTA_INTERESES_EXTRACONTABLES',
            'VALOR_HONORARIOS', 'VALOR_TOTAL_CASTIGOS_PARCIAL_BAJA_CUENTA'
        ];
        const columnasPorcentajeExtra = ['TASA_INTERÉS_E.A'];

        function formatearFechaExportar(valor) {
            if (typeof valor !== 'string') return valor;
            const coincidencia = valor.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (coincidencia) {
                return coincidencia[3] + '/' + coincidencia[2] + '/' + coincidencia[1];
            }
            return valor;
        }

        function formatearMoneda(valor) {
            const num = parseFloat(valor);
            if (isNaN(num)) return valor;
            return '$ ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function formatearPorcentaje(valor) {
            if (typeof valor === 'string' && valor.trim().endsWith('%')) return valor;
            const num = parseFloat(valor);
            if (isNaN(num)) return valor;
            const numero = Math.abs(num) <= 1 ? num * 100 : num;
            return numero.toFixed(2) + '%';
        }

        const mapaMecanismoExport = {
            'cancelacion': 'Cancelación total',
            'pagomora': 'Pago Mora de Contado',
            'consolidacion': 'Consolidación de deudas',
            'ampliacion': 'Ampliación de plazo'
        };

        function esValorPlaceholder(id, valor) {
            const el = document.getElementById(id);
            if (el && el.tagName === 'SELECT') {
                const opcionSeleccionada = el.options[el.selectedIndex];
                if (opcionSeleccionada && /seleccione/i.test(opcionSeleccionada.text.trim())) {
                    return true;
                }
            }
            if (typeof valor === 'string' && /seleccione un registro/i.test(valor)) {
                return true;
            }
            return false;
        }

        if (!document.getElementById('estiloCampoVacioFE')) {
            const estilo = document.createElement('style');
            estilo.id = 'estiloCampoVacioFE';
            estilo.innerHTML = '.campo-vacio-fe { border: 2px solid #e74c3c !important; background-color: #fdecea !important; }';
            document.head.appendChild(estilo);
        }

        const fila = {};
        const camposVacios = [];

        columnas.forEach(function (col) {
            const el = document.getElementById(col.id);
            if (el) { el.classList.remove('campo-vacio-fe'); }

            let valor = '';
            const widget = (el && window.kendo) ? kendo.widgetInstance(kendo.jQuery(el)) : null;
            if (widget && typeof widget.text === 'function' && widget.text()) {
                valor = widget.text();
            } else {
                try {
                    valor = getFieldValue(col.id);
                } catch (e) {
                    valor = '';
                }
            }
            if (valor === null || valor === undefined || valor === '') {
                if (el && el.value !== undefined && el.value !== '') {
                    valor = el.value;
                }
            }
            if (valor === null || valor === undefined || valor === '' || esValorPlaceholder(col.id, valor)) {
                camposVacios.push(col.nombre);
                if (el) { el.classList.add('campo-vacio-fe'); }
                valor = '';
            } else if (col.nombre === 'MECANISMO') {
                valor = mapaMecanismoExport[String(valor).trim().toLowerCase()] || valor;
            } else if (col.nombre.trim().startsWith('%') || columnasPorcentajeExtra.indexOf(col.nombre) !== -1) {
                valor = formatearPorcentaje(valor);
            } else if (columnasMoneda.indexOf(col.nombre) !== -1) {
                valor = formatearMoneda(valor);
            } else {
                valor = formatearFechaExportar(valor);
            }
            fila[col.nombre] = valor;
        });

        if (camposVacios.length > 0) {
            Swal.fire({
                title: '¡Faltan campos por completar!',
                html: 'No se puede exportar hasta llenar:<br><br>' + camposVacios.join('<br>'),
                icon: 'error',
                confirmButtonColor: '#ee7402'
            });
            return;
        }

        const encabezados = columnas.map(function (c) { return c.nombre; });
        const hoja = XLSX.utils.json_to_sheet([fila], { header: encabezados });
        const libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, 'FormatoExcepciones');

        const numeroObligacion = String(fila['NUMERO_OBLIGACIÓN'] || 'SIN_NUMERO').replace(/[\\/:*?"<>|]/g, '');
        const nombreArchivo = 'FE ' + numeroObligacion + '.xlsx';
        XLSX.writeFile(libro, nombreArchivo);

        // --- subida a la base de datos, con lectura directa (getFieldValue) para los campos FK y numericos ---
        subirFormatoExcepcionesABase();
    }

    async function subirFormatoExcepcionesABase() {
        function sqlEscape(valor) {
            return String(valor == null ? '' : valor).replace(/'/g, "''");
        }

        try {
            const mecanismoFE = getFieldValue('f707a4ad-ebde-49d9-914c-27406b8fb8eb') || '';
            const tipoIdFE = getFieldValue('8053b8b4-9a2b-47b4-9b6d-8faa3986b32c') || '';
            const numeroIdFE = getFieldValue('c2e7dd61-3c3d-4f87-aac9-667b09496897') || '';
            const fechaNegociacionFE = getFieldValue('ce0ec03d-15e0-48e9-9fb5-12dc9de3116e');
            const areaGestionFE = getFieldValue('fcd6b207-25e5-4d5c-9388-17cf357c1880') || '';
            const agenciaFE = getFieldValue('3b8dc74b-cad1-4c23-803f-77427ddb315f') || '';
            const numeroOblFE = getFieldValue('316c8054-17af-4ccb-bdfa-85fb26584053');
            const tipoObligacionFE = getFieldValue('5d9474e6-2d3e-46b6-af6f-c5f53347baa9') || '';
            const estadoOblFE = getFieldValue('bb9bc9c6-ca21-45e8-a539-3bbe80e9aeb4') || '';
            const tipoProductoFE = getFieldValue('2e812bd9-29cb-495c-a275-e7a833bae510');
            const fechaCastigoFE = getFieldValue('d73aa70d-f12d-4a29-bfb7-fbc5b4ae38e0');
            const diasMoraFE = getFieldValue('58091737-5ecd-4637-ae64-e66aa37f419e');
            const plazoFE = getFieldValue('79407da3-e4f4-460f-84b3-541f540a0d68');
            const coberturaFE = getFieldValue('9189be03-14d9-4cff-8cb0-5b2ff835e947') || '';
            const capitalVencidoFE = getFieldValue('ddfd0417-b523-42b5-8038-ca3d25769caf');
            const capitalTotalFE = getFieldValue('e87bce24-141d-4328-b306-2e810628366b');
            const interesCorrienteFE = getFieldValue('d6ddd037-e5b8-4f67-a2a2-6e6256b5ef6c');
            const interesMoraFE = getFieldValue('873dff4b-b6ef-47d0-b3d6-ad8ff35ab9d5');
            const interesesExtracontablesFE = getFieldValue('811dddcc-060c-4752-b4b4-ba3aee87530a');
            const otrosCargosFE = getFieldValue('2a4d66d6-6924-44b2-ad63-2dbbc01d0f1a');
            const saldoTotalFE = getFieldValue('ced6329d-0943-4ca9-b5ac-1d3fec0458b6');
            const fechaDesembolsoFE = getFieldValue('fa1b56c9-376c-4ad2-b3c2-cb7efd1c4e00');
            const valorInicialCupoFE = getFieldValue('8ec77a93-fe9c-4b5d-ae7f-b56f8fdd8d2b');
            const tasaInteresEaFE = getFieldValue('34b709d9-9103-4939-9b83-0ebb1c13bbc5');
            const garantiaFE = getFieldValue('f351eb9f-0ed0-46c4-a13e-0ac3f5f04c88') || '';
            const snrFE = getFieldValue('82cc7235-51a2-44a2-9038-d2661f9ccfef');
            const numeroCuentaFE = getFieldValue('14147d37-86b5-4f19-ba01-49062f584897') || '';
            const fechaPromesaPagoFE = getFieldValue('e8787168-f162-479a-b094-cd33ab69af16');
            const valorPagoFE = getFieldValue('6194963c-7051-4e3b-a9fb-4c1d9874d335');
            const fechaPagoFE = getFieldValue('37e118e1-5f67-4845-b522-4a8afb32d219');
            const adicionalBajaCuentaFE = getFieldValue('7c123120-194d-4a14-b252-48b8f8bf1f1c') || '';
            const adicionalPoliticaFE = getFieldValue('e5fb73cc-151a-4936-bcde-6cb844bd80a3');
            const valorPropuestaFE = getFieldValue('4a8bcf2f-e6ed-475e-af74-bd106b224662');
            const pctCastigoCapitalFE = getFieldValue('35e5a8af-663f-423f-a6f4-b94c1c560556');
            const valorCastigoCapitalFE = getFieldValue('c351ffc5-1f1f-41d8-8b40-d53936dd7e68');
            const pctCastigoIntCteFE = getFieldValue('f1efc02a-90eb-4724-8c23-63653105751d');
            const valorCastigoIntCteFE = getFieldValue('3b95db00-d04e-4122-9fb0-ca1fb8a93391');
            const pctCastigoIntMoraFE = getFieldValue('304cad5a-e1be-4958-a0f0-2fff1d8ccbd2');
            const valorCastigoIntMoraFE = getFieldValue('8aa4d791-2cc7-486d-af08-61c80f9a32fc');
            const pctCastigoExtracFE = getFieldValue('10e9b1ba-93d5-488e-9f41-336f016993d2');
            const valorCastigoExtracFE = getFieldValue('ae6a860a-04d0-4c67-94d4-ba75c5b629a6');
            const pctHonorariosFE = getFieldValue('59fe89a7-c69c-4f57-bc7d-0e7e8807d9de');
            const valorHonorariosFE = getFieldValue('e7abf0ab-9932-4879-a003-4d421a4fc81c');
            const valorTotalCastigosFE = getFieldValue('7e9ea683-0655-442d-a268-53414ea21538');
            const fechaInicioProcesoFE = getFieldValue('caa5288f-4982-46a6-b719-516d467f2a99');
            const etapaProcesoFE = getFieldValue('6668d103-6e5d-4225-a578-9f9d144fb011') || '';
            const estadoReclamacionFE = getFieldValue('65e882e4-8b5e-40dc-b106-ead5adb26951') || '';
            const fechaEtapaProcesalFE = getFieldValue('c1e7ccd1-3611-48ae-8c00-c6bdaea3ea1a');
            const medidasCautelaresFE = getFieldValue('427b5b63-db83-416e-a1c5-566faad3384f') || '';
            const provisionFE = getFieldValue('f29bf6b3-fdd1-4fcb-94e0-5462bd6814ee');
            const marcaC026FE = getFieldValue('ead0f463-f647-49d6-aab7-39738fcbc864') || '';
            const calificacionFE = getFieldValue('54509b6f-1f06-405b-8006-916a439f6213') || '';
            const causaMoraFE = getFieldValue('e435d78c-6c8b-49ff-b555-762f9cf42119') || '';
            const detallePropuestaFE = getFieldValue('6e2616a1-ee70-4253-af29-c5dbe17b552c') || '';
            const plazoAcuerdoPagoFE = getFieldValue('33af076c-4476-4831-af44-19d96fedb4f4');
            const pagoMinimoInferiorFE = getFieldValue('306ffbfe-89c1-4f05-832b-52668d0c702a') || '';
            const capacidadPagoInferiorFE = getFieldValue('284d6094-a084-428f-a4b1-29c64982ef2a') || '';
            const tiempoEntreMecanismosFE = getFieldValue('92fe8bc6-e96c-4cd0-9b16-c61681ab39ad') || '';
            const edadMoraAplicarMecanismoFE = getFieldValue('133fdc33-098e-4a78-b713-bc8d677ba906') || '';
            const bajaSaldosPoliticaFE = getFieldValue('2648e7cf-58f7-49d7-a42d-8593feddd770') || '';
            const sinPagoFE = getFieldValue('99660d2c-043a-4986-be20-795010f80000') || '';
            const productoNoCabezaMoraFE = getFieldValue('e65b1a7a-baf9-4f4a-8e2d-83cfde29d424') || '';
            const extensionesPlazoFE = getFieldValue('61be6ebc-c066-4ada-a89f-08bce9087061') || '';

            const selectTipoProd = document.getElementById("2e812bd9-29cb-495c-a275-e7a833bae510");
            const textoTipoProd = selectTipoProd.options[selectTipoProd.selectedIndex].text;
            const selectSNR = document.getElementById("82cc7235-51a2-44a2-9038-d2661f9ccfef");
            const textoTipoSNR = selectSNR.options[selectSNR.selectedIndex].text;
            const tipoProductoLimpioFE = textoTipoProd || '';
            const snrLimpioFE = textoTipoSNR || '';
            const usuario = localStorage.getItem('userName') || '';

            const mecSQL = mecanismoFE ? "'" + sqlEscape(mecanismoFE) + "'" : 'NULL';
            const tiSQL = tipoIdFE ? "'" + sqlEscape(tipoIdFE) + "'" : 'NULL';
            const numIdSQL = numeroIdFE ? "'" + sqlEscape(numeroIdFE) + "'" : 'NULL';
            const fnSQL = fechaNegociacionFE ? "'" + (fechaNegociacionFE instanceof Date ? (fechaNegociacionFE.getFullYear() + '-' + String(fechaNegociacionFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaNegociacionFE.getDate()).padStart(2, '0')) : String(fechaNegociacionFE).substring(0, 10)) + "'" : 'NULL';
            const agSQL = agenciaFE ? "'" + sqlEscape(agenciaFE) + "'" : 'NULL';
            const noSQL = isNaN(parseInt(numeroOblFE, 10)) ? '0' : parseInt(numeroOblFE, 10);
            const toSQL = tipoObligacionFE ? "'" + sqlEscape(tipoObligacionFE) + "'" : 'NULL';
            const eoSQL = estadoOblFE ? "'" + sqlEscape(estadoOblFE) + "'" : 'NULL';
            const tpSQL = (() => { const t = String(tipoProductoFE || '').trim(); const p = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; return p.test(t) ? "'" + t + "'" : 'NULL'; })();
            const fcSQL = fechaCastigoFE ? "'" + (fechaCastigoFE instanceof Date ? (fechaCastigoFE.getFullYear() + '-' + String(fechaCastigoFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaCastigoFE.getDate()).padStart(2, '0')) : String(fechaCastigoFE).substring(0, 10)) + "'" : 'NULL';
            const dmSQL = isNaN(parseInt(diasMoraFE, 10)) ? '0' : parseInt(diasMoraFE, 10);
            const plSQL = isNaN(parseInt(plazoFE, 10)) ? '0' : parseInt(plazoFE, 10);
            const coSQL = coberturaFE ? "'" + sqlEscape(coberturaFE) + "'" : 'NULL';
            const cvSQL = isNaN(parseFloat(capitalVencidoFE)) ? '0' : parseFloat(capitalVencidoFE);
            const ctSQL = isNaN(parseFloat(capitalTotalFE)) ? '0' : parseFloat(capitalTotalFE);
            const icSQL = isNaN(parseFloat(interesCorrienteFE)) ? '0' : parseFloat(interesCorrienteFE);
            const imSQL = isNaN(parseFloat(interesMoraFE)) ? '0' : parseFloat(interesMoraFE);
            const ieSQL = isNaN(parseFloat(interesesExtracontablesFE)) ? '0' : parseFloat(interesesExtracontablesFE);
            const ocSQL = isNaN(parseFloat(otrosCargosFE)) ? '0' : parseFloat(otrosCargosFE);
            const stSQL = isNaN(parseFloat(saldoTotalFE)) ? '0' : parseFloat(saldoTotalFE);
            const fdSQL = fechaDesembolsoFE ? "'" + (fechaDesembolsoFE instanceof Date ? (fechaDesembolsoFE.getFullYear() + '-' + String(fechaDesembolsoFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaDesembolsoFE.getDate()).padStart(2, '0')) : String(fechaDesembolsoFE).substring(0, 10)) + "'" : 'NULL';
            const vicSQL = isNaN(parseFloat(valorInicialCupoFE)) ? '0' : parseFloat(valorInicialCupoFE);
            const taiSQL = isNaN(parseFloat(tasaInteresEaFE)) ? '0' : parseFloat(tasaInteresEaFE);
            const garSQL = garantiaFE ? "'" + sqlEscape(garantiaFE) + "'" : 'NULL';
            const snrGSQL = (() => { const t = String(snrFE || '').trim(); const p = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; return p.test(t) ? "'" + t + "'" : 'NULL'; })();
            const ncSQL = numeroCuentaFE ? "'" + sqlEscape(numeroCuentaFE) + "'" : 'NULL';
            const fppSQL = fechaPromesaPagoFE ? "'" + (fechaPromesaPagoFE instanceof Date ? (fechaPromesaPagoFE.getFullYear() + '-' + String(fechaPromesaPagoFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaPromesaPagoFE.getDate()).padStart(2, '0')) : String(fechaPromesaPagoFE).substring(0, 10)) + "'" : 'NULL';
            const vpSQL = isNaN(parseFloat(valorPagoFE)) ? '0' : parseFloat(valorPagoFE);
            const fpSQL = fechaPagoFE ? "'" + (fechaPagoFE instanceof Date ? (fechaPagoFE.getFullYear() + '-' + String(fechaPagoFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaPagoFE.getDate()).padStart(2, '0')) : String(fechaPagoFE).substring(0, 10)) + "'" : 'NULL';
            const abSQL = adicionalBajaCuentaFE ? "'" + sqlEscape(adicionalBajaCuentaFE) + "'" : 'NULL';
            const apSQL = isNaN(parseFloat(adicionalPoliticaFE)) ? '0' : parseFloat(adicionalPoliticaFE);
            const propSQL = isNaN(parseFloat(valorPropuestaFE)) ? '0' : parseFloat(valorPropuestaFE);
            const pccSQL = isNaN(parseFloat(pctCastigoCapitalFE)) ? '0' : parseFloat(pctCastigoCapitalFE);
            const vccSQL = isNaN(parseFloat(valorCastigoCapitalFE)) ? '0' : parseFloat(valorCastigoCapitalFE);
            const pciSQL = isNaN(parseFloat(pctCastigoIntCteFE)) ? '0' : parseFloat(pctCastigoIntCteFE);
            const vciSQL = isNaN(parseFloat(valorCastigoIntCteFE)) ? '0' : parseFloat(valorCastigoIntCteFE);
            const pcmSQL = isNaN(parseFloat(pctCastigoIntMoraFE)) ? '0' : parseFloat(pctCastigoIntMoraFE);
            const vcmSQL = isNaN(parseFloat(valorCastigoIntMoraFE)) ? '0' : parseFloat(valorCastigoIntMoraFE);
            const pceSQL = isNaN(parseFloat(pctCastigoExtracFE)) ? '0' : parseFloat(pctCastigoExtracFE);
            const vceSQL = isNaN(parseFloat(valorCastigoExtracFE)) ? '0' : parseFloat(valorCastigoExtracFE);
            const phSQL = isNaN(parseFloat(pctHonorariosFE)) ? '0' : parseFloat(pctHonorariosFE);
            const vhSQL = isNaN(parseFloat(valorHonorariosFE)) ? '0' : parseFloat(valorHonorariosFE);
            const vtSQL = isNaN(parseFloat(valorTotalCastigosFE)) ? '0' : parseFloat(valorTotalCastigosFE);
            const fiSQL = fechaInicioProcesoFE ? "'" + (fechaInicioProcesoFE instanceof Date ? (fechaInicioProcesoFE.getFullYear() + '-' + String(fechaInicioProcesoFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaInicioProcesoFE.getDate()).padStart(2, '0')) : String(fechaInicioProcesoFE).substring(0, 10)) + "'" : 'NULL';
            const epSQL = etapaProcesoFE ? "'" + sqlEscape(etapaProcesoFE) + "'" : 'NULL';
            const erSQL = estadoReclamacionFE ? "'" + sqlEscape(estadoReclamacionFE) + "'" : 'NULL';
            const feSQL = fechaEtapaProcesalFE ? "'" + (fechaEtapaProcesalFE instanceof Date ? (fechaEtapaProcesalFE.getFullYear() + '-' + String(fechaEtapaProcesalFE.getMonth() + 1).padStart(2, '0') + '-' + String(fechaEtapaProcesalFE.getDate()).padStart(2, '0')) : String(fechaEtapaProcesalFE).substring(0, 10)) + "'" : 'NULL';
            const mcSQL = medidasCautelaresFE ? "'" + sqlEscape(medidasCautelaresFE) + "'" : 'NULL';
            const provSQL = isNaN(parseFloat(provisionFE)) ? '0' : parseFloat(provisionFE);
            const mc026SQL = marcaC026FE ? "'" + sqlEscape(marcaC026FE) + "'" : 'NULL';
            const calSQL = calificacionFE ? "'" + sqlEscape(calificacionFE) + "'" : 'NULL';
            const cmSQL = causaMoraFE ? "'" + sqlEscape(causaMoraFE) + "'" : 'NULL';
            const dpSQL = detallePropuestaFE ? "'" + sqlEscape(detallePropuestaFE) + "'" : 'NULL';
            const paSQL = isNaN(parseInt(plazoAcuerdoPagoFE, 10)) ? '0' : parseInt(plazoAcuerdoPagoFE, 10);
            const pmiSQL = pagoMinimoInferiorFE ? "'" + sqlEscape(pagoMinimoInferiorFE) + "'" : 'NULL';
            const cpiSQL = capacidadPagoInferiorFE ? "'" + sqlEscape(capacidadPagoInferiorFE) + "'" : 'NULL';
            const temSQL = tiempoEntreMecanismosFE ? "'" + sqlEscape(tiempoEntreMecanismosFE) + "'" : 'NULL';
            const emaSQL = edadMoraAplicarMecanismoFE ? "'" + sqlEscape(edadMoraAplicarMecanismoFE) + "'" : 'NULL';
            const bspSQL = bajaSaldosPoliticaFE ? "'" + sqlEscape(bajaSaldosPoliticaFE) + "'" : 'NULL';
            const spSQL = sinPagoFE ? "'" + sqlEscape(sinPagoFE) + "'" : 'NULL';
            const pncmSQL = productoNoCabezaMoraFE ? "'" + sqlEscape(productoNoCabezaMoraFE) + "'" : 'NULL';
            const epLSQL = extensionesPlazoFE ? "'" + sqlEscape(extensionesPlazoFE) + "'" : 'NULL';
            const agGSQL = areaGestionFE ? "'" + sqlEscape(areaGestionFE) + "'" : 'NULL';
            const tplSQL = tipoProductoLimpioFE ? "'" + sqlEscape(tipoProductoLimpioFE) + "'" : 'NULL';
            const snrLSQL = snrLimpioFE ? "'" + sqlEscape(snrLimpioFE) + "'" : 'NULL';

            const query = `
                INSERT INTO dbo.SimiladorDNC_Lappiz_FormatoExcepciones (
                    Id, Created_date, Edited_date, UserEmail, EventType, RealizadoPor, RowStatus,
                    MecanismoFE, Tipoidfe, Numeroidfe, Fechadenegociacionfe, Agenciafe, Numerooblfe,
                    FEtipodeobligacion, FeESTADODEOBL, FETipodeproducto, FEfechadecastigo, FEDiasmora, FEPLAZO,
                    FECOBERTURA, Fecapitalvencido, Fecapitaltotal, FEINTERESCORRIENTE, FEinteresmoratorio,
                    FeINTERESESEXTRACONTABLES, FeOTROSCARGOS, FESALDOTOTAL, FECHADESEMBOLSOfe, VALORINICIALCUPOfe,
                    TASAINTERESEAfe, Garantiafe, SNRLISTFE, NumerocuentaFE, FECHAPROMESADEPAGOfe, Valorpagofe,
                    FECHAPAGOfe, ADICIONALCONBAJACUENTA, ADICIONALAPOLITICAfe, VALORPROPUESTAfe,
                    CASTIGOPARCIALBAJACUENTACAPITALfe, VALORCASTIGOPARCIALBAJACUENTACAPITALfe,
                    CASTIGOPARCIALBAJACUENTAINTERESCORRIENTESFE, VALORCASTIGOPARCIALBAJACUENTAINTERESCORRIENTESFE,
                    CASTIGOPARCIALBAJACUENTAINTERESESMORAFE, VALORCASTIGOPARCIALBAJACUENTAINTERESESMORAfe,
                    CASTIGOPARCIALBAJACUENTAINTERESESEXTRACONTRABLESfe, VALORCASTIGOPARCIALBAJACUENTAINTERESESEXTRACONTABLESfe,
                    PORCHONORARIOS, VALORHONORARIOSFE, VALORTOTALCASTIGOSPARCIALBAJACUENTAFE,
                    FECHAINICIODEPROCESOFE, ETAPADEPROCESOFE, ESTADORECLAMACINFNGFAGfe, FECHAETAPAPROCESALFE,
                    MEDIDASCAUTELARESFE, PORCPROVISIONFE, MARCAC026FE, CALIFICACION, CAUSADELAMORAfe,
                    DETALLEDELAPROPUESTAfe, PLAZOACUERDODEPAGOfe, PAGOMINIMOINFERIORfe,
                    CAPACIDADDEPAGOINFERIORALANUEVACUOTAfe, FETIEMPOENTREMECANISMOSMENOR, EDADMORAPARAAPLICARMECANISMOfe,
                    BAJADESALDOSSUPERIORESALAPOLTICA, SINPAGOFE, ELPRODUCTONOESLACABEZADEMORAFE, EXTENCIONESDEPLAZOfe, AREADEGESTION,
                    TIPOPRODUCTOLIMPIO, SNRLIMPIO
                ) VALUES (
                    NEWID(), GETDATE(), GETDATE(), ${"'"+sqlEscape(usuario)+"'"}, 'Insertar', ${"'"+sqlEscape(usuario)+"'"}, 'active',
                    ${mecSQL}, ${tiSQL}, ${numIdSQL}, ${fnSQL}, ${agSQL}, ${noSQL},
                    ${toSQL}, ${eoSQL}, ${tpSQL}, ${fcSQL}, ${dmSQL}, ${plSQL},
                    ${coSQL}, ${cvSQL}, ${ctSQL}, ${icSQL}, ${imSQL},
                    ${ieSQL}, ${ocSQL}, ${stSQL}, ${fdSQL}, ${vicSQL},
                    ${taiSQL}, ${garSQL}, ${snrGSQL}, ${ncSQL}, ${fppSQL}, ${vpSQL},
                    ${fpSQL}, ${abSQL}, ${apSQL}, ${propSQL},
                    ${pccSQL}, ${vccSQL},
                    ${pciSQL}, ${vciSQL}, ${pcmSQL}, ${vcmSQL},
                    ${pceSQL}, ${vceSQL}, ${phSQL}, ${vhSQL}, ${vtSQL},
                    ${fiSQL}, ${epSQL}, ${erSQL},
                    ${feSQL}, ${mcSQL}, ${provSQL},
                    ${mc026SQL}, ${calSQL}, ${cmSQL},
                    ${dpSQL}, ${paSQL}, ${pmiSQL},
                    ${cpiSQL}, ${temSQL}, ${emaSQL},
                    ${bspSQL}, ${spSQL}, ${pncmSQL},
                    ${epLSQL}, ${agGSQL}, ${tplSQL}, ${snrLSQL}
                )`;

            await execQuery(query);

            Swal.fire({
                title: '¡Excel exportado y subido!',
                text: 'El Formato de Excepciones se descargó y se guardó correctamente en la base de datos.',
                icon: 'success',
                confirmButtonColor: '#0041a4'
            });
        } catch (error) {
            console.error('subirFormatoExcepcionesABase: error al subir a la base', error);
            Swal.fire({
                title: 'Excel descargado, pero no se pudo subir a la base',
                text: 'El archivo Excel sí se generó, pero hubo un error al guardar en la base de datos. Revisa la consola para más detalle.',
                icon: 'warning',
                confirmButtonColor: '#ee7402'
            });
        }
    }

    if (window.XLSX) {
        generarArchivo();
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = generarArchivo;
    script.onerror = function () {
        Swal.fire({
            title: 'Error al exportar',
            text: 'No se pudo cargar la libreria necesaria para generar el Excel. Verifica tu conexion o contacta a soporte.',
            icon: 'error',
            confirmButtonColor: '#ee7402'
        });
    };
    document.head.appendChild(script);
}