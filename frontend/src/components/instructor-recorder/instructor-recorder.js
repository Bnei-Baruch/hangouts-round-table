/* jshint strict:false */

(function () {
  Polymer({
    state: null,  // 'recording', 'paused', 'stopped'
    assignMasterEndpoint: function (e, message) {
      if (message.role === 'instructor' &&
        message.endpointId !== this.webRtcEndpointId) {
        console.debug("Assigning", message.role, "endpoint");
        this.webRtcEndpointId = message.endpointId;
        this.initKurento();
      }
    },
    initKurento: function () {
      var that = this;

      this.shutdown();

      kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {
        that.kurentoClient = kurentoClient;

        kurentoClient.getMediaobjectById(that.webRtcEndpointId, that.cancelOnError(function(error, webRtcEndpoint) {

          webRtcEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipeline) {
            that.createRecorderEndpoint(webRtcEndpoint, pipeline);
          }));

        }));
      }));
    },
    createRecorderEndpoint: function (webRtcEndpoint, pipeline) {
      var that = this;

      pipeline.create('RecorderEndpoint',
          {uri: this.getFileUri()},
          that.cancelOnError(function(error, recorderEndpoint){
            that.recorderEndpoint = recorderEndpoint;
            that.registerForRelease(recorderEndpoint);
            webRtcEndpoint.connect(recorderEndpoint);
      }));
    },
    getFileUri: function () {
      var time = new Date().toISOString().substring(0, 16);
      return this.recordingUri + "/" + this.space + "-" + time + ".mp4";
    },
    resume: function () {
      this.triggerRecording('record', 'recording');
    },
    pause: function () {
      this.triggerRecording('pause', 'paused');
    },
    stop: function () {
      this.triggerRecording('stop', 'stopped');
    },
    triggerRecording: function (method, state) {
      var that = this;

      this.recorderEndpoint[method](function () {
        that.state = state;
        console.debug("Recording state set to", state);
      });
    }
  });

})();
