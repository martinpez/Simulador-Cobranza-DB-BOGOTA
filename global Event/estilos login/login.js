document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-4.pr-md-0").style.display = "none";
document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0 > div > div").style.display = "none";
let elemento = document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.col-md-8.pl-md-0");
backandGlobal.runtimeBeta = 'https://simuladorcobranzasbdb.lappiz.io/'

// Reemplaza la clase col-md-8 por col-md-12
elemento.classList.remove("col-md-8");
elemento.classList.add("col-md-12");
document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.pl-md-0.col-md-12 > div").style.textAlign = 'center';
document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div").style.boxShadow = 'rgb(83, 104, 141) 0px 4px 6px 0px'
document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div").style.borderBottom = '3px solid rgb(255, 210, 0)';
document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div").style.borderRadius = '20px'
// campo para ingresar con usuario
document.querySelector("#credentials > div:nth-child(1) > label").innerText = 'Usuario'


document.querySelector("app-login > div.row.w-100.mx-0.auth-page > div > div > div > div.pl-md-0.col-md-12 > div > h5").innerHTML += `<div _ngcontent-hme-c1="" class="form-group"><label _ngcontent-hme-c1="" for="exampleInputEmail1">Usuario</label><div _ngcontent-hme-c1="" class="input-group mb-3"><input _ngcontent-hme-c1="" class="form-control ng-dirty ng-valid ng-touched" formcontrolname="userName" id="exampleInputEmail2" placeholder="Usuario" type="email"><div _ngcontent-hme-c1="" class="input-group-prepend"><span _ngcontent-hme-c1="" class="input-group-text" id="basic-addon-email"><!----><i _ngcontent-hme-c1="" class="mdi mdi-email"></i><!----></span></div></div><!----><!----></div>
`;
document.querySelector("#exampleInputEmail2").addEventListener("input", function () {
    debugger;
    const emailField = document.querySelector("#exampleInputEmail1");
    if (this.value === 'administrador@simuladordnc.com' // administrador lappiz
        || this.value === 'playwright@testing.com.co') // acount testing
        {
        emailField.value = this.value
        document.querySelector("#exampleInputEmail1").dispatchEvent(new Event('input', { bubbles: true }));
    } else {
        emailField.value = this.value + "@bdb.com";
        document.querySelector("#exampleInputEmail1").dispatchEvent(new Event('input', { bubbles: true }));
    }

});
document.querySelector("#login").addEventListener("click", () => {
    document.querySelector("#exampleInputEmail2").value = ''
});

document.querySelector("#credentials > div:nth-child(1) > div").style.display = 'none'

document.querySelector("#credentials > div:nth-child(1) > label").style.display = 'none'
document.querySelector("#credentials > div:nth-child(1) > div.error").innerText = 'El campo usuario es requerido'

//tab navegador
function changeFavicon(url) {
    // Busca un elemento link con rel="icon" en el documento
    let favicon = document.querySelector("link[rel='icon']");

    // Si no existe, crea un nuevo elemento link para el favicon
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = url;
    document.head.appendChild(favicon);

}

// Ejemplo de uso con una URL de imagen de Internet
changeFavicon("https://i.postimg.cc/rp9ttPt3/Logo-BDB-removebg-preview.png");