/* jshint strict:false */

(function () {
  Polymer({
    isEnabledChanged: function () {
      this.super();

      this.sendMessage({
        action: this.isEnabled ? 'masterResumed': 'masterPaused'
      });
    },
  });

})();
