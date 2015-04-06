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
      var participantIndex = this.getParticipantIndex();

      if (participantIndex !== -1) {
        var resource = gapi.hangout.av.effects.createImageResource(
          this.$.config.numbersImageUrl,
            [{
              left: participantIndex * 64,
              top: 0,
              width: 64,
              height: 64
            }]
          );
        resource.createOverlay();
      }
    },
    mute: function () {
      gapi.hangout.av.setMicrophoneMute(true);
    },
    hide: function () {
      gapi.hangout.hideApp();
    },
    getParticipantIndex: function () {
      var localParticipantId = gapi.hangout.getLocalParticipant().id;

      var hangoutParticipants = gapi.hangout.getParticipants();
      var participantIds = [];

      hangoutParticipants.forEach(function (participant) {
        participantIds.push(participant.id);
      });

      return participantIds.indexOf(localParticipantId);
    }
  });

})();
