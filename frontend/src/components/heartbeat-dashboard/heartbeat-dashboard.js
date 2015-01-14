'use strict';

(function () {
  Polymer({
    maxParticipantsNumber: 0,
    create: function () {
      this.tables = {};
    },
    update: function (e, message) {
      if (message.participants.length > this.maxParticipantsNumber) {
        this.maxParticipantsNumber = message.participants.length;
      }

      if (!(message.tableId in this.tables)) {
        this.tables[message.tableId] = {
          participants:4
        }
      }
    }
  });
})();
