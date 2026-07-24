function ListHonorarios(mecanismo) {
    // Mostrar campos de honorarios sin data
    //console.log(e.value)
    debugger;
    const Safetext = val => typeof val === 'string' ? val : '';
    let valelist = e.value;
    var tipoCobro = sessionStorage.TipoCobro;
    let userCargado = sessionStorage.UserCargado;
    let mecanismos = Safetext(mecanismo);
    let ListCan = document.getElementById("bda37ca7-d503-4d41-8ff4-aebde2cb7c30");
    let ListPago = document.getElementById("e321eed7-845b-46e4-89f8-0bdf0c53e0e4");
    let ListAmp = document.getElementById("020563ab-b407-433b-bcf3-c534456818f3");
    switch (mecanismos) {
        case "cancelacion":
            if (userCargado == "no") {
                // elementById Lista desplegable aplica o no aplica
                ListCan.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListCan.value = "1: No aplica";
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false)
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false)
                        break;
                    case "Honorarios":
                        ListCan.value = "2: Honorarios";
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true)

                        break;
                    case "Piloto-GXC":
                        ListCan.value = "3: Piloto-GXC";
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                        visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', true)
                        //visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true) se oculta para piloto GXC
                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true)
                ListCan.disabled = true;
                ListCan.value = "2: Honorarios";

            } else if (tipoCobro == "GASTOS_90") {
                ListCan.value = "3: Piloto-GXC";
                ListCan.disabled = true;
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                visibilityField('27cfef98-5ca4-415e-8149-7149479d487a', true)
                // visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true) se oculta para piloto GXC

            }
            break;
        case "pagomora":
            if (userCargado == "no") {
                ListPago.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListPago.value = "1: No aplica";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false)
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false)
                        break;
                    case "Honorarios":
                        ListPago.value = "2: Honorarios";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
                        break;
                    case "Piloto-GXC":
                        ListPago.value = "3: Piloto-GXC";
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                        //visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true) se oculta para piloto GXC
                        visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', true)
                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
                ListPago.disabled = true;
                ListPago.value = "2: Honorarios";

            } else if (tipoCobro == "GASTOS_90") {
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                //visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
                visibilityField('247db41e-ea0d-444b-b3d0-627aae51ecd0', true)
                ListPago.disabled = true;
                ListPago.value = "3: Piloto-GXC";
            }
            break;
        case "ampliacion":
            if (userCargado == "no") {
                ListAmp.disabled = false;
                switch (valelist) {
                    case "No aplica":
                        ListAmp.value = "1: No aplica";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', false)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', false)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', false)
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false)
                        break;
                    case "Honorarios":
                        ListAmp.value = "2: Honorarios";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true)
                        break;
                    case "Piloto-GXC":
                        ListAmp.value = "3: Piloto-GXC";
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                        visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', true)
                        //visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true) se oculta para piloto GXC
                        break;
                }
            } else if (tipoCobro == "HONORARIOS") {
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true)
                ListAmp.disabled = true;
                ListAmp.value = "2: Honorarios";

            } else if (tipoCobro == "GASTOS_90") {
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                visibilityField('7ba8643d-9438-4ade-bb3f-bab7948e2cbf', true)
                //visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true) se oculta para piloto GXC
                ListAmp.disabled = true;
                ListAmp.value = "3: Piloto-GXC";
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
    debugger

    console.log([honorarioslista, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera, mecanismo]);
    //valida si existen los elementos 

    if (!(honorarioslista && idlineaKendo && idTipoCarteraKendo)) {
        console.error("No se enviaron los uid de los elementos")

    }
    // VALIDACION CUANDO SON TARGETA Y SON 0900 LA LINEA
    if (sessionStorage.TipProducto == "TARJETA") {
        tipolinea = "0000"
    }
    // VALIDACION PARA CUANDO APLICA EL 22,5 Y EL MECANISMO TRAE PAGO
    if (tipocartera == "CONSUMO" && sessionStorage.PorcAmpliacionIntCte == 100 && mecanismo == "ampliacion" && tipocobro != "GASTOS_90") {
        sessionStorage.AmpliConsumo185 = 'true';
        tipocartera = 'CONSUMO';
    } else if (sessionStorage.pidepago == "si" && tipocartera == "CONSUMO") {
        tipocartera = 'CONSUMO-CAMPAÑA';
    }
    ListHonorarios(mecanismo);
    // valida si esta es honorarios 
    if (tipocobro == "HONORARIOS" || tipocobro == "GASTOS_90") {
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
            x => x.TipoHonorarios === tipocartera
        );
        console.log(item2)
        if (item2) {
            dropDownList2.value(item2.Id);
            dropDownList2.trigger("change");
        }
        ListHonorarios(mecanismo);

    }


}

function honoraVacios() {
}
async function calculoHonorarios() {
    debugger;
    delete sessionStorage.PorcCarteraAplicoAmpliacion;
    var tipoCobro = sessionStorage.TipoCobro;
    let PidePago = sessionStorage.pidepago;
    let tipocartera = e.dataItem.TipoHonorarios;
    if (PidePago && tipocartera == "CONSUMO") {
        tipocartera = 'CONSUMO-CAMPAÑA'
    }

    if (sessionStorage.PorcAmpliacionIntCte == 100 && sessionStorage.AmpliConsumo185 == 'true') {
        tipocartera = 'CONSUMO';
        try {
            let query = `select ValorHonorarios,TipoHonorarios from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '${tipocartera}'`
            let response = await execQuery(query)
            console.log(response[0][0])
            sessionStorage.PorcCarteraAplicoAmpliacion = response[0][0].ValorHonorarios
            sessionStorage.TipoHonorarios = response[0][0].TipoHonorarios

        } catch (error) {
            console.error("Error al mostrar los campos:", error);
        }
    } else if (tipoCobro == "GASTOS_90") {
        RecalcularPilotoGXC();
    } else if (tipoCobro == "HONORARIOS") {
        try {
            let query = `select ValorHonorarios,TipoHonorarios from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '${tipocartera}'`
            let response = await execQuery(query)
            console.log(response[0][0])
            sessionStorage.PorcCartera = response[0][0].ValorHonorarios
            sessionStorage.TipoHonorarios = response[0][0].TipoHonorarios

        } catch (error) {
            console.error("Error al mostrar los campos:", error);
        }
    }


}

// para piloto gxc
function RecalcularPilotoGXC() {
    debugger;
    // Obtener días de mora: si MoraObl existe en sessionStorage se usa ese valor, si no se toma del evento
    var diaMora = sessionStorage.MoraObl !== undefined ? parseFloat(sessionStorage.MoraObl) : parseFloat(e.value);

    if (!diaMora && diaMora !== 0) {
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
    sessionStorage.PorcCartera = porcentaje * 100;
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
let mecanismoStora = sessionStorage.mecanismo
ListHonorarios(mecanismoStora);