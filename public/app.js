// All application javascript methods for round table.

// Assumes conf was defines with following parameters 
//  'host': URL where application reside.
//  'webdis': URL where redis (vis webdis) reside.'

var handle_error = function(err) {
  // Uncomment for debuging XHR (ajax). 
  // alert(err);
};

function get_key(key, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/GET/" + encodeURIComponent(key),
    data: "format=json",
    dataType: "json",
    success: function(data) { callback(decodeURIComponent(data)) },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function set_key(key, value, callback) {
  var set_request = location.protocol + "//" + conf.webdis + "/SET/" + encodeURIComponent(key) + "/" + encodeURIComponent(value);
  $.ajax({
    cache: false,
    url: set_request,
    data: "format=json",
    dataType: "json",
    success: callback,
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function keys(pattern, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/KEYS/" + encodeURIComponent(pattern),
    dataType: "text",
    success: function(data) { callback($.parseJSON(data)); },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function mget(key_arr, callback) {
  // TODO(kolman): Add encode URI Component for all other $.ajax calls!
  // Check, this may be needed for IE only?
  var url = location.protocol + "//" + conf.webdis + "/MGET/" + encodeURIComponent(key_arr);
  $.ajax({
    cache: false,
    url: url,
    dataType: "text",
    success: function(data) { callback($.parseJSON(data)); },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function del(key, callback) {
  var url = location.protocol + "//" + conf.webdis + "/DEL/" + encodeURIComponent(key);
  $.ajax({
    cache: false,
    url: url, 
    data: "format=json",
    dataType: "json",
    success: callback,
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function tables(label, callback) {
  keys("table_" + label + "_*", function(table_keys) {
    mget(table_keys.KEYS.join('/'), function(data) {
      get_timestamp(function(time_now) {
        for (var index in data.MGET) {
          if (data.MGET[index] != null) {
            var one_table = $.deparam(data.MGET[index]);
            one_table.label = $('<div/>').html(one_table.label).text();
            if (one_table != null) {
              if ((parseInt(one_table.timestamp) + (conf.table_delete_timeout)) < parseInt(time_now)) {
                // If the table if old not updated table, delete it from redis.
                del_table(one_table.label, one_table.id); 
              }
            }
          }
        }
        callback(data, time_now);
      });
    });
  });
}

function del_table(label, id, callback) {
  del("table_" + label + "_" + id, callback);
}

function get_timestamp(callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/TIME",
    data: "format=json",
    dataType: "json",
    success: function(data) { callback(data.TIME[0]); },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function live_table(table, time_now) {
  return ((parseInt(table.timestamp) + (conf.table_stays_alive)) > parseInt(time_now));
}

function test_choose_tables() {
  var tmp_timestamp = 999;
  var tables = [
    { 'id': 1,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3] },
    { 'id': 2,  'timestamp': tmp_timestamp, 'participants': [1, 2] },
  ];
  alert(choose_table(tables, tmp_timestamp).id == 1);
  var tables = [
    { 'id': 1,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3] },
    { 'id': 2,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3, 4] },
  ];
  alert(choose_table(tables, tmp_timestamp).id == 2);
  var tables = [
    { 'id': 1,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3, 4, 5, 6] },
    { 'id': 2,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3, 4, 5, 6, 7] },
  ];
  alert(choose_table(tables, tmp_timestamp).id == 1);
  var tables = [
    { 'id': 1,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3, 5, 6] },
    { 'id': 2,  'timestamp': tmp_timestamp, 'participants': [1, 2, 3, 4] },
  ];
  alert(choose_table(tables, tmp_timestamp).id == 2);
}

function choose_table(tables, time_now) {
  var max_participants = 0;
  var best_table = null;
  var largest_fill_first_table = 0;
  // Choose largest table below conf.table_fill_first_limit
  for (var idx in tables) {
    var one_table = tables[idx];
    if (live_table(one_table, time_now) &&
        one_table.participants.length < conf.table_fill_first_limit &&
        one_table.participants.length > largest_fill_first_table) {
      largest_fill_first_table = one_table.participants.length;
      best_table = one_table;
    }
  }
  if (best_table != null) {
    return best_table;
  }
  // No small (less then conf.table_fill_first_limit) tables, choose smallest.
  var smallest_table = conf.table_max_limit;
  for (var idx in tables) {
    var one_table = tables[idx];
    if (live_table(one_table, time_now) &&
        one_table.participants.length < conf.table_max_limit &&
        one_table.participants.length < smallest_table) {
      smallest_table = one_table.participants.length;
      best_table = one_table;
    }
  }
  return best_table;
}

function get_free_table(label, callback) {
  tables(label, function(data) {
    get_timestamp(function(time_now) {
      var tables = [];
      for (var index in data.MGET) {
        if (data.MGET[index] != null) {
          var one_table = $.deparam(data.MGET[index]);
          if (one_table != null) {
            tables.push(one_table);
          }
        }
      } // for
      var best_table = choose_table(tables, time_now);
      callback(best_table);
    }); // get_timestamp
  }); // tables
}

function get_free_table_id(label, callback) {
  get_free_table(label, function(one_table) {
    if (one_table) {
      callback(one_table.id);
    } else {
      callback(null);
    }
  });
}

function on_admin_click(onair, label, callback) {
  if (isMobile.any()) {
    callback(null);
  } else {
    var onair_param = '';
    if (onair) {
      onair_param = '&hso=0';
    }
    callback("https://plus.google.com/hangouts/_?gid=" + conf.hangout_app_gid + onair_param + "&gd=" + label);
  }
}

function on_user_click(label, callback) {
  get_free_table_id(label, function(table_id) {
    if (table_id) {
      if (isMobile.any()) {
        callback("https://plus.google.com/hangouts/_/" + table_id + "?label=" + label);
      } else {
        callback("https://plus.google.com/hangouts/_/" + table_id + "?gid=" + conf.hangout_app_gid + "&gd=" + label);
      }
    } else {
      callback(null);
    }
  });
}
