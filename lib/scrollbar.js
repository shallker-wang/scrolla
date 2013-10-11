var $ = require('jquery');
var eventy = require('eventy');
var Track = require('./track');

module.exports = function (el) {
  var track, thumb, button, corner;
  var direction;

  var scrollbar = function () {
    this.el = el;
    direction = $(el).hasClass('vertical') ? 'vertical' : 'horizontal';
    track = Track.call(this, $(el).find('>.track').get(0));
    return this;
  }.call(eventy({}));

  scrollbar.track = track;

  scrollbar.property = function(name, defines) {
    Object.defineProperty(scrollbar, name, defines);
  }

  /*
    Return or set width of scrollbar, this way call avoid using method
  */
  scrollbar.property('width', {
    get: function () {
      return el.offsetWidth;
    },

    set: function (value) {
      return $(el).width(value);
    }
  });

  /*
    Return or set height of scrollbar
  */
  scrollbar.property('height', {
    get: function () {
      return el.offsetHeight;
    },

    set: function (value) {
      return $(el).height(value);
    }
  });

  scrollbar.property('direction', {
    get: function () {
      return direction;
    },

    set: function (value) {
      direction = value;
    }
  });

  return scrollbar;
}
