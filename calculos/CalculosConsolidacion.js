function CalculosConsolidacion(){
    let dato= sumarvalor('Interes Corriente Ics')
    setFieldValue('04dbcb19-8f74-4eac-81f3-6bcc76cd7f9a', dato)
    let interesmora = sumarvalor('Interes Mora Ics')
    setFieldValue('f848cad9-f94d-4e56-9468-863a2a55e402', interesmora)
    let interesextra = sumarvalor('Int Extracontables "TC"')
    setFieldValue('dc9166ce-a5c8-4fc7-ad2b-4c6479d63f12', interesextra)

    let porIntCo = ((dato)*sessionStorage.PorcentajeConsolidacionCorriente/100)
    let porIntMo = ((interesmora)*sessionStorage.PorcentajeConsolidacionMora/100)
    let porIntEX = (interesextra)*sessionStorage.PorcentajeConsolidacionExtraC/100
    
    setFieldValue('b42b41d8-cd57-4233-9bff-8a5ceec5af03', porIntCo)
    
    setFieldValue('e970af6e-de8d-47b3-97d0-98e4950c9bdf', porIntEX)
    
    setFieldValue('e079d101-5148-42ed-854e-9be982adc01e', porIntMo)

    let totalSaldo = sumarvalor('Saldo Total')
    let saldoDesembolsar = totalSaldo-porIntCo-porIntMo-porIntEX

    setFieldValue('69b7fc43-675b-4984-bd64-9fd68799a97b',saldoDesembolsar)

    let peormarca = obtenerMarcaLetraConPeorMarcaMaxima()
    setFieldValue('183f4194-c998-41a4-9a8c-1436cc78132f',peormarca)
} 