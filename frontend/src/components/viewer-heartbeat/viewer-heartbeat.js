'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      this.viewer = this.parentNode.querySelector(this.viewerSelector);

      var sendHeartbeat = function() {
        that.sendHeartbeat();
      };

      setInterval(sendHeartbeat, this.$.config.sendHeartbeatInterval);
    },
    sendHeartbeat: function () {
      var message = {
        soundLevel: this.getSoundLevel()
      };

      // this.viewer.sendMessage();
    },
    getSoundLevel: function () {
      if (!this.audioContext) {
        this.audioContext = new window.webkitAudioContext() || window.AudioContext();
        this.source = this.audioContext.createMediaElementSource(this.viewer.webRtcPeer.remoteVideo);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.9;
        this.analyser.fftSize = 512;
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
      }


      this.array = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(this.array);

      var average = 0;
      for(var index in this.array) {
        average += parseFloat(this.array[index]);
      }

      average = average/this.array.length;
      console.log(average);
    },
    getPeerConnectionStats: function () {
      this.viewer.webRtcPeer.pc.getStats(function (connStats){
        console.log(connStats);
        // var rtcStatsReports = connStats.result();
        // console.log(rtcStatsReports);

        // rtcStatsReports[7].names()
        //
        // var googCurrentDelayMs = rtcStatsReports[7].stat('googCurrentDelayMs')
        // console.log(googCurrentDelayMs)
      });
    }

  });
})();
