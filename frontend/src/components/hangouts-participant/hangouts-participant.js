'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      var updateLiveId = function (id) {
        that.updateLiveId(id);
      };

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          gapi.hangout.onair.onYouTubeLiveIdReady.add(updateLiveId);
          gapi.hangout.layout.setChatPaneVisible(false);
          // that.initOverlay();
          gapi.hangout.onApiReady.remove(initHangouts);
          gapi.hangout.av.setLocalParticipantVideoMirrored(false);
          that.initOverlay();
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);

      var initOverlay = function () {
        that.initOverlay();
      };

      gapi.hangout.onParticipantsChanged.add(initOverlay);
    },
    initWS: function() {
      this.wsInited = true;
      this.sendLiveId();
    },
    updateLiveId: function(id) {
      this.liveId = id;
      this.sendLiveId();
    },
    sendLiveId: function() {
      var that = this;

      if (this.wsInited && this.liveId) {
        that.$.signaling.sendMessage({
          action: 'update-live-id',
          id: that.liveId
        });
      }
    },
    initOverlay: function () {
      var that = this;
      var ids = this.getParticipantsIds();

      ids.forEach(function (id, index) {
        var imagePath = that.$.config.numbersImagePath.replace('{}', index + 1);
        gapi.hangout.av.setAvatar(id, that.$.config.frontendUrl + imagePath);
      });
    },
    mute: function () {
      gapi.hangout.av.setMicrophoneMute(true);
    },
    hide: function () {
      gapi.hangout.hideApp();
    },
    getParticipantsIds: function () {
      var hangoutParticipants = gapi.hangout.getParticipants();
      var participantIds = [];

      hangoutParticipants.forEach(function (participant) {
        participantIds.push(participant.id);
      });

      participantIds.sort();

      return participantIds;
    }
  });

})();
