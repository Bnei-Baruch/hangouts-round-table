function update_server(label) {
  get_timestamp(function(time_now) {
    var value = new Object();
    var url_arr = gapi.hangout.getHangoutUrl().split("/");
    value.id = url_arr[url_arr.length - 1];
    value.lang = "en";
    value.label = label;
    value.timestamp = time_now;
    value.participants = new Array();
    var participants = gapi.hangout.getParticipants();
    for (var index in participants) {
      var participant = participants[index];
      if (participant.person) {
        value.participants.push(participant.person.displayName);
      }
    }
    set_key("table_" + label + "_" + value.id, $.param(value), function(data) { });
  });
}

function only_one_update(label) {
  var participants = gapi.hangout.getEnabledParticipants();
  var local_participant_id = gapi.hangout.getLocalParticipantId();
  var should_update = true;
  //for (var index in participants) {
  //  var participant = participants[index];
  //  if (participant.id < local_participant_id) {
  //    should_update = false;
  //    break;
  //  } 
  //}
  if (should_update) {
    update_server(label);
  }
}

function init() {
  // When API is ready...
  gapi.hangout.onApiReady.add(function(eventObj) {
    if (eventObj.isApiReady) {
      var label = gadgets.views.getParams()['appData'];
      // Decode html entity number if the label in Russian or Hebrew.
      label = $('<div/>').html(label).text();
      if (!label) {
        label = 'default';
      }
      setInterval(function() { only_one_update(label); }, conf.hangout_upadate_timeout);
    }
  });
}

// Wait for gadget to load.
gadgets.util.registerOnLoadHandler(init);
