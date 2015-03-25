/* jshint strict:false */

(function () {
  Polymer({
    ready: function () {
      this.super();

      var spaceConfig = this.$.config.spaces[this.space];

      if (spaceConfig) {
        this.recordingUri = spaceConfig.recordingUri;
      } else {
        this.recordingUri = null;
      }

      var videoConstraints = this.$.config.videoConstraints;

      this.mediaConstraints = {
        audio : true,
        video : {
          mandatory : {
            maxWidth: videoConstraints.maxWidth,
            maxHeight: videoConstraints.maxHeight,
            minFrameRate : videoConstraints.minFrameRate,
            maxFrameRate : videoConstraints.maxFrameRate
          }
        }
      };
    },
    isEnabledChanged: function () {
      this.super();

      this.$.signaling.sendMessage({
        'action': this.isEnabled ? 'instructor-resumed': 'instructor-paused',
        'language': this.language,
        'role': this.role
      });
    },
    shutdown: function () {
      this.super();

      if (this.$.recorder) {
        this.$.recorder.stop();
      }
    }
  });

})();
