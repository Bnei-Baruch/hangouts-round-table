'use strict';

(function () {
  Polymer({
    publish: {
      wsUri: 'ws://webrtc-dev.socio2.net:8888/kurento',
    },
    created: function () {
    },
    ready: function() {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startRecvOnly(
        this.$.remoteVideo, function (sdpOffer) {
          kurentoClient(that.wsUri, function(error, kurentoClient) {
            if(error) {
              return that.onError(error);
            }

            // var webRtcEndpointId = "WebRtcEndpoint_MediaPipeline_a7520ad3-0f8b-4788-92d4-8ffb277041e6/a795f1ba-cdd5-4cc5-9a52-08586e982934";

            var webRtcEndpointId = prompt("WebRTC endpoint ID");

            kurentoClient.getMediaobjectById(webRtcEndpointId, function(error, webRtcMaster) {
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
  });

})();
