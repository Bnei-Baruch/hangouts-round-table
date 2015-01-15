/* jshint strict:false */

(function () {
  Polymer({
    isEnabledChanged: function () {
      this.super();

      this.$.signaling.sendMessage({
        action: this.isEnabled ? 'master-resumed': 'master-paused'
      });
    },
  });

})();
