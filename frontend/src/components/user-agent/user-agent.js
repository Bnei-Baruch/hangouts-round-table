'use strict';

(function () {
  Polymer({
    publish: {
      show: "message"
    },
    getParser: function() {
      var that = this;
      if (!that.parser) {
        that.parser = new UAParser();
        console.log(that.parser.getResult());
      }
      return that.parser;
    },
    getUserAgentMessage: function() {
      var that = this;
      var message = "You are using ";
      message += that.getParser().getBrowser().name + " " + that.getParser().getBrowser().major + " browser";
      if (that.getParser().getOS().name) {
        message += " on " + that.getParser().getOS().name + " " + that.getParser().getOS().version;
      }
      return message + ".";
    }
  });

})();
