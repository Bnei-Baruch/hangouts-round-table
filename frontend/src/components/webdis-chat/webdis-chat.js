'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default',
      isAdmin: false,
    },
    ready: function () {
      var l = document.createElement("a");
      l.href = this.$.config.frontendUrl;
      this.hostname = l.hostname;
    }
  });

})();
