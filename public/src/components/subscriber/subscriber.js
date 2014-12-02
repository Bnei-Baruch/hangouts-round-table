'use strict';

(function () {
  Polymer({
    publish: {
      kurentoWsUri: 'ws://webrtc-dev.socio2.net:8888/kurento',
      backendWsUri: 'ws://localhost:4567/socket'
    },
    webRtcEndpointId: null,
    ready: function() {
      var that = this;

      this.backendWs = new WebSocket(this.backendWsUri);

      this.backendWs.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);
        if (parsedMessage.id === 'viewerResponse') {
          that.webRtcEndpointId = parsedMessage.endpointId;
          that.initKurento();
        }
      };

      this.backendWs.onopen = function () {
        that.sendMessage({id: 'viewer'});
      };
    },
    initKurento: function () {
      var that = this;

      if (this.webRtcPeer) {
        this.webRtcPeer.dispose();
        this.webRtcPeer = null;
      }

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startRecvOnly(
        this.$.remoteVideo, function (sdpOffer) {
          kurentoClient(that.kurentoWsUri, function(error, kurentoClient) {
            if(error) {
              return that.onError(error);
            }

            kurentoClient.getMediaobjectById(that.webRtcEndpointId, function(error, webRtcMaster) {
              if(error) {
                return that.onError(error);
              }

              webRtcMaster.getMediaPipeline(function(error, pipelineId) {
                if(error) {
                  return that.onError(error);
                }

                kurentoClient.getMediaobjectById(pipelineId, function(error, pipeline) {
                  if(error) {
                    return that.onError(error);
                  }

                  pipeline.create('WebRtcEndpoint', function(error, webRtcViewer){
                    if(error) {
                      return that.onError(error);
                    }

                    webRtcMaster.connect(webRtcViewer, function(error){
                      if(error) {
                        return that.onError(error);
                      }

                      console.log('Connection established');
                    });

                    webRtcViewer.processOffer(sdpOffer, function(error, sdpAnswer){
                      if(error) {
                        return that.onError(error);
                      }

                      that.webRtcPeer.processSdpAnswer(sdpAnswer);
                    });

                  });
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
