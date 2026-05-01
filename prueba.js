if (e.value > 0){
    debugger;
    DescuentoInteresCte()
    recalcularcancelacion()
    if (e.value < getFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f')) {
        toastr.warning('El valor a pagar debe ser mayor al abono minimo que debe realizar el cliente.')
    }
    let descuento = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let operacion = descuento - e.value + 10000
    if (operacion > 0) {
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', operacion)
    } else {
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', 0)
    }
}

    

