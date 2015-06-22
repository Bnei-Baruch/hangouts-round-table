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
        that.updateParticipantsNumbers();
      });

      gapi.hangout.data.onStateChanged.add(function() {
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
      var state = gapi.hangout.data.getState();

      for (var id in state) {
        if (state.hasOwnProperty(id)) {
          var index = state[id];
          var imagePath = that.$.config.numbersImagePath.replace('{}', index);
          gapi.hangout.av.setAvatar(id, that.$.config.frontendUrl + imagePath);
        }
      }
    },
    mute: function () {
      gapi.hangout.av.setMicrophoneMute(true);
    },
    hide: function () {
      gapi.hangout.hideApp();
    },
    updateParticipantsNumbers: function() {
      if (this.shouldIUpdate()) {
        var ids = this.getParticipantsIds();
        var state = gapi.hangout.data.getState();
        var keysToRemove = [];

        // Free numbers
        for (var key in state) {
          if (state.hasOwnProperty(key)) {
            if (ids.indexOf(key) === -1) {
              delete state[key];
              keysToRemove.push(key);
            }
          }
        }

        // Assign new numbers
        ids.forEach(function(id) {
          if (state[id] === undefined) {
            var freeNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            for (var key in state) {
              if (state.hasOwnProperty(key)) {
                var value = state[key];
                var index = freeNumbers.indexOf(value);
                if (index !== -1) {
                  freeNumbers.splice(index, 1);
                }
              }
            }
            state[id] = freeNumbers[0];
          }
        });

        gapi.hangout.data.submitDelta(state, keysToRemove);
      }
    },
    shouldIUpdate: function() {
      var hangoutParticipants = gapi.hangout.getEnabledParticipants();
      var minId = null;
      hangoutParticipants.forEach(function (participant) {
        if (minId === null || participant.id < minId) {
          minId = participant.id;
        }
      });
      return gapi.hangout.getLocalParticipantId() === minId;
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
