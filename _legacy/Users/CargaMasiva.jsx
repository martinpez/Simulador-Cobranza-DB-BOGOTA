function CargarExcel() {

    // funcionalidad para cargar y convertir el excel en un json
    const input = document.getElementById('inputExcel');
    const file = input.files[0];

    //validación de si existe el archivo
    if (!file) {
        alert('Por favor, selecciona un archivo Excel.');
        return;
    }

    //leer el archivo  y convertirlo en json
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Asumiendo que quieres convertir la primera hoja
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir la hoja a JSON
        const json = XLSX.utils.sheet_to_json(worksheet);

        //  ejecutarlf para insert

        let nameFunction = 'UsuarioAuxiliar';
        let lappizFunctionId = 'affa7f0b-1f96-4bcd-b70d-22c1584fd5bb';
        let method = "POST"//POST

        let body = { ArregloUsuarios: json }
        let config = { nameFunction, lappizFunctionId, body, method }
        execLF(config).then(success => {
            toastr.success('Procesando usuarios')
        }).catch(error => {
            console.log(error)
        })
    };

    reader.readAsArrayBuffer(file);

}