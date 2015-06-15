'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          gapi.hangout.onApiReady.remove(initHangouts);

          that.bindHangoutHandlers();

          gapi.hangout.layout.setChatPaneVisible(false);
          gapi.hangout.av.setLocalParticipantVideoMirrored(false);

          that.initOverlay();
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);

    },
    bindHangoutHandlers: function () {
      var that = this;

      gapi.hangout.onParticipantsChanged.add(function () {
        that.initOverlay();
      });

      gapi.hangout.onair.onYouTubeLiveIdReady.add(function (e) {
        that.updateLiveId(e);
      });
    },
    initWebsocket: function() {
      this.isWsReady = true;
      this.sendLiveId();
    },
    updateLiveId: function(e) {
      this.liveId = e.youTubeLiveId;
      this.sendLiveId();
    },
    sendLiveId: function() {
      var that = this;

      if (that.isWsReady && that.liveId) {
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
