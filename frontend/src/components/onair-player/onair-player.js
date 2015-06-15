'use strict';

// this is test
var rt_config, rt_interval;

function rt_pollEventsApi() {
  httpGet(rt_config.liveIdUrl, function(ret) {
    if (ret.id) {
      var checkIsLiveUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + ret.id + "&key=AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0";
      httpGet(checkIsLiveUrl, function (data) {
        if (data.items && data.items.length > 0 && data.items[0].snippet.liveBroadcastContent !== "none") {
          window.clearInterval(rt_interval);
          rt_loadYouTubePlayer(ret.id);
        }
      });
    }
  });
}

function httpGet(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4) {
      callback(JSON.parse(xmlHttp.responseText));
    }
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send();
}

/*
 * config:
 * channelId
 * callback
 * width
 * height
 */
function initOnAirPlayer(config) {
  rt_config = config;
  rt_loadYouTubeAPI();
}

function onYouTubeIframeAPIReady() {
  rt_interval = window.setInterval(rt_pollEventsApi, 5000);
  rt_pollEventsApi();
}

function rt_loadYouTubePlayer(liveId) {
  var player = new YT.Player(rt_config.containerId, {
    width: rt_config.width,
    height: rt_config.height,
    videoId: liveId,
    playerVars : {
      version: 3,
      autoplay : 1
    }
  });

  var getTitleUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + liveId + "&key=AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0";
  httpGet(getTitleUrl, function(data) {
    var title = "";
    if (data.items && data.items.length > 0) {
      title = data.items[0].snippet.title;
    }
    rt_config.callback(title, player);
  });
}

function rt_loadYouTubeAPI() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
