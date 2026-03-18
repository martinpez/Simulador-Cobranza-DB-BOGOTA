setTimeout(function() {
  delete sessionStorage.campanamora
  NombreGrupo()

if(!sessionStorage.UserId){ 
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div.header-section").remove()
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul").hidden = true
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.textAlign = 'center';
document.querySelector("#Principal > div").style.textAlign = 'center'; 
$('span').css('color','#003176');
$('.form-section-title').css('color','#003176');
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.width = '110%';
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.marginLeft = '-5%'
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.boxShadow ='rgb(83, 104, 141) 0px 4px 6px 0px'
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.borderBottom = '3px solid rgb(255, 210, 0)';
document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.marginTop = '-25px'
document.querySelector("#\\39 6c93177-4705-4bd2-ac50-e304c007afa3").style.height ='65px'
}else{
    estilos()
}
}, 1000);
setTimeout(function () {
//aumentar tamaño de campo observaiones
document.querySelector(
"#\\36 37cda5e-a8da-499a-98be-564521dd6c25"
).style.height = "100px";
document.querySelector(
"#\\30 7b4e087-95c8-4867-b91f-1f9e9a4a1ea0"
).style.height = "200px";


//ocultar campo Cuotas financieras mensuales sin la del BDB
// visibilityField("f88b9d16-c4fd-4c8f-aab6-7b61098fd02e", false);
// visibilityField('caae86ca-b4e0-4e59-918e-8f7a1a4d4114',false)
$(".novaciones").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(2)> a"
  )
  .click();
  
  disableField('4cbf2d64-0442-4c98-964f-e741a6a4e6a1',true)
  disableField('c6923383-8eec-4efe-81a5-954ce52b8882',true)
  disableField('d157fb29-fd6f-450b-b637-8fa18c824cd2',true)
  disableField('fad108db-d495-442a-9312-b681e86ac6ba',true)
  abono(getFieldValue('1f7c2b79-87a6-402f-95f2-414aea88a4bf'))
});
setTimeout(function() {
   
 $(".left-buttonC4").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(11) > a"
  )
  .click();
});
  
  $(".left-arrowC4").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(11) > a"
  )
  .click();
});
}, 3000);
$(".consolidacion").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(13) > a"
  )
  .click();
   let cantidad = getFieldValue('0ab23e22-1c3c-4a43-8c58-207b83625867')
  
  if(cantidad >0){
  obligacionSinBaseConsolidacion(cantidad)
  }
});

$(".pagomora").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(14) > a"
  )
  .click();
});

$(".ampliacion").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(4) > a"
  )
  .click();
  
  let Int = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167')
  let mora =getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6')
  setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167',Int)
  setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6',mora)
});
//cancelacion
$(".cancelacion").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(5) > a"
  )
  .click();
});
$(".left-buttonCA1").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(1) > a"
  )
  .click();
});
$(".right-buttonCA1").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(6) > a"
  )
  .click();
  CancelacionSox()
});

//segunda pagina
$(".left-buttonCA2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(5) > a"
  )
  .click();
});
$(".right-buttonCA2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(12) > a"
  )
  .click();
});

//tercera pagina
$(".left-buttonCA3").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(6) > a"
  )
  .click();
});
//fin cancelacion
//botones de atras y adelante
//novacion
$(".left-button").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(1) > a"
  )
  .click();
});
$(".right-button").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(3) > a"
  )
  .click();
llenarCampos();
});
$(".copiar").click(() => {
copiarTexto();
});
$(".copiar2").click(() => {
copiarTexto2();
});

$(".copiar3").click(() => {
copiarSoxM();
});
$(".copiar4").click(() => {
copiarSoxA();
});
$(".copiarCA").click(() => {
  copiarTextoCA();
  });

$(".left-button2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(2) > a"
  )
  .click();
});
$(".right-buttonC").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(9) > a"
  )
  .click();
 CalculosConsolidacion()
});

$(".right-buttonM").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(10) > a"
  )
  .click();
  soxMora()
});

$(".right-buttonC2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(11) > a"
  )
  .click();
});
 
  $(".right-buttonAM").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(15) > a"
  )
  .click();
 
});
  $(".right-buttonAM2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(7) > a"
  )
  .click();
  soxAmpliacion()
 
});
  $(".left-buttonAM2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(4) > a"
  )
  .click();
 
});
  $(".left-buttonAM3").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(15) > a"
  )
  .click();
 
});
//EVENTO FINAL CONSOLIDACION
$(".right-buttonC3").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(8) > a"
  )
  .click();
  observacionConsolidado()
 
 
});
$(".left-buttonC").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(1) > a"
  )
  .click();
 
});

$(".left-buttonC2").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(13) > a"
  )
  .click();

});
$(".left-buttonC3").click(() => {
document
  .querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(9) > a"
  )
  .click();
  
  
 
});





$(".left-buttonM").click(() => {
document.querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(1) > a"
  )
  .click();
});

$(".left-buttonM2").click(() => {
document.querySelector(
    "body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul > li:nth-child(14) > a"
  )
  .click();
});

//desactivar campos Int extracontables
disableField('921ccf29-1680-4f33-9f4d-613a7b2e5b78',true)
disableField('8875c8f6-f9e5-42fa-b1aa-acf2e6623d70',true)
disableField('05bd1cf1-9eb8-48f7-b60c-6158f9ba11d8',true)
disableField('8e599026-4bf0-4a1e-9cb6-20c1a641a915',true)
disableField('4170bf5b-c797-4c78-ad59-89d4bad60ec9',true)
disableField('92fe640e-4571-49e7-8fce-4f714888f307',true)



}, 7000);