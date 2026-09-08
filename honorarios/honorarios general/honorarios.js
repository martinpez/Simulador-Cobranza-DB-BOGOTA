function ListHonorarios(mecanismo) {
    // Mostrar campos de honorarios sin data
    //console.log(e.value)

    const Safetext = val => typeof val === 'string' ? val : '';
    let valelist = e.value;
    var tipoCobro = sessionStorage.TipoCobro;
    let userCargado = sessionStorage.UserCargado ;
    let mecanismos = Safetext(mecanismo);
    let ListCan = document.getElementById("bda37ca7-d503-4d41-8ff4-aebde2cb7c30"); // lista desplegable
    let ListPago = document.getElementById("e321eed7-845b-46e4-89f8-0bdf0c53e0e4");
    let ListAmp = document.getElementById("020563ab-b407-433b-bcf3-c534456818f3");

    switch (mecanismos) {
        case "cancelacion":
            const inputHonorariosCan = document.getElementById("a0a2b9b0-17cc-41fe-be98-2ac2157e33ef");
            const inputMaximoCan = document.getElementById("9ee8ee24-5ae5-42da-83c5-36948592e72b");
            if (userCargado == "no") {
                // elementById Lista desplegable aplica o no aplica
                ListCan.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListCan.value = "1: No aplica";
                        ListCan.disabled = false;
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false) // Campo valor maximo honorarios
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false) //Campo Honorarios confirm
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false) //Campo pago minimo
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false) //Campo linea
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false) //Campo tipo cartera
                        visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', false) //Campo Días de mora
                        break;
                    case "Honorarios":
                        ListCan.value = "2: Honorarios";
                        sessionStorage.TipoCobro = "HONORARIOS";
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true) // Campo valor maximo honorarios
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true) //Campo Honorarios confirm
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true) //Campo pago minimo
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true) //Campo linea
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true) //Campo tipo cartera
                        visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', false) //Campo Días de mora
                        // Honorarios
                        if (inputHonorariosCan) {
                            const container = inputHonorariosCan.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Honorarios";
                            }
                        }
                        // Valor Honorarios Máximo
                        if (inputMaximoCan) {
                            const container = inputMaximoCan.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Honorarios Máximo";
                            }
                        }
                        break;
                    case "Piloto-GXC":
                        ListCan.value = "3: Piloto-GXC";
                        sessionStorage.TipoCobro = "GASTOS_90";
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true) // Campo valor maximo honorarios
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true) //Campo Honorarios confirm
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true) //Campo pago minimo
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true) //Campo linea
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false) //Campo tipo cartera
                        visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', true) //Campo Días de mora

                        if (inputHonorariosCan) {
                            const container = inputHonorariosCan.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Gastos GXC:";
                            }
                        }
                        // Valor Honorarios Máximo
                        if (inputMaximoCan) {
                            const container = inputMaximoCan.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Máximo Pilotos";
                            }
                        }

                        //visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true) se oculta para piloto GXC
                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true) // Campo valor maximo honorarios
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true) //Campo Honorarios confirm
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true) //Campo pago minimo
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true) //Campo linea
                visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true) //Campo tipo cartera
                visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', false) //Campo Días de mora
                ListCan.disabled = true;
                ListCan.value = "2: Honorarios";
                if (inputHonorariosCan) {
                    const container = inputHonorariosCan.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Honorarios";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximoCan) {
                    const container = inputMaximoCan.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Honorarios Máximo";
                    }
                }
            } else if (tipoCobro == "GASTOS_90") {
                ListCan.value = "3: Piloto-GXC";
                ListCan.disabled = true;
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true) // Campo valor maximo honorarios
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true) //Campo Honorarios confirm
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true) //Campo pago minimo
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true) //Campo linea
                visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false) //Campo tipo cartera
                visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', true) //Campo Días de mora
                if (inputHonorariosCan) {
                    const container = inputHonorariosCan.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Gastos GXC:";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximoCan) {
                    const container = inputMaximoCan.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Máximo Pilotos";
                    }
                }

            } else {
                ListCan.value = "1: No aplica";
                ListCan.disabled = true;
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false)
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false)
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false)
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false)
                visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false)
                visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', false)
            }
            break;
        case "pagomora":
            const inputHonorarios = document.getElementById("ae33bcc4-183a-47de-a6c8-f4ecc44be169");
            const inputMaximo = document.getElementById("993c55c0-8b02-4be9-a122-d7ec2cf5f87e");
            if (userCargado == "no") {
                ListPago.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListPago.value = "1: No aplica";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false) // Campo valor maximo honorarios
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false) //Campo Honorarios confirm
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false) // Campo Linea
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false) //Campo tipo cartera
                        visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', false) //Campo Dias de mora
                        break;
                    case "Honorarios":
                        ListPago.value = "2: Honorarios";
                        sessionStorage.TipoCobro = "HONORARIOS";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true) // Campo valor maximo honorarios
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true) //Campo Honorarios confirm
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true) // Campo Linea
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true) //Campo tipo cartera
                        visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', false) //Campo Dias de mora
                        // Honorarios
                        if (inputHonorarios) {
                            const label = inputHonorarios
                                .closest(".col-xs-12")
                                ?.querySelector("label span");

                            if (label) {
                                label.textContent = "Honorarios:";
                            }
                        }
                        // Valor Honorarios Máximo
                        if (inputMaximo) {
                            const label = inputMaximo
                                .closest(".col-xs-12")
                                ?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Maximo Honorarios";
                            }
                        }
                        break;
                    case "Piloto-GXC":
                        ListPago.value = "3: Piloto-GXC";
                        sessionStorage.TipoCobro = "GASTOS_90";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true) // Campo valor maximo honorarios
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true) //Campo Honorarios confirm
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true) // Campo Linea
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false) //Campo tipo cartera
                        visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', true) //Campo Dias de mora
                        // Honorarios
                        if (inputHonorarios) {
                            const label = inputHonorarios
                                .closest(".col-xs-12")
                                ?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor GXC Piloto:";
                            }
                        }

                        // Valor Honorarios Máximo
                        if (inputMaximo) {
                            const label = inputMaximo
                                .closest(".col-xs-12")
                                ?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Maximo Pilotos";
                            }
                        }

                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                ListPago.disabled = true;
                ListPago.value = "2: Honorarios";
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true) // Campo valor maximo honorarios
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true) //Campo Honorarios confirm
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true) // Campo Linea
                visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true) //Campo tipo cartera
                visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', false) //Campo Dias de mora
                // Honorarios
                if (inputHonorarios) {
                    const label = inputHonorarios
                        .closest(".col-xs-12")
                        ?.querySelector("label span");

                    if (label) {
                        label.textContent = "Honorarios:";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximo) {
                    const label = inputMaximo
                        .closest(".col-xs-12")
                        ?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Maximo Honorarios";
                    }
                }

            } else if (tipoCobro == "GASTOS_90") {
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true) // Campo valor maximo honorarios
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true) //Campo Honorarios confirm
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true) // Campo Linea
                visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false) //Campo tipo cartera
                visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', true) //Campo Dias de mora
                ListPago.disabled = true;
                ListPago.value = "3: Piloto-GXC";
                if (inputHonorarios) {
                    const label = inputHonorarios
                        .closest(".col-xs-12")
                        ?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor GXC Piloto:";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximo) {
                    const label = inputMaximo
                        .closest(".col-xs-12")
                        ?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Maximo Pilotos";
                    }
                }
            } else {
                ListPago.disabled = true;
                ListPago.value = "1: No aplica";
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false) // Campo valor maximo honorarios
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false) //Campo Honorarios confirm
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false) // Campo Linea
                visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false) //Campo tipo cartera
                visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', false) //Campo Dias de mora
            }
            break;
        case "ampliacion":
            const inputHonorariosAM = document.getElementById("e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b");
            const inputMaximoAM = document.getElementById("d647e41b-7a50-46b0-ba5f-e30eeb44b463");
            if (userCargado == "no") {
                ListAmp.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListAmp.value = "1: No aplica";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', false) // Campo valor maximo honorarios
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', false) // Campo honorarios
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', false) // Campo Linea
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false) // Campo tipo cartera
                        visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', false) //Campo dias de mora
                        break;
                    case "Honorarios":
                        ListAmp.value = "2: Honorarios";
                        sessionStorage.TipoCobro = "HONORARIOS";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true) // Campo valor maximo honorarios
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true) // Campo honorarios
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true) // Campo Linea
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true) // Campo tipo cartera
                        visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', false) //Campo dias de mora
                        // Honorarios
                        if (inputHonorariosAM) {
                            const container = inputHonorariosAM.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Honorarios";
                            }
                        }
                        // Valor Honorarios Máximo
                        if (inputMaximoAM) {
                            const container = inputMaximoAM.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Honorarios Máximo";
                            }
                        }
                        break;
                    case "Piloto-GXC":
                        ListAmp.value = "3: Piloto-GXC";
                        sessionStorage.TipoCobro = "GASTOS_90";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true) // Campo valor maximo honorarios
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true) // Campo honorarios
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true) // Campo Linea
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false) // Campo tipo cartera
                        visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', true) //Campo dias de mora
                        if (inputHonorariosAM) {
                            const container = inputHonorariosAM.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor GXC Piloto:";
                            }
                        }
                        // Valor Honorarios Máximo
                        if (inputMaximoAM) {
                            const container = inputMaximoAM.closest(".col-xs-12");
                            const label = container?.querySelector("label span");

                            if (label) {
                                label.textContent = "Valor Maximo Pilotos";
                            }
                        }
                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                ListAmp.disabled = true;
                ListAmp.value = "2: Honorarios";
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true) // Campo valor maximo honorarios
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true) // Campo honorarios
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true) // Campo Linea
                visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true) // Campo tipo cartera
                visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', false) //Campo dias de mora
                if (inputHonorariosAM) {
                    const container = inputHonorariosAM.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Honorarios";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximoAM) {
                    const container = inputMaximoAM.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Honorarios Máximo";
                    }
                }

            } else if (tipoCobro == "GASTOS_90") {
                ListAmp.disabled = true;
                ListAmp.value = "3: Piloto-GXC";
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true) // Campo valor maximo honorarios
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true) // Campo honorarios
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true) // Campo Linea
                visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false) // Campo tipo cartera
                visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', true) //Campo dias de mora
                if (inputHonorariosAM) {
                    const container = inputHonorariosAM.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor GXC Piloto:";
                    }
                }
                // Valor Honorarios Máximo
                if (inputMaximoAM) {
                    const container = inputMaximoAM.closest(".col-xs-12");
                    const label = container?.querySelector("label span");

                    if (label) {
                        label.textContent = "Valor Maximo Pilotos";
                    }
                }

            } else {
                ListAmp.disabled = true;
                ListAmp.value = "1: No aplica";
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', false) // Campo valor maximo honorarios
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', false) // Campo honorarios
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', false) // Campo Linea
                visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false) // Campo tipo cartera
                visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', false) //Campo dias de mora

            }
            break;
        default:
            console.error("Mecanismo no reconocido");
    }
}

function vacia() {
}
async function CargaCamposHonorarios(honorarioslista, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera, mecanismo) {
    // Funcion que va servir para cargar cualquier honorarios 
    // todos tienen 3 campos que se van a precargar check, linea , tipo cartera
    // se debe enviar los id de los campos de check, linea , tipo cartera
    debugger;

    const tipoCobro = String(tipocobro || '').toUpperCase();
    console.log([honorarioslista, idlineaKendo, idTipoCarteraKendo, tipoCobro, tipolinea, tipocartera, mecanismo]);
    //valida si existen los elementos 

    if (!(honorarioslista && idlineaKendo && idTipoCarteraKendo)) {
        console.error("No se enviaron los uid de los elementos")

    }
    // VALIDACION CUANDO SON TARJETA Y SON 0900 LA LINEA
    if (sessionStorage.TipProducto == "TARJETA") {
        tipolinea = "0000"
    }
    // El tipo recibido del cliente no se modifica; solo se define el valor
    // que debe consultar y seleccionar en la lista.
    let tipocarteraconsulta = tipocartera;
    if (tipoCobro == "HONORARIOS") {
        if (mecanismo == "ampliacion" && tipocartera == "CONSUMO" &&
            sessionStorage.PorcAmpliacionIntCte != 100) {
            sessionStorage.AmpliConsumo205 = 'true';
            tipocarteraconsulta = 'CAMPAÑA';
        } else if (tipocartera == "CONSUMO" && sessionStorage.pidepago == "si" && mecanismo != "ampliacion") {
            tipocarteraconsulta = 'CAMPAÑA';
        }
    }
    if (tipoCobro == "HONORARIOS") {
        await calculoHonorarios(mecanismo, tipocarteraconsulta);
    }
    ListHonorarios(mecanismo);
    // valida si esta es honorarios 
    if (tipoCobro == "HONORARIOS") {
        //Tipo de linea
        try {
            let query = `SELECT NomProductos FROM SimiladorDNC_Lappiz_LineaProducto WHERE CodCodigo = '${tipolinea}'`
            let response = await execQuery(query)
            console.log(response[0][0])
            let response_nombre = response[0][0].NomProductos
            var dropDownList1 = kendo.jQuery(idlineaKendo).data("kendoDropDownList");
            // Busca el item por el valor de la propiedad NomProductos
            var item = dropDownList1.dataSource.data().find(
                x => x.NomProductos === response_nombre
            );

            if (item) {
                dropDownList1.value(item.Id);
                dropDownList1.trigger("change");
            }


        } catch (error) {
            console.error("Error al mostrar los campos:", error);
        }

        // tipo de cartera 
        var dropDownList2 = kendo.jQuery(idTipoCarteraKendo).data("kendoDropDownList");
        var item2 = dropDownList2.dataSource.data().find(
            x => x.TipoHonorarios === tipocarteraconsulta
        );
        console.log(item2)
        if (item2) {
            dropDownList2.value(item2.Id);
            dropDownList2.trigger("change");
        }

    }

}


function honoraVacios() {
}
async function calculoHonorarios(mecanismo, tipocartera) {
    debugger;
    mecanismo = mecanismo || sessionStorage.mecanismo;
    const PidePago = sessionStorage.pidepago;
    const tipoCarteraOriginal = tipocartera || e.dataItem.TipoHonorarios;
    let clavePorcentaje;
    let claveTipoHonorarios;
    let claveConsulta;

    switch (mecanismo) {
        case "pagomora":
            clavePorcentaje = "PorcCarteraPagoMora";
            claveTipoHonorarios = "TipoHonorariosPagoMora";
            claveConsulta = "ConsultaHonorariosPagoMora";
            break;
        case "cancelacion":
            clavePorcentaje = "PorcCarteraCancelacion";
            claveTipoHonorarios = "TipoHonorariosCancelacion";
            claveConsulta = "ConsultaHonorariosCancelacion";
            break;
        case "ampliacion":
            clavePorcentaje = "PorcCarteraAmpliacion";
            claveTipoHonorarios = "TipoHonorariosAmpliacion";
            claveConsulta = "ConsultaHonorariosAmpliacion";
            break;
        default:
            console.warn("Mecanismo no reconocido:", mecanismo);
            return;
    }


    // sessionStorage distingue una clave existente aunque su valor sea 0.
    // La marca pendiente evita consultas duplicadas por los trigger("change").
    if (sessionStorage.getItem(clavePorcentaje) !== null && sessionStorage.getItem(claveConsulta) === "si") {
        return;
    }

    let tipoCarteraConsulta = tipoCarteraOriginal;
    switch (mecanismo) {
        case "pagomora":
        case "cancelacion":
            if (PidePago == "si") {
                tipoCarteraConsulta = "CAMPAÑA";
            }
            break;
        case "ampliacion":
            if (sessionStorage.AmpliConsumo205 == "true") {
                tipoCarteraConsulta = "CAMPAÑA";
            } else if (tipoCarteraOriginal == "CAMPAÑA" && PidePago == "si") {
                break;
            }
    }

    sessionStorage.setItem(claveConsulta, "si");
    try {
        let query = `select ValorHonorarios,TipoHonorarios from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '${tipoCarteraConsulta}'`;
        let response = await execQuery(query)
        debugger;
        console.log(response[0][0]);
        sessionStorage.setItem(clavePorcentaje, response[0][0].ValorHonorarios);
        sessionStorage.setItem(claveTipoHonorarios, response[0][0].TipoHonorarios);
    } catch (error) {
        console.error("Error al consultar el valor de honorarios:", error);
    } finally {
        sessionStorage.removeItem(claveConsulta);
    }

}
// para piloto gxc
async function RecalcularPilotoGXC(mecanismo, tipolinea) {
    debugger;
    mecanismo = mecanismo || sessionStorage.mecanismo;
    let clavePorcentaje;
    let campoDiasMora;
    let idkendo;

    switch (mecanismo) {
        case "pagomora":
            clavePorcentaje = "PorcCarteraPagoMora";
            campoDiasMora = "247db41e-ea0d-444b-b3d0-627aae51ecd0";
            idkendo = "#9ccfa8bd-4060-4aa1-b437-4528d6f9bc35";
            break;
        case "cancelacion":
            clavePorcentaje = "PorcCarteraCancelacion";
            campoDiasMora = "27cfef98-5ca4-415e-8149-7149479d487a";
            idkendo = "#8e8d6cf2-299c-4b45-8059-64cf50b2bd11";
            break;
        case "ampliacion":
            clavePorcentaje = "PorcCarteraAmpliacion";
            campoDiasMora = "7ba8643d-9438-4ade-bb3f-bab7948e2cbf";
            idkendo = "#8e1dc11f-e65c-4141-a1d5-42850fd9b214";
            break;
        default:
            console.warn("Mecanismo no reconocido para piloto GXC:", mecanismo);
            return;
    }

    if (tipolinea !== undefined) {
        // VALIDACION CUANDO SON TARJETA Y SON 0900 LA LINEA
        if (sessionStorage.TipProducto == "TARJETA") {
            tipolinea = "0000"
        }
        try {
            let query = `SELECT NomProductos FROM SimiladorDNC_Lappiz_LineaProducto WHERE CodCodigo = '${tipolinea}'`
            let response = await execQuery(query)
            console.log(response[0][0])
            let response_nombre = response[0][0].NomProductos
            var dropDownList1 = kendo.jQuery(idkendo).data("kendoDropDownList");
            // Busca el item por el valor de la propiedad NomProductos
            var item = dropDownList1.dataSource.data().find(
                x => x.NomProductos === response_nombre
            );

            if (item) {
                dropDownList1.value(item.Id);
                dropDownList1.trigger("change");
            }


        } catch (error) {
            console.error("Error al mostrar los campos:", error);
        }
    }

    if (String(sessionStorage.TipoCobro || '').toUpperCase() != "GASTOS_90") {
        return;
    }

    // Siempre se toma el valor actual del campo del mecanismo correspondiente.
    var diaMora = parseFloat(getFieldValue(campoDiasMora));
    if (isNaN(diaMora)) {
        diaMora = sessionStorage.MoraObl !== undefined ? parseFloat(sessionStorage.MoraObl) : parseFloat(e.value);
    }

    if (isNaN(diaMora)) {
        console.warn("No se tiene dias de mora");
        return;
    }

    // Obtener la lista de rangos almacenada en sessionStorage (guardada como JSON en traeratadebase.jsx)
    var rangoConbranzas = JSON.parse(sessionStorage.pilotosDias || "[]");

    // Buscar el rango cuyo minDias <= diaMora <= maxDias
    var rangoEncontrado = rangoConbranzas.find(function (rango) {
        return diaMora >= rango.minDias && diaMora <= rango.maxDias;
    });

    if (!rangoEncontrado) {
        console.warn("No se encontró un rango de cobranza para " + diaMora + " días de mora");
        return;
    }

    var porcentaje = rangoEncontrado.porcAbonoMinimo;
    console.log("Días de mora: " + diaMora + " | Rango: " + rangoEncontrado.minDias + " - " + rangoEncontrado.maxDias + " | Porcentaje: " + porcentaje + "%");

    // Guardar el porcentaje encontrado para usarlo en los cálculos siguientes
    sessionStorage.setItem(clavePorcentaje, porcentaje * 100);
}



function recalculoHonorariosMora() {
    const safeNumber = val => isNaN(parseFloat(val)) ? 0 : parseFloat(val);
    let abonoMaxHonorarios = safeNumber(getFieldValue("993c55c0-8b02-4be9-a122-d7ec2cf5f87e"));
    let honoConfirm = safeNumber(getFieldValue("ae33bcc4-183a-47de-a6c8-f4ecc44be169"));
    if (honoConfirm > abonoMaxHonorarios) {
        toastr.error('El valor no puede ser mayor al abono maximo permitido de $' + abonoMaxHonorarios);
        setFieldValue('ae33bcc4-183a-47de-a6c8-f4ecc44be169', abonoMaxHonorarios);
    }

    RecalculosMora();
}

function recalculoHonorariosCancelacion() {
    const safeNumber = val => isNaN(parseFloat(val)) ? 0 : parseFloat(val);
    let abonoMaxHonorarios = safeNumber(getFieldValue("9ee8ee24-5ae5-42da-83c5-36948592e72b"));
    let honoConfirm = safeNumber(getFieldValue("a0a2b9b0-17cc-41fe-be98-2ac2157e33ef"));
    if (honoConfirm > abonoMaxHonorarios) {
        toastr.error('El valor no puede ser mayor al abono maximo permitido de $' + abonoMaxHonorarios);
        setFieldValue('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', abonoMaxHonorarios);
    }

    recalcularcancelacion();
}

function recalculoHonorariosAmpliacion() {
    debugger;
    const safeNumber = val => isNaN(parseFloat(val)) ? 0 : parseFloat(val);
    let abonoMaxHonorarios = safeNumber(getFieldValue("d647e41b-7a50-46b0-ba5f-e30eeb44b463"));
    let honoConfirm = safeNumber(getFieldValue("e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b"));
    if (honoConfirm > abonoMaxHonorarios) {
        toastr.error('El valor no puede ser mayor al abono maximo permitido de $' + abonoMaxHonorarios);
        setFieldValue('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', abonoMaxHonorarios);
    }
    _recalcularTodo()
}

// Value change 52339224,  17151899 , 1005000537, 91524438 ,71364491
// let mecanismoStora = sessionStorage.mecanismo
// ListHonorarios(mecanismoStora);
