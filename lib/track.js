var $ = require('jquery');
var eventy = require('eventy');
var Thumb = require('./thumb');

module.exports = function Track(el) {
  var scrollbar = this;
  var thumb;
  var scrolling;

  var track = function() {
    this.el = el;
    this.thumb = Thumb.call(this, $(el).find('>.thumb').get(0));
    thumb = this.thumb;
    $(this.el).on('mousedown', onMousedown);
    $(document).on('mouseup', onDocumentMouseup);
    $(document).on('mousemove', onDocumentMousemove);
    return this;
  }.call(Object.create(scrollbar));

  function onMousedown(mousedown) {
    mousedown.preventDefault();
    scrolling = true;

    if (scrollbar.direction === 'horizontal') {
      var offsetX = mousedown.pageX - track.pageX;
      var percentage = (offsetX - thumb.width / 2) / (track.width - thumb.width) * 100;
      thumb.percentX = percentage;
      scrollbar.trigger('scrolling');
    }

    if (scrollbar.direction === 'vertical') {
      var offsetY = mousedown.pageY - track.pageY;
      var percentage = (offsetY - thumb.height / 2) / (track.height - thumb.height) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      thumb.percentY = percentage;
      scrollbar.trigger('scrolling');
    }
  }

  function onDocumentMouseup(mouseup) {
    scrolling = false;
  }

  function onDocumentMousemove(mousemove) {
    if (scrolling) mousemove.preventDefault();
  }

  track.property = function(name, defines) {
    Object.defineProperty(track, name, defines);
  }

  track.property('width', {
    get: function () {
      return el.offsetWidth;
    },

    set: function (value) {
      return $(el).width(value);
    }
  });

  track.property('height', {
    get: function () {
      return el.offsetHeight;
    },

    set: function (value) {
      return $(el).height(value);
    }
  });

  track.property('pageX', {
    get: function () {
      var rect = el.getBoundingClientRect();
      return rect.left + window.pageXOffset;
    }
  });

  track.property('pageY', {
    get: function () {
      var rect = el.getBoundingClientRect();
      return rect.top + window.pageYOffset;
    }
  });

  return track;
}
