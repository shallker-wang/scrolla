var $ = require('jquery');
var eventy = require('eventy');

module.exports = function Content(el) {
  var checkSizeInterval = 500;

  var content = function () {
    var content = this;
    this.el = el;

    this.property = function(name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('contentWidth', {
      get: function () {
        return el.scrollWidth;
      }
    });

    this.property('contentHeight', {
      get: function () {
        return el.scrollHeight;
      }
    });

    this.property('pageX', {
      get: function () {
        var rect = el.getBoundingClientRect();
        return rect.left + window.pageXOffset;
      }
    });

    this.property('pageY', {
      get: function () {
        var rect = el.getBoundingClientRect();
        return rect.top + window.pageYOffset;
      }
    });

    /*
      Return or set width of content, this way can avoid using method
    */
    this.property('width', {
      get: function () {
        return el.offsetWidth;
      },

      set: function (value) {
        return $(el).width(value + 'px');
      }
    });

    /*
      Return or set height of content
    */
    this.property('height', {
      get: function () {
        return el.offsetHeight;
      },

      set: function (value) {
        return $(el).height(value + 'px');
      }
    });

    this.property('scrollTop', {
      get: function () {
        return el.scrollTop;
      },

      set: function (value) {
        el.scrollTop = value;
        content.trigger('scroll-top', content.scrollTop);
      }
    });

    this.property('scrollLeft', {
      get: function () {
        return el.scrollLeft;
      },

      set: function (value) {
        el.scrollLeft = value;
        content.trigger('scroll-left', content.scrollLeft);
      }
    });

    /*
      Manipulate element's top by pixel
    */
    this.property('top', {
      get: function () {
        var top = $(el).css('top');

        if (top.match(/px/)) return toInt(top);
        else return 0;
      },

      /*
        Set top of element by pixel
        @arguments Number top
      */
      set: function (top) {
        $(el).css('top', top + 'px');
      }
    });

    this.property('bottom', {
      get: function () {
        var bottom = $(el).css('bottom');

        if (bottom.match(/px/)) return toInt(bottom);
        else return 0;
      },

      set: function (bottom) {
        $(el).css('bottom', bottom + 'px');
      }
    });

    this.property('left', {
      get: function () {
        var left = $(el).css('left');

        if (left.match(/px/)) return toInt(left);
        else return 0;
      },

      set: function (left) {
        $(el).css('left', left + 'px');
      }
    });

    this.property('right', {
      get: function () {
        var right = $(el).css('right');

        if (right.match(/px/)) return toInt(right);
        else return 0;
      },

      set: function (right) {
        $(el).css('right', right + 'px');
      }
    });

    this.property('marginRight', {
      get: function () {
        var marginRight = $(el).css('marginRight');

        if (marginRight.match(/px/)) return toInt(marginRight);
        else return 0;
      },

      set: function (marginRight) {
        $(el).css('marginRight', marginRight + 'px');
      }
    });

    this.property('marginLeft', {
      get: function () {
        var marginLeft = $(el).css('marginLeft');

        if (marginLeft.match(/px/)) return toInt(marginLeft);
        else return 0;
      },

      set: function (marginLeft) {
        $(el).css('marginLeft', marginLeft + 'px');
      }
    });

    this.property('marginTop', {
      get: function () {
        var marginTop = $(el).css('marginTop');

        if (marginTop.match(/px/)) return toInt(marginTop);
        else return 0;
      },

      set: function (marginTop) {
        $(el).css('marginTop', marginTop + 'px');
      }
    });

    this.property('marginBottom', {
      get: function () {
        var marginBottom = $(el).css('marginBottom');

        if (marginBottom.match(/px/)) return toInt(marginBottom);
        else return 0;
      },

      set: function (marginBottom) {
        $(el).css('marginBottom', marginBottom + 'px');
      }
    });

    this.property('availableScrollWidth', {
      get: function () {
        return content.contentWidth - content.width;
      }
    });

    this.property('availableScrollHeight', {
      get: function () {
        return content.contentHeight - content.height;
      }
    });

    this.property('percentWidth', {
      get: function () {
        return content.width / content.contentWidth * 100;
      }
    });

    this.property('percentHeight', {
      get: function () {
        return content.height / content.contentHeight * 100;
      }
    });

    this.property('percentX', {
      get: function () {
        return content.scrollLeft / content.availableScrollWidth * 100;
      },

      set: function (percentage) {
        el.scrollLeft = percentage / 100 * content.availableScrollWidth;
        content.trigger('percent-x', content.percentX);
      }
    });

    this.property('percentY', {
      get: function () {
        return content.scrollTop / content.availableScrollHeight * 100;
      },

      set: function (percentage) {
        el.scrollTop = percentage / 100 * content.availableScrollHeight;
        content.trigger('percent-y', content.percentY);
      }
    });

    return this;
  }.call(eventy({}));

  function toInt(string) {
    return parseInt(string.replace(/[^-\d\.]/g, ''));
  }

  /*
    Get or set content style in DOM
  */
  content.css = function (name, value) {
    if (value) return $(el).css(name, value);
    else return $(el).css(name);
  }

  return content;
}
