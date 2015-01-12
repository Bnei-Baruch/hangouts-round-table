'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default',
      isAdmin: false
    },
    chatLabel: function(baseUrl, space) {
      var l = document.createElement("a");
      l.href = baseUrl;
      return l.hostname + '.' + space;
    },
    chatUrl: function(baseUrl) {
      var that = this;
      var chat_link = "//we.kab.tv"
      if (that.isAdmin) {
        chat_link += "/admin.html";
      }
      return chat_link + "?label=" + that.chatLabel(baseUrl, that.space);
    }
  });

})();
