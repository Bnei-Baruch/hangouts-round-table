'use strict';

(function () {

  var runIfHangoutsReady = function(func) {
    var that = this;

    return function () {
      if (that.isHangoutsApiReady) {
        func.apply(this, arguments);
      } else {
        console.debug("Hangouts API is not ready yet");
      }
    };
  };

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
    onMasterResumedMessage: runIfHangoutsReady(function () {
      gapi.hangout.av.setMicrophoneMute(true);
    }),
    onMasterPausedMessage: runIfHangoutsReady(function () {
      gapi.hangout.hideApp();
    }),
  });

})();
