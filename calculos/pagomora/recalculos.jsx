function RecalculosMora() {
    debugger;
    // Si todavía no está listo el cálculo inicial, reintentar
    if (sessionStorage.calculosMoraListo !== 'si') {
        const intentos = parseInt(sessionStorage.reintentosRecalculo || '0')
        if (intentos < 10) {
            sessionStorage.reintentosRecalculo = intentos + 1
            setTimeout(RecalculosMora, 200)
            return
        }
    }

    sessionStorage.reintentosRecalculo = '0'

    const safeNumber = val =>
        isNaN(parseFloat(val)) ? 0 : parseFloat(val)

    const esTarjeta =
        getFieldValue('7a5c89e8-a431-4b76-b3bc-24f6a187978c') === 'Si'

    const colchon = esTarjeta ? 0 : 20000

    const InteresCteObl = safeNumber(getFieldValue('9b3ac68c-68ff-4928-864d-906e9d851621'))
    const InteresMoraObl = safeNumber(getFieldValue('c13b3910-1960-422f-835d-7ea89982f8b6'))
    const PagoMinObl = safeNumber(getFieldValue('af9911f8-4a06-4483-b25d-6bec9e1647fe'))
    const PagoSNR = safeNumber(getFieldValue('3539dba8-0c22-491e-a05b-84642d675d59'))

    const delCampo = esTarjeta ? safeNumber(getFieldValue('aef7fd98-0a00-4ec8-95d9-37840df1fe67')) : 0
    const deSesion = esTarjeta ? safeNumber(sessionStorage.InteresesExtracontablesObl) : 0
    const InteresesExtraObl = esTarjeta ? (delCampo > 0 ? delCampo : deSesion) : 0

    const PorcPagoMoraIntCte1 =
        safeNumber(sessionStorage.PorcPagoMoraIntCte1) > 0
            ? safeNumber(sessionStorage.PorcPagoMoraIntCte1)
            : safeNumber(getFieldValue('e076d650-c5d6-48b1-920b-295d431604b0'))

    const PorcentajePagomora1 =
        safeNumber(sessionStorage.PorcentajePagomora1) > 0
            ? safeNumber(sessionStorage.PorcentajePagomora1)
            : safeNumber(getFieldValue('64fcdf9f-c6b3-4742-b4b2-e259759290d9'))

    const porcDescIntExtraCTC1 = esTarjeta ? PorcPagoMoraIntCte1 : 0

    const maxcte = InteresCteObl * (PorcPagoMoraIntCte1 / 100)
    const maxmora = InteresMoraObl * (PorcentajePagomora1 / 100)
    const maxExtC = esTarjeta ? InteresesExtraObl * (porcDescIntExtraCTC1 / 100) : 0

    const totalMaxDctos = maxcte + maxmora + maxExtC
    const abonoMinimo = PagoMinObl - totalMaxDctos + colchon

    // Honorarios
    let pagoHonorarios = (abonoMinimo * sessionStorage.PorcCartera) / 100
    setFieldValue('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', pagoHonorarios)
    let honorariosPagados = getFieldValue('ae33bcc4-183a-47de-a6c8-f4ecc44be169')
    let sumaHonorarios = 0;
    if (honorariosPagados > 0) {
        //setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', abonoMinimo + pagoHonorarios)
        sumaHonorarios = abonoMinimo + honorariosPagados;
        setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', sumaHonorarios)

    } else {
        setFieldValue('8f7266d7-dfc0-4ff4-afad-c50fbfa67062', abonoMinimo)
    }

    const pagoRealDeuda = Math.max(0, PagoSNR - pagoHonorarios)
    let exceso = Math.max(0, pagoRealDeuda - abonoMinimo)
    let dctoMora = maxmora
    let dctoCte = maxcte
    let dctoExtraC = maxExtC

    // 1. Ajustar Corriente y ExtraC simultáneamente (primero)
    const bolsaSincronizada = maxcte + (esTarjeta ? maxExtC : 0)

    if (exceso > 0 && bolsaSincronizada > 0) {
        // CASO EXCESO: reducir proporcionalmente
        const restante = Math.max(0, bolsaSincronizada - exceso)
        const factor = restante / bolsaSincronizada
        dctoCte = maxcte * factor
        if (esTarjeta) dctoExtraC = maxExtC * factor
        const reduccionCteExtC = (maxcte - dctoCte) + (esTarjeta ? (maxExtC - dctoExtraC) : 0)
        exceso -= reduccionCteExtC

    } else if (pagoRealDeuda < abonoMinimo && bolsaSincronizada > 0) {
        // CASO DÉFICIT (excepción de negocio): aumentar proporcionalmente sin tope
        const deficit = abonoMinimo - pagoRealDeuda
        const aumentada = bolsaSincronizada + deficit
        const factor = aumentada / bolsaSincronizada
        dctoCte = maxcte * factor
        if (esTarjeta) dctoExtraC = maxExtC * factor
    }

    // 2. Reducir Mora (al final, solo si todavía hay exceso)
    if (exceso > 0) {
        const reduccionMora = Math.min(dctoMora, exceso)
        dctoMora -= reduccionMora
        exceso -= reduccionMora
    }

    const porcMoraReal = InteresMoraObl > 0 ? (dctoMora / InteresMoraObl) * 100 : 0
    const porcComun = maxcte > 0 ? (dctoCte / maxcte) * PorcPagoMoraIntCte1 : 0
    const porcCteReal = porcComun
    const porcExtraCReal = esTarjeta ? porcComun : 0

    setFieldValue('36329717-6123-40c7-b4c9-d5f447a3cac4', maxcte)
    setFieldValue('49ed37fa-10f7-46d1-b2d3-bd4e28bef0db', dctoCte)
    setFieldValue('e076d650-c5d6-48b1-920b-295d431604b0', porcCteReal)

    setFieldValue('24a29872-6b5f-40fd-bae7-cb072e972ff5', maxmora)
    setFieldValue('db8c0e77-0029-4bf9-ba9a-ebc141721c33', dctoMora)
    setFieldValue('64fcdf9f-c6b3-4742-b4b2-e259759290d9', porcMoraReal)

    if (esTarjeta) {
        setFieldValue('de744073-f3bd-4c05-ac6f-9ca493664262', maxExtC)
        setFieldValue('a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8', dctoExtraC)
        setFieldValue('0456eeb3-8809-48a5-8726-87e416efdcb3', porcExtraCReal)
    } else {
        setFieldValue('de744073-f3bd-4c05-ac6f-9ca493664262', 0)
        setFieldValue('a01eeadb-b99e-4e08-9d93-3fe44b9e1cf8', 0)
        setFieldValue('0456eeb3-8809-48a5-8726-87e416efdcb3', 0)
    }

    setFieldValue('6cfd4b2c-6ef4-4821-95d5-364657fda787', totalMaxDctos)
    setFieldValue('6af98cad-1f96-4ad5-b33c-b0ddc8f68133', dctoMora + dctoExtraC + dctoCte)
}