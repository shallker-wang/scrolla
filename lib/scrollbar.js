var $ = require('jquery');
var eventy = require('eventy');

module.exports = function (el) {
  var scrollbar = function () {
    this.el = el;

    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    /*
      Return or set width of scrollbar, this way can avoid using method
    */
    this.property('width', {
      get: function () {
        return this.el.offsetWidth;
      },

      set: function (value) {
        return $(this.el).width(value);
      }
    });

    /*
      Return or set height of scrollbar
    */
    this.property('height', {
      get: function () {
        return this.el.offsetHeight;
      },

      set: function (value) {
        return $(this.el).height(value);
      }
    });

    /*
      Get or set the scrollbar place of, 'inside' or 'outside'
    */
    this.property('place', {
      get: function () {
        return $(this.el).hasClass('outside') ? 'outside' : 'inside';
      },

      set: function (place) {
        if (this.place === place) return;
        $(this.el).removeClass(this.place);
        $(this.el).addClass(place);
        this.trigger('place', this.place);
      }
    });

    this.property('top', {
      get: function () {
        return parseInt($(this.el).css('top').replace(/[^-\d\.]/g, ''));
      },

      set: function (top) {
        $(this.el).css('top', top);
        this.trigger('top', this.top);
      }
    });

    this.property('left', {
      get: function () {
        return parseInt($(this.el).css('left').replace(/[^-\d\.]/g, ''));
      },

      set: function (left) {
        $(this.el).css('left', left);
        this.trigger('left', this.left);
      }
    });

    this.property('marginRight', {
      get: function () {
        return parseInt($(this.el).css('marginRight').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginRight) {
        $(this.el).css('marginRight', marginRight);
      }
    });

    this.property('marginLeft', {
      get: function () {
        return parseInt($(this.el).css('marginLeft').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginLeft) {
        $(this.el).css('marginLeft', marginLeft);
      }
    });

    this.property('marginTop', {
      get: function () {
        return parseInt($(this.el).css('marginTop').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginTop) {
        $(this.el).css('marginTop', marginTop);
      }
    });

    this.property('marginBottom', {
      get: function () {
        return parseInt($(this.el).css('marginBottom').replace(/[^-\d\.]/g, ''));
      },

      set: function (marginBottom) {
        $(this.el).css('marginBottom', marginBottom);
      }
    });

    return this;
  }.call(eventy({}));

  scrollbar.destroy = function () {
    this.el.parentNode.removeChild(this.el);
  }

  return scrollbar;
}
