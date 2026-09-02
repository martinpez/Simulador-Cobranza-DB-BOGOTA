(function () {
  'use strict';

  function insertBugIcon() {
    var menu = document.getElementById('sidebar-menu');
    if (!menu || menu.querySelector('.fa-bug')) return;

    var separatorHTML = '<li class="nav-item nav-link-ref ng-star-inserted" style="border-left: 2px solid rgba(0, 44, 118, 0.35); align-self: center; height: 40px; padding: 0; margin: 0px; margin-bottom: 0px; border-bottom-style: solid; border-bottom-width: 0px; bottom: 4px;"></li>';
    var bugIconHTML = '<li class="nav-item nav-link-ref ng-star-inserted"><a class="nav-link" style="color: rgb(0, 44, 118); padding-left: 5px;"><i class="fa fa-bug link-icon" aria-hidden="true" style="font-size: 20px; margin-bottom: 20px; left: 6px; right: 0px;" title="Reportar problema"></i></a><ul class="nav-second-level sidebar-nav sub-menu" hidden=""></ul></li>';

    menu.insertAdjacentHTML('beforeend', separatorHTML + bugIconHTML);

    var bugIconEl = menu.querySelector('.fa-bug');

    var bugLink = bugIconEl ? bugIconEl.closest('.nav-link') : null;
    if (bugLink) {
      bugLink.style.cursor = 'pointer';
      bugLink.addEventListener('click', function () {
          bugsmodal();
          load_modalBugs();
      });
    }
  }

  function init() {
    var menu = document.getElementById('sidebar-menu');
    if (menu) {
      insertBugIcon();
      return;
    }
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var addedNodes = mutations[i].addedNodes;
        for (var j = 0; j < addedNodes.length; j++) {
          if (addedNodes[j].id === 'sidebar-menu' || (addedNodes[j].querySelector && addedNodes[j].querySelector('#sidebar-menu'))) {
            insertBugIcon();
            observer.disconnect();
            return;
          }
        }
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
