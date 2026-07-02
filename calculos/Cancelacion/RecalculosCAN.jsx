function recalcularcancelacion() {
    debugger;
    let edad = sessionStorage.EdadMoraCl
    let bloqueado = (edad === "1-30 Días" || edad === "31-60 Días") && (sessionStorage.campañacancelacion == "no");

    // Si trae campaña ("si") y esta en el rango de edad
    // true && false = false --> NO bloquea (da los descuentos)

    // si esta en el rango de edad pero no trae campaña ("no")
    // true && true = true --> SÍ bloquea (0 descuentos)

    // si no esta en el rango de edad y tampoco trae campaña ("no")
    // false && true = false -->  NO bloquea (da los descuentos normales)

    // si no esta en el rango de edad pero si trae campaña ("si")
    // false && false = false --> NO bloquea (da los descuentos de la campaña)

    // ── Saldo total ──
    // ── Leer valores del formulario ──
    debugger;
    let saldoTotal = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let pagoAlSnr = getFieldValue('b5c33a6d-9d65-4920-8a39-e73621b7daa9')
    let capital = getFieldValue('9dc154b0-5d64-4682-a76d-5e946415c253')
    let interescte = getFieldValue('48f8260e-5e81-43d3-b69c-d94808cb229e')
    let interesmora = getFieldValue('d85c85c3-2a7c-44db-b240-2420990d7375')
    let interesextra = getFieldValue('a9977387-4683-4d89-9e58-851cb72f9886')

    // ── Porcentajes máximos desde session ──
    let porcCte = parseFloat(sessionStorage.PorcCancelacionIntCte) || 0
    let porcMora = parseFloat(sessionStorage.PorcCancelacionIntMora) || 0
    let porcExtra = parseFloat(sessionStorage.pordescuentoextra) || 0
    let porcCapital = parseFloat(sessionStorage.PorcentajeCT) || 0

    // ── Descuentos máximos permitidos (topes fijos, no cambian) ──
    let maxDctoIntCte = bloqueado ? 0 : (porcCte / 100) * interescte
    let maxDctoMora = bloqueado ? 0 : (porcMora / 100) * interesmora
    let maxDctoExtra = bloqueado ? 0 : (porcExtra / 100) * interesextra
    let maxDctoCapital = bloqueado ? 0 : (porcCapital / 100) * capital

    // Setear campos Max Baja (topes, siempre fijos)
    setFieldValue('1c23cf01-dd67-4c9a-a4b6-871c781eec02', maxDctoIntCte)
    setFieldValue('0c422603-5f6e-4c23-a7b5-b78cf30ba1d8', maxDctoMora)
    setFieldValue('6e01ec4d-1391-4878-8886-be49eef96d27', maxDctoExtra)
    setFieldValue('79b6141f-1973-4c00-b0ae-a26b657115e5', maxDctoCapital)

    // ── Abono mínimo (pago que cubre el 100% de todos los descuentos) ──
    let totalMaxDctos = maxDctoIntCte + maxDctoExtra + maxDctoMora + maxDctoCapital
    let abonoMinimo = saldoTotal - totalMaxDctos + 10000
    setFieldValue('7a94fe37-1d84-4232-9298-4e1986cdead2', totalMaxDctos)  // Max Baja en cuentas

    // ── Honorarios ──
    let pagoMinimoBase = getFieldValue('aa665762-9b2f-47f8-8d8c-cabca1924771') || 0
    let baseHonorarios = Math.min(pagoMinimoBase, abonoMinimo)
    let porcentajeCartera = parseFloat(sessionStorage.PorcCartera) || 0
    let honorariosCalculados = Math.floor((baseHonorarios * porcentajeCartera) / 100)
    setFieldValue('9ee8ee24-5ae5-42da-83c5-36948592e72b', honorariosCalculados)

    let honorariosPagados = parseFloat(getFieldValue('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef')) || 0
    if (honorariosPagados > 0) {
        setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f', abonoMinimo + honorariosPagados)
    } else {
        setFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f', abonoMinimo)   // Abono mínimo con Max %
    }

    // ── Si está bloqueado, todo en 0 y salir ──
    if (bloqueado) {
        setFieldValue('86f86bd7-d119-4d2a-a6c0-e711b1d835a6', 0)
        setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', 0)
        setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', 0)
        setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', 0)
        setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', 0)
        setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', 0)
        setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', 0)
        setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', 0)
        setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', 0)
        setFieldValue('9ee8ee24-5ae5-42da-83c5-36948592e72b', 0)
        return
    }

    // Los honorarios pagados se descuentan antes de calcular el exceso,
    // para que no se confundan con un sobrepago que reduzca más los descuentos
    let pagoRealDeuda = Math.max(0, pagoAlSnr - honorariosPagados)
    let pagoExtra = Math.max(0, pagoRealDeuda - abonoMinimo)

    // Variables de descuento aplicado (inician en máximo y bajan)
    let dctoCte = maxDctoIntCte
    let dctoMora = maxDctoMora
    let dctoExtra = maxDctoExtra
    let dctoCapital = maxDctoCapital

    let exceso = pagoExtra  // lo que queda por "consumir" del rombo

    // ─ Llenar de primeras el capital ──
    if (exceso > 0) {
        let reduccionCapital = Math.min(maxDctoCapital, exceso)
        dctoCapital = maxDctoCapital - reduccionCapital
        dctoCapital = Math.max(0, dctoCapital)
        exceso -= reduccionCapital
    } else if (pagoRealDeuda < abonoMinimo) {
        let deficit = abonoMinimo - pagoRealDeuda
        dctoCapital = Math.min(capital, maxDctoCapital + deficit)
    }

    // ──Llenar de segundas el Int Cte e Int Extra juntos (misma proporción) ──
    if (exceso > 0) {
        // Total máximo de Cte + Extra juntos
        let maxCteExtra = maxDctoIntCte + maxDctoExtra

        if (maxCteExtra > 0) {
            let reduccionCteExtra = Math.min(maxCteExtra, exceso)

            // Repartir la reducción proporcionalmente entre Cte y Extra
            // PERO manteniendo el mismo % de descuento para ambos
            // % que queda de descuento = (maxCteExtra - reduccionCteExtra) / maxCteExtra
            let porcionRestante = (maxCteExtra - reduccionCteExtra) / maxCteExtra

            dctoCte = maxDctoIntCte * porcionRestante
            dctoExtra = maxDctoExtra * porcionRestante

            exceso -= reduccionCteExtra
        }
    }


    // ──Llenar de ultimas la mora -- / 
    if (exceso > 0) {
        let reduccionMora = Math.min(maxDctoMora, exceso)
        dctoMora = maxDctoMora - reduccionMora
        exceso -= reduccionMora
    }

    // ── Calcular porcentajes reales aplicados ──
    // % de descuento = cuánto se está condonando vs el total del componente
    let porCteReal = interescte > 0 ? (dctoCte / interescte) * 100 : 100
    let porMoraReal = interesmora > 0 ? Math.round((dctoMora / interesmora) * 100) : 100
    let porExtraReal = interesextra > 0 ? (dctoExtra / interesextra) * 100 : 100
    let porCapitalReal = capital > 0 ? (dctoCapital / capital) * 100 : 100

    // Verificar que Cte y Extra tengan el mismo % (deben ser iguales)
    // Si hay diferencia por redondeo, usar el de Cte como referencia
    if (interescte > 0 && interesextra > 0) {
        porExtraReal = porCteReal
        dctoExtra = (porCteReal / 100) * interesextra
    }

    // ── Setear descuentos aplicados ──

    // Int corriente
    setFieldValue('86f86bd7-d119-4d2a-a6c0-e711b1d835a6', dctoCte)
    setFieldValue('bcfd54b6-d1cf-40dc-8677-686652eedbb8', porCteReal)

    // Int mora
    setFieldValue('a6ee4c8b-a6c5-4bd8-8c30-9e29b9c40115', dctoMora)
    setFieldValue('433ffa22-78e7-4004-be47-2b0ccf497ad1', porMoraReal)

    // Int extra TC
    setFieldValue('8ea64929-53a9-41b4-a01f-a14b74293d01', dctoExtra)
    setFieldValue('a724067d-e7bf-435c-94ac-bf44f72575e7', porExtraReal)

    // Capital
    setFieldValue('60bebeab-d3ca-4547-9eff-00cc8db69b82', dctoCapital)
    setFieldValue('aa7aeaf3-6bc8-4939-9896-212d5efcd93e', porCapitalReal)

    // ── Bajas en cuentas aplicadas ──
    let totalAplicado = dctoCte + dctoExtra + dctoMora + dctoCapital
    setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', totalAplicado)


}


// ─────────────────────────────────────────────────────────────
// VALUE CHANGE DEL PAGO AL SNR
// ─────────────────────────────────────────────────────────────

if (e.value <= 0) {

} else {
    recalcularcancelacion();

    let abonoMinimo = getFieldValue('0864b793-256f-41f6-ab7c-5b5c18c1f51f')
    if (e.value < abonoMinimo) {
        toastr.warning('El valor a pagar debe ser mayor al abono mínimo que debe realizar el cliente.')
    }
    let saldoTotal = getFieldValue('f47f1a89-6743-4f60-9cf6-0696e6c841ca')
    let operacion = saldoTotal + 10000 - e.value
    setFieldValue('7ed52d26-15c9-4f11-9177-55a380d1427d', operacion > 0 ? operacion : 0) // Bajas en cuentas Aplicadas
}



