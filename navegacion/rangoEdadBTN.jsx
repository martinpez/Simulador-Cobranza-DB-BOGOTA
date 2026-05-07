function validacionPoliticaEdad() {

    let edadMora = document.querySelector("#\\35 b9ce178-27fe-4c52-b91d-ba6a898ff546").selectedOptions[0].textContent;

    if (edadMora == '0 - Al día') {
        document.querySelector(".btnSimulador.consolidacion").style.display = 'none'
        document.querySelector(".btnSimulador.novaciones")
        document.querySelector(".btnSimulador.pagomora").style.display = 'none'
        document.querySelector(".btnSimulador.cancelacion").style.display = 'none'
        document.querySelector(".btnSimulador.ampliacion")
    } else if (edadMora == '1-30 Días' || edadMora == '31-60 Días' || edadMora == '61-90 Días' || edadMora == '91-120 Días' || edadMora == '121-150 Días' || edadMora == '151-180 Días' || edadMora == '181-210 Días' || edadMora == '>=210 Días') {
        document.querySelector(".btnSimulador.consolidacion").style.display = 'inline-block'
        document.querySelector(".btnSimulador.novaciones").style.display = 'inline-block'
        document.querySelector(".btnSimulador.pagomora").style.display = 'inline-block'
        document.querySelector(".btnSimulador.cancelacion").style.display = 'inline-block'
        document.querySelector(".btnSimulador.ampliacion").style.display = 'inline-block'
    }
}