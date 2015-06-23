'use strict';

(function () {

  var config, pollingInterval,
    lastLiveId = null, splashElement;

  /*
   * config:
   *  channelId
   *  callback
   *  width
   *  height
   */
  window.initOnAirPlayer = function (cfg) {
    config = cfg;
    splashElement = document.getElementById(config.containerId).cloneNode(true);
    loadYouTubeAPI();
  };

  window.onYouTubeIframeAPIReady = function () {
    pollingInterval = window.setInterval(pollEventsApi, 5000);
    pollEventsApi();
  };


  ////

  function showSplash() {
    var container = document.getElementById(config.containerId);
    var body = container.parentNode;
    body.removeChild(container);
    var splashClone = splashElement.cloneNode(true);
    body.appendChild(splashClone);
  }

  function loadYouTubePlayer(liveId) {
    console.debug('loadYouTubePlayer ' + liveId);
    var player = new YT.Player(config.containerId, {
      width: config.width,
      height: config.height,
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
      config.callback(title, player);
    });
  }

  function checkIsLive(liveId, callback) {
    var checkIsLiveUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + liveId + "&key=AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0";
    httpGet(checkIsLiveUrl, function (data) {
      callback(data.items && data.items.length > 0 && data.items[0].snippet.liveBroadcastContent !== "none");
    });
  }

  function pollEventsApi() {
    httpGet(config.liveIdUrl, function(ret) {
      if (ret.id !== lastLiveId) {
        if (ret.id) {
          checkIsLive(ret.id, function(isLive) {
            if (isLive) {
              lastLiveId = ret.id;
              showSplash();
              loadYouTubePlayer(ret.id);
            } else {
              showSplash();
            }
          });
        } else {
          checkIsLive(lastLiveId, function(isLive) {
            if (!isLive) {
              lastLiveId = null;
              showSplash();
            }
          });
        }
      }
    });
  }

  function loadYouTubeAPI() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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

})();
