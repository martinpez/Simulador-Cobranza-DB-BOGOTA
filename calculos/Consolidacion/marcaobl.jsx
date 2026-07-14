function marcaObligacion(marca) {
    debugger;
    if (
        marca == "6FEFD558-02A1-46ED-ADD5-4D8FC3D4C935" ||
        marca == "4DBEAEFC-971D-42F5-BC11-E8F132ABD3DD"
    ) {
        visibilityField("f88b9d16-c4fd-4c8f-aab6-7b61098fd02e", true);
    } else {
        visibilityField("f88b9d16-c4fd-4c8f-aab6-7b61098fd02e", false);
    }
} function OblActivas(label) {
    let Total = 0;
    let cont = 1
    // Obtener todas las cards generadas
    const cards = document.querySelectorAll('.card1');

    // Recorrer cada card y verificar si el toggle está activado
    cards.forEach((card) => {
        // Obtener el toggle (checkbox) de la tarjeta
        const toggle = card.querySelector('input[type="checkbox"]');

        // Verificar si el toggle está activado (checked)
        if (toggle && toggle.checked) {
            // Buscar el campo de "Saldo Total" usando el atributo 'data-label'
            const valorInput = card.querySelector(`.field-container .input[data-label='${label}']`);

            if (valorInput) {
                const valorValue = parseFloat(valorInput.value); // Obtener el valor del saldo total

                // Asegurarse de que el valor sea un número válido
                if (!isNaN(valorValue)) {
                    if (cont == 1) {
                        Total = `${valorValue},`
                        cont = cont + 1
                    } else {
                        Total += `,${valorValue}`;
                    }// Sumar el valor al total
                }
            }
        }
    });

    // Retornar el total sumado
    return Total;

}