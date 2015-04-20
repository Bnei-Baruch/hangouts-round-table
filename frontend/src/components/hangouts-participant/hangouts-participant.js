'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          gapi.hangout.layout.setChatPaneVisible(false);
          that.initOverlay();
          gapi.hangout.onApiReady.remove(initHangouts);
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);
    },
    initOverlay: function () {
      var participantNumber = this.getParticipantNumber();

      if (participantNumber > 0) {
        var imagePath = this.$.config.numbersImagePath.replace('{}', participantNumber);

        var resource = gapi.hangout.av.effects.createImageResource(
          this.$.config.frontendUrl + imagePath);

        resource.showOverlay({
          position: {
            x: 0.0,
            y: 0.4
          }
        });
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

      return participantIds.indexOf(localParticipantId) + 1;
    }
  });

})();
