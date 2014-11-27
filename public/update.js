var handle_error = function(err) {
  // Uncomment for debuging XHR (ajax). 
  // alert(err);
};

// Update the table via backend call
function update_table(space, id, participants, callback) {
  $.ajax({
    type: "PUT",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(participants),
    dataType: "json",
    error: function(xhr, status, errorThrown) {
        console.log('XHR Error:'+errorThrown+'\n'+status+'\n'+xhr.statusText);
    },
    success: function(data) {
        console.log('Success:' + data);
    },
    url: location.protocol + "//bbworkshop.kbb1.com/round_table/backend/spaces/" + space + "/tables/" + id
  });
}

function get_id() {
  var url_arr = gapi.hangout.getHangoutUrl().split("/");
  return url_arr[url_arr.length - 1];
}

function get_participants() {
  var ret = new Object();
  ret.id = get_id();
  ret.lang = "en";
  ret.space = get_space();
  ret.participants = new Array();
  var participants = gapi.hangout.getParticipants();
  for (var index in participants) {
    var participant = participants[index];
    if (participant.person) {
      ret.participants.push(participant.person.displayName);
    }
  }
  return ret;
}

function get_space() {
  var space = gadgets.views.getParams()['appData'];
  space = $('<div/>').html(space).text();
  if (!space) {
    space = 'default';
  }
  return space;
}

// Make sure only one participant updated the table data.
function only_one_update() {
  var participants = gapi.hangout.getEnabledParticipants();
  var local_participant_id = gapi.hangout.getLocalParticipantId();
  var should_update = true;
  for (var index in participants) {
    var participant = participants[index];
    if (participant.id < local_participant_id) {
      should_update = false;
      break;
    } 
  }
  if (should_update) {
    update_table(get_space(), get_id(), get_participants());
  }
}

function start_table_update() {
  setInterval(function() { only_one_update(); }, 10000);
}

(function() {
  if (gapi && gapi.hangout) {

    var initHangout = function(apiInitEvent) {
      if (apiInitEvent.isApiReady) {
        start_table_update();

        gapi.hangout.onApiReady.remove(initHangout);
      }
    };

    gapi.hangout.onApiReady.add(initHangout);
  }
})();
