'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          gapi.hangout.layout.setChatPaneVisible(false);
          // that.initOverlay();
          gapi.hangout.onApiReady.remove(initHangouts);
          gapi.hangout.av.setLocalParticipantVideoMirrored(false);
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);

      var initOverlay = function () {
        that.initOverlay();
      };

      gapi.hangout.onEnabledParticipantsChanged.add(initOverlay);
    },
    initOverlay: function () {
      var participantNumber = this.getParticipantNumber();

      this.releaseOverlay();

      if (participantNumber > 0) {
        var imagePath = this.$.config.numbersImagePath.replace('{}', participantNumber);

        this.numberResource = gapi.hangout.av.effects.createImageResource(
          this.$.config.frontendUrl + imagePath);

        this.numberOverlay = this.numberResource.showOverlay({
          position: {
            x: 0.0,
            y: 0.3
          },
          scale: {
            magnitude: 0.2,
            reference: gapi.hangout.av.effects.ScaleReference.WIDTH
          }
        });
      }
    },
    releaseOverlay: function () {
      if (this.numberResource) {
        this.numberResource.dispose();
      }

      if (this.numberOverlay) {
        this.numberOverlay.dispose();
      }
    },
    mute: function () {
      gapi.hangout.av.setMicrophoneMute(true);
    },
    hide: function () {
      gapi.hangout.hideApp();
    },
    getParticipantNumber: function () {
      var localParticipantId = gapi.hangout.getLocalParticipant().id;

      var hangoutParticipants = gapi.hangout.getParticipants();
      var participantIds = [];

      hangoutParticipants.forEach(function (participant) {
        participantIds.push(participant.id);
      });

      participantIds.sort();

      return participantIds.indexOf(localParticipantId) + 1;
    }
  });

})();
