var $ = require('jquery'),
    Content = require('./content'),
    Scrollbar = require('./scrollbar'),
    eventy = require('eventy');

module.exports = function Scroll(el) {
  var content, scrollbar, track, thumb;

  var scroll = function () {
    this.el = el;
    content = new Content($(el).find('>.content').get(0));
    scrollbar = new Scrollbar($(el).find('>.scrollbar').get(0));
    scrollbar.track.thumb.percentHeight = content.percentHeight;
    track = scrollbar.track;
    thumb = track.thumb
    return this;
  }.call(eventy({}));

  scroll.content = content;
  scroll.scrollbar = scrollbar;

  scrollbar.on('scrolling', function (distance) {
    content.percentY = scrollbar.track.thumb.percentY;
  });

  content.on('scrolling', function (distance) {
    scrollbar.track.thumb.percentY = content.percentY;
  });

  scroll.top = function () {
    content.percentY = 0;
    thumb.percentY = 0;
  }

  scroll.bottom = function () {
    content.percentY = 100;
    thumb.percentY = 100;
  }

  scroll.left = function () {
    content.percentX = 0;
    thumb.percentX = 0;
  }

  scroll.right = function () {
    content.percentX = 100;
    thumb.percentX = 100;
  }

  return scroll;
}
