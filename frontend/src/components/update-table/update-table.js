'use strict';

(function () {
  Polymer({
    isReady: false,
    ready: function () {
      var that = this;

      this.fetchUrlParams();

      var initHangouts = function (apiInitEvent) {
        if (apiInitEvent.isApiReady) {
          that.startUpdatingTable();
          that.displayName = gapi.hangout.getLocalParticipant().person.displayName;
          that.isReady = true;
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
      console.debug("App data:", this.appData);
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

      // TODO: Uncomment when update bug is fixed.
      // We comment the following logic to force all users to update
      // the table.
      // var localParticipantId = gapi.hangout.getLocalParticipantId();
      // var participants = gapi.hangout.getEnabledParticipants();
      //
      // for (var index in participants) {
      //   var participant = participants[index];
      //
      //   if (participant.id < localParticipantId) {
      //     updateRequired = false;
      //     break;
      //   }
      // }

      if (updateRequired) {
        this.$.updateTable.body = this.getParticipantsJSON();
        this.$.updateTable.go();
      }
    },
    getParticipantsJSON: function () {
      var result = {
        participants: []
      };
      for (var key in this.appData) {
        result[key] = this.appData[key];
      }

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
