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
    url: location.protocol + "//" + conf.webdis + "/GET/" + key,
    data: "format=json",
    dataType: "json",
    success: function(data) { callback(decodeURIComponent(data)) },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function set_key(key, value, callback) {
  var set_request = location.protocol + "//" + conf.webdis + "/SET/" + key + "/" + encodeURIComponent(value);
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
    url: location.protocol + "//" + conf.webdis + "/KEYS/" + pattern,
    dataType: "text",
    success: function(data) { callback($.parseJSON(data)); },
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function mget(key_arr, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/MGET/" + key_arr,
    data: "format=json",
    dataType: "json",
    success: callback,
    error: function(xhr, status, errorThrown) { handle_error(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function del(key, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/DEL/" + key,
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
            one_table = $.deparam(data.MGET[index]);
            if (one_table != null) {
              if ((parseInt(one_table.timestamp) + (conf.table_delete_timeout)) < parseInt(time_now)) {
                // If the table if old not updated table, delete it from redis.
                del_table(label, one_table.id); 
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

function get_free_table(label, callback) {
  tables(label, function(data) {
    get_timestamp(function(time_now) {
      var redirected = false;
      var max_participants = 0;
      var best_table = null;
      for (var index in data.MGET) {
        if (data.MGET[index] != null) {
          one_table = $.deparam(data.MGET[index]);
          if (one_table != null) {
            if ((parseInt(one_table.timestamp) +
                (conf.table_stays_alive)) >=
                parseInt(time_now)) {
              // Good up-to-date table
              if (one_table.participants.length < conf.table_max_limit) {
                if (one_table.participants.length > max_participants) {
                  best_table = one_table;
                }
              }
            }
          }
        }
      } // for
      callback(best_table);
    }); // get_timestamp
  }); // tables
}

function get_free_table_id(label, callback) {
  get_free_table(label, function(one_table) {
    callback(one_table.id);
  });
}

function on_admin_click(onair, label, callback) {
  if (isMobile.any()) {
    callback(null);
  } else {
    onair_param = '';
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
        callback("https://plus.google.com/hangouts/_/" + table_id + "?gid=" + conf.hangout_app_gid + "&label=" + label);
      }
    } else {
      callback(null);
    }
  });
}
