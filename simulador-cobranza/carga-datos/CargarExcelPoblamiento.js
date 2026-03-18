function cargarvacia() { }
async function CargarExcelPoblamiento() {
    const backGlobal = backandGlobal
    // url complementaria para poblamiento de datos
    const urlComplementPB = '/SimiladorDNC_Lappiz.api/api/functions/PoblamientoDatos'
    try {
        let nameFunction = 'EliminarArchivo';
        let lappizFunctionId = 'd2ebec8e-ab1c-4569-b900-eb457a889990';
        let method = "POST"
        let ruta = `C:/BancoBogota/poblamiento/datos.csv`
        let body = { ruta: ruta }
        let config = { nameFunction, lappizFunctionId, body, method }
        execLF(config)
    } catch (err) {

    }

    Swal.fire({
        title: 'Procesando información',
        text: 'Recuerda no cerrar el aplicativo o refrescar la página, este proceso puede tardar unos minutos.',
        icon: 'info',
        confirmButtonColor: '#ee7402',
    });




    const input = document.getElementById('inputExcelPoblamiento');
    const file = input.files[0];

    if (!file) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, selecciona un archivo CSV.',
            icon: 'error',
            confirmButtonColor: '#ee7402',
        });
        return;
    }

    // Crear un Worker para procesar el archivo en segundo plano
    const worker = new Worker(
        URL.createObjectURL(
            new Blob(
                [
                    `
                    self.onmessage = async function (e) {
                        const file = e.data.file;
                        const headers = e.data.headers;
                        const retryOptions = e.data.retryOptions;
                        const environment = e.data.environment;
                        const apiUrl = e.data.apiUrl;
                        const urlComplement = e.data.urlComplementPB;
                        const chunkSize = e.data.chunkSize || 1024 * 1024; // 10MB por chunk
                        const totalChunks = Math.ceil(file.size / chunkSize); // Total de fragmentos
                        let chunkIndex = 0; // Índice de fragmento actual

                        async function realizarRetryFetch(url, options, maxRetries = 3, retryDelay = 1000) {
                            let attempts = 0;
                            let response;

                            while (attempts < maxRetries) {
                                try {
                                    response = await fetch(url, options);
                                    if (response.ok) {
                                        return response; // Respuesta exitosa
                                    } else {
                                        throw new Error(\`Error HTTP \${response.status}: \${response.statusText}\`);
                                    }
                                } catch (error) {
                                    if (error.message.includes('504')) {
                                        attempts++;
                                        console.log(\`Reintento \${attempts}/\${maxRetries} debido a un 504 Gateway Timeout.\`);
                                        if (attempts < maxRetries) {
                                            await new Promise(resolve => setTimeout(resolve, retryDelay));
                                        }
                                    } else {
                                        throw error;
                                    }
                                }
                            }
                        }

                        // Función para enviar los fragmentos del archivo
                        async function sendChunks() {
                            const reader = new FileReader();

                            // Utilizamos una función asincrónica para procesar los fragmentos en serie
                            async function processChunk() {
                                // Verificar si aún hay fragmentos por enviar
                                if (chunkIndex < totalChunks) {
                                    const start = chunkIndex * chunkSize;
                                    const chunk = file.slice(start, start + chunkSize);

                                    reader.onload = async function (event) {
                                        const base64Data = event.target.result.split(',')[1]; // Obtener solo la parte base64

                                        const raw = JSON.stringify({
                                            "binary": base64Data, // Usamos base64 en lugar de binario
                                            "fileName": 'datos.csv', // Nombre del archivo
                                            "chunkIndex": chunkIndex,
                                            "parameters": {
                                            "aType": "lappizFunction",
                                            "pType": "Execute",
                                            "lappizFunctionId": "92267a3c-a14a-4b82-8623-49a206bc8a61",
                                            "environment": "environment",
                                        } 
                                        });

                                        const requestOptions = {
                                            method: "POST",
                                            headers: headers,
                                            body: raw,
                                            redirect: "follow"
                                        };

                                        try {
                                            // Realizar la solicitud con retry
                                            const response = await realizarRetryFetch(apiUrl + urlComplement,
                                                requestOptions,
                                                retryOptions.maxRetries,
                                                retryOptions.retryDelay
                                            );

                                            // Notificar éxito en el hilo principal
                                            // self.postMessage({ type: "success", data: \`Fragmento \${chunkIndex + 1} enviado correctamente.\` });
                                        } catch (error) {
                                            // Notificar error en el hilo principal
                                            self.postMessage({ type: "error", data: error.message });
                                        }

                                        // Incrementar el índice del fragmento y procesar el siguiente
                                        chunkIndex++;
                                        processChunk(); // Llamar de nuevo para procesar el siguiente fragmento
                                    };

                                    reader.readAsDataURL(chunk); // Leer el fragmento como base64
                                } else {
                                    // Cuando ya no haya más fragmentos por enviar, notificar que todo está completo
                                    self.postMessage({ type: "success", data: "Todos los fragmentos enviados." });
                                }
                            }

                            // Iniciar el procesamiento del primer fragmento
                            processChunk();
                        }

                        sendChunks(); // Llamamos a la función para enviar los fragmentos
                    };
                    `,
                ],
                { type: 'application/javascript' }
            )
        )
    );

    worker.onmessage = async function (e) {
        const message = e.data;

        if (message.type === 'success') {
            Swal.fire({
                title: 'Éxito',
                text: message.data,
                icon: 'success',
                confirmButtonColor: '#ee7402',
            });
            let query = `EXEC msdb.dbo.sp_start_job @job_name = 'Job_SimiladorDNC_Lappiz_EmailConfirmed'`
            await execQuery(query)


        }

        if (message.type === 'error') {
            Swal.fire({
                title: 'Error',
                text: `Ocurrió un error: ${message.data}`,
                icon: 'error',
                confirmButtonColor: '#ee7402',
            });
        }

        worker.terminate(); // Terminar el Worker
    };

    // Configuración de los headers y opciones de reintento
    const myHeaders = {
        "Content-Type": "application/json"
    };

    const retryOptions = {
        maxRetries: 3,
        retryDelay: 1000
    };

    // Enviar el archivo y la configuración al Worker para procesarlo
    worker.postMessage({
        file: file,
        headers: myHeaders,
        retryOptions: retryOptions,
        chunkSize: 1024 * 1024 * 10,
        id: sessionStorage.userId,
        environment: backGlobal.environment,
        apiUrl: backGlobal.api2,
        urlComplementPB: urlComplementPB
    });
}





function DescargarArchivo() {
    // obtener las URL's globales para funciones de backand
    const backGlobal = backandGlobal
    // url complementaria para descarga de archivo
    const urlComplement = '/SimiladorDNC_Lappiz.api/api/functions/DescargarArchivo'
    window.open(backGlobal.api2 + urlComplement, '_blank')
}



// consultar campos para anonima
async function consulta(query, idCampo) {
    var myHeaders = new Headers();
    const backGlobal = backandGlobal
    // url complementaria para consulta de datos
    const urlComplementC = '/SimiladorDNC_Lappiz.api/api/lappiz/sp/query'

    myHeaders.append("Authorization", `Bearer ${await obtenerAccessToken()}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": query,
        "tenantId": "null",
        "parameters": {
            "aType": "execTx",
            "environment": backGlobal.environment,
            "userId": "c28bce39-7e3d-4771-b398-7bf09d252b2d"
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(backGlobal.api2 + urlComplementC, requestOptions)
        .then(response => response.json())
        .then(result => {
            kendo.jQuery(`#${idCampo}`).data('kendoDropDownList').dataSource.data(result[0])
        })
        .catch(error => console.log('error', error));
}
async function obtenerAccessToken() {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", "administrador@simuladordnc.com");
        urlencoded.append("password", "Simulador.2023");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const response = await fetch(backGlobal.url + '/token', requestOptions);
        const result = await response.json();
        sessionStorage.token = result.access_token
        return result.access_token;

    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','8676efb4-1857-48d2-b604-8c4e23917fd0');
// consulta('select Id,RangoDias3 from SimiladorDNC_Lappiz_TasasVigentes','5b9ce178-27fe-4c52-b91d-ba6a898ff546');

// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','f53a0dc0-86aa-4745-ae14-693e64efbe1c');
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','dba0defd-0c17-48d7-ae3f-765a204a938a');
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','ea5ef0b1-0081-416d-83d3-2c2bf12a7091');
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','fcbb8f41-b976-4ebe-9e69-e0fda4fd3bd2');
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','9788a9bb-391f-4151-8548-9b2f487aee76');
// consulta('select Id,Title from SimiladorDNC_Lappiz_ListaMarca','222a23d1-e574-435f-9fa1-17c700859cc6');

// consulta('select Id,ActividadEconomica from SimiladorDNC_Lappiz_ActividadPrincipal','c852f2a7-6f9c-48f6-96b5-6fdc26c399ef');
// consulta('select Id,ActividadEconomica from SimiladorDNC_Lappiz_ActividadPrincipal','b54af750-167e-4831-bb8c-c374e7f45202');

// consulta('select Id,ActividadEconomica from SimiladorDNC_Lappiz_ActividadPrincipal','13a8a1c2-3026-481b-bddb-d62c2f321d2c');
// consulta('select Id,ActividadEconomica from SimiladorDNC_Lappiz_ActividadPrincipal','10d62ee5-6dc2-4452-9a91-e8acae95a3d3');

// consulta('select Id,Tasa from SimiladorDNC_Lappiz_TipoNovacion','df6ec434-cf4b-437d-a11e-c3ef9a701768');

// consulta('select Id,PlazosNovacion from SimiladorDNC_Lappiz_PlazoNovacion','9382c5a1-0445-4ed9-a785-850d06da2cd2');

setTimeout(() => {


    const dropdownlist = kendo.jQuery(`#df6ec434-cf4b-437d-a11e-c3ef9a701768`).data('kendoDropDownList');
    dropdownlist.bind("change", function (event) {

        async function valuechanged() {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${sessionStorage.token}`);
            myHeaders.append("Content-Type", "application/json");
            let Id = document.querySelector("#df6ec434-cf4b-437d-a11e-c3ef9a701768").value
            var raw = JSON.stringify({
                "query": `select TasaNovacion from SimiladorDNC_Lappiz_TipoNovacion where Id = '${Id}'`,
                "tenantId": "null",
                "parameters": {
                    "aType": "execTx",
                    "environment": backGlobal.environment,
                    "userId": "c28bce39-7e3d-4771-b398-7bf09d252b2d"
                }
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(api2 + urlComplementC, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setFieldValue('fad108db-d495-442a-9312-b681e86ac6ba', result[0][0].TasaNovacion)
                    kendo.jQuery('#fad108db-d495-442a-9312-b681e86ac6ba').data('kendoNumericTextBox').value(result[0][0].TasaNovacion)
                })
                .catch(error => console.log('error', error));


        }
        valuechanged()
    });
}, 2000);


