// All application javascript methods for round table.

// Assumes conf was defines with following parameters 
//  'host': URL where application reside.
//  'webdis': URL where redis (vis webdis) reside.'

// Enable
//$.support.cors = true;

function get_key(key, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" +  conf.webdis + "/GET/" + key,
    data: "format=json",
    dataType: "json",
    success: function(data) { callback(decodeURIComponent(data)) }
  });
}

function set_key(key, value, callback) {
  var set_request = location.protocol + "//" + conf.webdis + "/SET/"+key+"/" + encodeURIComponent(value)
  $.ajax({
    cache: false,
    url: set_request,
    data: "format=json",
    dataType: "json",
    success: callback
  });
}

function keys(pattern, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/KEYS/" + pattern,
    dataType: "text",
    success: function(data) { callback($.parseJSON(data)); },
    error: function(xhr, status, errorThrown) { alert(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function mget(key_arr, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/MGET/" + key_arr,
    data: "format=json",
    dataType: "json",
    success: callback,
    error: function(xhr, status, errorThrown) { alert(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function del(key, callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/DEL/" + key,
    data: "format=json",
    dataType: "json",
    success: callback,
    error: function(xhr, status, errorThrown) { alert(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
  });
}

function tables(callback) {
  keys("table_*", function(table_keys) {
    mget(table_keys.KEYS.join('/'), callback);
  });
}

function del_table(id, callback) {
  del("table_" + id, callback);
}

function get_timestamp(callback) {
  $.ajax({
    cache: false,
    url: location.protocol + "//" + conf.webdis + "/TIME",
    data: "format=json",
    dataType: "json",
    success: function(data) { callback(data.TIME[0]); },
    error: function(xhr, status, errorThrown) { alert(errorThrown+'\n'+status+'\n'+xhr.statusText); } 
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

function get_free_table_id(callback) {
  return tables(function(data) {
    return get_timestamp(function(time_now) {
      var redirected = false;
      var max_participants = 0;
      var best_table_id = "";
      for (var index in data.MGET) {
        if (data.MGET[index] != null) {
          one_table = $.deparam(data.MGET[index]);
          if (one_table != null) {
            if ((parseInt(one_table.timestamp) +
                (conf.table_stays_alive)) <
                parseInt(time_now)) {
              // If the table if old not updated table, delete it from redis.
              del_table(one_table.id); 
            } else {
              // Good up-to-date table
              if (one_table.participants.length < conf.table_max_limit) {
                if (one_table.participants.length > max_participants) {
                  best_table_id = one_table.id;
                }
              }
            }
          }
        }
      } // for
      callback(best_table_id);
    }); // get_timestamp
  }); // tables
}

// Admin/Moderator opens a new table (should be from desktop).
function on_admin_click() {
  if (isMobile.any()) {
    return "Hangout round table cannot be opened via mobile.";
  } else {
    window.open("https://plus.google.com/hangouts/_?gid=486366694302");
    return "";
  }
}

function on_user_click(callback) {
  get_free_table_id(function(table_id) {
    if (table_id) {
      if (isMobile.any()) {
        window.open("https://plus.google.com/hangouts/_/" + table_id);
        if (callback) {
          callback("");
        }
      } else {
        window.open("https://plus.google.com/hangouts/_/" + table_id + "?gid=486366694302");
        if (callback) {
          callback("");
        }
      }
    } else {
      if (callback) {
        callback("User cannot start a new table, only join existing. Please retry when moderators will open new table.");
      }
    }
  });
}

// One button for admin and users (no matter who will be admin).
function on_any_click() {
  get_free_table_id(function(table_id) {
    if (table_id) {
      if (isMobile.any()) {
        //window.location.href = "https://plus.google.com/hangouts/_/" + table_id;
        window.open("https://plus.google.com/hangouts/_/" + table_id);
      } else {
        window.open("https://plus.google.com/hangouts/_/" + table_id + "?gid=486366694302");
      }
    } else {
      if (isMobile.any()) {
        return "Mobile device cannot start a new table, only join existing.";
      } else {
        window.open("https://plus.google.com/hangouts/_?gid=486366694302");
      }
    }
  });
}

