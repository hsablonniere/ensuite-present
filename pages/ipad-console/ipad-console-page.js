(function () {

  'use strict';

  document.getElementById('fs').addEventListener('click', (e) => {
    if (document.body.requestFullScreen) {
      document.body.requestFullScreen();
    }
    else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    }
    else if (document.body.webkitRequestFullScreen) {
      document.body.webkitRequestFullScreen();
    }
  });
})();
