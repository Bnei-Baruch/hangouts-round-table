'use strict';

(function () {
  Polymer({
    ready: function() {
      this.initBackendSocket();
    },
    initBackendSocket: function () {
      var that = this;

      this.backendWs = new WebSocket(this.$.config.backendWsUri);

      this.backendWs.onopen = function () {
        that.fire('websocket-open');
      };

      this.backendWs.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);

        console.debug("New message from the backend:", parsedMessage);
        that.fire(parsedMessage.action, parsedMessage);
      };

      this.backendWs.onclose = function () {
        window.setTimeout(function () {
          console.log("Reconnecting to the backend...");
          that.initBackendSocket();
        }, 1000);
      };
    },
    sendMessage: function (message) {
      message.space = this.space;
      var jsonMessage = JSON.stringify(message);
      this.backendWs.send(jsonMessage);
    }
  });
})();
