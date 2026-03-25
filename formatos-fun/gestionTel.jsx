function gestionTel() {
    // 1. Obtenemos el valor limpio
    let gestion = (sessionStorage.GestionTelf || "").trim().toLowerCase();
    
    // 2. Buscamos el botón (usa el selector exacto de tu HTML)
    const boton = document.querySelector(".right-button2");
    const boton2 = document.querySelector(".right-buttonC4");
    const boton3 = document.querySelector(".right-buttonM2");
    const boton4 = document.querySelector(".right-buttonAM3");
    const boton5 = document.querySelector(".right-buttonCA2");

    console.log("Boton encontrado:", boton);

    if (boton && boton2 && boton3 && boton4 && boton5) {
        // LÓGICA INVERSA: 
        // Si dice "Si", lo mantenemos oculto (o lo ocultamos si algo lo mostró)
        if (gestion.includes("si")) {
            boton.style.visibility = "hidden";
            boton2.style.visibility = "hidden";
            boton3.style.visibility = "hidden";
            boton4.style.visibility = "hidden";
            boton5.style.visibility = "hidden";
            console.log("Acción: Mantener oculto (Gestión Telefónica activa)");
        } 
        // Si NO dice "Si", lo hacemos aparecer
        else {
            setTimeout(() => {
            boton.style.visibility = "visible";
            boton2.style.visibility = "visible";
            boton3.style.visibility = "visible";
            boton4.style.visibility = "visible";
            boton5.style.visibility = "visible";
            console.log("Acción: Mostrar botón (Gestión normal)");
            console.log (boton);
            }, 300);
        }
    }
}