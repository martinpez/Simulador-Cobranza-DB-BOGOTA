async function DataEventoGeneral() {
    await sessionStorage.getItem("mecanismo").then(mecanismo => {
        switch (mecanismo) {
            case "consolidacion":
                funDataGenerica();
                break;
            case "novacion":
                funDataGenerica();
                DataFunNovacion();
                loadModalFun("novacion", "btnEvnFun");
                break;
            case "pagoMora":
                funDataGenerica();
                break;
            case "cancelacion":
                funDataGenerica();
                break;
            case "ampliacion":
                funDataGenerica();
                break;
            default:
                console.warn("Mecanismo no reconocido:", mecanismo);
        }
    }).catch(err => console.error("Error al obtener mecanismo:", err));
}


function funDataGenerica() {
    // Evento de la fecha
    function setCurrentDate() {
        const today = new Date();
        document.getElementById('day').textContent = today.getDate();
        document.getElementById('month').textContent = today.getMonth() + 1;
        document.getElementById('year').textContent = today.getFullYear();
    }
    function data() {
        var Oficina = document.getElementById("9552efdb-f91c-4e51-9f55-230282926b12").selectedOptions[0].innerHTML || "";
        var NomOficina = document.getElementById("bd198dd5-328d-4ded-a3b4-b23adfad423a").value || "";
        var cuetapago = document.getElementById("685c5e9d-4409-4d4c-a11e-a0c17dcedb02").value || "";
        // 1. Obtenemos el objeto del sessionStorage
        let userObj = JSON.parse(sessionStorage.getItem("LappizUser") || "{}");
        if (userObj.FullName) {
            // 2. Dividimos por la coma
            let partes = userObj.FullName.split(','); // ["Perez Mercado", " Martin Elias"]

            if (partes.length === 2) {
                // 3. Limpiamos espacios y reordenamos: Nombre + " " + Apellido
                let apellidos = partes[0].trim();
                let nombres = partes[1].trim();
                var nombreAsesor = `${nombres} ${apellidos}`;
                console.log("Nombre arreglado:", nombreAsesor);
            } else {
                var nombreAsesor = userObj.FullName;
            }
        }
        var nombreCliente = document.getElementById("1ad60ed2-e515-4164-8270-54efa1e574fa").value || "";
        var tipodoc = document.getElementById("15fb0de1-4989-4986-a662-61fb88b3aba1").value.replace(/^\d+:/, "") || "";
        var numeroDoc = document.getElementById("75fda36b-9317-4062-93d7-26d45e6188d6").value || "";
        const lugarExp = document.querySelector("#d8faf1c6-44fb-4bd9-93ca-aac3c9ef6ab3").selectedOptions[0].innerText;
        const fechaExp = document.querySelector(
            '[id="64b5c3a4-2d66-4e35-97af-8a9405f0cf63"] input'
        ).value.replaceAll('-', ' ');
        var edadMora = sessionStorage.getItem("EdadMoraCl") || "";
        return {
            codOficina: Oficina,
            nombreOficina: NomOficina,
            cuentaPago: cuetapago,
            nombreAsesor: nombreAsesor,
            nombreCliente: nombreCliente,
            tipoDoc: tipodoc,
            numDoc: numeroDoc,
            lugarExp: lugarExp,
            fechaExp: fechaExp,
            diasMora: edadMora
        }
    }
    function loadFormData(data) {
        document.getElementById("codOficina").textContent = data.codOficina;
        document.getElementById("nombreOficina").textContent = data.nombreOficina;
        document.getElementById("cuentaPago").textContent = data.cuentaPago;
        document.getElementById("funcionario").textContent = data.nombreAsesor;
        document.getElementById("nombreCliente").textContent = data.nombreCliente;
        document.getElementById("tipoDoc").textContent = data.tipoDoc;
        document.getElementById("numDoc").textContent = data.numDoc;
        document.getElementById("lugarExp").textContent = data.lugarExp;
        document.getElementById("fechaExp").textContent = data.fechaExp;
        document.getElementById("diasMora").textContent = data.diasMora;
    }
    setTimeout(() => {
        loadFormData(data());
        setCurrentDate();
        console.log("Datos cargados en el formulario.");
        console.log("Datos:", data());
    }, 500);

}

function DataFunNovacion() {
    function dataNova() {
        var descripcionActividad = document.getElementById("13a8a1c2-3026-481b-bddb-d62c2f321d2c").selectedOptions[0].innerText || "";
        var ingresoMensual = document.getElementById("e1b74a38-af43-4dbe-ae4e-8430eda34573").value || "$";
        var ocupacionAdicional = document.getElementById("10d62ee5-6dc2-4452-9a91-e8acae95a3d3").selectedOptions[0].innerText || "";
        var ingresosAdicionales = document.getElementById("3f181299-b8fb-437e-aaa1-e21af8c747d1").value || "$";
        var numObligacion = document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value == "" ? document.getElementById("caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0].innerText : document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value;
        var saldoTotal = document.getElementById("616e6102-56e5-48e9-bfc2-fce8497e629d").getAttribute("aria-valuenow") || "$"
        var pagoMinimo = document.getElementById("1f7c2b79-87a6-402f-95f2-414aea88a4bf").getAttribute("aria-valuenow") || "$"
        var fechaPago =
            document.querySelector("#\\35 c6f6251-9091-496a-966a-9bf0fb0eedcf input")
                .value.replaceAll('-', ' ');
        var pagoNegociacion = document.getElementById("92bcba6d-4dab-459e-bd8f-164da7eeb526").getAttribute("aria-valuenow") || "$"
        var plazo = document.getElementById("9382c5a1-0445-4ed9-a785-850d06da2cd2").selectedOptions[0].innerText || "";
        var tasaMV = document.getElementById("b76668b5-0710-4eee-9718-a2633605c35e").value || "";
        var saldoDiferir = document.getElementById("c6923383-8eec-4efe-81a5-954ce52b8882").value || "$";
        var cuotaProyectada = document.getElementById("d157fb29-fd6f-450b-b637-8fa18c824cd2").value || "$";
        var pregunta1 = document.getElementById("pregunta1").value || "";
        var pregunta2 = document.getElementById("pregunta2").value || "";
        var pregunta3 = document.getElementById("pregunta3").value || "";
        var pregunta4 = document.getElementById("pregunta4").value || "";
        var garantiaFAG = document.getElementById("garantiaFAG").value || "";
        var garantiaFNG = document.getElementById("garantiaFNG").value || "";
        var observaciones = document.getElementById("4b025de3-4404-41f3-8ba8-ac9b0988391e").value || "";

        return {
            descripcionActividad: descripcionActividad,
            ingresoMensual: ingresoMensual,
            ocupacionAdicional: ocupacionAdicional,
            ingresosAdicionales: ingresosAdicionales,
            numObligacion: numObligacion,
            saldoTotal: saldoTotal,
            pagoMinimo: pagoMinimo,
            fechaPago: fechaPago,
            pagoNegociacion: pagoNegociacion,
            plazo: plazo + ' meses',
            tasaMV: tasaMV,
            saldoDiferir: saldoDiferir,
            cuotaProyectada: cuotaProyectada,
            pregunta1: pregunta1,
            pregunta2: pregunta2,
            pregunta3: pregunta3,
            pregunta4: pregunta4,
            garantiaFAG: garantiaFAG,
            garantiaFNG: garantiaFNG,
            observaciones: observaciones,

        }
    }
    function loadFormData(data) {
        document.getElementById("descripcionActividad").textContent = data.descripcionActividad;
        document.getElementById("ingresoMensual").textContent = data.ingresoMensual;
        document.getElementById("ocupacionAdicional").textContent = data.ocupacionAdicional;
        document.getElementById("ingresosAdicionales").textContent = data.ingresosAdicionales;
        document.getElementById("numObligacion").textContent = data.numObligacion;
        document.getElementById("saldoTotal").textContent = data.saldoTotal;
        document.getElementById("pagoMinimo").textContent = data.pagoMinimo;
        document.getElementById("fechaPago").textContent = data.fechaPago;
        document.getElementById("pagoNegociacion").textContent = data.pagoNegociacion;
        document.getElementById("plazo").textContent = data.plazo;
        document.getElementById("tasaMV").textContent = data.tasaMV;
        document.getElementById("saldoDiferir").textContent = data.saldoDiferir;
        document.getElementById("cuotaProyectada").textContent = data.cuotaProyectada;
        document.getElementById("pregunta1").textContent = data.pregunta1;
        document.getElementById("pregunta2").textContent = data.pregunta2;
        document.getElementById("pregunta3").textContent = data.pregunta3;
        document.getElementById("pregunta4").textContent = data.pregunta4;
        document.getElementById("garantiaFAG").textContent = data.garantiaFAG;
        document.getElementById("garantiaFNG").textContent = data.garantiaFNG;
        document.getElementById("observaciones").textContent = data.observaciones;
    }
    setTimeout(() => {
        loadFormData(dataNova());
        console.log("Datos para novacion cargados");
        console.log("Datos:", dataNova());
    }, 500);
}

$(document).on('click', '#btnEvnFun', function () {
    console.log("Btn fun pulsado");
    try {
        DataEventoGeneral();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

function loadModalFun(mecanismo) {
    document.addEventListener('DOMContentLoaded', () => {

        const modal = document.getElementById('modal' + mecanismo);

        if (modal) {
            // con esto se asegura que la data se haya cargado antes de abrir el modal
            setTimeout(() => {
                modal.showModal();
            }, 700);

            // Cerrar al hacer clic fuera (en el backdrop)
            modal.addEventListener('click', (event) => {

                if (event.target === modal) {
                    modal.close();
                }
            });

            console.log("Sistema de modal listo");

        } else {

            console.error("Error: No se encontró el dialog con id='modal" + mecanismo + "'");
        }
    });
}


$(document).on('click', '#btnConfirmaFun', function () {
    console.log("Btn confirma pulsado");
    var mecanismo = sessionStorage.getItem("mecanismo").toLocaleLowerCase();
    sendDataFunPDF(mecanismo);
});

function sendDataFunPDF(mecanismo) {
    const element = document.getElementById('contenedor' + mecanismo + 'PDF');

    const options = {
        margin: [2, 2, 2, 2],                    // márgenes pequeños pero limpios
        filename: 'Solicitud_Normalizacion_' + mecanismo + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            scrollY: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',           // ← Cambio clave (A4 es más alto)
            orientation: 'portrait'
        }
    };

    html2pdf()
        .set(options)
        .from(element)
        .save()
        .catch(err => console.error("Error al generar PDF:", err));

    var cc = document.getElementById("75fda36b-9317-4062-93d7-26d45e6188d6").value
    let email = document.getElementById("75fda36b-9317-4062-93d7-26d45e6188d6").value;
    let subject = mecanismo + 'fun cliente' + cc;
    let text = 'Se ha generado una solicitud de normalización para el cliente ' + cc + ' con el mecanismo ' + mecanismo;
    let HTML = `<h1>Design great ideas with HTML to personalize the different 
emails you will send to your team.
Worry about your business, leave the code to Lapiz</h1>`;
    let cc = ["PVELEZ@bancodebogota.com.co"];
    let bcc = ["andrei.valencia@lappiz.io"];
    let smtpsender = 'aws';

    sendEmail(smtpsender, email, subject, text, HTML, null, cc, bcc).then(function (response) {
        toastr.info('Se ha enviado el correo');
    }, function (error) {
        toastr.warning('Ha ocurrido un error al enviar el correo');
    });
}


