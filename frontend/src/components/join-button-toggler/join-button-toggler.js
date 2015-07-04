'use strict';

(function () {
  Polymer({
    subscribe: function () {
      this.$.signaling.sendMessage({
        action: 'subscribe',
        channel: 'instructor-status'
      });
    },
    toggle: function (event) {
      var message = event.detail;
      if (this.onToggle) {
        var enabled = ['broadcasting', 'paused'].indexOf(message.status) !== -1;
        var handler = window[this.onToggle];
        handler(enabled);
      }
    }
  });

})();
