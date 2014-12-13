'use strict';

(function () {
  Polymer({
    isReady: false,
    isMuted: false,
    isOnHold: false,
    initKurento: function () {
      var that = this;

      this.webRtcPeer = kurentoUtils.WebRtcPeer.startSendOnly(
        this.$.localVideo, function (sdpOffer) {
          console.log('Media accepted');

          kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {
            console.log('Client initialized');

            kurentoClient.create('MediaPipeline', that.cancelOnError(function(error, pipeline) {
              console.log('Pipeline created');

              pipeline.create('WebRtcEndpoint', that.cancelOnError(function(error, webRtc){
                console.log('Endpoint created');
                that.sendMessage({action: 'registerMaster', endpointId: webRtc.id});

                webRtc.processOffer(sdpOffer, that.cancelOnError(function(error, sdpAnswer){
                  that.toggleBroadcast(false);
                  that.webRtcPeer.processSdpAnswer(sdpAnswer);
                  that.isReady = true;
                }));
              }));
            }));
          }));
        }, this.onError);
    },
    isOnHoldChanged: function () {
      this.toggleBroadcast(!this.isOnHold);
    },
    isMutedChanged: function () {
      var audioTracks = this.webRtcPeer.stream.getAudioTracks();
      audioTracks[0].enabled = !(this.isMuted || this.isOnHold);
    },
    toggleBroadcast: function (enabled) {
      var tracks = this.webRtcPeer.stream.getTracks();
      for (var trackIndex in tracks) {
        var track = tracks[trackIndex];

        if (track.kind === 'audio') {
          track.enabled = !this.isMuted && enabled;
        } else {
          track.enabled = enabled;
        }
      }
    }
  });

})();
