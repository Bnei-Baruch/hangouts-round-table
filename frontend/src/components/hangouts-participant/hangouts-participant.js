'use strict';

(function () {
  Polymer({
    onMasterResumedMessage: function () {

    },
    onMasterPausedMessage: function () {
      gapi.hangout.hideApp();
    },
  });

})();
