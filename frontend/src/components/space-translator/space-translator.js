/* jshint strict:false */

(function () {
  Polymer({
    ready: function () {
      this.super();

      this.mediaConstraints = {
        audio : true,
        video : false
      };
    },
    assignMasterEndpoints: function (e, message) {
      if (message.instructorEndpointId !== this.instructorEndpointId) {
        this.instructorEndpointId = message.instructorEndpointId;
        this.initKurento();
      }
    },
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
          this.$.mediaElement, function (sdpOffer) {

            kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

              kurentoClient.getMediaobjectById(that.instructorEndpointId, that.cancelOnError(function(error, instructorEndpoint) {

                instructorEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipelineId) {

                  kurentoClient.getMediaobjectById(pipelineId, that.cancelOnError(function(error, pipeline) {
                    that.createEndpoint(sdpOffer, pipeline);
                  }));
                }));
              }));
            }));
          }, this.onError, this.mediaConstraints);
    },
  });
})();
