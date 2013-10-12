var $ = require('jquery');
var eventy = require('eventy');

module.exports = function Scroll(el) {
  var checkSizeInterval = 500;

  var scroll = function () {
    var scroll = this;
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
      Return or set width of scroll, this way can avoid using method
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
      Return or set height of scroll
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
        scroll.trigger('scroll-top', scroll.scrollTop);
      }
    });

    this.property('scrollLeft', {
      get: function () {
        return el.scrollLeft;
      },

      set: function (value) {
        el.scrollLeft = value;
        scroll.trigger('scroll-left', scroll.scrollLeft);
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
        return scroll.contentWidth - scroll.width;
      }
    });

    this.property('availableScrollHeight', {
      get: function () {
        return scroll.contentHeight - scroll.height;
      }
    });

    this.property('percentWidth', {
      get: function () {
        return scroll.width / scroll.contentWidth * 100;
      }
    });

    this.property('percentHeight', {
      get: function () {
        return scroll.height / scroll.contentHeight * 100;
      }
    });

    this.property('percentX', {
      get: function () {
        return scroll.scrollLeft / scroll.availableScrollWidth * 100;
      },

      set: function (percentage) {
        el.scrollLeft = percentage / 100 * scroll.availableScrollWidth;
        scroll.trigger('percent-x', scroll.percentX);
      }
    });

    this.property('percentY', {
      get: function () {
        return scroll.scrollTop / scroll.availableScrollHeight * 100;
      },

      set: function (percentage) {
        el.scrollTop = percentage / 100 * scroll.availableScrollHeight;
        scroll.trigger('percent-y', scroll.percentY);
      }
    });

    var wheel = 'onwheel' in document.createElement('div') ? 'wheel' : false;
    var mousewheel = 'onmousewheel' in document.createElement('div') ? 'mousewheel' : false;
    var mousescroll = 'DOMMouseScroll';

    if (wheel) {
      $(this.el).on(wheel, onWheel);
    } else if (mousewheel) {
      $(this.el).on(mousewheel, onMousewheel);
    } else {
      $(this.el).on(mousescroll, onMousescroll);
    }

    return this;
  }.call(eventy({}));

  function toInt(string) {
    return parseInt(string.replace(/[^-\d\.]/g, ''));
  }

  function onWheel(ev) {
    var wheel = ev.originalEvent;

    var wheelEvent = {
      deltaX: -wheel.deltaX,
      deltaY: -wheel.deltaY
    }

    onScroll.call(ev, wheelEvent);
  }

  function onMousewheel(ev) {
    var mousewheel = ev.originalEvent;

    mousewheel.deltaX = mousewheel.wheelDeltaX;
    mousewheel.deltaY = mousewheel.wheelDeltaY;
    onScroll.call(ev, mousewheel);
  }

  function onMousescroll(ev) {
    var mousescroll = ev.originalEvent;

    mousescroll.delta = mousescroll.detail * -10;

    // scroll horizontally
    if (mousescroll.axis === 1) {
      mousescroll.deltaX = mousescroll.delta;
      mousescroll.deltaY = 0;
    }

    // scroll vertically
    if (mousescroll.axis === 2) {
      mousescroll.deltaX = 0;
      mousescroll.deltaY = mousescroll.delta;
    }

    onScroll.call(ev, mousescroll);
  }

  function onScroll(scroll) {
    if (typeof scroll.deltaX !== 'undefined') {
      scrollX.call(this, scroll.deltaX);
      scrollY.call(this, scroll.deltaY);
    } else if (typeof scroll.wheelDeltaX !== 'undefined') {
      scrollX.call(this, scroll.wheelDeltaX);
      scrollY.call(this, scroll.wheelDeltaY);
    } else if (typeof scroll.delta !== 'undefined') {
      scrollY.call(this, scroll.delta);
    } else if (typeof scroll.wheelDelta !== 'undefined') {
      scrollY.call(this, scroll.wheelDelta);
    } else if (typeof scroll.detail !== 'undefined') {
      if (scroll.axis === 1) scrollX.call(this, scroll.detail * -10);
      if (scroll.axis === 2) scrollY.call(this, scroll.detail * -10);
    }
  }

  function scrollX(distance) {
    if (distance > 0) scrollLeft.call(this, distance);
    if (distance < 0) scrollRight.call(this, -distance);
  }

  function scrollY(distance) {
    if (distance > 0) scrollUp.call(this, distance);
    if (distance < 0) scrollDown.call(this, -distance);
  }

  function scrollUp(distance) {
    if (scroll.scrollTop <= 0) return;
    if (scroll.percentY <= 0) return;
    this.preventDefault();

    scroll.scrollTop = scroll.scrollTop - distance;
    scroll.trigger('scroll-up', distance);
    scroll.trigger('scrolling').trigger('scrolling-y');
  }

  function scrollDown(distance) {
    if (scroll.scrollTop >= scroll.availableScrollHeight) return;
    if (scroll.percentY >= 100) return;
    this.preventDefault();

    scroll.scrollTop = scroll.scrollTop + distance;
    scroll.trigger('scroll-down', distance);
    scroll.trigger('scrolling').trigger('scrolling-y');
  }

  function scrollLeft(distance) {
    if (scroll.scrollLeft <= 0) return;
    if (scroll.percentX <= 0) return;
    this.preventDefault();

    scroll.scrollLeft = scroll.scrollLeft - distance;
    scroll.trigger('scroll-left', distance);
    scroll.trigger('scrolling').trigger('scrolling-x');
  }

  function scrollRight(distance) {
    if (scroll.scrollLeft >= scroll.availableScrollWidth) return;
    if (scroll.percentX >= 100) return;
    this.preventDefault();

    scroll.scrollLeft = scroll.scrollLeft + distance;
    scroll.trigger('scroll-right', distance);
    scroll.trigger('scrolling').trigger('scrolling-x');
  }

  /*
    Get or set scroll style in DOM
  */
  scroll.css = function (name, value) {
    if (value) return $(el).css(name, value);
    else return $(el).css(name);
  }

  return scroll;
}
