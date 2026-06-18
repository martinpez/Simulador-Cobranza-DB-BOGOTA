
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

function vacia() {

}
async function CargaCamposHonorarios(idcheck, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera) {
    // Funcion que va servir para cargar cualquier honorarios 
    // todos tienen 3 campos que se van a precargar check, linea , tipo cartera
    // se debe enviar los id de los campos de check, linea , tipo cartera
    debugger
    console.log([idcheck, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera]);
    //valida si existen los elementos 

    if (!(idcheck && idlineaKendo && idTipoCarteraKendo)) {
        console.error("No se enviaron los uid de los elementos")

    }
    // valida si esta es honorarios 
    if (tipocobro == "HONORARIO" || tipocobro == "HONORARIOS") {
        // Se va habilitar el campo de check 
        const chk = document.getElementById(idcheck);
        chk.checked = true;
        chk.dispatchEvent(new Event('change', { bubbles: true }));
        //validar si existe el dato en el storage 

        // y va a cargar la data en los campos

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

        let abonomax = getFieldValue("8f7266d7-dfc0-4ff4-afad-c50fbfa67062")
        let pagoHonorarios = (abonomax * sessionStorage.PorcCartera) / 100
        setFieldValue('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', pagoHonorarios)

    } catch (error) {
        console.error("Error al mostrar los campos:", error);
    }
}

function recalculoHonorarios() {
    let abonomaxSINHonorarios = getFieldValue("8f7266d7-dfc0-4ff4-afad-c50fbfa67062")
    let abonoMaxHonorarios = getFieldValue("993c55c0-8b02-4be9-a122-d7ec2cf5f87e");
    //let abonoSNR = getFieldValue("3539dba8-0c22-491e-a05b-84642d675d59");
    let honoConfirm = getFieldValue("ae33bcc4-183a-47de-a6c8-f4ecc44be169");
    if (honoConfirm > 0) {
        //let sumaHonorarios = abonoMaxHonorarios + abonomaxSINHonorarios;
        //setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', sumaHonorarios);
    } else if (honoConfirm <= 0) {
        setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', abonomaxSINHonorarios);

    }

    if (honoConfirm > abonoMaxHonorarios) {
        toastr.error('El valor no puede ser mayor al abono maximo permitido de $' + abonoMaxHonorarios);
        setFieldValue('ae33bcc4-183a-47de-a6c8-f4ecc44be169', abonoMaxHonorarios);
    }
}

