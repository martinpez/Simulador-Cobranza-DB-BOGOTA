$(document).on('click', '#adicionar-obligacion', function () {
    console.log("Botón de adicionar obligación clickeado");
    debugger;
    try {
        Swal.fire({
            title: '¿Cuántas tarjetas quieres?',
            html: `
    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
      <button type="button" id="minus" class="swal2-styled" style="background-color: #d33; margin: 0; border-radius: 5px; width: 40px;">-</button>
      <b id="cantidad" style="font-size: 1.5rem; width: 40px; text-align: center;">1</b>
      <button type="button" id="plus" class="swal2-styled" style="background-color: #3085d6; margin: 0; border-radius: 5px; width: 40px;">+</button>
    </div>
  `,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            didOpen: () => {
                const btnMinus = Swal.getHtmlContainer().querySelector('#minus');
                const btnPlus = Swal.getHtmlContainer().querySelector('#plus');
                const display = Swal.getHtmlContainer().querySelector('#cantidad');

                let valor = 1;

                btnMinus.onclick = () => {
                    if (valor > 1) {
                        valor--;
                        display.innerText = valor;
                    }
                };

                btnPlus.onclick = () => {
                    valor++;
                    display.innerText = valor;
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Obtenemos el valor directamente del texto del elemento HTML
                const cantidadFinal = document.getElementById('cantidad').innerText;
                console.log("Tarjetas solicitadas:", cantidadFinal);

                Swal.fire(`Elegiste ${cantidadFinal} tarjetas`);
                var cantidad = cantidadFinal; // Asignamos la cantidad seleccionada a la variable
                obligacionSinBaseConsolidacion(cantidad) // Retorna la cantidad seleccionada
            }
        });
    } catch (error) {
        console.error("Error al enviar los datos:", error);
    }
});
