/* jshint strict:false */

(function () {
  Polymer({
    webRtcEndpointId: null,
    assignMasterEndpoint: function (e, message) {
      this.webRtcEndpointId = message.endpointId;
      this.initKurento();
    },
    register: function () {
      this.$.signaling.sendMessage({action: 'register-viewer'});
    },
    initKurento: function () {
      var that = this;

      this.shutdown();

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startRecvOnly(
        this.$.remoteVideo, function (sdpOffer) {
          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.getMediaobjectById(that.webRtcEndpointId, that.cancelOnError(function(error, webRtcMaster) {

              webRtcMaster.getMediaPipeline(that.cancelOnError(function(error, pipelineId) {

                kurentoClient.getMediaobjectById(pipelineId, that.cancelOnError(function(error, pipeline) {

                  pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtcViewer){

                    that.webRtcEndpoint = webRtcViewer;

                    webRtcMaster.connect(webRtcViewer, that.cancelOnError(function(){
                      console.log('Connection established');
                    }));

                    webRtcViewer.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
                      that.webRtcPeer.processSdpAnswer(sdpAnswer);
                    }));

                  }));
                }));
              }));
            }));
          }));
        }, this.onError);
    }
  });

})();
