function ListHonorarios(mecanismo) {
    // Mostrar campos de honorarios sin data
    //console.log(e.value)
    debugger;
    const Safetext = val => typeof val === 'string' ? val : '';
    let valelist = e.value;
    let userCargado = sessionStorage.UserCargado;
    let mecanismos = Safetext(mecanismo);
    switch (mecanismos) {
        case "cancelacion":
            if (userCargado == "no") {
                // elementById Lista desplegable aplica o no aplica
                document.getElementById("bda37ca7-d503-4d41-8ff4-aebde2cb7c30").disabled = false;
                switch (valelist) {
                    case "No aplica":
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false)
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false)
                        break;
                    case "Honorarios":
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true)

                        break;
                    default: "1: No aplica"
                        visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false)
                        visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false)
                        visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false)
                        visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false)
                        visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false)
                        break;
                }
            } else {
                visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', true)
                visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', true)
                visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', true)
                visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', true)
                visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', true)
                document.getElementById("bda37ca7-d503-4d41-8ff4-aebde2cb7c30").disabled = true;

            }
            break;
        case "pagomora":

            if (userCargado == "no") {
                document.getElementById("e321eed7-845b-46e4-89f8-0bdf0c53e0e4").disabled = false;
                switch (valelist) {
                    case "No aplica":
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false)
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false)
                        break;
                    case "Honorarios":
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
                        break;
                    default: "1: No aplica"
                        visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false)
                        visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false)
                        visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false)
                        visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false)
                        break;
                }
            } else {
                visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
                visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
                visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
                visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
                document.getElementById("e321eed7-845b-46e4-89f8-0bdf0c53e0e4").disabled = true;
            }
            break;
        case "ampliacion":

            if (userCargado == "no") {
                document.getElementById("020563ab-b407-433b-bcf3-c534456818f3").disabled = false;
                switch (valelist) {
                    case "No aplica":
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', false)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', false)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', false)
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false)
                        break;
                    case "Honorarios":
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true)
                        break;
                    default: "1: No aplica"
                        visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', false)
                        visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', false)
                        visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', false)
                        visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', false)
                        break;
                }
            } else {
                visibilityField('d647e41b-7a50-46b0-ba5f-e30eeb44b463', true)
                visibilityField('e2a45a6f-d7e5-40ea-813f-cdbee2c58c4b', true)
                visibilityField('8e1dc11f-e65c-4141-a1d5-42850fd9b214', true)
                visibilityField('93f08e21-47c5-48ee-8acc-b093afe84a38', true)
                document.getElementById("020563ab-b407-433b-bcf3-c534456818f3").disabled = true;
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

    if (sessionStorage.TipProducto == "TARJETA") {
        tipolinea = "0000"
    }

    // valida si esta es honorarios 
    if (tipocobro == "HONORARIO" || tipocobro == "HONORARIOS") {
        // Se va habilitar el campo de list 
        const list = document.getElementById(honorarioslista);
        list.value = "2: Honorarios";
        list.disabled = true;

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
    try {
        debugger;
        let tipocartera = e.dataItem.TipoHonorarios;
        let query = `select ValorHonorarios,TipoHonorarios  from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '${tipocartera}'`
        let response = await execQuery(query)
        console.log(response[0][0])
        sessionStorage.PorcCartera = response[0][0].ValorHonorarios
        sessionStorage.TipoHonorarios = response[0][0].TipoHonorarios

        //let abonomax = getFieldValue("8f7266d7-dfc0-4ff4-afad-c50fbfa67062")
        //let pagoHonorarios = (abonomax * sessionStorage.PorcCartera) / 100
        //setFieldValue('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', pagoHonorarios)

    } catch (error) {
        console.error("Error al mostrar los campos:", error);
    }
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


// Value change
let mecanismoStora = sessionStorage.mecanismo
ListHonorarios(mecanismoStora);