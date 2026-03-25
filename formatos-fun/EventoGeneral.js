function DataEventoGeneral(){
sessionStorage.getItem("mecanismo").then(mecanismo => {
    switch (mecanismo) {
        case "consolidacion":
            funDataGenerica();
            break;
        case "novacion":
            funDataGenerica();
            DataFunNovacion();
            loadModalFun("novacion");
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
    function dataNova(){
        var descripcionActividad = document.getElementById("13a8a1c2-3026-481b-bddb-d62c2f321d2c").selectedOptions[0].innerText || "";
        var ingresoMensual = document.getElementById("e1b74a38-af43-4dbe-ae4e-8430eda34573").value || "$";
        var ocupacionAdicional = document.getElementById("10d62ee5-6dc2-4452-9a91-e8acae95a3d3").selectedOptions[0].innerText || "";
        var ingresosAdicionales = document.getElementById("d9c8e5b7-1a0c-4f1e-9b3a-8c2f1e5a6b8f").value || "$";
        return {
             descripcionActividad: descripcionActividad,
                ingresoMensual: ingresoMensual,
                ocupacionAdicional: ocupacionAdicional,
                ingresosAdicionales: ' 2000000',
                numObligacion: '5678',
                saldoTotal: '15.000.000',
                intCorrientes: '200.000',
                intMora: '50.000',
                beneficioIntCorr: '$ 100.000',
                porcentajeBenIntCorr: '50%',
                beneficioIntMora: '$ 25.000',
                porcentajeBenIntMora: '50%',
                totalBeneficio: '$ 125.000',
                pagoRealizar: '$ 500.000',
                fechaPagoNuevo: '12 febrero 2026',
                plazoNuevo: '24 meses',
                tasaInteresNuevo: '1.5%',
                cuotaProyectadaNueva: '450.000',
                pregunta1: 'No',
                pregunta2: 'No',
                pregunta3: 'Sí',
                pregunta4: 'No',
                garantiaFAG: 'Sí',
                garantiaFNG: 'No',
                observaciones: 'Cliente con buen historial de pagos.'
        }
    }
}

$(document).on('click', '#btnEvnFun', function() {
    console.log("Btn fun pulsado");
   // DataEventoGeneral();
});

function loadModalFun(mecanismo) {
document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal'+mecanismo);
    const btnAbrir = document.getElementById('btnEvnFun');
    if (btnAbrir && modal) {
        btnAbrir.addEventListener('click', () => {
            modal.showModal();
        });

        // Cerrar al hacer clic fuera (en el backdrop)
        modal.addEventListener('click', (event) => {
            // En la etiqueta <dialog>, el clic en el fondo oscuro cuenta como clic en el 'modal'
            // pero NO en su contenido interno.
            if (event.target === modal) {
                modal.close();
            }
        });

        console.log("Sistema de modal listo");

    } else {
        
        if (!btnAbrir) console.error("Error: No se encontró el botón con id='btnAbrir'");
        if (!modal) console.error("Error: No se encontró el dialog con id='modalAmpliacion'");
    }
});
}