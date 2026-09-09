function poblarCamposFormatoExcepciones() {
    if (window.__feYaPoblado) { return; }
    window.__feYaPoblado = true;

    setTimeout(function () {
        setFieldValue('6c6ead14-3395-4a14-8559-9c9e66b01e26', localStorage.getItem('userName'));
        const raw = localStorage.getItem('datosNegociacionFE');
        if (!raw) {
            console.warn('Formato de Excepciones: no hay datos guardados en localStorage');
        } else {
            const datos = JSON.parse(raw);
            function asignarValor(id, valor) {
                if (valor === null || valor === undefined || valor === '') { return; }
                const el = document.getElementById(id);
                if (el) {
                    const widget = window.kendo ? kendo.widgetInstance(kendo.jQuery(el)) : null;
                    if (widget && widget.dataSource && typeof widget.value === 'function') {
                        const buscado = String(valor).trim().toUpperCase();
                        const campoTexto = widget.options.dataTextField;
                        const campoValor = widget.options.dataValueField;
                        const esDiagnosticoTipoProducto = id === '2e812bd9-29cb-495c-a275-e7a833bae510';

                        widget.dataSource.fetch(function () {
                            const items = widget.dataSource.view();
                            if (esDiagnosticoTipoProducto) {
                                console.log('DIAG TIPO_PRODUCTO: buscando ->', JSON.stringify(buscado));
                                console.log('DIAG TIPO_PRODUCTO: cantidad de items ->', items.length);
                                console.log('DIAG TIPO_PRODUCTO: primeros 3 items ->', JSON.stringify(items.slice(0, 3)));
                            }
                            const itemEncontrado = items.find(function (item) {
                                const texto = String(item[campoTexto] || '').trim().toUpperCase();
                                return texto === buscado || texto.includes(buscado) || buscado.includes(texto);
                            });
                            if (esDiagnosticoTipoProducto) {
                                console.log('DIAG TIPO_PRODUCTO: item encontrado ->', JSON.stringify(itemEncontrado));
                            }
                            if (itemEncontrado) {
                                widget.value(itemEncontrado[campoValor]);
                                widget.trigger('change');
                            } else {
                                widget.text(valor);
                                widget.trigger('change');
                            }
                        });
                        return;
                    }
                    if (el.tagName === 'SELECT') {
                        const buscado = String(valor).trim().toUpperCase();
                        const opcion = Array.from(el.options).find(o => o.text.trim().toUpperCase().includes(buscado));
                        if (opcion) {
                            el.value = opcion.value;
                            el.dispatchEvent(new Event('change', { bubbles: true }));
                            return;
                        }
                        return;
                    }
                }
                setFieldValue(id, valor);
            }
            const mapaMecanismoFormato = {
                'cancelacion': 'Cancelación total',
                'pagomora': 'Pago Mora de Contado',
                'consolidacion': 'Consolidación de deudas',
                'ampliacion': 'Ampliación de plazo'
            };
            const mecanismoLegibleFormato = mapaMecanismoFormato[String(datos.MECANISMO || '').trim().toLowerCase()] || datos.MECANISMO;

            asignarValor('f707a4ad-ebde-49d9-914c-27406b8fb8eb', mecanismoLegibleFormato);
            asignarValor('8053b8b4-9a2b-47b4-9b6d-8faa3986b32c', datos.TIPO_ID);
            asignarValor('c2e7dd61-3c3d-4f87-aac9-667b09496897', datos.NUMERO_ID);
            asignarValor('ce0ec03d-15e0-48e9-9fb5-12dc9de3116e', datos.FECHA_NEGOCIACION);
            asignarValor('fcd6b207-25e5-4d5c-9388-17cf357c1880', datos.AREA_GESTION);
            asignarValor('3b8dc74b-cad1-4c23-803f-77427ddb315f', datos.AGENCIA);
            asignarValor('316c8054-17af-4ccb-bdfa-85fb26584053', datos.NUMERO_OBLIGACION);
            asignarValor('5d9474e6-2d3e-46b6-af6f-c5f53347baa9', datos.TIPO_OBLIGACION);
            asignarValor('2e812bd9-29cb-495c-a275-e7a833bae510', datos.TIPO_PRODUCTO);
            asignarValor('d73aa70d-f12d-4a29-bfb7-fbc5b4ae38e0', datos.FECHA_CASTIGO);
            asignarValor('58091737-5ecd-4637-ae64-e66aa37f419e', datos.EDAD_MORA);
            asignarValor('79407da3-e4f4-460f-84b3-541f540a0d68', datos.PLAZO);
            asignarValor('33af076c-4476-4831-af44-19d96fedb4f4', datos.PLAZO);
            if (!datos.PLAZO) {
                setFieldValue('79407da3-e4f4-460f-84b3-541f540a0d68', 1);
                setFieldValue('33af076c-4476-4831-af44-19d96fedb4f4', 1);
            }
            asignarValor('ddfd0417-b523-42b5-8038-ca3d25769caf', datos.CAPITAL_VENCIDO);
            asignarValor('e87bce24-141d-4328-b306-2e810628366b', datos.CAPITAL_TOTAL);
            asignarValor('d6ddd037-e5b8-4f67-a2a2-6e6256b5ef6c', datos.INTERES_CORRIENTE);
            asignarValor('873dff4b-b6ef-47d0-b3d6-ad8ff35ab9d5', datos.INTERES_MORA);
            asignarValor('811dddcc-060c-4752-b4b4-ba3aee87530a', datos.INTERESES_EXTRACONTABLES);
            asignarValor('2a4d66d6-6924-44b2-ad63-2dbbc01d0f1a', datos.OTROS_CARGOS);
            asignarValor('ced6329d-0943-4ca9-b5ac-1d3fec0458b6', datos.SALDO_TOTAL);
            asignarValor('34b709d9-9103-4939-9b83-0ebb1c13bbc5', datos.TASA_INTERES_EA);
            asignarValor('ead0f463-f647-49d6-aab7-39738fcbc864', datos.MARCA_C026);
            // FECHA_PROMESA_DE_PAGO recibe la fecha real; FECHA_PAGO se deja vacia a proposito (llenado manual posterior)
            asignarValor('e8787168-f162-479a-b094-cd33ab69af16', datos.FECHA_PROMESA_DE_PAGO);
            asignarValor('6194963c-7051-4e3b-a9fb-4c1d9874d335', datos.VALOR_PAGO);
            asignarValor('4a8bcf2f-e6ed-475e-af74-bd106b224662', datos.VALOR_PROPUESTA);
            asignarValor('f1efc02a-90eb-4724-8c23-63653105751d', datos.PCT_CASTIGO_INT_CTE);
            asignarValor('3b95db00-d04e-4122-9fb0-ca1fb8a93391', datos.VALOR_CASTIGO_INT_CTE);
            asignarValor('304cad5a-e1be-4958-a0f0-2fff1d8ccbd2', datos.PCT_CASTIGO_INT_MORA);
            asignarValor('8aa4d791-2cc7-486d-af08-61c80f9a32fc', datos.VALOR_CASTIGO_INT_MORA);
            asignarValor('10e9b1ba-93d5-488e-9f41-336f016993d2', datos.PCT_CASTIGO_EXTRAC);
            asignarValor('ae6a860a-04d0-4c67-94d4-ba75c5b629a6', datos.VALOR_CASTIGO_EXTRAC);
            asignarValor('35e5a8af-663f-423f-a6f4-b94c1c560556', datos.PCT_CASTIGO_CAPITAL);
            asignarValor('c351ffc5-1f1f-41d8-8b40-d53936dd7e68', datos.VALOR_CASTIGO_CAPITAL);
            asignarValor('e7abf0ab-9932-4879-a003-4d421a4fc81c', datos.VALOR_HONORARIOS);
            function comoPorcentajeTexto(valor) {
                const num = parseFloat(valor);
                if (isNaN(num)) return '0%';
                return (num * 100).toFixed(2).replace(/\.00$/, '') + '%';
            }
            const nombresMecanismo = {
                consolidacion: 'consolidación de productos',
                novacion: 'novación',
                pagomora: 'pago de mora',
                cancelacion: 'cancelación total',
                ampliacion: 'ampliación de plazo'
            };
            const mecanismoLegible = nombresMecanismo[(datos.MECANISMO || '').toLowerCase()] || datos.MECANISMO || 'sin mecanismo';
            const detallePropuesta =
                'El cliente solicita una excepción para el mecanismo de ' + mecanismoLegible +
                ', sobre la obligación N° ' + (datos.NUMERO_OBLIGACION || 'N/A') +
                ' (' + (datos.TIPO_OBLIGACION || 'sin producto especificado') + '), ' +
                'actualmente con ' + (datos.EDAD_MORA || '0') + ' días de mora. ' +
                'Se propone un pago de $' + (datos.VALOR_PROPUESTA || '0') +
                ' sobre un saldo total de $' + (datos.SALDO_TOTAL || '0') +
                ' (capital $' + (datos.CAPITAL_TOTAL || '0') + '), ' +
                'a un plazo de ' + (datos.PLAZO || '1') + ' meses, ' +
                'con interés corriente de $' + (datos.INTERES_CORRIENTE || '0') +
                ' (castigo del ' + comoPorcentajeTexto(datos.PCT_CASTIGO_INT_CTE) + ') ' +
                'y de mora de $' + (datos.INTERES_MORA || '0') +
                ' (castigo del ' + comoPorcentajeTexto(datos.PCT_CASTIGO_INT_MORA) + '). ' +
                'Los intereses extracontables ascienden a $' + (datos.INTERESES_EXTRACONTABLES || '0') +
                ' (castigo del ' + comoPorcentajeTexto(datos.PCT_CASTIGO_EXTRAC) + '), ' +
                'con un castigo de capital del ' + comoPorcentajeTexto(datos.PCT_CASTIGO_CAPITAL) + '. ' +
                'Adicionalmente se contemplan otros cargos exigibles por $' + (datos.OTROS_CARGOS || '0') + '. ' +
                'La fecha de pago propuesta es ' + (datos.FECHA_PROMESA_DE_PAGO || 'por definir') +
                ', con honorarios de $' + (datos.VALOR_HONORARIOS || '0') + '.';
            setFieldValue('6e2616a1-ee70-4253-af29-c5dbe17b552c', detallePropuesta);
            console.log('Formato de Excepciones: campos poblados desde localStorage');
        }

        // --- marca visualmente los campos obligatorios, sin importar si ya tienen valor o no ---
        // (la validacion real de vacio/lleno ya la hace el boton de exportar antes de generar el excel)
        const idsCamposObligatorios = [
            'fcd6b207-25e5-4d5c-9388-17cf357c1880', // AREA DE GESTION
            'bb9bc9c6-ca21-45e8-a539-3bbe80e9aeb4', // ESTADO_OBLIGACION
            '9189be03-14d9-4cff-8cb0-5b2ff835e947', // COBERTURA
            'fa1b56c9-376c-4ad2-b3c2-cb7efd1c4e00', // FECHA_DESEMBOLSO
            '8ec77a93-fe9c-4b5d-ae7f-b56f8fdd8d2b', // VALOR_INICIAL_CUPO
            '82cc7235-51a2-44a2-9038-d2661f9ccfef', // SNR
            '37e118e1-5f67-4845-b522-4a8afb32d219', // FECHA_PAGO
            '7c123120-194d-4a14-b252-48b8f8bf1f1c', // %ADICIONAL_CON_BAJA_CUENTA
            'e5fb73cc-151a-4936-bcde-6cb844bd80a3', // % ADICIONAL A POLITICA
            'f29bf6b3-fdd1-4fcb-94e0-5462bd6814ee', // PROVISION
            '54509b6f-1f06-405b-8006-916a439f6213', // CALIFICACION
            'e435d78c-6c8b-49ff-b555-762f9cf42119'  // CAUSA DE LA MORA
        ];

        if (!document.getElementById('estiloCampoObligatorioFE')) {
            const estilo = document.createElement('style');
            estilo.id = 'estiloCampoObligatorioFE';
            estilo.innerHTML = '.campo-obligatorio-vacio-fe { border: 2px solid #e74c3c !important; background-color: #fdecea !important; }';
            document.head.appendChild(estilo);
        }

        idsCamposObligatorios.forEach(function (id) {
            const el = document.getElementById(id);
            if (!el) { return; }
            const widget = window.kendo ? kendo.widgetInstance(kendo.jQuery(el)) : null;
            if (widget && widget.wrapper) {
                // widgets de Kendo (DropDownList, ComboBox) esconden el elemento original y dibujan su propio wrapper visual
                widget.wrapper.addClass('campo-obligatorio-vacio-fe');
            } else {
                el.classList.add('campo-obligatorio-vacio-fe');
            }
        });

        // VALOR_INICIAL_CUPO es NOT NULL en la base de datos: si esta vacio, se le pone 0 para que
        // no falle el guardado, aunque quede marcado en rojo para que el agente lo corrija con el valor real
        const idValorInicialCupo = '8ec77a93-fe9c-4b5d-ae7f-b56f8fdd8d2b';
        const valorCupoActual = getFieldValue(idValorInicialCupo);
        if (valorCupoActual === null || valorCupoActual === undefined || valorCupoActual === '') {
            setFieldValue(idValorInicialCupo, 0);
        }

        console.log('Formato de Excepciones: campos obligatorios marcados');
    }, 600);
}