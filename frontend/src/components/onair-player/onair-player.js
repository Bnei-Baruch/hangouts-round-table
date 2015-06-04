'use strict';

// this is test
var rt_config, rt_interval;

function rt_pollEventsApi() {
  var script = document.createElement('script');
  script.type='text/javascript';
  //script.src='https://gdata.youtube.com/feeds/api/users/' + rt_config.channelId  +
  //    '/live/events?v=2&status=active&fields=entry(title,content)' +
  //    '&alt=json-in-script&callback=rt_renderPlayer';
  script.src='https://www.googleapis.com/youtube/v3/search?eventType=live&part=id%2Csnippet&channelId='+ rt_config.channelId +'&type=video&key=AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0&callback=rt_renderPlayer';
  //script.src='https://www.googleapis.com/youtube/v3/search?eventType=live&part=id%2Csnippet&channelId=UCYi0-Xrr-B7Ap4sAwR6iEpg&type=video&key=AIzaSyBoMXQDrlRUCQCxv4fjfiyTHXog8OB2Nz0&callback=rt_renderPlayer';

  document.getElementsByTagName("head")[0].appendChild(script);
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
  rt_interval = window.setInterval(rt_pollEventsApi, 5000);
}

var liveEvent;

function onYouTubeIframeAPIReady() {
  if (liveEvent == undefined) {
    setTimeout(onYouTubeIframeAPIReady, 3000);
  } else {
    var title = liveEvent.snippet.title;
    var videoId = liveEvent.id.videoId;

    var player = new YT.Player(rt_config.containerId, {
      width: rt_config.width,
        height: rt_config.height,
        videoId: videoId,
        playerVars : {
          version: 3,
        autoplay : 1
        }
    });

    rt_config.callback(title, player);
  }
}

function rt_loadYouTubeAPI() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function rt_renderPlayer(data) {
  if (data.items !== undefined && data.items.length > 0) {
    liveEvent = data.items[0];
    window.clearInterval(rt_interval);
    rt_loadYouTubeAPI();
  }
}
