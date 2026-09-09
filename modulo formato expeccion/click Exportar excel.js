console.log('FormLoaded: enganchando botones de verificar y exportar excel');
$(document).on('click', '#btnVerificarDatosFE', function () {
    console.log('se detecto el click en Verificar Datos');
    verificarDatosFormatoExcepciones();
});
$(document).on('click', '#btnExportarExcelFE', function () {
    console.log('se detecto el click en Exportar Formato de Excepciones');
    exportarExcelFormatoExcepciones();
});
