function vaciacancelar() { }
async function poblarCancelacion() {

    delete sessionStorage.Capital
    let producto = e.dataItem.Producto
    debugger;
    let saldoTotalObl = e.dataItem.SaldoTotalObl
    saldoTotalObl = saldoTotalObl - parseFloat(sessionStorage.honorariosValues) || 0
    setFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca', saldoTotalObl)
    let interescteObl = e.dataItem.InteresCteObl
    setFieldValue('48f8260e-5e81-43d3-b69c-d94808cb229e', interescteObl)


    // seteo de honorarios 
    if (sessionStorage.UserCargado != "no") {
        let honorarioslista = "bda37ca7-d503-4d41-8ff4-aebde2cb7c30"
        let idlineaKendo = "#8e8d6cf2-299c-4b45-8059-64cf50b2bd11"
        let idTipoCarteraKendo = "#dfe46e30-5328-485e-bc80-bec20aab2d02"
        let tipocobro = sessionStorage.TipoCobro
        let tipolinea = sessionStorage.Linea
        let tipocartera = sessionStorage.TipoCartera
        let mecanismo = "cancelacion"
        CargaCamposHonorarios(honorarioslista, idlineaKendo, idTipoCarteraKendo, tipocobro, tipolinea, tipocartera, mecanismo);
    }

    debugger;
    let pagoMinimo;
    let pagomin = e.dataItem.PagoMinObl;
    let honorarios = sessionStorage.honorariosValues;
    if (sessionStorage.Producto == 'CARTERA') {
        pagoMinimo = pagomin - honorarios
    } else {
        pagoMinimo = e.dataItem.PagoMinObl
    }

    setFieldValue('aa665762-9b2f-47f8-8d8c-cabca1924771', pagoMinimo)

    let edadmora = e.dataItem.EdadMoraCl
    sessionStorage.edadmoraCancelacion = edadmora
    let query = `select PorcCancelacionIntMora, PorcCancelacionIntCte, PorcentajeCT from SimiladorDNC_Lappiz_TasasVigentes where RangoDias3 = '${edadmora}'`
    let response = await execQuery(query)
    console.log(response[0][0])
    let porceCancelacionIntExtra = response[0][0].PorcCancelacionIntCte
    sessionStorage.PorcCancelacionIntCte = response[0][0].PorcCancelacionIntCte
    sessionStorage.PorcCancelacionIntMora = response[0][0].PorcCancelacionIntMora
    sessionStorage.PorCancelacionIntExtraC = porceCancelacionIntExtra // actuan igual que el interesescte
    sessionStorage.PorcentajeCT = response[0][0].PorcentajeCT



    let Pordescuentoint = response[0][0].PorcCancelacionIntCte


    let pordescuentomora = response[0][0].PorcCancelacionIntMora
    let pordescuentoextra = porceCancelacionIntExtra
    let PorcentajeCT = response[0][0].PorcentajeCT
    let desCapital = 0
    sessionStorage.MecanismoAplicaCampana = e.dataItem.MecanismoAplicaCampana

    if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes("CANCELACION")) {
        sessionStorage.campañacancelacion = "si"
        Pordescuentoint = e.dataItem.DtoInteresesCampana
        pordescuentomora = e.dataItem.DtoInteresesMoraCampana
        pordescuentoextra = e.dataItem.DtoInteresExtracontablesCampana
        PorcentajeCT = e.dataItem.DctoCapitalCampana
        console.log('si tiene campaña en cancelacion')
        desCapital = e.dataItem.CapitalTotalObl * (e.dataItem.DctoCapitalCampana / 100)
        sessionStorage.DctoCapitalCampana = e.dataItem.DctoCapitalCampana / 100
        sessionStorage.Capital = 'Si'

    } else {
        sessionStorage.campañacancelacion = "no"
    }
    sessionStorage.PorcCancelacionIntCte = Pordescuentoint
    sessionStorage.PorcCancelacionIntMora = pordescuentomora

    sessionStorage.desCapital = desCapital
    sessionStorage.PorcentajeCT = PorcentajeCT
    sessionStorage.Pordescuentoint = Pordescuentoint
    sessionStorage.pordescuentomora = pordescuentomora
    sessionStorage.pordescuentoextra = pordescuentoextra
    setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', Pordescuentoint)



    let maxDescuentoInt = (Pordescuentoint / 100) * interescteObl
    setFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02', maxDescuentoInt)
    //seccion mora
    let interesmora = e.dataItem.InteresMoraObl
    setFieldValue('d85c85c3-2a7c-44db-b240-2420990d7375', interesmora)
    let maxdescuentomora = (pordescuentomora / 100) * interesmora
    setFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8', maxdescuentomora)
    setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', maxdescuentomora)
    setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', pordescuentomora)

    //seccion extracontables
    let interesExtraTC = 0
    if (producto == 'TARJETA') {
        interesExtraTC = e.dataItem.InteresesExtracontablesObl
    }
    setFieldValue('a9977387-4683-4d89-9e58-851cb72f9886', interesExtraTC)

    let maxdescuentointeresExtraTC = (pordescuentoextra / 100) * interesExtraTC
    setFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27', maxdescuentointeresExtraTC)
    setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', maxdescuentointeresExtraTC)
    setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', pordescuentoextra)

    //seccion capital
    let capital = e.dataItem.CapitalTotalObl
    setFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253', capital)

    let maxdescuentocapital = (PorcentajeCT / 100) * capital
    setFieldValue('79b6141f-1973-4c00-b0ae-a26b657115e5', maxdescuentocapital)
    setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', desCapital)
    let porcentajedescuentocapital = desCapital / capital
    setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', porcentajedescuentocapital)

    let maxdescuentos = maxdescuentocapital + maxdescuentointeresExtraTC + maxdescuentomora + maxDescuentoInt
    setFieldValue('7a94fe37-1d84-4232-9298-4e1986cdead2', maxdescuentos)
    let abonominimo = e.dataItem.SaldoTotalObl - maxdescuentos + 10000
    setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f', abonominimo)


    if (producto == 'TARJETA') {
        setFieldValue('876c30bc-ba27-4ec4-ad2e-1635b23cdccb', 'Si')
    } else {
        setFieldValue('876c30bc-ba27-4ec4-ad2e-1635b23cdccb', 'No')
    }

}

