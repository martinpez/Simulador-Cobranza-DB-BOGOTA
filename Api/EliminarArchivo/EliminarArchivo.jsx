const fs = require('fs').promises;

async function eliminar(filePath){
    try {
        // return res.status(200).send('Archivo eliminado exitosamente.');
        await fs.access(filePath); // Verifica si el archivo existe
        await fs.unlink(filePath);
        return res.status(200).send('Archivo eliminado exitosamente.');
    } catch (err) {
        if (err.code === 'ENOENT') {
            return res.status(200).send('El archivo no existe, no es necesario eliminarlo.');
        } else {
            return res.status(400).send(`Error al eliminar el archivo: ${err.message}`);
        }
    }
};




(async () => {
  try {
    const filePath = obj.body.ruta;
    await eliminar(filePath);
  } catch (error) {
    return res.status(400).send("Error al procesar el archivo:", error.message);
  }
})();
