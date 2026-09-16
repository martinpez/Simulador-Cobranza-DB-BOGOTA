setTimeout(() => {
    debugger;
var saveAndNewButton = document.getElementById("abd9246f-8baf-45f4-8557-c5f9c77fb1ee_saveAndNew");
var saveAndEditButton = document.getElementById("abd9246f-8baf-45f4-8557-c5f9c77fb1ee_saveAndEdit");
if (saveAndNewButton && saveAndNewButton) {
    saveAndNewButton.style.display = "none";
    saveAndEditButton.style.display = "none";
}
// verificar si ya estan en none 
if (saveAndNewButton && saveAndNewButton.style.display === "none") {
    console.log("El botón 'Guardar y Nuevo' está oculto.");
} else {
    console.log("El botón 'Guardar y Nuevo' está visible.");
    saveAndNewButton.style.display = "none"; // Ocultar el botón si está visible
    saveAndEditButton.style.display = "none"; // Ocultar el botón si está visible    
}
}, 1000);