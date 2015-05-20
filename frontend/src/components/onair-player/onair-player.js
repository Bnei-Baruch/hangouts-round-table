'use strict';

var rt_config, rt_interval;

function rt_pollEventsApi() {
  var script = document.createElement('script');
  script.type='text/javascript';
  script.src='https://gdata.youtube.com/feeds/api/users/' + rt_config.channelId  +
      '/live/events?v=2&status=active&fields=entry(title,content)' +
      '&alt=json-in-script&callback=rt_renderPlayer';

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
  rt_interval = window.setInterval(rt_pollEventsApi, 3000);
}

var liveEvent;

function onYouTubeIframeAPIReady() {
  if (liveEvent == undefined) {
    setTimeout(onYouTubeIframeAPIReady, 3000);
  } else {
    var title = liveEvent[liveEvent.length-1].title.$t;
    var videoId = liveEvent[liveEvent.length-1].content.src.split('/').splice(-1,1);

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
  liveEvent = data.feed.entry;

  if (liveEvent) {
    window.clearInterval(rt_interval);

    rt_loadYouTubeAPI();
  }
}
