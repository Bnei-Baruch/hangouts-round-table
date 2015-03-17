'use strict';

(function () {
  Polymer({
    logout: function () {
      this.$.user.logout();
      window.location.reload();
    }
  });
})();
