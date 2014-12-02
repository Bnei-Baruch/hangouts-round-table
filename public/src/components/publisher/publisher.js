'use strict';

(function () {
  Polymer({
    publish: {
      kurentoWsUri: 'ws://webrtc-dev.socio2.net:8888/kurento',
      backendWsUri: 'ws://localhost:4567/socket'
    },
    created: function () {
    },
    ready: function() {
      var that = this;

      this.backendWs = new WebSocket(this.backendWsUri);

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
        this.$.localVideo, function (sdpOffer) {
          kurentoClient(that.kurentoWsUri, function(error, kurentoClient) {
            if(error) {
              return that.onError(error);
            }

            kurentoClient.create('MediaPipeline', function(error, pipeline) {
              if(error) {
                return that.onError(error);
              }

              pipeline.create('WebRtcEndpoint', function(error, webRtc){
                if(error) {
                  return that.onError(error);
                }
                that.sendMessage({id: 'master', endpointId: webRtc.id});

                webRtc.processOffer(sdpOffer, function(error, sdpAnswer){
                  if(error) {
                    return that.onError(error);
                  }

                  that.webRtcPeer.processSdpAnswer(sdpAnswer);
                });

              });
            });
          });
        }, this.onError);
    },
    onError: function (error) {
      alert(error);
    },
    sendMessage: function (message) {
      var jsonMessage = JSON.stringify(message);
      this.backendWs.send(jsonMessage);
    }
  });

})();
