'use strict';

(function () {
  Polymer({
    create: function () {
      var urlArray = gapi.hangout.getHangoutUrl().split('/');
      this.tableId = urlArray[urlArray.length - 1];

      var appData = gadgets.views.getParams().appData;
      this.appData = JSON.parse(appData);
    },
    ready: function () {
      var that = this;

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          that.startUpdatingTable();
          gapi.hangout.onApiReady.remove(initHangouts);
        }
      };
      gapi.hangout.onApiReady.add(initHangouts);
    },
    startUpdatingTable: function () {
      setInterval(this.updateIfRequired, this.$.config.updateTableInterval);
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
      var participants = [];

      var hangoutParticipants = gapi.hangout.getParticipants();
      for (var index in hangoutParticipants) {
        var hangoutParticipant = hangoutParticipants[index];
        if (hangoutParticipant.person) {
          participants.push(hangoutParticipant.person.displayName);
        }
      }
      return JSON.stringify(participants);
    }
  });
})();
