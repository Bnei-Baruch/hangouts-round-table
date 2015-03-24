/* jshint strict:false */

(function () {
  Polymer({
    shutdown: function () {
      this.super();

      if (this.httpEndpoint) {
        this.httpEndpoint.release();
      }
    },
    initKurento: function () {
      var that = this;

      this.shutdown();

      kurentoClient(that.$.config.kurentoWsUri, that.cancelOnError(function(error, kurentoClient) {
        that.kurentoClient = kurentoClient;

        kurentoClient.getMediaobjectById(that.webRtcEndpointId, that.cancelOnError(function(error, webRtcEndpoint) {

          webRtcEndpoint.getMediaPipeline(that.cancelOnError(function(error, pipeline) {
            that.createHttpEndpoint(webRtcEndpoint, pipeline);
          }));

        }));
      }));
    },
    createHttpEndpoint: function (webRtcEndpoint, pipeline) {
      var that = this;

      pipeline.create('HttpGetEndpoint', that.cancelOnError(function(error, httpEndpoint){
        that.httpEndpoint = httpEndpoint;
        webRtcEndpoint.connect(httpEndpoint);
        httpEndpoint.getUrl(that.cancelOnError(function (error, url) {
          that.$.mediaElement.src = url;
        }));
      }));
    }
  });

})();
