function _bugsTG_vacio() {}
var _bugsTG_archivos = [];

function load_modalBugs() {
  var modal = document.getElementById('modalBugsTG');
  if (!modal) return;

  var usuario = modal.querySelector('#_bugsTG-usuario');
  var fechaInput = modal.querySelector('#_bugsTG-fecha');
  var closeBtn = modal.querySelector('#_bugsTG-close-btn');
  var cancelBtn = modal.querySelector('#_bugsTG-btn-cancel');
  var submitBtn = modal.querySelector('#_bugsTG-btn-submit');
  var uploadZone = modal.querySelector('#_bugsTG-upload-zone');
  var fileInput = modal.querySelector('#_bugsTG-file');
  var date = sessionStorage.date || '';

  var ObjJSON = sessionStorage.LappizUser;
  var obj = JSON.parse(ObjJSON);
  var emailUser = '';
  if (obj.Email && obj.Email.includes('@bdb.com')) {
    emailUser = obj.CorreoElectronico;
  }else{
    emailUser = obj.Email;
  }
  var userName = emailUser || '';
  if (usuario) usuario.value = userName;
  if (date && fechaInput) {
    fechaInput.value = date + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  _bugsTG_resetearFormulario(modal);

  modal.showModal();

  modal.addEventListener('click', function (event) {
    if (event.target === modal) modal.close();
  });
  if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });
  if (cancelBtn) cancelBtn.addEventListener('click', function () { modal.close(); });
  if (submitBtn) submitBtn.addEventListener('click', function () { sumitBugReport(); });

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', function (event) {
      if (event.target.closest('._bugsTG-file-remove')) return;
      fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      agregarArchivos(Array.prototype.slice.call(fileInput.files || []));
      fileInput.value = '';
    });
  }
}

function agregarArchivos(nuevos) {
  for (var i = 0; i < nuevos.length; i++) {
    var archivo = nuevos[i];
    var duplicado = _bugsTG_archivos.some(function (a) {
      return a.name === archivo.name && a.size === archivo.size && a.lastModified === archivo.lastModified;
    });
    if (!duplicado) _bugsTG_archivos.push(archivo);
  }
  _bugsTG_renderFileList();
}

function _bugsTG_renderFileList() {
  var cont = document.getElementById('_bugsTG-file-list');
  if (!cont) return;
  cont.innerHTML = '';

  _bugsTG_archivos.forEach(function (archivo, index) {
    var item = document.createElement('div');
    item.className = '_bugsTG-file-item';

    var thumb = document.createElement('div');
    thumb.className = '_bugsTG-file-thumb';
    try {
      var url = URL.createObjectURL(archivo);
      thumb.style.backgroundImage = 'url("' + url + '")';
      thumb.addEventListener('load', function () { URL.revokeObjectURL(url); }, { once: true });
      thumb.addEventListener('error', function () { URL.revokeObjectURL(url); }, { once: true });
    } catch (e) {
      // sin miniatura si el navegador no soporta
    }

    var nombre = document.createElement('span');
    nombre.className = '_bugsTG-file-name';
    nombre.title = archivo.name;
    nombre.textContent = archivo.name;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = '_bugsTG-file-remove';
    btn.innerHTML = '&times;';
    btn.title = 'Quitar ' + archivo.name;
    btn.setAttribute('aria-label', 'Quitar ' + archivo.name);
    (function (idx) {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        _bugsTG_archivos.splice(idx, 1);
        _bugsTG_renderFileList();
      });
    })(index);

    item.appendChild(thumb);
    item.appendChild(nombre);
    item.appendChild(btn);
    cont.appendChild(item);
  });
}

function _bugsTG_resetearFormulario(modal) {
  var modulo = modal.querySelector('#_bugsTG-modulo');
  var descripcion = modal.querySelector('#_bugsTG-descripcion');
  var fileInput = modal.querySelector('#_bugsTG-file');
  if (modulo) modulo.value = '';
  if (descripcion) descripcion.value = '';
  if (fileInput) fileInput.value = '';
  _bugsTG_archivos = [];
  var lista = document.getElementById('_bugsTG-file-list');
  if (lista) lista.innerHTML = '';
}
