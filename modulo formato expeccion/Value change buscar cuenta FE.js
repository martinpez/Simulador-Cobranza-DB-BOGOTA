function snrChangeVacio() {
}

async function snrChange() {
    const idSNR = '82cc7235-51a2-44a2-9038-d2661f9ccfef';
    const idCuenta = '14147d37-86b5-4f19-ba01-49062f584897';

    function leerTextoSelect(id) {
        const el = document.getElementById(id);
        if (el) {
            const widget = window.kendo ? kendo.widgetInstance(kendo.jQuery(el)) : null;
            if (widget && typeof widget.text === 'function') {
                return widget.text() || '';
            }
            if (el.tagName === 'SELECT' && el.selectedIndex >= 0) {
                const opcion = el.options[el.selectedIndex];
                if (opcion) {
                    return opcion.text.trim();
                }
            }
        }
        return getFieldValue(id) || '';
    }

    try {
        const valorSNR = leerTextoSelect(idSNR).trim();
        console.log('SNR seleccionado:', valorSNR);

        if (!valorSNR) {
            setFieldValue(idCuenta, '');
            return;
        }

        const response = await execQuery(`SELECT Numerocuenta FROM SimiladorDNC_Lappiz_CUENTASNR WHERE NombreSNR = '${valorSNR}'`);
        console.log('Respuesta:', response);

        if (response && response[0] && response[0][0] && response[0][0].Numerocuenta) {
            setFieldValue(idCuenta, response[0][0].Numerocuenta);
        } else {
            setFieldValue(idCuenta, '');
        }
    } catch (error) {
        setFieldValue(idCuenta, '');
        console.error('snrChange: error consultando cuenta SNR', error);
    }
}