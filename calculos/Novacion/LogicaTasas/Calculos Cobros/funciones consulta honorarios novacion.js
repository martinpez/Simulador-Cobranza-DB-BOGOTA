function honoranovacionvacio(){}
 
async function calculoHonorariosNov() {
    function num(v) { return isNaN(parseFloat(v)) ? 0 : parseFloat(v); }
 
    var ID_TIPO_CARTERA = 'baa0e784-8248-45b8-9394-8932fe45094e';
    var GID_LINEA       = '#46155d51-2885-490a-8a71-d75a35da95b4';
 
    try {
        var codigoLinea = sessionStorage.Linea;
        if (codigoLinea) {
            try {
                var nombreLinea = null;
 
                if (codigoLinea.indexOf('0900') === 0) {
                    nombreLinea = 'Tarjeta de Credito [Cualquier Franquicia]';
                } else {
                    var qLinea = "SELECT NomProductos FROM SimiladorDNC_Lappiz_LineaProducto WHERE CodCodigo = '" + codigoLinea + "'";
                    var rLinea = await execQuery(qLinea);
                    if (rLinea && rLinea[0] && rLinea[0][0]) {
                        nombreLinea = rLinea[0][0].NomProductos;
                    }
                }
 
                // Seleccionar la opción en el dropdown
                if (nombreLinea) {
                    var ddLinea = kendo.jQuery(GID_LINEA).data("kendoDropDownList");
                    if (ddLinea) {
                        var itemLinea = ddLinea.dataSource.data().find(function (x) {
                            return x.NomProductos === nombreLinea;
                        });
                        if (itemLinea) {
                            ddLinea.value(itemLinea.Id);
                            ddLinea.trigger("change");
                        }
                    }
                }
            } catch (eL) { console.error("Error cargando línea:", eL); }
        }
 
        var tipoCartera = '';
        var widget = document.querySelector('[aria-owns="' + ID_TIPO_CARTERA + '_listbox"]');
        if (widget) {
            var kInput = widget.querySelector('.k-input');
            if (kInput) { tipoCartera = kInput.textContent.trim(); }
        }
 
        if (!tipoCartera) {
            sessionStorage.NOV_porcCartera = 0;
        } else {
            var query = "select ValorHonorarios,TipoHonorarios from SimiladorDNC_Lappiz_dethonorarios where TipoHonorarios = '" + tipoCartera + "'";
            var response = await execQuery(query);
            var fila = (response && response[0] && response[0][0]) ? response[0][0] : null;
            sessionStorage.NOV_porcCartera = fila ? num(fila.ValorHonorarios) : 0;
        }
 
        if (typeof calculoNovacion === 'function') { calculoNovacion(); }
 
    } catch (error) {
        console.error('[HON] ERROR:', error);
 }
}

function onDiasMoraChange(e) {
    if (window.NOV_diasMoraTimer) { clearTimeout(window.NOV_diasMoraTimer); }
    window.NOV_diasMoraTimer = setTimeout(function () {
        if (typeof toggleHonorariosNov === 'function') { toggleHonorariosNov(esHonorariosNov()); }
        if (typeof consultarRango === 'function') { consultarRango(); }
    }, 500);
}



function esHonorariosNov() {
    var GID_GASTO = '7f0df958-9e6d-48ba-95e3-0b3a8bc2e0fe';
    var el = document.getElementById(GID_GASTO);
    var texto = '';
    if (el && el.selectedOptions && el.selectedOptions[0]) {
        texto = el.selectedOptions[0].textContent.trim().toUpperCase();
    }
    if (texto.indexOf('NO APLICA') === 0) { return 'NINGUNO'; }   // <-- agregar
    if (texto.indexOf('PILOTO') === 0) { return 'PILOTOS'; }
    return texto.indexOf('HONORARIO') === 0;
}
 
/* valuechanged del select -> aplica visibilidad + recalcula */
function onGastoNovChange(e) {
    if (typeof toggleHonorariosNov === 'function' && typeof esHonorariosNov === 'function') {
        toggleHonorariosNov(esHonorariosNov());
    }
    if (typeof calculoNovacion === 'function') { calculoNovacion(); }
}
function arranqueGastoNov() {
    var GID_GASTO = '7f0df958-9e6d-48ba-95e3-0b3a8bc2e0fe';
    var intentos = 0;
    function intentar() {
        var widget = document.querySelector('[aria-owns="' + GID_GASTO + '_listbox"]');
        if (!widget) {
            if (intentos < 25) { intentos++; setTimeout(intentar, 200); return; }
            return;
        }
        // Aplica visibilidad según el valor actual del dropdown
        if (typeof esHonorariosNov === 'function' && typeof toggleHonorariosNov === 'function') {
            toggleHonorariosNov(esHonorariosNov());
        }
    }
    intentar();
}
