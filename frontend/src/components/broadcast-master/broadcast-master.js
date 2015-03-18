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

      pipeline.create('PlayerEndpoint',
          {uri: "rtmp://edge1.il.kab.tv/rtplive/live1-cn4qdiwU-rus-medium.stream"},
          // {uri: "http://files.kabbalahmedia.info/download/files/eng_t_rav_bs-shamati-068-kesher-adam_2015-03-16_lesson.mp4"},
          // {uri: "http://icecast.kab.tv/live1-rus-574bcfd5.mp3"},
          that.cancelOnError(function(error, webRtc){
      // pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtc){
        that.webRtcEndpoint = webRtc;

        sdpOffer = that.setBandwidth(sdpOffer);

        webRtc.play(function () {
          that.isReady = true;
          that.$.signaling.sendMessage({
            action: 'register-master',
            role: that.role,
            endpointId: webRtc.id
          });
        });

        // webRtc.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
        //   that.toggleTracksByKind(null, false);
        //   that.webRtcPeer.processSdpAnswer(sdpAnswer);
        //   that.isReady = true;
        //   that.$.signaling.sendMessage({
        //     action: 'register-master',
        //     role: that.role,
        //     endpointId: webRtc.id
        //   });
        // }));
      }));
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
