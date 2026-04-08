function DataEventoGeneral() {
    var mecanismo = sessionStorage.getItem("mecanismo").toLowerCase()
    switch (mecanismo) {
        case "consolidacion":
            funDataGenerica("consolidacion");
            loadModalFun("consolidacion");
            break;
        case "novacion":
            funDataGenerica("novacion");
            DataFunNovacion("novacion");
            loadModalFun("novacion");
            break;
        case "pagomora":
            funDataGenerica("pagomora");
            DataFunMora("pagomora");
            loadModalFun("pagomora");
            break;
        case "cancelacion":
            funDataGenerica("cancelacion");
            loadModalFun("cancelacion");
            break;
        case "ampliacion":
            funDataGenerica("ampliacion");
            DataFunAmpliacion("ampliacion");
            loadModalFun("ampliacion");
            break;
        default:
            console.warn("Mecanismo no reconocido:", mecanismo);
    }

}

function funDataGenerica(mecanismo) {
    // Evento de la fecha
    function setCurrentDate() {
        const today = new Date();
        document.getElementById('day_' + mecanismo).textContent = today.getDate();
        document.getElementById('month_' + mecanismo).textContent = today.getMonth() + 1;
        document.getElementById('year_' + mecanismo).textContent = today.getFullYear();
    }
    function data() {
        var Oficina = document.getElementById("9552efdb-f91c-4e51-9f55-230282926b12").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("9552efdb-f91c-4e51-9f55-230282926b12").selectedOptions[0].innerText || "";
        var NomOficina = document.getElementById("bd198dd5-328d-4ded-a3b4-b23adfad423a").value || "";
        var cuetapago = document.getElementById("685c5e9d-4409-4d4c-a11e-a0c17dcedb02").value || "";
        // 1. Obtenemos el objeto del sessionStorage
        let userObj = JSON.parse(sessionStorage.getItem("LappizUser") || "{}");
        if (userObj.FullName) {
            // 2. Dividimos por la coma
            let partes = userObj.FullName.split(',');

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
        const lugarExp = document.querySelector("#d8faf1c6-44fb-4bd9-93ca-aac3c9ef6ab3").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.querySelector("#d8faf1c6-44fb-4bd9-93ca-aac3c9ef6ab3").selectedOptions[0].innerText || "";
        const fechaExp = document.querySelector(
            '[id="64b5c3a4-2d66-4e35-97af-8a9405f0cf63"] input'
        ).value.replaceAll('-', ' ');
        var edadMora = sessionStorage.getItem("EdadMoraCl") || "";
        var numDocTerd = numeroDoc;
        var nombreClienteTerd = nombreCliente;
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
            diasMora: edadMora,
            numDocTerd: numDocTerd,
            nombreClienteTerd: nombreClienteTerd,
        }
    }
    function loadFormData(data) {
        document.getElementById("codOficina_" + mecanismo).textContent = data.codOficina;
        document.getElementById("nombreOficina_" + mecanismo).textContent = data.nombreOficina;
        document.getElementById("cuentaPago_" + mecanismo).textContent = data.cuentaPago;
        document.getElementById("funcionario_" + mecanismo).textContent = data.nombreAsesor;
        document.getElementById("nombreCliente_" + mecanismo).textContent = data.nombreCliente;
        document.getElementById("tipoDoc_" + mecanismo).textContent = data.tipoDoc;
        document.getElementById("numDoc_" + mecanismo).textContent = data.numDoc;
        document.getElementById("lugarExp_" + mecanismo).textContent = data.lugarExp;
        document.getElementById("fechaExp_" + mecanismo).textContent = data.fechaExp;
        document.getElementById("diasMora_" + mecanismo).textContent = data.diasMora;
        document.getElementById("nombreClienteTerd_" + mecanismo).textContent = data.nombreClienteTerd;
        document.getElementById("numDocTerd_" + mecanismo).textContent = data.numDocTerd;
    }
    setTimeout(() => {
        loadFormData(data());
        setCurrentDate();
        console.log("Datos cargados en el formulario.");
        console.log("Datos:", data());
    }, 500);

}

function DataFunNovacion(mecanismo) {
    function dataNova() {
        function getSelectText(id, defaultValue = "NO") {
            const el = document.getElementById(id);
            if (!el) {
                console.warn(`Elemento no encontrado: ${id}`);
                return defaultValue;
            }
            if (el.selectedIndex >= 0) {
                return el.options[el.selectedIndex].innerText.trim();
            }
            return defaultValue;
        }
        var descripcionActividad = document.getElementById("13a8a1c2-3026-481b-bddb-d62c2f321d2c").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("13a8a1c2-3026-481b-bddb-d62c2f321d2c").selectedOptions[0].innerText || "";
        var ingresoMensual = document.getElementById("e1b74a38-af43-4dbe-ae4e-8430eda34573").value || "$";
        var ocupacionAdicional = document.getElementById("10d62ee5-6dc2-4452-9a91-e8acae95a3d3").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("10d62ee5-6dc2-4452-9a91-e8acae95a3d3").selectedOptions[0].innerText || "";
        var ingresosAdicionales = document.getElementById("3f181299-b8fb-437e-aaa1-e21af8c747d1").value || "$";
        var numObligacion = document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value === "" ? document.getElementById("caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0].innerText : document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value;
        var saldoTotal = document.getElementById("616e6102-56e5-48e9-bfc2-fce8497e629d").getAttribute("aria-valuenow") || "$";
        var pagoMinimo = document.getElementById("1f7c2b79-87a6-402f-95f2-414aea88a4bf").getAttribute("aria-valuenow") || "$";
        var fechaPago =
            document.querySelector("#\\35 c6f6251-9091-496a-966a-9bf0fb0eedcf input")
                .value.replaceAll('-', ' ');
        var pagoNegociacion = document.getElementById("92bcba6d-4dab-459e-bd8f-164da7eeb526").getAttribute("aria-valuenow") || "$";
        var plazo = document.getElementById("9382c5a1-0445-4ed9-a785-850d06da2cd2").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("9382c5a1-0445-4ed9-a785-850d06da2cd2").selectedOptions[0].innerText || "";
        var tasaMV = document.getElementById("b76668b5-0710-4eee-9718-a2633605c35e").value || "";
        var saldoDiferir = document.getElementById("c6923383-8eec-4efe-81a5-954ce52b8882").value || "$";
        var cuotaProyectada = document.getElementById("d157fb29-fd6f-450b-b637-8fa18c824cd2").value || "$";
        var pregunta1 = getSelectText("pregunta1");
        var pregunta2 = getSelectText("pregunta2");
        var pregunta3 = getSelectText("pregunta3");
        var pregunta4 = getSelectText("pregunta4");
        var garantiaFAG = getSelectText("garantiaFAG");
        var garantiaFNG = getSelectText("garantiaFNG");
        var observaciones = document.getElementById("4b025de3-4404-41f3-8ba8-ac9b0988391e").value || "";

        return {
            descripcionActividad,
            ingresoMensual,
            ocupacionAdicional,
            ingresosAdicionales,
            numObligacion,
            saldoTotal,
            pagoMinimo,
            fechaPago,
            pagoNegociacion,
            plazo: plazo + ' meses',
            tasaMV,
            saldoDiferir,
            cuotaProyectada,
            pregunta1,
            pregunta2,
            pregunta3,
            pregunta4,
            garantiaFAG,
            garantiaFNG,
            observaciones,

        }
    }
    const formateador = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    function loadFormData(data) {
        document.getElementById("descripcionActividad_" + mecanismo).textContent = data.descripcionActividad;
        document.getElementById("ingresoMensual_" + mecanismo).textContent = formateador.format(data.ingresoMensual);
        document.getElementById("ocupacionAdicional_" + mecanismo).textContent = data.ocupacionAdicional;
        document.getElementById("ingresosAdicionales_" + mecanismo).textContent = formateador.format(data.ingresosAdicionales);
        document.getElementById("numObligacion_" + mecanismo).textContent = data.numObligacion;
        document.getElementById("saldoTotal_" + mecanismo).textContent = formateador.format(data.saldoTotal);
        document.getElementById("pagoMinimo_" + mecanismo).textContent = formateador.format(data.pagoMinimo);
        document.getElementById("fechaPago_" + mecanismo).textContent = data.fechaPago;
        document.getElementById("pagoNegociacion_" + mecanismo).textContent = formateador.format(data.pagoNegociacion);
        document.getElementById("plazo_" + mecanismo).textContent = data.plazo;
        document.getElementById("tasaMV_" + mecanismo).textContent = data.tasaMV;
        document.getElementById("saldoDiferir_" + mecanismo).textContent = formateador.format(data.saldoDiferir);
        document.getElementById("cuotaProyectada_" + mecanismo).textContent = formateador.format(data.cuotaProyectada);
        document.getElementById("pregunta1_display_" + mecanismo).textContent = data.pregunta1;
        document.getElementById("pregunta2_display_" + mecanismo).textContent = data.pregunta2;
        document.getElementById("pregunta3_display_" + mecanismo).textContent = data.pregunta3;
        document.getElementById("pregunta4_display_" + mecanismo).textContent = data.pregunta4;
        document.getElementById("garantiaFAG_display_" + mecanismo).textContent = data.garantiaFAG;
        document.getElementById("garantiaFNG_display_" + mecanismo).textContent = data.garantiaFNG;
        document.getElementById("observaciones_" + mecanismo).textContent = data.observaciones;
    }
    setTimeout(() => {
        loadFormData(dataNova());
        console.log("Datos para novacion cargados");
        console.log("Datos:", dataNova());

    }, 500);
}

function DataFunAmpliacion(mecanismo) {
    function dataAmpliacion() {
        function getSelectText(id, defaultValue = "NO") {
            const el = document.getElementById(id);
            if (!el) {
                console.warn(`Elemento no encontrado: ${id}`);
                return defaultValue;
            }
            if (el.selectedIndex >= 0) {
                return el.options[el.selectedIndex].innerText.trim();
            }
            return defaultValue;
        }

        var descripcionActividad = document.getElementById("51550b53-1a9f-49cd-8274-abd718d04b51").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("51550b53-1a9f-49cd-8274-abd718d04b51").selectedOptions[0].innerText || "";
        var ingresoMensual = document.getElementById("f51fe08e-3b3b-4064-9ae0-fb9584fd93b3").value || "$";
        var ocupacionAdicional = document.getElementById("3a3c6541-bfed-459a-9a8d-608eebb2ad63").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("3a3c6541-bfed-459a-9a8d-608eebb2ad63").selectedOptions[0].innerText || "";
        var ingresosAdicionales = document.getElementById("ee3c91d9-9f6c-4ea5-bd31-047686ce4c76").value || "$";
        var numObligacion = document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value === "" ? document.getElementById("caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0].innerText : document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value;
        var saldoTotal = document.getElementById("12671e00-a829-472f-b644-be49ea7ebdbf").getAttribute("aria-valuenow") || "$";
        var intCorrientes = document.getElementById("70101be7-9330-44e4-913c-e6772c5b8167").getAttribute("aria-valuenow") || "$";
        var intMora = document.getElementById("aea118a4-8a99-4d3a-adf9-ffd5151db4f6").getAttribute("aria-valuenow") || "$";
        var BeneficioIntCorr = document.getElementById("15a75d66-7dc0-4e25-b3e3-213a984a22fe").getAttribute("aria-valuenow") || "$";
        var porcentajeBenIntCorr = document.getElementById("d8e6669a-3079-4248-88d5-5f01cca53106").getAttribute("aria-valuenow") || "$";
        var BeneficioIntMora = document.getElementById("e4b7cc87-de9e-4fa1-9d65-d9595ed2cca2").getAttribute("aria-valuenow") || "$";
        var porcentajeBenIntMora = document.getElementById("4f9627f2-7ada-415b-bf0c-cf308407c82a").getAttribute("aria-valuenow") || "$";
        var totalBeneficio = document.getElementById("312df4ed-17a6-4e38-899a-e075171f9d84").getAttribute("aria-valuenow") || "$";
        var pagoRealizar = document.getElementById("9b88d521-a3dd-4948-8c3f-6dece97a17a5").getAttribute("aria-valuenow") || "$";
        var cuotaProyectada = document.getElementById("2edec98b-a7b5-49a8-8cae-623f05fe0cd5").getAttribute("aria-valuenow") || "$";
        var fechaPago = document.querySelector(
            "#\\33 d0f4be2-1bb6-446c-9ebb-b38a7eba0d5c > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input"
        ).value.replaceAll('-', '') || '';
        var plazo = document.getElementById("f43686aa-8f4e-4203-9733-b483660e6ab1").getAttribute("aria-valuenow") || "";
        var tasaEA = document.getElementById("1540984f-2b52-4a6f-8b34-01236dfd291c").getAttribute("aria-valuenow") || "";
        var pregunta1 = getSelectText("pregunta1");
        var pregunta2 = getSelectText("pregunta2");
        var pregunta3 = getSelectText("pregunta3");
        var pregunta4 = getSelectText("pregunta4");
        var garantiaFAG = getSelectText("garantiaFAG");
        var garantiaFNG = getSelectText("garantiaFNG");
        var observaciones = document.getElementById("4b025de3-4404-41f3-8ba8-ac9b0988391e").value || "";

        return {


            descripcionActividad,
            ingresoMensual,
            ocupacionAdicional,
            ingresosAdicionales,
            numObligacion,
            saldoTotal,
            intCorrientes,
            intMora,
            BeneficioIntCorr,
            porcentajeBenIntCorr: porcentajeBenIntCorr + " %",
            BeneficioIntMora,
            porcentajeBenIntMora: porcentajeBenIntMora + " %",
            totalBeneficio,
            pagoRealizar,
            fechaPago,
            plazo: plazo + " meses",
            tasaEA,
            cuotaProyectada,
            pregunta1,
            pregunta2,
            pregunta3,
            pregunta4,
            garantiaFAG,
            garantiaFNG,
            observaciones,

        }
    }
    const formateador = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    function loadFormData(data) {
        document.getElementById("descripcionActividad_" + mecanismo).textContent = data.descripcionActividad;
        document.getElementById("ingresoMensual_" + mecanismo).textContent = formateador.format(data.ingresoMensual);
        document.getElementById("ocupacionAdicional_" + mecanismo).textContent = data.ocupacionAdicional;
        document.getElementById("ingresosAdicionales_" + mecanismo).textContent = formateador.format(data.ingresosAdicionales);
        document.getElementById("numObligacion_" + mecanismo).textContent = data.numObligacion;
        document.getElementById("saldoTotal_" + mecanismo).textContent = formateador.format(data.saldoTotal);
        document.getElementById("intCorrientes_" + mecanismo).textContent = formateador.format(data.intCorrientes);
        document.getElementById("intMora_" + mecanismo).textContent = formateador.format(data.intMora);
        document.getElementById("fechaPago_" + mecanismo).textContent = data.fechaPago;
        document.getElementById("BeneficioIntCorr_" + mecanismo).textContent = formateador.format(data.BeneficioIntCorr);
        document.getElementById("porcentajeBenIntCorr_" + mecanismo).textContent = data.porcentajeBenIntCorr;
        document.getElementById("BeneficioIntMora_" + mecanismo).textContent = formateador.format(data.BeneficioIntMora);
        document.getElementById("porcentajeBenIntMora_" + mecanismo).textContent = data.porcentajeBenIntMora;
        document.getElementById("totalBeneficio_" + mecanismo).textContent = formateador.format(data.totalBeneficio);
        document.getElementById("pagoRealizar_" + mecanismo).textContent = formateador.format(data.pagoRealizar);
        document.getElementById("cuotaProyectada_" + mecanismo).textContent = formateador.format(data.cuotaProyectada);
        document.getElementById("plazo_" + mecanismo).textContent = data.plazo;
        document.getElementById("tasaInteres_" + mecanismo).textContent = data.tasaEA;
        document.getElementById("pregunta1_display_" + mecanismo).textContent = data.pregunta1;
        document.getElementById("pregunta2_display_" + mecanismo).textContent = data.pregunta2;
        document.getElementById("pregunta3_display_" + mecanismo).textContent = data.pregunta3;
        document.getElementById("pregunta4_display_" + mecanismo).textContent = data.pregunta4;
        document.getElementById("garantiaFAG_display_" + mecanismo).textContent = data.garantiaFAG;
        document.getElementById("garantiaFNG_display_" + mecanismo).textContent = data.garantiaFNG;
        document.getElementById("observaciones_" + mecanismo).textContent = data.observaciones;
    }
    setTimeout(() => {
        loadFormData(dataAmpliacion());
        console.log("Datos para novacion cargados");
        console.log("Datos:", dataAmpliacion());

    }, 500);
}

function DataFunMora(mecanismo) {

    function dataMora() {
        function getSelectText(id, defaultValue = "NO") {
            const el = document.getElementById(id);
            if (!el) {
                console.warn(`Elemento no encontrado: ${id}`);
                return defaultValue;
            }
            if (el.selectedIndex >= 0) {
                return el.options[el.selectedIndex].innerText.trim();
            }
            return defaultValue;
        }

        var descripcionActividad = document.getElementById("c852f2a7-6f9c-48f6-96b5-6fdc26c399ef").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("c852f2a7-6f9c-48f6-96b5-6fdc26c399ef").selectedOptions[0].innerText || "";
        var ingresoMensual = document.getElementById("67631aed-75e4-4b23-8601-17cadd1c7003").value || "$";
        var ocupacionAdicional = document.getElementById("b54af750-167e-4831-bb8c-c374e7f45202").selectedOptions[0].innerText === "Seleccione un registro..." ? "" : document.getElementById("b54af750-167e-4831-bb8c-c374e7f45202").selectedOptions[0].innerText || "";
        var ingresosAdicionales = document.getElementById("1a47c2c1-4551-4d13-89ca-82e89ce655c0").value || "$";
        var numObligacion = document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value === "" ? document.getElementById("caae86ca-b4e0-4e59-918e-8f7a1a4d4114").selectedOptions[0].innerText : document.getElementById("c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0").value;
        var pagoMinimo = document.getElementById("af9911f8-4a06-4483-b25d-6bec9e1647fe").getAttribute("aria-valuenow") || "$";
        var intCorrientes = document.getElementById("9b3ac68c-68ff-4928-864d-906e9d851621").getAttribute("aria-valuenow") || "$";
        var intMora = document.getElementById("c13b3910-1960-422f-835d-7ea89982f8b6").getAttribute("aria-valuenow") || "$";
        var intExtraC = document.getElementById("aef7fd98-0a00-4ec8-95d9-37840df1fe67").getAttribute("aria-valuenow") || "$";
        var benValorCorr = document.getElementById("49ed37fa-10f7-46d1-b2d3-bd4e28bef0db").getAttribute("aria-valuenow") || "$";
        var benValorMora = document.getElementById("db8c0e77-0029-4bf9-ba9a-ebc141721c33").getAttribute("aria-valuenow") || "$";
        var benValorExtra = document.getElementById("a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8").getAttribute("aria-valuenow") || "$";
        var porcBenIntCorr = document.getElementById("e076d650-c5d6-48b1-920b-295d431604b0").getAttribute("aria-valuenow") || "$";
        var porcBenIntMora = document.getElementById("64fcdf9f-c6b3-4742-b4b2-e259759290d9").getAttribute("aria-valuenow") || "$";
        var porcBenIntExtra = document.getElementById("0456eeb3-8809-48a5-8726-87e416efdcb3").getAttribute("aria-valuenow") || "$";
        var pagoRealizar = document.getElementById("8f7266d7-dfc0-4ff4-afad-c50fbfa67062").getAttribute("aria-valuenow") || "$";
        var totalBeneficio = document.getElementById("6cfd4b2c-6ef4-4821-95d5-364657fda787").getAttribute("aria-valuenow") || "$";
        var fechaPago = document.querySelector("#ee8b70aa-2712-408c-a87a-b121e20564b3 > div.dx-dropdowneditor-input-wrapper > div > div.dx-texteditor-input-container > input").value.replaceAll('-', '')
        var pregunta1 = getSelectText("pregunta1");
        var pregunta2 = getSelectText("pregunta2");
        var pregunta3 = getSelectText("pregunta3");
        var pregunta4 = getSelectText("pregunta4");
        var garantiaFAG = getSelectText("garantiaFAG");
        var garantiaFNG = getSelectText("garantiaFNG");
        var observaciones = document.getElementById("4b025de3-4404-41f3-8ba8-ac9b0988391e").value || "";

        return {
            descripcionActividad,
            ingresoMensual,
            ocupacionAdicional,
            ingresosAdicionales,
            numObligacion,

            pagoMinimo,
            intCorrientes,
            intMora,
            intExtraC,

            // Panel Derecho
            benValorCorr,
            porcBenIntCorr: porcBenIntCorr + " %",
            benValorMora,
            porcBenIntMora: porcBenIntMora + " %",
            benValorExtra,
            porcBenIntExtra: porcBenIntExtra + " %",
            totalBeneficio,
            pagoRealizar,
            fechaPago,


            pregunta1,
            pregunta2,
            pregunta3,
            pregunta4,
            garantiaFAG,
            garantiaFNG,
            observaciones,

        }
    }
    const formateador = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    function loadFormData(data) {

        document.getElementById("descripcionActividad_" + mecanismo).textContent = data.descripcionActividad;
        document.getElementById("ingresoMensual_" + mecanismo).textContent = formateador.format(data.ingresoMensual);
        document.getElementById("ocupacionAdicional_" + mecanismo).textContent = data.ocupacionAdicional;
        document.getElementById("ingresosAdicionales_" + mecanismo).textContent = formateador.format(data.ingresosAdicionales);
        document.getElementById("numObligacion_" + mecanismo).textContent = data.numObligacion;

        document.getElementById('pagoMinimo_' + mecanismo).textContent = formateador.format(data.pagoMinimo || 0);
        document.getElementById('intCorrientes_' + mecanismo).textContent = formateador.format(data.intCorrientes || 0);
        document.getElementById('intMora_' + mecanismo).textContent = formateador.format(data.intMora || 0);
        document.getElementById('intExtraC_' + mecanismo).textContent = formateador.format(data.intExtraC || 0);

        document.getElementById('benIntCorr_' + mecanismo).textContent = formateador.format(data.benValorCorr || 0);
        document.getElementById('porcBenIntCorr_' + mecanismo).textContent = data.porcBenIntCorr || '';
        document.getElementById('benIntMora_' + mecanismo).textContent = formateador.format(data.benValorMora || 0);
        document.getElementById('porcBenIntMora_' + mecanismo).textContent = data.porcBenIntMora || '';
        document.getElementById('benIntExtra_' + mecanismo).textContent = formateador.format(data.benValorExtra || 0);
        document.getElementById('porcBenIntExtra_' + mecanismo).textContent = data.porcBenIntExtra || '';
        document.getElementById('totalBeneficio_' + mecanismo).textContent = formateador.format(data.totalBeneficio || 0);
        document.getElementById('pagoRealizar_' + mecanismo).textContent = formateador.format(data.pagoRealizar || 0);
        document.getElementById('fechaPago_' + mecanismo).textContent = data.fechaPago || '';
        document.getElementById("pregunta1_display_" + mecanismo).textContent = data.pregunta1;
        document.getElementById("pregunta2_display_" + mecanismo).textContent = data.pregunta2;
        document.getElementById("pregunta3_display_" + mecanismo).textContent = data.pregunta3;
        document.getElementById("pregunta4_display_" + mecanismo).textContent = data.pregunta4;
        document.getElementById("garantiaFAG_display_" + mecanismo).textContent = data.garantiaFAG;
        document.getElementById("garantiaFNG_display_" + mecanismo).textContent = data.garantiaFNG;
        document.getElementById("observaciones_" + mecanismo).textContent = data.observaciones;

    }
    setTimeout(() => {
        loadFormData(dataMora());
        console.log("Datos para novacion cargados");
        console.log("Datos:", dataMora());

    }, 500);
}



function loadModalFun(mecanismo) {

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
                toastr.info("Recuerda Revisar bien tu fun antes ")
            }
        });

        console.log("Sistema de modal listo");

    } else {

        console.error("Error: No se encontró el dialog con id='modal" + mecanismo + "'");
    }

}

$(document).on('click', '#btnEvnFun', function () {
    console.log("Btn fun pulsado");
    try {
        DataEventoGeneral();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

$(document).on('click', '#btnconfirmar', function () {
    console.log("Btn fun pulsado");
    try {
        var mecanismo = sessionStorage.getItem("mecanismo") ? sessionStorage.getItem("mecanismo").toLowerCase() : "";
        Swal.fire({
            title: "¿Estás seguro de enviar el FUN?",
            text: "Se enviará al correo " + localStorage.getItem("userName") + " el FUN",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (mecanismo) {
                    sendDataFunPDF(mecanismo);
                } else {
                    console.error("Mecanismo no establecido");
                }
            }
        });

    } catch (error) {
        console.error("Error al enviar los datos:", error);
    }
});

function sendDataFunPDF(mecanismo) {

    const element = document.getElementById('contenedor' + mecanismo + 'PDF');

    const options = {
        margin: [2, 2, 2, 2],
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
            format: 'a4',
            orientation: 'portrait'
        }
    };

    // Encadenamos el guardado y pedimos el Base64 de forma segura
    html2pdf()
        .set(options)
        .from(element)
        .save() // Descarga el local
        .outputPdf('datauristring') // Extrae un STRING Base64 para adjuntar
        .then(function (pdfBase64) {

            // Cuando termina exitosamente, YA tenemos el pdfBase64, configuramos correo:
            var cedula = document.getElementById("75fda36b-9317-4062-93d7-26d45e6188d6").value;
            // para traer el sox que le corresponda al mecanismo
            const SOX_ID = {
                "novacion": "07b4e087-95c8-4867-b91f-1f9e9a4a1ea0",
                "pagomora": "b24357e4-d1be-443d-8fa0-5b8790a1c508",
                "consolidacion": "f3979225-f563-48a2-a206-6b5866a7dc6c",
                "cancelacion": "d4f89a7c-0207-4756-9bd7-e2e669ac3ce0",
                "ampliacion": "eec3136d-46bf-438c-b7cc-4aaa5fba776b"
            }
            var sox = document.getElementById(SOX_ID[mecanismo]).value;
            let email = localStorage.getItem("userName");

            let subject = mecanismo + ' fun cliente ' + cedula;
            let text = 'Buenos días anexo el formato Fun del ' + mecanismo + ' del cliente ' + cedula + '\n' + sox;

            let attachments = [
                {
                    filename: 'Solicitud_Normalizacion_' + mecanismo + '.pdf',
                    path: pdfBase64
                    // Se manda la cadena base64 en la propiedad 'path' (o 'content' si la API lo exige así)
                }
            ];

            // Usamos una variable de nombre distinto a 'cedula' o 'var cc' para evitar el SyntaxError
            let correosCC = email ? [email] : [];
            let bcc = []; // Lo ideal es mandar un array vacío en vez de ""
            let smtpsender = 'aws';

            // Enviamos el correo
            sendEmail(smtpsender, email, subject, text, null, attachments, correosCC, bcc)
                .then(function (response) {
                    toastr.info('Se ha enviado el correo con su adjunto');
                }, function (error) {
                    toastr.warning('Ha ocurrido un error al enviar el correo');
                });

        })
        .catch(err => console.error("Error al generar PDF y enviar correo:", err));
}
