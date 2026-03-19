// obtener el valor de un select 
// obtener el estado de el select
const selectElement = document.getElementById("8235c54b-36bd-4880-a29e-fa021ff71595").value;
// obtener el estado de los botones 
console.log("Valor del select BtnNavegacionFun:", selectElement);
 const selectElement2 = document.getElementById("BtnNavegacionFun");
 console.log("Elemento del botón BtnNavegacionFun:", selectElement2);
if (selectElement === 'no'){
    setTimeout(() => {
         selectElement2.style.visibility = 'visible';
    }, 300);
   
}else{
    setTimeout(() => {
    selectElement2.style.visibility = 'hidden';
    }, 300);
}