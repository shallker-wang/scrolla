var $ = require('jquery');
var eventy = require('eventy');
var Track = require('./track');
var verticalScrollbar = require('../tpl/vertical-scrollbar');
var horizontalScrollbar = require('../tpl/horizontal-scrollbar');

module.exports = function (direction) {
  var track, thumb, button, corner;
  var el;

  var scrollbar = function () {
    var scrollbar = this;
    el = $(direction === 'horizontal' ? horizontalScrollbar : verticalScrollbar)[0];

    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    /*
      Return or set width of scrollbar, this way can avoid using method
    */
    this.property('width', {
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
    this.property('height', {
      get: function () {
        return el.offsetHeight;
      },

      set: function (value) {
        return $(el).height(value);
      }
    });

    this.property('direction', {
      get: function () {
        return direction;
      },

      set: function (value) {
        if (direction === value) return;
        direction = value;
        scrollbar.trigger('direction', scrollbar.direction);
      }
    });

    /*
      Get or set the scrollbar place of, 'inside' or 'outside'
    */
    this.property('place', {
      get: function () {
        return $(el).hasClass('outside') ? 'outside' : 'inside';
      },

      set: function (value) {
        if (scrollbar.place === value) return;
        $(el).removeClass(scrollbar.place);
        $(el).addClass(value);
        scrollbar.trigger('place', scrollbar.place);
      }
    });

    /*
      Get or set the scrollbar's position
      for vertical scrollbar, 'left' or 'outside'
      for horizontal scrollbar, 'top' or 'bottom'
    */
    this.property('position', {
      get: function () {
        if (scrollbar.direction === 'vertical') {
          return $(el).hasClass('left') ? 'left' : 'right';
        }

        if (scrollbar.direction === 'horizontal') {
          return $(el).hasClass('top') ? 'top' : 'bottom';
        }
      },

      set: function (value) {
        if (scrollbar.position === value) return;
        $(el).removeClass(scrollbar.position);
        $(el).addClass(value);
        scrollbar.trigger('position', scrollbar.position);
      }
    });

    this.property('top', {
      get: function () {
        return parseInt($(el).css('top').replace(/[^-\d\.]/g, ''));
      },

      set: function (top) {
        $(el).css('top', top);
        scrollbar.trigger('top', scrollbar.top);
      }
    });

    this.property('left', {
      get: function () {
        return parseInt($(el).css('left').replace(/[^-\d\.]/g, ''));
      },

      set: function (left) {
        $(el).css('left', left);
        scrollbar.trigger('left', scrollbar.left);
      }
    });

    this.property('marginRight', {
      get: function () {
        return parseInt($(el).css('marginRight').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginRight) {
        $(el).css('marginRight', marginRight);
      }
    });

    this.property('marginLeft', {
      get: function () {
        return parseInt($(el).css('marginLeft').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginLeft) {
        $(el).css('marginLeft', marginLeft);
      }
    });

    this.property('marginTop', {
      get: function () {
        return parseInt($(el).css('marginTop').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginTop) {
        $(el).css('marginTop', marginTop);
      }
    });

    this.property('marginBottom', {
      get: function () {
        return parseInt($(el).css('marginBottom').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginBottom) {
        $(el).css('marginBottom', marginBottom);
      }
    });

    track = Track.call(this, $(el).find('>.track').get(0));
    return this;
  }.call(eventy({}));

  scrollbar.el = el;
  scrollbar.track = track;

  scrollbar.destroy = function () {
    el.parentNode.removeChild(el);
  }

  /*
    Shift left by pixels
    @arguments Number distance
    @distance, greater than zero
  */
  scrollbar.shiftLeft = function (distance) {
    if (this.position === 'right' && this.place === 'inside') {
      this.marginRight = this.marginRight + distance;
    }

    if (this.position === 'right' && this.place === 'outside') {
      this.marginLeft = this.marginLeft - distance;
    }
  }

  scrollbar.shiftRight = function (distance) {
    if (this.position === 'right' && this.place === 'inside') {
      this.marginRight = this.marginRight - distance;
    }

    if (this.position === 'right' && this.place === 'outside') {
      this.marginLeft = this.marginLeft + distance;
    }
  }

  return scrollbar;
}
