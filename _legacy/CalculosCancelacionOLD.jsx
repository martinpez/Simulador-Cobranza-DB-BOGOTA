function vaciacancelar() { }
async function poblarCancelacion() {

    delete sessionStorage.Capital
    let producto = e.dataItem.Producto

    let saldoTotalObl = e.dataItem.SaldoTotalObl
    setFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca', saldoTotalObl)
    let interescteObl = e.dataItem.InteresCteObl
    setFieldValue('48f8260e-5e81-43d3-b69c-d94808cb229e', interescteObl)

    let edadmora = e.dataItem.EdadMoraCl
    sessionStorage.edadmoraCancelacion = edadmora

    // Consulta tasas vigentes por edad de mora
    let query = `SELECT PorcCancelacionIntMora, PorcCancelacionIntCte, PorcPagoMoraIntExtraC, PorcentajeCT from SimiladorDNC_Lappiz_TasasVertas where RangoDias3 = '${edadmora}'`
    let response = await execQuery(query)
    console.log(response[0][0])

    sessionStorage.PorcCancelacionIntCte = response[0][0].PorcCancelacionIntCte
    sessionStorage.PorcCancelacionIntMora = response[0][0].PorcCancelacionIntMora
    sessionStorage.PorcPagoMoraIntExtraC = response[0][0].PorcPagoMoraIntExtraC
    sessionStorage.PorcentajeCT = response[0][0].PorcentajeCT



    let Pordescuentoint = response[0][0].PorcCancelacionIntCte


    let pordescuentomora = response[0][0].PorcCancelacionIntMora
    let pordescuentoextra = response[0][0].PorcPagoMoraIntExtraC
    let PorcentajeCT = response[0][0].PorcentajeCT
    let desCapital = 0
    sessionStorage.MecanismoAplicaCampana = e.dataItem.MecanismoAplicaCampana

    if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes("CANCELACION")) {
        sessionStorage.campañacancelacion = 1
        Pordescuentoint = e.dataItem.DtoInteresesCampana
        pordescuentomora = e.dataItem.DtoInteresesMoraCampana
        pordescuentoextra = e.dataItem.DtoInteresExtracontablesCampana
        PorcentajeCT = e.dataItem.DctoCapitalCampana
        console.log('si tiene campaña en cancelacion')
        desCapital = e.dataItem.CapitalTotalObl * (e.dataItem.DctoCapitalCampana / 100)
        sessionStorage.DctoCapitalCampana = e.dataItem.DctoCapitalCampana / 100
        sessionStorage.Capital = 'Si'

    }
    sessionStorage.PorcCancelacionIntCte = Pordescuentoint
    sessionStorage.PorcCancelacionIntMora = pordescuentomora

    sessionStorage.desCapital = desCapital
    sessionStorage.PorcentajeCT = PorcentajeCT
    sessionStorage.Pordescuentoint = Pordescuentoint
    sessionStorage.pordescuentomora = pordescuentomora
    sessionStorage.pordescuentoextra = pordescuentoextra
    setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', Pordescuentoint)


    // Porcentaje descuento interés corriente (siempre se llena)
    let maxDescuentoInt = (Pordescuentoint / 100) * interescteObl
    setFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02', maxDescuentoInt)

    // Interés mora (siempre se llena)
    let interesmora = e.dataItem.InteresMoraObl
    setFieldValue('d85c85c3-2a7c-44db-b240-2420990d7375', interesmora)
    let maxdescuentomora = (pordescuentomora / 100) * interesmora
    setFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8', maxdescuentomora)
    setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', maxdescuentomora)
    setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', pordescuentomora)

    // Interés extracontable (solo para TARJETA)
    let interesExtraTC = 0
    if (producto == 'TARJETA') {
        interesExtraTC = e.dataItem.InteresesExtracontablesObl
    }
    setFieldValue('a9977387-4683-4d89-9e58-851cb72f9886', interesExtraTC)

    let maxdescuentointeresExtraTC = (pordescuentoextra / 100) * interesExtraTC
    setFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27', maxdescuentointeresExtraTC)
    setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', maxdescuentointeresExtraTC)
    setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', pordescuentoextra)

    // Capital (siempre se llena)
    let capital = e.dataItem.CapitalTotalObl
    setFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253', capital)

    let maxdescuentocapital = (PorcentajeCT / 100) * capital
    setFieldValue('79b6141f-1973-4c00-b0ae-a26b657115e5', maxdescuentocapital)
    setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', desCapital)
    let porcentajedescuentocapital = desCapital / capital
    setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', porcentajedescuentocapital)

    // Total descuentos (siempre se calcula)
    let maxdescuentos = maxdescuentocapital + maxdescuentointeresExtraTC + maxdescuentomora + maxDescuentoInt
    setFieldValue('7a94fe37-1d84-4232-9298-4e1986cdead2', maxdescuentos)

    // Abono mínimo (siempre se calcula)
    let abonominimo = e.dataItem.SaldoTotalObl - maxdescuentos + 10000
    setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f', abonominimo)


    // EsTarjeta (siempre se llena, indica si es producto TARJETA)
    if (producto == 'TARJETA') {
        setFieldValue('876c30bc-ba27-4ec4-ad2e-1635b23cdccb', 'Si')
    } else {
        setFieldValue('876c30bc-ba27-4ec4-ad2e-1635b23cdccb', 'No')
    }
}

// -----------------------------------------------------------------------------------------------------------


function DescuentoInteresCte() {
    debugger
    let interescteObl = getFieldValue('48f8260e-5e81-43d3-b69c-d94808cb229e')
    let Pordescuentoint = sessionStorage.PorcCancelacionIntCte;
    let pordescuentomora = sessionStorage.PorcCancelacionIntMora;
    let pordescuentoextra = sessionStorage.PorcCancelacionIntMora;
    let pagoAlSnr = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9')
    let saldoTotal = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let intmora = getFieldValue('d85c85c3-2a7c-44db-b240-2420990d7375')
    let intextra = getFieldValue('a9977387-4683-4d89-9e58-851cb72f9886')
    let edad = sessionStorage.EdadMoraCl
    console.log("edadmora", edad)

    //porcentaje int cte
    if (interescteObl > 0) {
        Pordescuentoint = getFieldValue('86f86bd7-d119-4d2a-a6c0-e711b1d835a6') / getFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02') * 100
    } else {
        Pordescuentoint = 100
    }
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        Pordescuentoint = 0;
    }

    setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', Pordescuentoint)
    //porcentaje int mora
    if (intmora > 0) {
        pordescuentomora = 100;
    } else if ((saldoTotal - pagoAlSnr - intmora) >= 0) {
        pordescuentomora = 100;
    } else {
        pordescuentomora = Math.round((intmora / (saldoTotal - pagoAlSnr)) * 10000) / 100
    }
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        pordescuentomora = 0;
    }
    intmora = intmora * (pordescuentomora / 100)
    setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', intmora)
    setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', pordescuentomora)

    //interes extra
    if (intextra > 0) {
        pordescuentoextra = (getFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01') / getFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27')) * 100
        intextra = intextra * (pordescuentoextra / 100)
    }
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        pordescuentoextra = 0;
        intextra = 0;
    }
    setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', intextra)
    setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', pordescuentoextra)


    let maxDescIntMora = getFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8')
    let maxDctoIntExtraCTC = getFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27')
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxDescIntMora = 0;
        maxDctoIntExtraCTC = 0;
    }
    console.log("maxDescIntMora", maxDescIntMora)
    console.log("maxDctoIntExtraCTC", maxDctoIntExtraCTC)

    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxDescIntMora = 0;
        maxDctoIntExtraCTC = 0;
    }

    let descuentoCapital = 0
    //if(!sessionStorage.Capital || sessionStorage.Capital != 'Si'){
    descuentoCapital = DescuentoCapital()
    //}else{
    //  let capital = getFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253')
    //   descuentoCapital = capital*sessionStorage.DctoCapitalCampana
    // }
    let capital = getFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253')

    //if(!sessionStorage.Capital){
    setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', descuentoCapital)
    let porCapital = (descuentoCapital / capital) * 100
    setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', porCapital)
    //}
    // Calcula los valores intermedios
    const sumaBase = saldoTotal + 10000;
    const sumaDescuentos = pagoAlSnr + descuentoCapital + maxDescIntMora + maxDctoIntExtraCTC;

    // Aplica la condición

    if (sumaBase - sumaDescuentos > 0) {
        return sumaBase - sumaDescuentos; // Devuelve el cálculo ajustado
    } else {
        //setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', 0)
        return 0; // Devuelve el saldo total más intereses no facturados
    }
}
function DescuentoCapital() {
    debugger
    let edad = sessionStorage.EdadMoraCl
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        return 0;
    }

    let pagoAlSnr = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9')
    let saldoTotal = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let maxDescIntMora = getFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8')
    let maxDctoIntExtraCTC = getFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27')
    let maxDescIntCte = getFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02')
    // Calcula los valores intermedios
    const sumaBase = saldoTotal + 10000;
    const sumaDescuentos = pagoAlSnr + maxDescIntCte + maxDescIntMora + maxDctoIntExtraCTC;

    // Aplica la condición
    if (sumaBase - sumaDescuentos > 0) {
        return sumaBase - sumaDescuentos; // Devuelve el cálculo ajustado
    } else {
        return 0; // Devuelve "0" si la condición no se cumple
    }
}

// -----------------------------------------------------------------------------------------------------------

function recalcularcancelacion() {
    debugger
    let interescteObl = getFieldValue('48f8260e-5e81-43d3-b69c-d94808cb229e')
    let maxDescuentoInt = (sessionStorage.PorcCancelacionIntCte / 100) * interescteObl
    let edad = sessionStorage.EdadMoraCl
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxDescuentoInt = 0
    }
    setFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02', maxDescuentoInt)

    let Pordescuentoint = parseFloat(sessionStorage.getItem('Pordescuentoint'));
    let pordescuentomora = parseFloat(sessionStorage.getItem('pordescuentomora'));
    let pordescuentoextra = parseFloat(sessionStorage.getItem('pordescuentoextra'));
    let desCapital = parseFloat(sessionStorage.getItem('desCapital'));



    setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', Pordescuentoint)

    //seccion mora
    let interesmora = getFieldValue('d85c85c3-2a7c-44db-b240-2420990d7375')

    let maxdescuentomora = (sessionStorage.PorcCancelacionIntMora / 100) * interesmora
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxdescuentomora = 0;
    }
    setFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8', maxdescuentomora)
    setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', maxdescuentomora)
    setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', pordescuentomora)

    //seccion extracontables
    let interesExtraTC = getFieldValue('a9977387-4683-4d89-9e58-851cb72f9886')


    let maxdescuentointeresExtraTC = (sessionStorage.PorcCancelacionIntMora / 100) * interesExtraTC
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxdescuentointeresExtraTC = 0;
    }
    setFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27', maxdescuentointeresExtraTC)
    setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', maxdescuentointeresExtraTC)
    setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', pordescuentoextra)

    let saldoT = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let snr = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9')

    let capital = getFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253')
    // setFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253',capital)


    let maxdescuentocapital = (sessionStorage.PorcentajeCT / 100) * capital
    if (edad == "1-30 Días" || edad == "31-60 Días") {
        maxdescuentocapital = 0;
        desCapital = 0;
    }
    setFieldValue('79b6141f-1973-4c00-b0ae-a26b657115e5', maxdescuentocapital)
    setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', desCapital)

    let porcentajedescuentocapital = (desCapital / capital)
    porcentajedescuentocapital = Math.round((porcentajedescuentocapital * 100))
    setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', porcentajedescuentocapital)


    let saldoTotalObl = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let maxdescuentos = maxdescuentocapital + maxdescuentointeresExtraTC + maxdescuentomora + maxDescuentoInt
    setFieldValue('7a94fe37-1d84-4232-9298-4e1986cdead2', maxdescuentos)
    //let abonominimo = saldoTotalObl - maxdescuentos + 10000
    //setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f',abonominimo)




    let operacion = saldoT - snr + 10000
    if (operacion > 0) {
        if (edad == "1-30 Días" || edad == "31-60 Días") {
            operacion = 0;
        }
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', operacion)
    } else {
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', 0)
    }

    let descuentooperacion = DescuentoInteresCte()
    setFieldValue('86f86bd7-d119-4d2a-a6c0-e711b1d835a6', descuentooperacion)
}


// value change de capital total 

recalcularcancelacion();
let capital = e.value
let maxdescuentocapital = (sessionStorage.PorcentajeCT / 100) * capital
setFieldValue('79b6141f-1973-4c00-b0ae-a26b657115e5', maxdescuentocapital)
let abono1 = getFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f')
let abonoexacto1 = abono1 - 1
setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f', abonoexacto1)



// value change de pago snr 
if (e.value > 0) {
    debugger; DescuentoInteresCte()
    recalcularcancelacion()
    if (e.value < getFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f')) {
        toastr.warning('El valor a pagar debe ser mayor al abono minimo que debe realizar el cliente.')
    }
    let descuento = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let operacion = descuento + 10000 - e.value
    if (operacion > 0) {
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', operacion)
    } else {
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', 0)
    }
}
