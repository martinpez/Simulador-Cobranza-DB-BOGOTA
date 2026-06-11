
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
async function honorarios() {
    try {
        debugger;
        let tipocartera = e.dataItem.TipoHonorarios;
        let query = `select ValorHonorarios ,TipoHonorarios  from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '${tipocartera}'`
        let response = await execQuery(query)
        console.log(response[0][0])
        sessionStorage.PorcCartera = response.ValorHonorarios
        sessionStorage.TipoHonorarios = response.TipoHonorarios
        console.log(sessionStorage.PorcCartera)
        console.log(sessionStorage.TipoHonorarios)
    } catch (error) {
        console.error("Error al mostrar los campos:", error);
    }
}