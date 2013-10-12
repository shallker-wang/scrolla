var $ = require('jquery');
var tpl = require('../tpl/vertical-scrollbar');
var Scrollbar = require('./scrollbar');
var Track = require('./track');

module.exports = function VerticalScrollbar() {
  var el = $(tpl);
  var direction = 'vertical';
  var track, thumb, button, corner;

  var vscrollbar = function () {
    this.property('direction', {
      get: function () {
        return direction;
      },

      set: function (value) {
        if (direction === value) return;
        direction = value;
        this.trigger('direction', this.direction);
      }
    });

    /*
      Get or set the scrollbar's position, 'left' or 'outside'
    */
    this.property('position', {
      get: function () {
        return $(this.el).hasClass('left') ? 'left' : 'right';
      },

      set: function (position) {
        if (['left', 'right'].indexOf(position) === -1) return;
        if (this.position === position) return;
        $(this.el).removeClass(this.position);
        $(this.el).addClass(position);
        this.trigger('position', this.position);
      }
    });

    this.track = Track.call(this, $(this.el).find('>.track').get(0));
    return this;
  }.call(Object.create(new Scrollbar(el)));

  /*
    Shift left by pixels
    @arguments Number distance
    @distance, greater than zero
  */
  vscrollbar.shiftLeft = function (distance) {
    if (this.position === 'right' && this.place === 'inside') {
      this.marginRight = this.marginRight + distance;
    }

    if (this.position === 'right' && this.place === 'outside') {
      this.marginLeft = this.marginLeft - distance;
    }
  }

  vscrollbar.shiftRight = function (distance) {
    if (this.position === 'right' && this.place === 'inside') {
      this.marginRight = this.marginRight - distance;
    }

    if (this.position === 'right' && this.place === 'outside') {
      this.marginLeft = this.marginLeft + distance;
    }
  }

  return vscrollbar;
}