'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default'
    },
    created: function () {
      function refreshTables() {
        document.querySelector("#getTables").go();
      }
      setTimeout(refreshTables, 10000);
    },
    ready: function() {
    },
    select: function () {
    },
    setTables: function (e) {
      var that = this;
      that.tables = e.detail.response.tables;
    }
  });

})();
