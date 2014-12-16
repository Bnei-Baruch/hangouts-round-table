'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      this.fetchUrlParams();
      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          that.startUpdatingTable();
          gapi.hangout.onApiReady.remove(initHangouts);
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);
    },
    fetchUrlParams: function () {
      var urlArray = gapi.hangout.getHangoutUrl().split('/');
      this.tableId = urlArray[urlArray.length - 1];

      var appData = gadgets.views.getParams().appData;
      this.appData = JSON.parse(appData);
    },
    startUpdatingTable: function () {
      var that = this;
      var updateIfRequired = function () {
        that.updateIfRequired();
      };
      setInterval(updateIfRequired, this.$.config.updateTableInterval);
    },
    updateIfRequired: function () {
      var updateRequired = true;

      var localParticipantId = gapi.hangout.getLocalParticipantId();
      var participants = gapi.hangout.getEnabledParticipants();

      for (var index in participants) {
        var participant = participants[index];

        if (participant.id < localParticipantId) {
          updateRequired = false;
          break;
        }
      }

      if (updateRequired) {
        this.$.updateTable.body = this.getParticipantsJSON();
        this.$.updateTable.go();
      }
    },
    getParticipantsJSON: function () {
      var result = {
        language: this.appData.language,
        participants: []
      };

      var hangoutParticipants = gapi.hangout.getParticipants();
      for (var index in hangoutParticipants) {
        var hangoutParticipant = hangoutParticipants[index];
        if (hangoutParticipant.person) {
          result.participants.push(hangoutParticipant.person.displayName);
        }
      }
      return JSON.stringify(result);
    }
  });
})();
