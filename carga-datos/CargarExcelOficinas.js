function cargarvacia() {}
async function CargarExcelOficinas() {
   
    try{
         let nameFunction = 'EliminarArchivo';
            let lappizFunctionId = 'd2ebec8e-ab1c-4569-b900-eb457a889990';
            let method = "POST"//POST
            let ruta = `C:/BancoBogota/oficina/datos_oficina.csv`
            let body = {ruta:ruta}
            let config = {nameFunction, lappizFunctionId, body, method}
            execLF(config)
    }catch(err){
        
    }
    
    
    
    Swal.fire({
        title: 'Procesando información',
        text: 'Recuerda no cerrar el aplicativo o refrescar la página, este proceso puede tardar unos minutos.',
        icon: 'info',
        confirmButtonColor: '#ee7402',
    });

     

    
    const input = document.getElementById('inputPoblamientoOficina');
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
                                            "fileName": 'datos_oficina.csv', // Nombre del archivo
                                            "chunkIndex": chunkIndex,
                                            "parameters": {
                                            "aType": "lappizFunction",
                                            "pType": "Execute",
                                            "lappizFunctionId": "0d12103d-8fd5-4036-9c75-09c1409175a5",
                                            "environment": "TEST"
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
                                            const response = await realizarRetryFetch(
                                                "https://txtest.lappiz.io/SimiladorDNC_Lappiz.api/api/functions/PoblarOficinas",
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
    worker.postMessage({ file: file, headers: myHeaders, retryOptions: retryOptions, chunkSize: 1024 * 1024 * 10, id:sessionStorage.userId });
}


poblamiento
// peticion al servidor 

const fs = require("fs");
const path = require("path");

// Ruta para guardar los archivos
const tempDir = path.join('C:/BancoBogota/', "oficina");

// Verificar si la carpeta existe, si no, crearla
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Función para procesar cada fragmento de base64
async function writeChunkToFile(binaryFile, fileName, chunkIndex) {
  try {
    const filePath = path.join(tempDir, fileName); // Ruta completa del archivo

    // Convertir el base64 a un buffer de datos binarios
    const buffer = Buffer.from(binaryFile, 'base64');

    // Escribir el fragmento en el archivo correspondiente
    fs.appendFileSync(filePath, buffer); // appendFileSync agrega el fragmento al archivo

    return `Fragmento ${chunkIndex + 1} recibido y escrito correctamente.`;
  } catch (error) {
    return res.status(400).send("Error al escribir el fragmento:", error);
    return "Error al escribir el fragmento: " + error.message;
  }
}

// Función autoejecutable de prueba
(async () => {
  try {
    // Reemplaza con tu base64 de prueba y modelo
    const binaryFile = obj.body.binary;
    const filename = obj.body.fileName;
    const chunkIndex = obj.body.chunkIndex
    
    const result = await writeChunkToFile(binaryFile, filename, chunkIndex);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
})();
