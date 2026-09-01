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
  var userName = localStorage.getItem('userName') || '';
  if (usuario) usuario.value = userName;
  if (date) {
    if (fechaInput) {
      fechaInput.value = date + ' · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  modal.showModal();

  modal.addEventListener('click', function (event) {
    if (event.target === modal) modal.close();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () { modal.close(); });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () { modal.close(); });
  }

  if (submitBtn) {
    sumitBugReport();
  }

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        uploadZone.querySelector('p').innerHTML =
          'Archivo: <strong>' + fileInput.files[0].name + '</strong>';
      }
    });

  }
}

