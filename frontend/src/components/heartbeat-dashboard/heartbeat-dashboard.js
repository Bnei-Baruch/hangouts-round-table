'use strict';

(function () {
  Polymer({
    maxParticipantsNumber: 0,
    tables: [1,2,3],
    create: function () {
    },
    ready: function () {
      this.tables = [2,3,4];
    },
    register: function() {
      this.$.signaling.sendMessage({});
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
      message.videoColor = '#000';
      if (message.averageVideoColor) {
        message.videoColor = 'rgb(' + message.averageVideoColor.join(',') + ')';
      }
      table.participants[message.participantId] = message;

      for (var index in message.participants) {
        var participant = message.participants[index];
        participant.timestamp = this.timestamp;
        if (!(participant.participantId in table.participants)) {
          table.participants[participant.participantId] = participant;
        }
      }
      this.async(function() {
        this.tables = JSON.parse(JSON.stringify(this.tables));
        console.log(this.tables);
      });
    }
  });
})();
