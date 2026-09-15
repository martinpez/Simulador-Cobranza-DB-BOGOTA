(function () {
  'use strict';

  var BUG_ICON_ID = 'bug-icon_bugs';

  function cleanupDuplicates() {
    var icons = document.querySelectorAll('#' + BUG_ICON_ID);
    if (icons.length > 1) {
      for (var i = 1; i < icons.length; i++) {
        var li = icons[i].closest('li.nav-item');
        var prev = li ? li.previousElementSibling : null;
        // borra también el separador que va justo antes, si es el que insertamos nosotros
        if (prev && prev.matches('li.nav-item') && !prev.querySelector('.link-title, .item-name')) {
          prev.remove();
        }
        if (li) li.remove();
      }
    }
  }

  function iconAlreadyPresent() {
    var el = document.getElementById(BUG_ICON_ID);
    return !!(el && el.isConnected);
  }

  function insertBugIcon() {
    var menu = document.getElementById('sidebar-menu');
    if (!menu) return;

    cleanupDuplicates();
    if (iconAlreadyPresent()) return; // ya existe y está realmente en el DOM

    var separatorHTML = '<li class="nav-item nav-link-ref ng-star-inserted" style="border-left: 2px solid rgba(0, 44, 118, 0.35); align-self: center; height: 40px; padding: 0; margin: 0px; margin-bottom: 0px; border-bottom-style: solid; border-bottom-width: 0px; bottom: 4px;"></li>';
    var bugIconHTML = '<li class="nav-item nav-link-ref ng-star-inserted"><a class="nav-link" style="color: rgb(0, 44, 118); padding-left: 5px; cursor:pointer;"><i class="fa fa-bug link-icon" id="' + BUG_ICON_ID + '" aria-hidden="true" style="font-size: 20px; margin-bottom: 20px; left: 6px; right: 0px;" title="Reportar problema"></i></a><ul class="nav-second-level sidebar-nav sub-menu" hidden=""></ul></li>';

    menu.insertAdjacentHTML('beforeend', separatorHTML + bugIconHTML);

    var bugIconEl = document.getElementById(BUG_ICON_ID);
    var bugLink = bugIconEl ? bugIconEl.closest('.nav-link') : null;
    if (bugLink) {
      bugLink.addEventListener('click', function () {
        bugsmodal();
        load_modalBugs();
      });
    }
  }

  function init() {
    // Si el observer ya está activo en esta sesión de la página (SPA sin recarga real),
    // no crees otro: solo asegúrate de que el ícono esté presente.
    if (window.__bugIconWatcherActive) {
      insertBugIcon();
      return;
    }
    window.__bugIconWatcherActive = true;

    var menu = document.getElementById('sidebar-menu');
    if (menu) {
      insertBugIcon();
    }

    var observer = new MutationObserver(function () {
      var currentMenu = document.getElementById('sidebar-menu');
      if (currentMenu) {
        insertBugIcon();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();