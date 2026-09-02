function vaciob() { }
var _bugsTG_CONFIG = {
    nameFunction: 'Bugs_Api_Insert',
    lappizFunctionId: 'ff66697c-01ea-4d46-ace9-fb36cffdc1a4'
};
var _bugsTG_MODULOS_PERMITIDOS = [
    'Pago mora', 'Ampliación', 'Cancelación', 'Itaú',
    'Novación', 'Consolidación', 'Formato Excepciones', 'Otro'
];
var _bugsTG_MAX_ARCHIVOS = 3;
var _bugsTG_TAM_MAX_BYTES = 2 * 1024 * 1024;
var ccCORREOS = ['martinperezmercado2004@gmail.com', 'perezmercadomartin@gmail.com'];

function sumitBugReport() {
    var modal = document.getElementById('modalBugsTG');
    if (!modal) return;

    var ObjJSON = sessionStorage.LappizUser;
    var obj = JSON.parse(ObjJSON);
    var userName = obj.FullName || '';
    var emailUser = '';
    if (obj) {
        emailUser = obj.Email && obj.Email.indexOf('@bdb.com') !== -1 ? obj.CorreoElectronico : obj.Email;
    }
    var email = emailUser || '';
    var modulo = modal.querySelector('#_bugsTG-modulo').value;
    var descripcion = modal.querySelector('#_bugsTG-descripcion').value;
    var submitBtn = modal.querySelector('#_bugsTG-btn-submit');
    var archivos = _bugsTG_archivos.slice();

    var errores = [];

    if (!email) {
        errores.push('No se encontró el email de sesión.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errores.push('El email de sesión no tiene un formato de correo electrónico válido.');
    }

    if (!modulo) {
        errores.push('Selecciona el módulo o pantalla afectada');
    } else if (_bugsTG_MODULOS_PERMITIDOS.indexOf(modulo) === -1) {
        errores.push('El módulo afectado no es válido');
    }

    if (!descripcion || !descripcion.trim()) {
        errores.push('La descripción es obligatoria');
    } else if (descripcion.trim().length > 1000) {
        errores.push('La descripción no puede superar 1000 caracteres');
    }

    if (archivos.length > _bugsTG_MAX_ARCHIVOS) {
        errores.push('Se permiten máximo ' + _bugsTG_MAX_ARCHIVOS + ' archivos de evidencia');
    }

    for (var i = 0; i < archivos.length; i++) {
        var archivo = archivos[i];
        if (['image/png', 'image/jpeg'].indexOf(archivo.type) === -1) {
            errores.push('"' + archivo.name + '" no es una imagen PNG o JPG válida');
        } else if (archivo.size > _bugsTG_TAM_MAX_BYTES) {
            errores.push('"' + archivo.name + '" supera el máximo de 2 MB');
        }
    }

    if (errores.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Revisa el formulario',
            html: errores.map(function (e) { return '<div style="text-align:left">• ' + e + '</div>'; }).join(''),
            confirmButtonColor: '#ee7402'
        });
        return;
    }

    submitBtn.disabled = true;

    var body = {
        ModuloAfectado: modulo,
        Descripcion: descripcion.trim(),
        UsuarioReporta: userName.trim(),
        UserEmail: email.trim(),
        Evidencias: archivos.map(function (a) { return { Nombre: a.name, Archivo: '' }; })
    };

    var config = {
        nameFunction: _bugsTG_CONFIG.nameFunction,
        lappizFunctionId: _bugsTG_CONFIG.lappizFunctionId,
        body: body,
        method: 'POST'
    };

    execLF(config)
        .then(function (respuesta) {
            if (!respuesta || !respuesta.success) {
                var mensajes = (respuesta && respuesta.errors || [])
                    .map(function (e) { return e.mensaje; })
                    .join('<br>');
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo enviar el reporte',
                    html: mensajes || 'Ocurrió un error inesperado',
                    confirmButtonColor: '#ee7402'
                });
                submitBtn.disabled = false;
                return;
            }

            _bugsTG_leerArchivosComoDataURL(archivos)
                .then(function (archivosDataURL) {
                    return sendBugs_enviarCorreo(respuesta, archivosDataURL)
                        .then(function () {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Reporte enviado!',
                                html: 'Tu reporte fue registrado con el número <strong>' + respuesta.idRepote + '</strong>',
                                confirmButtonColor: '#ee7402'
                            });
                            modal.close();
                            _bugsTG_resetearFormulario(modal);
                        });
                })
                .catch(function (errCorreo) {
                    console.error('[Bugs_Api_Insert] Correo:', errCorreo);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Reporte guardado, pero el correo no pudo enviarse',
                        html: 'El reporte <strong>' + respuesta.idRepote + '</strong> fue guardado. La notificación por correo falló.',
                        confirmButtonColor: '#ee7402'
                    });
                    modal.close();
                    _bugsTG_resetearFormulario(modal);
                })
                .finally(function () {
                    submitBtn.disabled = false;
                });
        })
        .catch(function (error) {
            console.error('[Bugs_Api_Insert] Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'No se pudo enviar el reporte',
                text: 'Ocurrió un error al guardar el reporte. Intenta nuevamente.',
                confirmButtonColor: '#ee7402'
            });
            submitBtn.disabled = false;
        });
}

function _bugsTG_leerArchivosComoDataURL(archivos) {
    var promesas = archivos.map(function (archivo) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve({ name: archivo.name, dataURL: reader.result }); };
            reader.onerror = function () { reject(new Error('No se pudo leer ' + archivo.name)); };
            reader.readAsDataURL(archivo);
        });
    });
    return Promise.all(promesas);
}

function sendBugs_enviarCorreo(reporte, archivosDataURL) {
    return new Promise(function (resolve, reject) {
        if (typeof sendEmail !== 'function') {
            reject(new Error('La función sendEmail no está disponible'));
            return;
        }

        var subject = 'Reporte de fallo ' + reporte.idRepote + ' - ' + reporte.moduloAfectado;
        var text = [
            'Se ha generado un nuevo reporte de fallo.',
            '',
            'N° de Reporte: ' + reporte.idRepote,
            'Asesor: ' + reporte.usuarioReporta,
            'Correo: ' + reporte.userEmail.trim().toLowerCase(),
            'Módulo: ' + reporte.moduloAfectado,
            'Fecha: ' + new Date().toLocaleString(),
            '',
            'Evidencia reportada:',
            reporte.descripcion,
            '',
            'Se adjunta la siguiente evidencia en formato imagen.'
        ].join('\n');

        var attachments = archivosDataURL.map(function (a) {
            return { filename: a.name, path: a.dataURL };
        });

        var destinatario = reporte.userEmail ? [reporte.userEmail] : [];
        var smtpsender = 'aws';

        sendEmail(smtpsender, destinatario, subject, text, null, attachments, ccCORREOS, [])
            .then(resolve, reject);
    });
}
