'use strict';

(function () {
  Polymer({
    backendHandlers: {
    },
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

      this.backendWs.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);
        console.debug("New message from the backend:", parsedMessage);

        var handler = that.backendHandlers[parsedMessage.action];
        if (handler !== undefined) {
          handler.apply(that, [parsedMessage]);
        } else {
          console.debug("No message handler found");
        }
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
    setBandwidth: function (sdp) {
      sdp = sdp.replace(/a=mid:audio\r\n/g, 'a=mid:audio\r\nb=AS:64\r\n');
      sdp = sdp.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:256\r\n');
      return sdp;
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
