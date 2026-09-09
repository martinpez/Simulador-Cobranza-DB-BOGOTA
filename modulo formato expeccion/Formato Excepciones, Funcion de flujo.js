function formatoExcepcionesChange() {
    const mapaMecanismo = {
        'consolidacion': { idLista: '48dfc177-18ab-4c7c-91a9-e2a63c92dc15', idBoton: 'btnFormatoExcepcionesConsolidacion' },
        'novacion':      { idLista: '9f53f77e-2ed6-48f2-a6f9-87552428a4db', idBoton: 'btnFormatoExcepcionesNovacion' },
        'pagomora':      { idLista: 'd3b8782c-c94a-4b7a-a2aa-00baba7bfbd5', idBoton: 'btnFormatoExcepcionesPagomora' },
        'cancelacion':   { idLista: 'e99362f1-b8da-4cca-8982-c8af8dcb5caf', idBoton: 'btnFormatoExcepcionesCancelacion' },
        'ampliacion':    { idLista: '13719b60-17be-4c9f-a190-d6fe27ab12f6', idBoton: 'btnFormatoExcepcionesAmpliacion' }
    };

    const mecanismo = sessionStorage.mecanismo;

    if (!mecanismo) {
        // aun no se ha elegido ningun mecanismo (por ejemplo, al cargar la pagina), no es un error, solo no hay nada que hacer todavia
        return;
    }

    const config = mapaMecanismo[mecanismo];

    if (!config) {
        console.warn('Formato de Excepciones: mecanismo no reconocido en sessionStorage -> ' + mecanismo);
        return;
    }

    let valor = (getFieldValue(config.idLista) || '').trim().toUpperCase();

    if (valor !== 'SI' && valor !== 'NO') {
        console.warn('Formato de Excepciones: valor no reconocido -> ' + valor);
        return;
    }

    const btnFormatoExcepciones = document.getElementById(config.idBoton);
    if (!btnFormatoExcepciones) { return; }

    btnFormatoExcepciones.style.display = (valor === 'SI') ? 'inline-block' : 'none';
}
// funcion enganchada al click del boton Formato de Excepciones
function abrirFormatoExcepciones() {
    llenarFormatoExcepciones();
    const URL_FORMATO_EXCEPCIONES = "https://simuladorcobranzasbdbpru.lappiz.io/#/forms?viewName=SimiladorDNC_Lappiz_FormatoExcepciones&entityId=75f7d794-95f1-43a4-b445-f453fa3d3315&entityName=SimiladorDNC_Lappiz_FormatoExcepciones&appViewId=abd9246f-8baf-45f4-8557-c5f9c77fb1ee";
    window.open(URL_FORMATO_EXCEPCIONES, '_blank');
}