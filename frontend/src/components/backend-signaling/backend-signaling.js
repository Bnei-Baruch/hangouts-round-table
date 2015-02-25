'use strict';

(function () {
  var backendWs;

  Polymer({
    publish: {
      space: null,
      language: null
    },
    ready: function() {
      this.initBackendSocket();
    },
    initBackendSocket: function () {
      var that = this;

      if (backendWs === undefined) {
        backendWs = new WebSocket(this.$.config.backendWsUri);

        backendWs.onclose = function () {
          window.setTimeout(function () {
            console.log("Reconnecting to the backend...");
            that.initBackendSocket();
          }, 1000);
        };
      }

      backendWs.addEventListener('open', function () {
        that.fire('websocket-open');
      });

      backendWs.addEventListener('message', function (message) {
        var parsedMessage = JSON.parse(message.data);

        console.debug("New message from the backend:", parsedMessage);
        that.fire(parsedMessage.action, parsedMessage);
      });
    },
    sendMessage: function (message) {
      message.space = this.space;
      message.language = this.language;
      var jsonMessage = JSON.stringify(message);
      backendWs.send(jsonMessage);
    }
  });
})();
