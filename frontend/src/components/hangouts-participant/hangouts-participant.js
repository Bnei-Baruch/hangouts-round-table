'use strict';

(function () {
  Polymer({
    backendHandlers: {
      masterResumed: function () {

      },
      masterPaused: function () {
        gapi.hangout.hideApp();
      },
    }
  });

})();
