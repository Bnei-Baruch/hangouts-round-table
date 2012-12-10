// All application javascript methods for round table.

// Assumes conf was defines with following parameters 
//  'host': URL where application reside.
//  'webdis': URL where redis (vis webdis) reside.'

function get_key(key, callback) {
  $.ajax({
    url: conf.webdis + "/GET/" + key,
    data: "format=json",
    dataType: "json",
    success: callback
  });
}

function set_key(key, value, callback) {
  $.ajax({
    url: conf.webdis + "/SET/"+key+"/" + value,
    data: "format=json",
    dataType: "json",
    success: callback
  });
}

function keys(pattern, callback) {
  $.ajax({
    url: conf.webdis + "/KEYS/" + pattern,
    data: "format=json",
    dataType: "json",
    success: callback
  });
}

function mget(key_arr, callback) {
  $.ajax({
    url: conf.webdis + "/MGET/" + key_arr,
    data: "format=json",
    dataType: "json",
    success: callback
  });
}

function tables(callback) {
  keys("table_*", function(table_keys) {
    mget(table_keys.KEYS.join('/'), callback);
  });
}
