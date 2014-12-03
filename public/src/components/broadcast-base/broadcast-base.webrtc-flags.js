'use strict';

/* Applies undocumented WebRTC setting to webkitRTCPeerConnection */

(function () {
  if (window.webkitRTCPeerConnection !== undefined) {

    var OrigPeerConnection = window.webkitRTCPeerConnection;

    window.webkitRTCPeerConnection = function (configuration) {
      var customConstraints = {
        mandatory: {
          DtlsSrtpKeyAgreement: true,
          RtpDataChannels: true
        },
        optional: [
          {googSkipEncodingUnusedStreams: true},
          {googImprovedWifiBwe: true},
          {googHighBitrate: true},
          {googVeryHighBitrate: true}
        ]
      };
      return new OrigPeerConnection(configuration, customConstraints);
    };
  }
})();
