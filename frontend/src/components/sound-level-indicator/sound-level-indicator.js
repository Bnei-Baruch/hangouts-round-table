'use strict';

(function () {
  Polymer({
    streamChanged: function () {
      var AC = window.webkitAudioContext || window.AudioContext;
      var audioContext = new AC();
      var source = audioContext.createMediaStreamSource(this.stream);
      var analyser = audioContext.createAnalyser();
      var scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.3;
      analyser.fftSize = 1024;

      source.connect(analyser);
      analyser.connect(scriptNode);
      scriptNode.connect(audioContext.destination);

      var that = this;
      scriptNode.onaudioprocess = function() {
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;

        var length = array.length;
        for (var i = 0; i < length; i++) {
          values += array[i];
        }

        var average = values / length;
        that.value = average;
      };
    }
  });

})();

