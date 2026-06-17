function CalculosMora() {
    debugger
    let tarjeta
    sessionStorage.Producto = e.dataItem.Producto
    sessionStorage.removeItem('InteresesExtracontablesObl')
    sessionStorage.removeItem('PorcPagoMoraIntCte1')
    sessionStorage.removeItem('PorcentajePagomora1')
    sessionStorage.removeItem('porcDescIntExtraCTC1')
    sessionStorage.removeItem('PorcCartera')
    sessionStorage.removeItem('TipoHonorarios')
    sessionStorage.calculosMoraListo = 'no'
    sessionStorage.reintentosRecalculo = '0'

    if (e.dataItem.Producto == 'TARJETA') {
        tarjeta = true
        setFieldValue('7a5c89e8-a431-4b76-b3bc-24f6a187978c', 'Si')
        disableField('aef7fd98-0a00-4ec8-95d9-37840df1fe67', false)
    } else {
        tarjeta = false
        setFieldValue('7a5c89e8-a431-4b76-b3bc-24f6a187978c', 'No')
        setFieldValue('aef7fd98-0a00-4ec8-95d9-37840df1fe67', 0)
        setFieldValue('de744073-f3bd-4c05-ac6f-9ca493664262', 0)
        setFieldValue('a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8', 0)
        setFieldValue('0456eeb3-8809-48a5-8726-87e416efdcb3', 0)
        disableField('aef7fd98-0a00-4ec8-95d9-37840df1fe67', true)
        disableField('de744073-f3bd-4c05-ac6f-9ca493664262', true)
        disableField('a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8', true)
        disableField('0456eeb3-8809-48a5-8726-87e416efdcb3', true)
    }
    const colchon = tarjeta ? 0 : 20000
    //validar si es tipo el producto es tipo cartera y restarle los honorarios al pago minimo 
    debugger;
    let pagoMinimo;
    let pagomin = e.dataItem.PagoMinObl;
    let honorarios = sessionStorage.honorariosValues;
    if (sessionStorage.Producto == 'CARTERA') {
        pagoMinimo = pagomin - honorarios
    } else {
        pagoMinimo = e.dataItem.PagoMinObl
    }

    setFieldValue('af9911f8-4a06-4483-b25d-6bec9e1647fe', pagoMinimo)
    setFieldValue('9b3ac68c-68ff-4928-864d-906e9d851621', e.dataItem.InteresCteObl)
    setFieldValue('c13b3910-1960-422f-835d-7ea89982f8b6', e.dataItem.InteresMoraObl)

    const interesExtraObl = tarjeta ? (e.dataItem.InteresesExtracontablesObl || 0) : 0
    sessionStorage.InteresesExtracontablesObl = interesExtraObl
    sessionStorage.Obl = e.dataItem.Obligacion

    setTimeout(() => {
        const dropdownEdad = document.querySelector("#\\35 b9ce178-27fe-4c52-b91d-ba6a898ff546")
        const rangoDiasQuery = (dropdownEdad && dropdownEdad.selectedOptions[0])
            ? dropdownEdad.selectedOptions[0].textContent.trim()
            : e.dataItem.EdadMoraCl

        execQuery(`SELECT PorcentajePagomora, PorcPagoMoraIntCte FROM SimiladorDNC_Lappiz_TasasVigentes WHERE RangoDias3 = '${rangoDiasQuery}'`)
            .then((response) => {

                let porcDescIntCteIcs = 0
                let porcDescIntMoraIcs = 0

                if (e.dataItem.MecanismoAplicaCampana && e.dataItem.MecanismoAplicaCampana.includes('PAGOMORA')) {
                    sessionStorage.campanamora = 'si'
                    porcDescIntCteIcs = parseInt(e.dataItem.DtoInteresesCampana)
                    porcDescIntMoraIcs = parseInt(e.dataItem.DtoInteresesMoraCampana)
                } else {
                    sessionStorage.campanamora = 'no'
                    porcDescIntCteIcs = response[0][0].PorcPagoMoraIntCte
                    porcDescIntMoraIcs = response[0][0].PorcentajePagomora
                }

                const porcDescIntExtraCTC = tarjeta ? porcDescIntCteIcs : 0

                sessionStorage.PorcPagoMoraIntCte1 = porcDescIntCteIcs
                sessionStorage.PorcentajePagomora1 = porcDescIntMoraIcs
                sessionStorage.porcDescIntExtraCTC1 = porcDescIntExtraCTC

                const maxDescCTE = (porcDescIntCteIcs / 100) * parseInt(e.dataItem.InteresCteObl)
                const maxDescIntM = (porcDescIntMoraIcs / 100) * parseInt(e.dataItem.InteresMoraObl)
                const maxDescIntTC = tarjeta ? (porcDescIntExtraCTC / 100) * parseInt(interesExtraObl) : 0

                setFieldValue('36329717-6123-40c7-b4c9-d5f447a3cac4', maxDescCTE)
                setFieldValue('e076d650-c5d6-48b1-920b-295d431604b0', porcDescIntCteIcs)
                setFieldValue('49ed37fa-10f7-46d1-b2d3-bd4e28bef0db', maxDescCTE)

                setFieldValue('24a29872-6b5f-40fd-bae7-cb072e972ff5', maxDescIntM)
                setFieldValue('db8c0e77-0029-4bf9-ba9a-ebc141721c33', maxDescIntM)
                setFieldValue('64fcdf9f-c6b3-4742-b4b2-e259759290d9', porcDescIntMoraIcs)

                if (tarjeta) {
                    setFieldValue('aef7fd98-0a00-4ec8-95d9-37840df1fe67', interesExtraObl)
                    setFieldValue('de744073-f3bd-4c05-ac6f-9ca493664262', maxDescIntTC)
                    setFieldValue('a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8', maxDescIntTC)
                    setFieldValue('0456eeb3-8809-48a5-8726-87e416efdcb3', porcDescIntExtraCTC)
                }

                const MaxTotalDesc = maxDescCTE + maxDescIntM + maxDescIntTC
                setFieldValue('6cfd4b2c-6ef4-4821-95d5-364657fda787', MaxTotalDesc)

                const abonoMin = parseInt(PagoMinObl) - MaxTotalDesc + colchon
                setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', abonoMin)
                setFieldValue('6af98cad-1f96-4ad5-b33c-b0ddc8f68133', MaxTotalDesc)

                sessionStorage.calculosMoraListo = 'si'
            })
    }, 300)
}