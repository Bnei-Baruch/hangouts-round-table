'use strict';

(function () {
  Polymer({
    ready: function () {
      var that = this;

      this.viewer = this.parentNode.querySelector('#' + this.viewerId);

      this.snapshotContext = this.$.videoSnapshot.getContext('2d');

      var sendHeartbeat = function() {
        that.sendHeartbeat();
      };

      setInterval(sendHeartbeat, this.$.config.sendHeartbeatInterval);
    },
    sendHeartbeat: function () {
      var participant = gapi.hangout.getLocalParticipant();

      var urlArray = gapi.hangout.getHangoutUrl().split('/');
      var tableId = urlArray[urlArray.length - 1];

      var message = {
        action: 'update-heartbeat',
        channel: 'update-heartbeat',
        tableId: tableId,
        participantId: participant.person.id,
        participantName: participant.person.displayName,
        averageVideoColor: this.getAverageVideoColor(),
        soundLevel: null, // TBD: this.getSoundLevel(),
        browser: window.bowser,
        participants: this.getParticipants()
      };

      this.$.signaling.sendMessage(message);
    },
    getAverageVideoColor: function () {
      if (!this.viewer) {
        return null;
      }

      var video = this.viewer.getVideoElement();

      this.snapshotContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      var result;

      if (video.paused) {
        result = null;
      } else {
        var averageColor = {r: 0, g: 0, b: 0};

        var imageData = this.snapshotContext.getImageData(0, 0, video.videoWidth, video.videoHeight).data;

        for (var index = 0; index < imageData.length; index += 4) {
          averageColor.r += imageData[index];
          averageColor.g += imageData[index + 1];
          averageColor.b += imageData[index + 2];
        }

        var total = imageData.length / 4;
        result = [Math.floor(averageColor.r / total),
               Math.floor(averageColor.g / total),
               Math.floor(averageColor.b / total)];
      }

      return result;
    },
    getSoundLevel: function () {
      if (!this.audioContext) {
        var AC = window.webkitAudioContext || window.AudioContext;
        this.audioContext = new AC();

        this.source = this.audioContext.createMediaElementSource(this.viewer.getVideoElement());
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

      return average;
    },
    getParticipants: function () {
      var result = [];
      var hangoutParticipants = gapi.hangout.getParticipants();

      for (var index in hangoutParticipants) {
        var hangoutParticipant = hangoutParticipants[index];
        if (hangoutParticipant.person) {
          result.push({
            participantId: hangoutParticipant.person.id,
            participantName: hangoutParticipant.person.displayName
          });
        }
      }

      return result;
    }

  });
})();
