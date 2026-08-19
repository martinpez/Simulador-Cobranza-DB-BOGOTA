function Obligacionvacia() {
}
async function Obligacion() {
    try {
        debugger;
        let documentocliente = e.value;
        let fecha = new Intl.DateTimeFormat('es-CO', {
            timeZone: 'America/Bogota',
        }).format(new Date());
        let tipodocSeleccionado = getFieldValue('15fb0de1-4989-4986-a662-61fb88b3aba1')
        // Lista de tipos de documento a intentar, empezando por el que este seleccionado en el dropdown
        let tiposDocumento = ['CC', 'CE', 'NIT', 'PAS', 'TI'];
        let tiposAProbar = [tipodocSeleccionado, ...tiposDocumento.filter(t => t !== tipodocSeleccionado)];
        let response = null;
        let tipodocEncontrado = tipodocSeleccionado;
        for (const tipodocIntento of tiposAProbar) {
            let intento = await execQuery(`EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 10, @documentocliente= ${documentocliente}, @fecha = '${fecha}', @grupo = '${sessionStorage.Grupo}', @filtro = '${sessionStorage.Filtro}', @tipodoc = '${tipodocIntento}'`)
            if (intento && intento[0] && intento[0][0]) {
                response = intento;
                tipodocEncontrado = tipodocIntento;
                break;
            }
        }
        if (response) {
            sessionStorage.setItem('UserCargado', 'si');
            if (sessionStorage.getItem("EdadMoraCl") === "0 - Al día") {
                sessionStorage.campanaNovacion = 'no'
            }
            console.log("console.log(backandGlobal.environment); " + backandGlobal.environment);
            sessionStorage.campanaAmpliacion = 'No';
            if (tipodocEncontrado !== tipodocSeleccionado) {
                setFieldValue('15fb0de1-4989-4986-a662-61fb88b3aba1', tipodocEncontrado);

                let selectTipoDoc = document.getElementById('15fb0de1-4989-4986-a662-61fb88b3aba1');
                let opcion = Array.from(selectTipoDoc.options).find(o => o.text.trim() === tipodocEncontrado);
                if (opcion) {
                    selectTipoDoc.value = opcion.value;
                    selectTipoDoc.dispatchEvent(new Event('change', { bubbles: true }));
                }
                console.log('Tipo de documento corregido automaticamente a: ' + tipodocEncontrado);
            }
            kendo.jQuery("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").data('kendoDropDownList').dataSource.data(response[0])

            let nombreCompleto = response[0][0].NombreCompleto;
            setFieldValue('1ad60ed2-e515-4164-8270-54efa1e574fa', nombreCompleto);

            visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', true)
            obligacionConsolidacion(response[0])
            obligacionesitau(response[0])
            visibilityField('0ab23e22-1c3c-4a43-8c58-207b83625867', false)
            visibilityField('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0', false)
        } else {
            sessionStorage.setItem('UserCargado', 'no');
            sessionStorage.campanaAmpliacion = 'No';
            sessionStorage.campanaNovacion = 'no'
            console.log("Bandera de usuario de sesion " + sessionStorage.getItem('UserCargado'));
            Swal.fire({
                title: '¡Verifica tu información!',
                text: 'La información ingresada es incorrecta o no tiene registros asociados',
                icon: 'error',
                confirmButtonColor: '#ee7402'
            })
            visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', false)
            visibilityField('0ab23e22-1c3c-4a43-8c58-207b83625867', true)
            visibilityField('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0', true)
            // Refresca visibilidad/disabled de novación con UserCargado='no'
            try {
                if (typeof toggleHonorariosNov === 'function' && typeof esHonorariosNov === 'function') {
                    toggleHonorariosNov(esHonorariosNov());
                }
            } catch (e) { }
        }
    } catch (error) {
        sessionStorage.setItem('UserCargado', 'no');
        Swal.fire({
            title: '¡Verifica tu información!',
            text: 'La información ingresada es incorrecta o no tiene registros asociados',
            icon: 'error',
            confirmButtonColor: '#ee7402'
        })
        visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', false)
        // Refresca visibilidad/disabled de novación con UserCargado='no'
        try {
            if (typeof toggleHonorariosNov === 'function' && typeof esHonorariosNov === 'function') {
                toggleHonorariosNov(esHonorariosNov());
            }
        } catch (e) { }
    }
    debugger;
    if (sessionStorage.pilotosDias) {
        return;
    }
    try {
        let query = `SELECT MaxDias,MinDias,PorcTasaGastoCobranza FROM SimiladorDNC_Lappiz_rangosGastosCobranza`
        let response = await execQuery(query)
        let pilotosDias = [];
        for (let i = 0; i < response[0].length; i++) {
            pilotosDias.push({
                maxDias: response[0][i].MaxDias,
                minDias: response[0][i].MinDias,
                porcAbonoMinimo: response[0][i].PorcTasaGastoCobranza
            });
        }
        sessionStorage.setItem('pilotosDias', JSON.stringify(pilotosDias));
        console.log(sessionStorage.pilotosDias);
    } catch (error) {
        console.log(error);
    }
}