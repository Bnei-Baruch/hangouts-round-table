'use strict';

// This javascript mocks the hangout API. (https://developers.google.com/+/hangouts/api/)
// To test components with hangouts API just include this javascript in the demo page.

window.gapi = {
  hangout: {
    getHangoutUrl: function() { return "http://this.is.mock.url/hangouts.id"; },
    onApiReady: {
      add: function(func) {
        console.log('Add to onApiReady: ' + func.toString());
        func({ isApiReady: true });
      },
      remove: function(func) {
        console.log('Remove from onApiReady: ' + func.toString());
      }
    },
    getLocalParticipantId: function() {
      return 1;
    },
    getParticipants: function() {
      return [
       { id: 1, person: { displayName: "1" } },
       { id: 2, person: { displayName: "2" } },
       { id: 3, person: { displayName: "3" } },
      ];
    },
    getEnabledParticipants: function() {
      return [
       { id: 1, person: { displayName: "1" } },
       { id: 2, person: { displayName: "2" } },
       { id: 3, person: { displayName: "3" } },
      ];
    }
  }
};

window.gadgets = {
  views: {
    getParams: function() {
      return {
        appData: '{"language": "en", "space": "default"}'
      };
    }
  }
};
