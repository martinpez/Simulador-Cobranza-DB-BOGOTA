setTimeout(function () {
  delete sessionStorage.campanamora
  if (!sessionStorage.UserId) {
    // ocultar todo pago mora honorarios campos antes de cargar
    document.getElementById("e321eed7-845b-46e4-89f8-0bdf0c53e0e4").disabled = false;
    visibilityField('993c55c0-8b02-4be9-a122-d7ec2cf5f87e', false)
    visibilityField('ae33bcc4-183a-47de-a6c8-f4ecc44be169', false)
    visibilityField('9ccfa8bd-4060-4aa1-b437-4528d6f9bc35', false)
    visibilityField('6e51a18a-184d-455f-9f42-6b3a3d56729f', false)

    // ocultar todo pago mora honorarios campos antes de cargar
    document.getElementById("bda37ca7-d503-4d41-8ff4-aebde2cb7c30").disabled = false;
    visibilityField('9ee8ee24-5ae5-42da-83c5-36948592e72b', false)
    visibilityField('a0a2b9b0-17cc-41fe-be98-2ac2157e33ef', false)
    visibilityField('aa665762-9b2f-47f8-8d8c-cabca1924771', false)
    visibilityField('8e8d6cf2-299c-4b45-8059-64cf50b2bd11', false)
    visibilityField('dfe46e30-5328-485e-bc80-bec20aab2d02', false)


    document.querySelectorAll('.counter.ng-star-inserted')
      .forEach(el => el.remove());
    document.querySelectorAll('.form-section-title')
      .forEach(el => {
        const text = el.textContent.trim();
        if (text === '-' || text === '--' || text === '.' || text === '..' || text === "," || text === "---" || text === "1" || text === "2" || text === "3" || text === "4" || text === "5") {
          el.parentElement?.remove();
        }
      });

    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div.header-section").remove()
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > form > ul").hidden = true
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.textAlign = 'center';
    document.querySelector("#Principal > div").style.textAlign = 'center';
    $('span').css('color', '#003176');
    $('.form-section-title').css('color', '#003176');
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.width = '110%';
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.marginLeft = '-5%'
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.boxShadow = 'rgb(83, 104, 141) 0px 4px 6px 0px'
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.borderBottom = '3px solid rgb(255, 210, 0)';
    document.querySelector("body > app-root > app-base > div > div > div > div > app-forms > div > div > div > div > div").style.marginTop = '-25px'
    document.querySelector("#\\39 6c93177-4705-4bd2-ac50-e304c007afa3").style.height = '65px'


  } else {
    estilos()
  }

}, 1000);
// slider de mantenimiento comenta la linea document para que aparezca o desaparezca
setTimeout(() => {
  document.querySelector('.panel-body[id$="_panel"]').remove();
}, 500);
// slider tipo popup informacion relevante comenta la linea document para que aparezca o desaparezca
setTimeout(() => {
  document.querySelector('.col-md-Infinity[id="09cb8ef7-693e-4b6e-b329-a205b256182c"]').remove();
}, 200)

setTimeout(function () {
  //aumentar tamaño de campo observaiones
  document.querySelector(
    "#\\36 37cda5e-a8da-499a-98be-564521dd6c25"
  ).style.height = "100px";
  document.querySelector(
    "#\\30 7b4e087-95c8-4867-b91f-1f9e9a4a1ea0"
  ).style.height = "200px";
}, 300)