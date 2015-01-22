'use strict';

(function () {
  Polymer({
    maxParticipantsNumber: 0,
    create: function () {
    },
    ready: function () {
      var that = this;

      this.tables = [];
      this.tablesMap = {};

      var refresh = function() {
        that.refresh();
      };

      setInterval(refresh, this.$.config.dashboardRefreshInterval);
    },
    register: function() {
      this.$.signaling.sendMessage({'action': 'subscribe', 'channel': 'update-heartbeat'});
    },
    refresh: function() {
      this.timestamp = new Date().getTime();

      this.tables = [];
      for (var tableId in this.tablesMap) {
        var table = this.tablesMap[tableId];

        if (this.timestamp - table.timestamp <= 10 * this.$.config.updateTableInterval) {
          table.participantsArray = [];
          for (var participantId in table.participants) {
            table.participantsArray.push(table.participants[participantId]);
          }
          table.participantsArray.sort(function(a, b) {
            if (a.participantName < b.participantName) {
              return -1;
            } else {
              return Number(a.participantName > b.participantName);
            }
          });

          this.tables.push(table);
        }
      }
    },
    update: function (e, message) {
      this.timestamp = new Date().getTime();

      if (message.participants.length > this.maxParticipantsNumber) {
        this.maxParticipantsNumber = message.participants.length;
      }

      if (!(message.tableId in this.tablesMap)) {
        this.tablesMap[message.tableId] = {
          id: message.tableId,
          space: message.space,
          language: message.language,
          participants: {}
        };
      }

      var table = this.tablesMap[message.tableId];
      table.timestamp = this.timestamp;

      // Validate all users have the same language and space as the table.
      if (message.language !== table.language) {
        console.error('Wrong language, table:', table.language, 'participant:', message.language);
      }
      if (message.space !== table.space) {
        console.error('Wrong space, table:', table.space, 'participant:', message.space);
      }

      message.timestamp = this.timestamp;
      message.videoColor = '#fff';
      if (message.averageVideoColor) {
        message.videoColor = 'rgb(' + message.averageVideoColor.join(',') + ')';
      }
      table.participants[message.participantId] = message;

      for (var index in message.participants) {
        var participant = message.participants[index];
        if (!(participant.participantId in table.participants)) {
          table.participants[participant.participantId] = participant;
        }
      }
    }
  });
})();
