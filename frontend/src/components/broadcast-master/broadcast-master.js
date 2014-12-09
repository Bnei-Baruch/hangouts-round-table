'use strict';

(function () {
  Polymer({
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
        this.$.localVideo, function (sdpOffer) {
          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.create('MediaPipeline', that.cancelOnError(function(error, pipeline) {

              pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtc){
                that.sendMessage({id: 'master', endpointId: webRtc.id});

                webRtc.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
                  that.webRtcPeer.processSdpAnswer(sdpAnswer);
                  that.onMasterReady();
                }));
              }));
            }));
          }));
        }, this.onError);
    },
    onMasterReady: function () {
      console.log("Not implemented");
    }
  });

})();
