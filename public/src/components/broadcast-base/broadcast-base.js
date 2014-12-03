'use strict';

(function () {
  Polymer({
    publish: {
      kurentoWsUri: 'ws://webrtc-dev.socio2.net:8888/kurento',
      backendWsUri: 'ws://localhost:4567/socket'
    },
    ready: function() {
      this.initBackendSocket();
    },
    initBackendSocket: function () {
      var that = this;

      this.backendWs = new WebSocket(this.backendWsUri);

      this.backendWs.onopen = function () {
        that.initKurento();
      };

      this.backendWs.onclose = function () {
        window.setTimeout(function () {
          console.log("Reconnecting to the backend...");
          that.initBackendSocket();
        }, 1000);
      };
    },
    initKurento: function () {
    },
    cancelOnError: function(func) {
      return function () {
        var error = arguments[0];
        if (error) {
          console.error(error);
        } else {
          func.apply(this, arguments);
        }
      };
    },
    sendMessage: function (message) {
      var jsonMessage = JSON.stringify(message);
      this.backendWs.send(jsonMessage);
    }
  });

})();
