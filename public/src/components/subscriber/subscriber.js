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

            kurentoClient.create('MediaPipeline', function(error, pipeline) {
              if(error) {
                return that.onError(error);
              }

              pipeline.create('WebRtcEndpoint', function(error, webRtc){
                if(error) {
                  return that.onError(error);
                }

                webRtc.connect(webRtc, function(error){
                  if(error) {
                    return that.onError(error);
                  }

                  console.log('Loopback established');
                });

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
  });

})();
