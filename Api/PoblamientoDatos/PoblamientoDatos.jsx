const fs = require("fs");
const path = require("path");

// Ruta para guardar los archivos
const tempDir = path.join('C:/BancoBogota/', "poblamiento");

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
