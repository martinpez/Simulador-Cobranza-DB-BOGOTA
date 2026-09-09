function toggleHonorariosNov(on) {
    // Honorarios: visible solo en HONORARIOS
    var mostrarHon = (on === true || on === 'HONORARIOS');
    // Campo PILOTOS propio: visible solo en PILOTOS
    var mostrarPilotos = (on === 'PILOTOS');
    // Tasa GxC%: visible en GASTOS y PILOTOS
    var mostrarTasaGxC = (on === false || on === 'GASTOS' || on === 'PILOTOS');
    // Gastos GxC (valor): visible solo en GASTOS
    var mostrarGastosGxC = (on === false || on === 'GASTOS');

    try { visibilityField('1b7acda2-ec9a-4c72-937b-57fc95e4a4d1', mostrarHon); } catch (e) {}       // Honorarios Máximos
    try { visibilityField('075c9be0-baad-48b2-864d-acae840b7256', mostrarHon); } catch (e) {}       // Honorarios
    try { visibilityField('33e26099-22ea-4c29-8e5e-02346e3e366a', mostrarPilotos); } catch (e) {}    // PILOTOS
    try { visibilityField('ca478a50-d210-4a8e-b64c-aef8fa26955b', mostrarPilotos); } catch (e) {}    // PILOTOS MAX
    try { visibilityField('435298fd-5cda-4327-9e83-079eda46f0a9', mostrarTasaGxC); } catch (e) {}    // Tasa GxC %
    try { visibilityField('3300e7e1-8d86-47d1-b709-2aa4773ec615', mostrarGastosGxC); } catch (e) {}  // Gastos GxC

    // Lista tipo de cobro: bloqueada si data cargada, editable si data creada
    try {
        var listaCobro = document.getElementById('7f0df958-9e6d-48ba-95e3-0b3a8bc2e0fe');
        if (listaCobro) { listaCobro.disabled = (sessionStorage.getItem('UserCargado') !== 'no'); }
    } catch (e) {}
}

function initGastoNov() {
    var GID_GASTO = '7f0df958-9e6d-48ba-95e3-0b3a8bc2e0fe';
    var tipo = (sessionStorage.TipoCobro || '').toUpperCase().trim();
    var objetivo = (tipo.indexOf('HONORARIO') === 0) ? 'HONORARIO'
                 : (tipo.indexOf('GASTOS_90') === 0) ? 'PILOTO'
                 : 'GASTO';

    console.log('initGastoNov -> TipoCobro:', JSON.stringify(tipo), '| objetivo:', objetivo);

    var el = document.getElementById(GID_GASTO);
    if (el) {
        for (var i = 0; i < el.options.length; i++) {
            var textoOpc = el.options[i].text.toUpperCase();
            if (objetivo === 'GASTO') {
                // "GASTO" pero NO "PILOTO" (evita cruce)
                if (textoOpc.indexOf('GASTO') !== -1 && textoOpc.indexOf('PILOTO') === -1) {
                    el.selectedIndex = i;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                }
            } else {
                if (textoOpc.indexOf(objetivo) !== -1) {
                    el.selectedIndex = i;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                }
            }
        }
        console.log('initGastoNov -> seleccionado:', el.selectedOptions[0] ? el.selectedOptions[0].text : 'NADA');
    }

    if (typeof toggleHonorariosNov === 'function' && typeof esHonorariosNov === 'function') {
        toggleHonorariosNov(esHonorariosNov());
    }
    if (typeof calculoNovacion === 'function') { calculoNovacion(); }
}
