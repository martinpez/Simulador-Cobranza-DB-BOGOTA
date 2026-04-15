function eliminarvacia() { }
async function eliminarPoblamiento() {
    const result = await Swal.fire({
        title: 'Eliminar registros',
        text: '¿Desea eliminar registros cargados hoy?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#7dd82c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    // Obtener fecha actual
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anno = hoy.getFullYear();

    // Consulta DELETE parametrizada para cada bloque
    const deleteQuery = `
    DELETE TOP (50000)
    FROM SimiladorDNC_Lappiz_PoblamientoDatos
    WHERE YEAR(CONVERT(DATE, FechaProceso, 103)) = ${anno}
      AND MONTH(CONVERT(DATE, FechaProceso, 103)) = ${mes}
      AND DAY(CONVERT(DATE, FechaProceso, 103)) = ${dia};
  `;

    try {
        // Ejecutar 5 veces en bloques de 100.000
        for (let i = 0; i < 20; i++) {
            const result = await execQuery(deleteQuery);
            // Si no se borró nada (result.rowCount == 0), romper el bucle
            if (result.rowCount === 0) break;
        }

        await Swal.fire({
            title: '¡Hecho!',
            text: 'Se han eliminado los registros',
            icon: 'success',
            confirmButtonColor: '#ee7402'
        });
    } catch (err) {
        console.error(err);
        await Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar los registros: ' + err.message,
            icon: 'error',
            confirmButtonColor: '#d33'
        });
    }
}