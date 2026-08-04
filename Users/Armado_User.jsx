function usuario() {

    let tipo = getFieldValue('c20e3d02-3f60-402e-85ba-28e1fb3f1efb')
    let numerodocumento = getFieldValue('3b460213-acc2-43e9-a39b-801e9d5e147d')
    if (tipo && numerodocumento) {
        let inicial;
        switch (tipo) {
            case 'CC':
                inicial = "C";
                break;
            case 'NIT':
                inicial = "N";
                break;
            case 'CE':
                inicial = "E";
                break;
        }
        let usuario = inicial + numerodocumento
        setFieldValue('07300819-cfe6-473f-9946-2bc87ae283fd', usuario)
    }

}