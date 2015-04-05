/* jshint strict:false */

(function () {
  Polymer({
    muteInstructor: function () {
      this.$.instructor.toggleAudio(false);
    },
    unmuteInstructor: function (e, message) {
      if (message.language === this.language) {
        this.$.instructor.toggleAudio(true);
      }
    },
    getVideoElement: function () {
      return this.$.instructor.shadowRoot.querySelector('#mediaElement');
    }
  });

})();
