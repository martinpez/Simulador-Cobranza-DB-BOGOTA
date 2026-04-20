setTimeout(function () {
  delete sessionStorage.campanamora
  if (!sessionStorage.UserId) {
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