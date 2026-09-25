try {
  const fs = require('fs');
  const path = require("path");

// Ruta para guardar los archivos
const filePath = path.join('C:/BancoBogota/', "poblamiento", "datos.csv");
 
  // Verifica si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ mensaje: 'Archivo no encontrado' });
    }

    // Envía el archivo como descarga
    res.download(filePath, 'datos.csv', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        return res.status(500).send('Error al descargar el archivo');
      }
    });
  });
} catch (e) {
  console.error('Error al descargar el archivo catch:', e);
  return res.status(500).send('Error al descargar el archivo catch');
}