'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default',
    },
    ready: function() {
      this.initBackendSocket();
    },
    initBackendSocket: function () {
      var that = this;

      this.backendWs = new WebSocket(this.$.config.backendWsUri);

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
      var that = this;

      return function () {
        var error = arguments[0];
        if (error) {
          that.onError(error);
        } else {
          func.apply(this, arguments);
        }
      };
    },
    onError: function (error) {
      console.error(error);
    },
    sendMessage: function (message) {
      message.space = this.space;
      var jsonMessage = JSON.stringify(message);
      this.backendWs.send(jsonMessage);
    }
  });

})();
