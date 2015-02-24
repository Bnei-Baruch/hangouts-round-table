'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default'
    },
    ready: function() {
      var that = this;
      function refreshLanguages() {
        that.$.getLanguages.go();
      }
      refreshLanguages();
      setInterval(refreshLanguages, 10000);
    },
    setLanguages: function (e) {
      var that = this;
      that.languages = e.detail.response;
    }
  });

})();
