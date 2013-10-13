var $ = require('jquery');
var tpl = require('../tpl/horizontal-scrollbar');
var Scrollbar = require('./scrollbar');
var Track = require('./track');

module.exports = function HorizontalScrollbar() {
  var el = $(tpl)[0];
  var direction = 'horizontal';
  var track, thumb, button, corner;

  var hscrollbar = function () {
    /*
      Get scrollbar direction, read only
    */
    this.property('direction', {
      get: function () {
        return direction;
      }
    });

    /*
      Get or set the scrollbar's position, 'top' or 'bottom'
    */
    this.property('position', {
      get: function () {
        return $(this.el).hasClass('top') ? 'top' : 'bottom';
      },

      set: function (position) {
        if (['top', 'bottom'].indexOf(position) === -1) return;
        if (this.position === position) return;
        $(this.el).removeClass(this.position);
        $(this.el).addClass(position);
        this.trigger('position', this.position);
      }
    });

    this.track = Track.call(this, $(this.el).find('>.track').get(0));
    return this;
  }.call(Object.create(new Scrollbar(el)));

  hscrollbar.shiftUp = function (distance) {
    if (this.position === 'bottom' && this.place === 'inside') {
      this.marginBottom = this.marginBottom + distance;
    }

    if (this.position === 'bottom' && this.place === 'outside') {
      this.marginTop = this.marginTop - distance;
    }
  }

  hscrollbar.shiftDown = function (distance) {
    if (this.position === 'bottom' && this.place === 'inside') {
      this.marginBottom = this.marginBottom - distance;
    }

    if (this.position === 'bottom' && this.place === 'outside') {
      this.marginTop = this.marginTop + distance;
    }
  }

  return hscrollbar;
}
