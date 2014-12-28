'use strict';

(function () {
  Polymer({
    ready: function () {
      this.$.loginModal.toggle();
    },
    handleResponse: function (p1, p2) {
      console.debug(p1, p2);
    },
  });
})();
