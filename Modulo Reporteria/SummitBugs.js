function sumitBugReport() {
    var submitBtn = modal.querySelector('#_bugsTG-btn-submit');
    var usuario = modal.querySelector('#_bugsTG-usuario');
    var fechaInput = modal.querySelector('#_bugsTG-fecha');
    var modulo = modal.querySelector('#_bugsTG-modulo').value;
    var descripcion = modal.querySelector('#_bugsTG-descripcion').value;
    var file = fileInput && fileInput.files.length > 0 ? fileInput.files[0] : null;




    // Metodo encargado para ejecutar una lappoz function
    let nameFunction = 'Bugs_Api_Insert';
    let lappizFunctionId = 'ff66697c-01ea-4d46-ace9-fb36cffdc1a4';

    let body = {
        "myFirstParam": 1,
        "mySecondParam": "parametro para el funcionamiento de la LP",
    }
    let config = { nameFunction, lappizFunctionId, body }
    execLF(config).then(success => {
        console.log(success)
    }).catch(error => {
        console.log(error)
    })

    submitBtn.addEventListener('click', function () {

        modal.close();
    });
}