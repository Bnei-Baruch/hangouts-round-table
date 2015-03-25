'use strict';

(function () {
  Polymer({
    publish: {
      space: 'default',
      language: 'he'
    },
    ready: function () {
      var that = this;

      this.mediaObjectsToRelease = [];
      window.onbeforeunload = function () {
        that.shutdown();
      };
    },
    initKurento: function () {
    },
    setBandwidth: function (sdp) {
      var audioBw = this.$.config.audioConstraints.maxBitrate;
      sdp = sdp.replace(/a=mid:audio\r\n/g, 'a=mid:audio\r\nb=AS:' + audioBw + '\r\n');

      var videoBw = this.$.config.videoConstraints.maxBitrate;
      sdp = sdp.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + videoBw + '\r\n');

      return sdp;
    },
    cancelOnError: function(func) {
      var that = this;

      return function () {
        var error = arguments[0];
        if (error) {
          that.onError(error);
        } else {
          func.apply(this, arguments);
        }
      };
    },
    onError: function (error) {
      console.error(error);
    },
    registerForRelease: function (mediaObject) {
      this.mediaObjectsToRelease.push(mediaObject);
    },
    shutdown: function () {
      if (this.webRtcPeer) {
        this.webRtcPeer.dispose();
        this.webRtcPeer = null;
      }

      this.mediaObjectsToRelease.forEach(function (mediaObject) {
        if (mediaObject) {
          mediaObject.release();
        }
      });
    }
  });

})();
