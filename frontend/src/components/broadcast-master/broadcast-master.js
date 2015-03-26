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
          that.toggleTracksByKind(null, false);
          that.webRtcPeer.processSdpAnswer(sdpAnswer);
          that.isReady = true;
          that.$.signaling.sendMessage({
            action: 'register-master',
            role: that.role,
            endpointId: webRtc.id
          });
          that.createEndpointCallback(webRtc, pipeline);
        }));
      }));
    },
    createEndpointCallback: function () {
      console.debug("Called createEndpointCallback which is not implemented");
    },
    isEnabledChanged: function () {
      this.toggleBroadcast();
    },
    isMutedChanged: function () {
      this.toggleBroadcast(true);
    },
    toggleTracksByKind: function(kind, enabled) {
      var tracks = this.webRtcPeer.stream.getTracks();
      for (var trackIndex in tracks) {
        var track = tracks[trackIndex];

        if (!kind || (track.kind === kind)) {
          track.enabled = enabled;
        }
      }
    },
    toggleBroadcast: function (onlyAudio) {
      this.toggleTracksByKind('audio', !this.isMuted && this.isEnabled);

      if (!onlyAudio) {
        this.toggleTracksByKind('video', this.isEnabled);
      }
    }
  });

})();
