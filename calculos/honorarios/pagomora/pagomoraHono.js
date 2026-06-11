
$(document).on('change', '#check', function () {
    try {
        if (this.checked) {
            visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', true)
            visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', true)
            visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', true)
            visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', true)
        } else {
            visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false)
            visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false)
            visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false)
            visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false)
        }
    } catch (error) {
        console.error("Error al mostrar los campos:", error);
    }
});


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

        let abonomax = getFieldValue("8f7266d7-dfc0-4ff4-afad-c50fbfa67062")
        let pagoHonorarios = (abonoMinimo * sessionStorage.PorcCartera) / 100
        setFieldValue('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', pagoHonorarios)

        //console.log(sessionStorage.PorcCartera)
        //console.log(sessionStorage.TipoHonorarios)

    } catch (error) {
        console.error("Error al mostrar los campos:", error);
    }
}

function recalculoHonorarios() {
    let abonoMax = getFieldValue("993c55c0-8b02-4be9-a122-d7ec2cf5f87e");
    let abonoMinSNR = getFieldValue("8f7266d7-dfc0-4ff4-afad-c50fbfa67062");
    let honoConfirm = getFieldValue("ae33bcc4-183a-47de-a6c8-f4ecc44be169");
    if (honoConfirm > 0) {
        let sumaHonorarios = abonoMax + abonoMinSNR;
        setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', sumaHonorarios);
    }

    if (honoConfirm > abonoMax) {
        toastr.warning('El valor no puede ser mayor al abono maximo permitido de $' + abonoMax);
    }
}

