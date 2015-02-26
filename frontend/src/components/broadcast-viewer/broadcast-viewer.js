/* jshint strict:false */

(function () {
  Polymer({
    instructorEndpointId: null,
    assignMasterEndpoints: function (e, message) {
      this.instructorEndpointId = message.instructorEndpointId;
      this.translatorEndpointId = message.translatorEndpointId;
      this.initKurento();
    },
    register: function () {
      this.$.signaling.sendMessage({action: 'register-viewer'});
    },
    initKurento: function () {
      var that = this;

      this.shutdown();

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startRecvOnly(
        that.$.remoteVideo, function (sdpOffer) {
          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.getMediaobjectById(that.instructorEndpointId, that.cancelOnError(function(error, instructorEndpoint) {

              instructorEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipelineId) {

                kurentoClient.getMediaobjectById(pipelineId, that.cancelOnError(function(error, pipeline) {

                  pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, viewerEndpoint){

                    that.viewerEndpoint = viewerEndpoint;

                    instructorEndpoint.connect(viewerEndpoint, that.cancelOnError(function(){
                      console.log('Connected to the instructor');
                    }));

                    kurentoClient.getMediaobjectById(that.translatorEndpointId, that.cancelOnError(function(error, translatorEndpoint) {
                      translatorEndpoint.connect(viewerEndpoint, that.cancelOnError(function(){
                        console.log('Connected to the translator');
                      }));
                    }));

                    viewerEndpoint.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
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
