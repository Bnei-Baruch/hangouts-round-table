'use strict';

(function () {
  var backendWs;

  Polymer({
    ready: function() {
      if (backendWs === undefined) {
        this.initBackendSocket();
      }
    },
    initBackendSocket: function () {
      var that = this;

      backendWs = new WebSocket(this.$.config.backendWsUri);

      backendWs.onopen = function () {
        that.fire('websocket-open');
      };

      backendWs.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);

        console.debug("New message from the backend:", parsedMessage);
        that.fire(parsedMessage.action, parsedMessage);
      };

      backendWs.onclose = function () {
        window.setTimeout(function () {
          console.log("Reconnecting to the backend...");
          that.initBackendSocket();
        }, 1000);
      };
    },
    sendMessage: function (message) {
      message.space = this.space;
      message.language = this.language;
      var jsonMessage = JSON.stringify(message);
      backendWs.send(jsonMessage);
    }
  });
})();
