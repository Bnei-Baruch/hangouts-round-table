/* jshint strict:false */

(function () {
  Polymer({
    mediaConstraints: null,
    isReady: false,
    isMuted: false,
    isEnabled: false,
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
        that.$.mediaElement, function (sdpOffer) {

          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.create('MediaPipeline', that.cancelOnError(function(error, pipeline) {
              that.createEndpoint(sdpOffer, pipeline);
            }));
          }));
        }, this.onError, this.mediaConstraints);
    },
    createEndpoint: function (sdpOffer, pipeline) {
      var that = this;

      pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtc){
        that.webRtcEndpoint = webRtc;

        sdpOffer = that.setBandwidth(sdpOffer);

        webRtc.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
          that.toggleBroadcast();
          that.webRtcPeer.processSdpAnswer(sdpAnswer);
          that.isReady = true;
          that.$.signaling.sendMessage({
            action: 'register-master',
            role: that.role,
            endpointId: webRtc.id
          });
        }));
      }));
    },
    isEnabledChanged: function () {
      this.toggleBroadcast();
    },
    isMutedChanged: function () {
      this.toggleBroadcast(true);
    },
    toggleBroadcast: function (onlyAudio) {
      var tracks = this.webRtcPeer.stream.getTracks();
      for (var trackIndex in tracks) {
        var track = tracks[trackIndex];

        if (track.kind === 'audio') {
          track.enabled = !this.isMuted && this.isEnabled;
        } else if (!onlyAudio) {
          track.enabled = this.isEnabled;
        }
      }
    }
  });

})();
