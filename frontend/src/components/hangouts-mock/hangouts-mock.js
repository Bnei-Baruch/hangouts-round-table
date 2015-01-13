'use strict';

// This javascript mocks the hangout API. (https://developers.google.com/+/hangouts/api/)
// To test components with hangouts API just include this javascript in the demo page.

(function () {
  var participants = [
    { id: 1, person: { displayName: "Fake Participant 1" } },
    { id: 2, person: { displayName: "Fake Participant 2" } },
    { id: 3, person: { displayName: "Fake Participant 3" } }
  ];

  window.gapi = {};

  window.gapi.hangout = {
    getHangoutUrl: function() {
      return "http://this.is.mock.url/hangouts.id";
    },
    onApiReady: {
      add: function(func) {
        console.debug('Add to onApiReady: ' + func.toString());
        func({ isApiReady: true });
      },
      remove: function(func) {
        console.debug('Remove from onApiReady: ' + func.toString());
      }
    },
    getParticipants: function() {
      return participants;
    },
    getEnabledParticipants: function() {
      return participants;
    },
    getHangoutId: function () {
      return 'fake-hangout-id';
    },
    getLocalParticipantId: function() {
      return 1;
    },
    getLocalParticipant: function () {
      return {
        id: 1,
        person: {
          displayName: "Fake Participant 1"
        }
      };
    }
  };

  window.gadgets = {};

  window.gadgets.views = {
    getParams: function() {
      return {
        appData: '{"language": "en", "space": "default"}'
      };
    }
  };
})();
