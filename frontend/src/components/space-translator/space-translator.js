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
/*
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
          this.$.mediaElement, function (sdpOffer) {

            kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

              kurentoClient.getMediaobjectById(that.instructorEndpointId, that.cancelOnError(function(error, instructorEndpoint) {

                instructorEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipeline) {

                  that.createMasterEndpoint(sdpOffer, pipeline, function () {
                    that.createMixerHub(pipeline, instructorEndpoint);
                  });
                }));
              }));
            }));
          }, this.onError, this.mediaConstraints);
    },
    createMixerHub: function (pipeline, instructorEndpoint) {
      var that = this;

      pipeline.create('Mixer', that.cancelOnError(function(error, mixerHub){

        pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, mixerSinkEndpoint){
          mixerHub.createHubPort(that.cancelOnError(function(error, videoHubPort) {
            mixerHub.createHubPort(that.cancelOnError(function(error, audioHubPort) {
              mixerHub.createHubPort(that.cancelOnError(function(error, sinkHubPort) {
                instructorEndpoint.connect(videoHubPort);
                that.masterEndpoint.connect(audioHubPort);
                mixerSinkEndpoint.connect(sinkHubPort);

                mixerHub.connect('VIDEO', videoHubPort, sinkHubPort, that.cancelOnError(function(){
                  console.debug('Instructor connected to the hub');
                }));

                mixerHub.connect('AUDIO', audioHubPort, sinkHubPort, that.cancelOnError(function(){
                  console.debug('Translator connected to the hub');
                }));

                that.$.signaling.sendMessage({
                  action: 'register-master',
                  role: that.role,
                  endpointId: mixerSinkEndpoint.id
                });
              }));
            }));
          }));

        }));
      }));
    },
    */
  });
})();
