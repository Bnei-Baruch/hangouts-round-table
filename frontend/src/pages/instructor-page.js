'use strict';

(function () {
  Polymer({
    ready: function () {
    },
    setOtherInstructorStatus: function (e) {
      if (e.detail.response.status === null) {
        this.noOtherInstructorOrConfirmed = true;
      } else {
        var message = this.getConfirmationMessage(e.detail.response.status);
        this.noOtherInstructorOrConfirmed = window.confirm(message);
      }
    },
    getConfirmationMessage: function (status) {
      var statusMessage = {
        'init': "is doing nothing",
        'broadcasting': "is broadcasting",
        'paused': "is on hold"
      }[status];

      return "Another instructor is present and " +
        statusMessage + ". Do you still want to override his session?";
    }
  });
})();
