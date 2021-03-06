'use strict';

// This javascript mocks the hangout API. (https://developers.google.com/+/hangouts/api/)
// To test components with hangouts API just include this javascript in the demo page.

(function () {
  var participants = [
    { id: 1, person: { id: 1, displayName: "Fake Participant 1" } },
    { id: 2, person: { id: 2, displayName: "Fake Participant 2" } },
    { id: 3, person: { id: 3, displayName: "Fake Participant 3" } }
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
    onParticipantsChanged: {
      add: function(func) {
        console.debug('gapi.hangout.onParticipantsChanged.add(' + func + ') mock called');
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
          id: 1,
          displayName: "Fake Participant 1"
        }
      };
    },
    layout: {
      setChatPaneVisible: function () {
        console.debug("gapi.hangout.setChatPaneVisible() mock called");
      }
    },
    av: {
      setLocalParticipantVideoMirrored: function(value) {
        console.debug("gapi.hangout.av.setLocalParticipantVideoMirrored(" + value + ") mock called");
      },
      setAvatar: function(id, url) {
        console.debug("gapi.hangout.av.setAvatar(" + id + ", " + url + ") mock called");
      },
      effects: {
        createImageResource: function () {
          console.debug("gapi.hangout.av.effects.createImageResource() mock called");

          return {
            createOverlay: function () {
              console.debug("gapi.hangout.av.effects.createOverlay() mock called");
            }
          };
        }
      }
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
