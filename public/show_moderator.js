// This library enables to connect licode moderator video and audio to hangouts.

// TODO: Add option to pass sound/video to mobile devices.
/**
  * Get video URI
  */
function getVideoURI(stream) {
  //$('video').prop('src');
  var myURL = window.URL || webkitURL;
  var stream_url = myURL.createObjectURL(stream);
}

/**
 * Create required DOM elements and listeners.
 */
function prepareAppDOM() {
  container_ = $('<div />').attr('id', 'js-local-video');
  var body = $('body');
  body.append(container_);
}

/**
 * Gets licode token to connect to WebRTC
 */
function getToken(callback) {
  $.ajax({
    type: "POST",
    cache: false,
    url: "https://galaxy-trial.socio2.net/api/tokens",
    data: JSON.stringify({user: 'kolmanv'}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) { callback(data); },
    error: function(xhr, status, errorThrown) { alert(errorThrown + '\n' + status + '\n' + xhr.statusText); } 
  });
}

/**
 * Connect to licode and get start video
 */
function connect() {
  var participantID = 'virtual-group';

  getToken(function(data) {
    console.log("Got token", data.token);

    room = Erizo.Room(data);

    room.addEventListener("room-connected", function (roomEvent) {
        subscribeBroadcasterStream(roomEvent.streams);
    });

    room.addEventListener('stream-added', function (streamEvent) {
        subscribeBroadcasterStream([streamEvent.stream]);
    });

    room.addEventListener('stream-subscribed', function (streamEvent) {
        var stream = streamEvent.stream;
        if (stream.getAttributes().role == 'broadcaster') {
            stream.play('js-local-video');
        }
    });

    function subscribeBroadcasterStream(streams) {
        for (var index in streams) {
            var stream = streams[index];
            if (stream.getAttributes().role == 'broadcaster') {
                //room.subscribe(stream);
                room.subscribe(stream, {audio: true, video: false});
            }
        }
    }

    room.connect();
  });
}

(function() {
  if (gapi && gapi.hangout) {

    var initHangout = function(apiInitEvent) {
      if (apiInitEvent.isApiReady) {
        prepareAppDOM();
        connect();

        gapi.hangout.onApiReady.remove(initHangout);
      }
    };

    gapi.hangout.onApiReady.add(initHangout);
  }
})();

