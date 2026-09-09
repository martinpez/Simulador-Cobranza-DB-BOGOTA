function calculoNovacion() {

    var NOV = {
        pagoMinimo:           '1f7c2b79-87a6-402f-95f2-414aea88a4bf',
        tasa:                 'b76668b5-0710-4eee-9718-a2633605c35e',
        plazo:                '9382c5a1-0445-4ed9-a785-850d06da2cd2',
        saldoTotal:           '616e6102-56e5-48e9-bfc2-fce8497e629d',
        intCte:               'e2c2ca76-e568-413d-8aac-b7bd2c3b9f52',
        intExtra:             'a710006e-72a9-4388-84ed-cc3b743ef45f',
        intMora:              'ce31f456-c5d9-4476-a56f-f5f44d2c8827',
        otrosCargos:          '51440ec8-1f3c-49fa-8672-15870130cb90',
        abonoMinimo:          '4cbf2d64-0442-4c98-964f-e741a6a4e6a1',
        tasaGxC:              '435298fd-5cda-4327-9e83-079eda46f0a9',
        gastosCobranza:       '3300e7e1-8d86-47d1-b709-2aa4773ec615',
        factMes1:             'eb81310f-a2f4-4cac-8dee-cd877f840a0f',
        factMes2a6:           '9f4dc8d9-4df5-46b4-89b5-4e9271b003eb',
        cuotaEstimada:        'd157fb29-fd6f-450b-b637-8fa18c824cd2',
        saldoFinalDiferir:    'c6923383-8eec-4efe-81a5-954ce52b8882',
        pagoParaNegociacion:  '92bcba6d-4dab-459e-bd8f-164da7eeb526',
        honorarios:           '075c9be0-baad-48b2-864d-acae840b7256',
        honorariosMax:        '1b7acda2-ec9a-4c72-937b-57fc95e4a4d1',
        pilotosMax:           'ca478a50-d210-4a8e-b64c-aef8fa26955b'
    };

    function num(v)    { return isNaN(parseFloat(v)) ? 0 : parseFloat(v); }
    function piso(n)   { return Math.floor(n); }
    function divi(a,b) { return (b === 0) ? 0 : a / b; }

    window.NOV_calculando = true;

    try {
        var estado = esHonorariosNov();
        var esHonorarios = (estado === true || estado === 'HONORARIOS') ? true
                         : (estado === 'PILOTOS') ? 'PILOTOS'
                         : false;
        var esNinguno    = (estado === 'NINGUNO');

        var saldoTotal  = num(getFieldValue(NOV.saldoTotal));
        var pagoMinimo  = num(getFieldValue(NOV.pagoMinimo));
        var tasa        = num(getFieldValue(NOV.tasa));
        var intCte      = num(getFieldValue(NOV.intCte));
        var intExtra    = num(getFieldValue(NOV.intExtra));
        var intMora     = num(getFieldValue(NOV.intMora));
        var otrosCargos = num(getFieldValue(NOV.otrosCargos));

        var plazoNov;
        var ddPlazo = document.getElementById(NOV.plazo);
        if (ddPlazo && ddPlazo.selectedOptions && ddPlazo.selectedOptions[0]) {
            plazoNov = num(ddPlazo.selectedOptions[0].textContent);
        } else {
            plazoNov = num(getFieldValue(NOV.plazo));
        }

        var porMora = num(sessionStorage.porMora);
        var topeMin = num(sessionStorage.NOV_topeMin);
        var topeMax = num(sessionStorage.NOV_topeMax);

        var tipoCobro = (sessionStorage.TipoCobro || '').toUpperCase();
        if (tipoCobro === 'GASTOS_90' || esHonorarios === 'PILOTOS') { topeMax = 0; }

        var abonoMinimo = pagoMinimo * (porMora / 100);
        var tasaVigente = tasa / 100;
        var totalICS    = (intCte + intExtra + intMora + otrosCargos) / 6;

        var base, tasaGxC, gastosCobranza, pagoNegociacion;
        var factMes1, factMes2a6, cuotaEstimada, saldoFinal;
        var honorarios, honorariosPropuesto;

        if (esHonorarios === true || esHonorarios === 'HONORARIOS' || esHonorarios === 'PILOTOS') {
            // ============ HONORARIOS / PILOTOS ============
            var porcHon = (esHonorarios === 'PILOTOS')
                ? num(sessionStorage.NOV_tasaGxC)
                : num(sessionStorage.NOV_porcCartera);

            honorariosPropuesto = piso((abonoMinimo * porcHon) / 100);  // el MÁXIMO (fijo)
            honorarios = honorariosPropuesto;

            // Si el usuario editó a un valor menor, respetarlo para cuotas/pago
            var honActual = (esHonorarios === 'PILOTOS')
                ? num(getFieldValue('33e26099-22ea-4c29-8e5e-02346e3e366a'))
                : num(getFieldValue(NOV.honorarios));
            if (honActual > 0 && honActual < honorariosPropuesto) {
                honorarios = honActual;
            }

            base = saldoTotal - (abonoMinimo + honorarios);

            tasaGxC = (esHonorarios === 'PILOTOS') ? num(sessionStorage.NOV_tasaGxC) : 0;
            gastosCobranza = 0;
            pagoNegociacion = abonoMinimo + honorarios;

            factMes1   = (base * tasaVigente) + totalICS;
            factMes2a6 = divi(base, plazoNov) + ((base * tasaVigente) + totalICS);
            var cuotaCapH = divi(base, plazoNov);
            cuotaEstimada = cuotaCapH + ((base - (6 * cuotaCapH)) * tasaVigente);
            saldoFinal = base;

        } else {
            // ========= GxC  y  NO APLICA =========
            honorarios = 0;
            honorariosPropuesto = 0;
            base = saldoTotal - abonoMinimo;

            tasaGxC = esNinguno ? 0 : num(sessionStorage.NOV_tasaGxC);

            if (tasaGxC <= 0) {
                gastosCobranza = 0;
            } else {
                var valorGxC = (pagoMinimo - abonoMinimo) * (tasaGxC / 100);
                if (topeMax > 0 && valorGxC > topeMax) { gastosCobranza = topeMax; }
                else if (valorGxC < topeMin)            { gastosCobranza = topeMin; }
                else                                    { gastosCobranza = valorGxC; }
            }

            pagoNegociacion = abonoMinimo;
            if (tasaGxC > 0) {
                var cargoNeg = Math.max(abonoMinimo * (tasaGxC / 100), topeMin);
                if (topeMax > 0 && cargoNeg > topeMax) { cargoNeg = topeMax; }
                pagoNegociacion += cargoNeg;
            }

            factMes1   = (base * tasaVigente) + totalICS + gastosCobranza;
            factMes2a6 = divi(base, plazoNov) + ((base * tasaVigente) + totalICS);
            cuotaEstimada = divi(base, plazoNov) +
                ((base - (divi(base, plazoNov) * 6)) * tasaVigente);
            saldoFinal = base;
        }

        setFieldValue(NOV.abonoMinimo,         abonoMinimo);
        setFieldValue(NOV.honorariosMax,       honorariosPropuesto);                              // MÁXIMO fijo
        setFieldValue(NOV.honorarios,          honorarios);                                       // editable (efectivo)
        setFieldValue('33e26099-22ea-4c29-8e5e-02346e3e366a', (esHonorarios === 'PILOTOS') ? honorarios : 0);
        setFieldValue(NOV.pilotosMax,          (esHonorarios === 'PILOTOS') ? honorariosPropuesto : 0);
        setFieldValue(NOV.tasaGxC,             tasaGxC);
        setFieldValue(NOV.gastosCobranza,      gastosCobranza);
        setFieldValue(NOV.factMes1,            factMes1);
        setFieldValue(NOV.factMes2a6,          factMes2a6);
        setFieldValue(NOV.cuotaEstimada,       cuotaEstimada);
        setFieldValue(NOV.saldoFinalDiferir,   saldoFinal);
        setFieldValue(NOV.pagoParaNegociacion, Math.round(pagoNegociacion));

        try {
            if (typeof toggleHonorariosNov === 'function') {
                toggleHonorariosNov(estado);
            }
        } catch (e2) { }

    } catch (error) {
        console.error('Error en calculoNovacion:', error);
    } finally {
        window.NOV_calculando = false;
    }
}
function onHonorarioChange(e) {
    if (window.NOV_calculando) { return; }
    if (typeof calculoNovacion === 'function') { calculoNovacion(); }
}
