'use strict';

(function () {
  Polymer({
    maxParticipantsNumber: 0,
    create: function () {
      this.tables = {};
    },
    ready: function () {
    },
    update: function (e, message) {
      if (message.participants.length > this.maxParticipantsNumber) {
        this.maxParticipantsNumber = message.participants.length;
      }

      if (!(message.tableId in this.tables)) {
        this.tables[message.tableId] = {
          id: message.tableId,
          participants: {}
        };
      }

      var table = this.tables[message.tableId];
      this.timestamp = new Date().getTime();

      message.timestamp = this.timestamp;
      message.videoColor = 'rgb(' + message.averageVideoColor.join(',') + ')';
      table.participants[message.participantId] = message;

      for (var index in message.participants) {
        var participant = message.participants[index];
        participant.timestamp = this.timestamp;
        if (!(participant.participantId in table.participants)) {
          table.participants[participant.participantId] = participant;
        }
      }
    }
  });
})();
