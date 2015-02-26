/* jshint strict:false */

(function () {
  Polymer({
    instructorEndpointId: null,
    assignMasterEndpoints: function (e, message) {
      if (message.instructorEndpointId !== this.instructorEndpointId) {
        this.instructorEndpointId = message.instructorEndpointId;
        this.initKurento();
      }
      if (message.translatorEndpointId !== this.translatorEndpointId) {
        this.translatorEndpointId = message.translatorEndpointId;
        this.connectTranslatorEndpoint();
      }
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
            that.kurentoClient = kurentoClient;

            kurentoClient.getMediaobjectById(that.instructorEndpointId, that.cancelOnError(function(error, instructorEndpoint) {

              instructorEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipelineId) {

                kurentoClient.getMediaobjectById(pipelineId, that.cancelOnError(function(error, pipeline) {

                  pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, viewerEndpoint){

                    that.viewerEndpoint = viewerEndpoint;

                    instructorEndpoint.connect(viewerEndpoint, that.cancelOnError(function(){
                      console.log('Connected to the instructor');
                    }));

                    if (that.translatorEndpointId) {
                      that.connectTranslatorEndpoint();
                    }

                    viewerEndpoint.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
                      that.webRtcPeer.processSdpAnswer(sdpAnswer);
                    }));

                  }));
                }));
              }));
            }));
          }));
        }, this.onError);
    },
    connectTranslatorEndpoint: function () {
      var that = this;

      this.kurentoClient.getMediaobjectById(this.translatorEndpointId, this.cancelOnError(function(error, translatorEndpoint) {
        translatorEndpoint.connect(that.viewerEndpoint, that.cancelOnError(function(){
          console.log('Connected to the translator');
        }));
      }));
    }
  });

})();
