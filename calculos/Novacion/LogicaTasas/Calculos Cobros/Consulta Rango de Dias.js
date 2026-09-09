function consultarRango() {
    var ID_DIAS = '0cb35f96-ddc9-40e7-b948-8f0d4d86bf79';
    function num(v) { return isNaN(parseFloat(v)) ? 0 : parseFloat(v); }
 
    var edadMora = num(getFieldValue(ID_DIAS));
 
    if (edadMora > 0) {
        var queryRango = "select * from SimiladorDNC_Lappiz_rangosGastosCobranza";
 
        execQuery(queryRango).then(function (resRango) {
            var filas = (resRango && resRango[0]) ? resRango[0] : [];
            var rango = null;
 
            for (var i = 0; i < filas.length; i++) {
                if (edadMora >= num(filas[i].MinDias) && edadMora <= num(filas[i].MaxDias)) {
                    rango = filas[i];
                    break;
                }
            }
 
            var topeMin = 0, topeMax = 0, tasaGxCporc = 0, porcAbono = 0;
            if (rango) {
                topeMin     = num(rango.TopeMinimo);
                topeMax     = num(rango.TopeMaximo);
                tasaGxCporc = num(rango.PorcTasaGastoCobranza) * 100;
                porcAbono   = num(rango.PorcAbonoMinimo) * 100;
            }
 
            sessionStorage.NOV_topeMin = topeMin;
            sessionStorage.NOV_topeMax = topeMax;
            sessionStorage.NOV_tasaGxC = tasaGxCporc;
            sessionStorage.porMora     = porcAbono;
            if (typeof calculoNovacion === 'function') { calculoNovacion(); }
        }).catch(function (err) {
            console.error('consultarRango - error:', err);
        });
    } else {
        sessionStorage.NOV_topeMin = 0;
        sessionStorage.NOV_topeMax = 0;
        sessionStorage.NOV_tasaGxC = 0;
        if (typeof calculoNovacion === 'function') { calculoNovacion(); }
    }
}
