'use strict';

(function () {
  Polymer({
    language: null,
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
      that.job('job', function () {
        that.$.languageSelector.value = that.defaultLanguage;
      });
    },
    selectLanguage: function(e, sel, target) {
      this.language = target.value;
    }
  });

})();
