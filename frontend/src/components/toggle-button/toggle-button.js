/* jshint strict:false */

(function () {
  Polymer({
    ready: function () {
      this.labelReleased = this.labelReleased || this.innerHTML;
    },
    downAction: function () {
      this.super();
      if (this.active) {
        this.innerHTML = this.labelPressed;
      } else {
        this.innerHTML = this.labelReleased;
      }
    }
  });

})();
