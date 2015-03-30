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
 * channelId
 * callback
 * width
 * height
 */
function initOnAirPlayer(config) {
  rt_config = config;
  rt_interval = window.setInterval(rt_pollEventsApi, 3000);
}

function rt_renderPlayer(data) {
  var liveEvent = data.feed.entry;
  var title;

  if (liveEvent) {
    title = liveEvent[liveEvent.length-1].title.$t;
    window.clearInterval(rt_interval);
    var embedHtml = '<iframe src="http://www.youtube.com/embed/' +
      liveEvent[liveEvent.length-1].content.src.split('/').splice(-1,1) +
      '&#038;autoplay=1&#038;rel=0" frameborder="0" ' +
      'width="' + rt_config.width + '" height="' + rt_config.height + '"></iframe>';

    rt_config.container.innerHTML = embedHtml;
  }

  rt_config.callback(title);
}
