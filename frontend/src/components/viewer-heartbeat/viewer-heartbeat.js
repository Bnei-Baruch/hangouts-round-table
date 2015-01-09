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
        action: 'update-heartbeat',
        participantId: '',
        soundLevel: this.getSoundLevel()
      };

      // this.viewer.sendMessage();
    },
    getAverageVideoColor: function () {
    },
    getSoundLevel: function () {
      if (!this.audioContext) {
        var AC = window.webkitAudioContext || window.AudioContext;
        this.audioContext = new AC();

        console.log('video', this.viewer.webRtcPeer.remoteVideo);
        this.source = this.audioContext.createMediaElementSource(this.viewer.webRtcPeer.remoteVideo);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.3;
        this.analyser.fftSize = 1024;
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
