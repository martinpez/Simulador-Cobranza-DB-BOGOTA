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



        // Validar los datos antes de pasarselos al servidor
        // Datos requeridos: Que se deben ser validados y obligatorios para cargar un user a auxiliar
        // NumeroDocumento
        // TipoDocumento 
        // Correo electrónico
        // Nombre
        // Apellidos
        // Grupo
        // Rol
        // Convertir la hoja a JSON
        const json = XLSX.utils.sheet_to_json(worksheet, {
            defval: '',
            raw: false
        });

        const tiposDocumento = ['CC', 'NIT', 'CE', 'PAS', 'IT'];
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const camposObligatorios = [
            'NumeroDocumento',
            'TipoDocumento',
            'CorreoElectronico',
            'Nombre',
            'Apellidos',
            'Grupo',
            'Rol',
        ];

        const datosValidados = [];
        const errores = [];
        //Recorremos el json para validar los datos
        json.forEach((fila, indice) => {
            const datos = Object.fromEntries(
                Object.entries(fila).map(([campo, valor]) => [
                    campo.trim(),
                    String(valor ?? '').trim()
                ])
            );

            const camposFaltantes = camposObligatorios.filter(
                campo => !datos[campo]
            );

            const tipoDocumento = datos.TipoDocumento.toUpperCase();

            if (!tiposDocumento.includes(tipoDocumento)) {
                camposFaltantes.push('TipoDocumento inválido');
            }

            if (
                datos.CorreoElectronico &&
                !correoRegex.test(datos.CorreoElectronico)
            ) {
                camposFaltantes.push('CorreoElectronico inválido');
            }

            if (camposFaltantes.length > 0) {
                errores.push({
                    fila: indice + 2,
                    errores: camposFaltantes
                });
                return;
            }

            datos.TipoDocumento = tipoDocumento;
            datosValidados.push(datos);
        });

        if (errores.length > 0) {
            console.table(errores);
            Swal.fire({
                title: 'Hay errores en el archivo',
                text: `Hay ${errores.length} fila(s) con errores. Revise el archivo.`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        localStorage.setItem('DataAuxiliar', 'apta');
        //ejecutamos la funcion para insertar los usuarios

        //  ejecutarlf para insert

        let nameFunction = 'UsuarioAuxiliar';
        let lappizFunctionId = 'affa7f0b-1f96-4bcd-b70d-22c1584fd5bb';
        let method = "POST"//POST

        let body = { datosValidados: json }
        let config = { nameFunction, lappizFunctionId, body, method }
        execLF(config).then(success => {
            toastr.success('Procesando usuarios')
        }).catch(error => {
            console.log(error)
        })
    };

    reader.readAsArrayBuffer(file);

}