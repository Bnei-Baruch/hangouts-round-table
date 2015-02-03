'use strict';

(function () {
  Polymer({
    ready: function() {
      for (var key in window.bowser) {
        this[key] = window.bowser[key];
      }
    }
  });

})();
