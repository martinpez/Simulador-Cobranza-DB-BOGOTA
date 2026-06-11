function Obligacionvacia() {

}
async function Obligacion() {
    try {
        let SpName = 'SimiladorDNC_Lappiz_EmailConfirmed';
        let sw = '10';
        let documentocliente = e.value;
        let fecha = new Date().toLocaleDateString()
        let tipodoc = getFieldValue('15fb0de1-4989-4986-a662-61fb88b3aba1')
        let paramsArray = [sw, documentocliente, `'${fecha}'`];

        let response = await execQuery(`EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 10, @documentocliente= ${documentocliente}, @fecha = '${fecha}', @grupo = '${sessionStorage.Grupo}', @filtro = '${sessionStorage.Filtro}', @tipodoc = '${tipodoc}'`)
        if (response[0][0]) {
            // bandera para los cuando se encuentre el cliente en la base de datos y habilitar tasas campaña
            sessionStorage.setItem('UserCargado', 'si');
            if (sessionStorage.getItem("EdadMoraCl") === "0 - Al día") {
                sessionStorage.campanaNovacion = 'no'
            }
            console.log("console.log(backandGlobal.environment); " + backandGlobal.environment);
            sessionStorage.campanaAmpliacion = 'No';
            kendo.jQuery("#caae86ca-b4e0-4e59-918e-8f7a1a4d4114").data('kendoDropDownList').dataSource.data(response[0])
            visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', true)
            obligacionConsolidacion(response[0])
            //campos nuevos de obl y cantidad
            visibilityField('0ab23e22-1c3c-4a43-8c58-207b83625867', false)
            visibilityField('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0', false)

        } else {
            // Para saber si el usuario cargo desde la base de datos o no
            sessionStorage.setItem('UserCargado', 'no');
            // saber si el cliente aplica a campaña de ampliación
            sessionStorage.campanaAmpliacion = 'No';
            // saber si el cliente aplica a campaña de novación
            sessionStorage.campanaNovacion = 'no'
            console.log("Bandera de usuario de sesion " + sessionStorage.getItem('UserCargado'));
            Swal.fire({
                title: '¡Verifica tu información!',
                text: 'La información ingresada es incorrecta o no tiene registros asociados',
                icon: 'error',
                confirmButtonColor: '#ee7402' // Cambia el color del botón
            })
            visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', false)
            //campos nuevos de obl y cantidad
            visibilityField('0ab23e22-1c3c-4a43-8c58-207b83625867', true)
            visibilityField('c5f3bb92-1efe-47ea-941a-5bf2c5f6ceb0', true)
        }


    } catch (error) {
        sessionStorage.setItem('UserCargado', 'no');
        Swal.fire({
            title: '¡Verifica tu información!',
            text: 'La información ingresada es incorrecta o no tiene registros asociados',
            icon: 'error',
            confirmButtonColor: '#ee7402' // Cambia el color del botón
        })
        visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114', false)
    }

}