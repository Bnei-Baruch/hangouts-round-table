'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default'
    },
    created: function () {
    },
    ready: function() {
      var that = this;
      function refreshTables() {
        that.$.getTables.go();
      }
      refreshTables();
      setInterval(refreshTables, 10000);
    },
    select: function () {
    },
    setTables: function (e) {
      var that = this;
      that.tables = e.detail.response;
      console.log(that.tables);
    }
  });

})();
