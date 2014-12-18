'use strict';

(function () {

  Polymer({
    isHangoutsApiReady: false,
    created: function () {
      var that = this;

      var _initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          that.isHangoutsApiReady = true;
          gapi.hangout.onApiReady.remove(_initHangouts);
        }
      };

      gapi.hangout.onApiReady.add(_initHangouts);
    },
    onMasterResumedMessage: function () {
      if (this.isHangoutsApiReady) {
        gapi.hangout.av.setMicrophoneMute(true);
      }
    },
    onMasterPausedMessage: function () {
      if (this.isHangoutsApiReady) {
        gapi.hangout.hideApp();
      }
    },
  });

})();
