'use strict';

(function () {
  Polymer({
    isReady: false,
    isMuted: false,
    isEnabled: false,
    mediaConstraints: {
      audio : true,
      video : {
        mandatory : {
          maxWidth: 320,
          maxHeight: 240,
          maxFrameRate : 15,
          minFrameRate : 15
        }
      }
    },
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
        this.$.localVideo, function (sdpOffer) {

          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {

            kurentoClient.create('MediaPipeline', that.cancelOnError(function(error, pipeline) {

              pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtc){
                that.sendMessage({action: 'registerMaster', endpointId: webRtc.id});

                sdpOffer = that.setBandwidth(sdpOffer);

                webRtc.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
                  that.toggleBroadcast();
                  that.webRtcPeer.processSdpAnswer(sdpAnswer);
                  that.isReady = true;
                }));
              }));
            }));
          }));
        }, this.onError, this.mediaConstraints);
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
