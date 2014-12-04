/* jshint strict:false */

(function () {
  Polymer({
    webRtcEndpointId: null,
    initBackendSocket: function () {
      var that = this;

      // Doesn't work in 'strict' mode
      this.super();

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
          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.getMediaobjectById(that.webRtcEndpointId, that.cancelOnError(function(error, webRtcMaster) {

              webRtcMaster.getMediaPipeline(that.cancelOnError(function(error, pipelineId) {

                kurentoClient.getMediaobjectById(pipelineId, that.cancelOnError(function(error, pipeline) {

                  pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtcViewer){

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
