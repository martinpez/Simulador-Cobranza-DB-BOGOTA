
document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modalampliacion');
    const btnAbrir = document.getElementById('btnAbrir');

    // VERIFICACIÓN DE SEGURIDAD: Solo añade eventos si los elementos existen
    if (btnAbrir && modal) {

        // 1. Abrir el modal
        btnAbrir.addEventListener('click', () => {

            modal.showModal();


        });

        // 2. TRUCO: Cerrar al hacer clic fuera (en el backdrop)
        modal.addEventListener('click', (event) => {
            // En la etiqueta <dialog>, el clic en el fondo oscuro cuenta como clic en el 'modal'
            // pero NO en su contenido interno.
            if (event.target === modal) {
                modal.close();
            }
        });

        console.log("Sistema de modal listo 🚀");

    } else {
        // Esto te avisará en la consola (F12) si te falta algún ID
        if (!btnAbrir) console.error("Error: No se encontró el botón con id='btnAbrir'");
        if (!modal) console.error("Error: No se encontró el dialog con id='modalAmpliacion'");
    }
});

function descargarPDF() {
    const element = document.getElementById('contenedorpagomoraPDF');

    const options = {
        margin: [2, 2, 2, 2],                    // márgenes pequeños pero limpios
        filename: 'Solicitud_Normalizacion_Pagomora.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            scrollY: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'letter',           // ← Cambio clave (A4 es más alto)
            orientation: 'portrait'
        }
    };

    html2pdf()
        .set(options)
        .from(element)
        .save()
        .catch(err => console.error("Error al generar PDF:", err));
}

