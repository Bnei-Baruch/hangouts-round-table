/* jshint strict:false */

(function () {
  Polymer({
    ready: function () {
      this.labelReleased = this.labelReleased || this.textContent;
    },
    activeChanged: function () {
      if (this.active) {
        this.textContent = this.labelPressed;
      } else {
        this.textContent = this.labelReleased;
      }
    }
  });

})();
