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
      Return or set width of content, this way call avoid using method
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
      Return or set height of content
    */
    this.property('height', {
      get: function () {
        return el.offsetHeight;
      },

      set: function (value) {
        return $(el).height(value);
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

    this.property('top', {
      get: function () {
        return parseInt($(el).css('top').replace(/[^-\d\.]/g, ''));
      },

      set: function (top) {
        $(el).css('top', top);
      }
    });

    this.property('bottom', {
      get: function () {
        return parseInt($(el).css('bottom').replace(/[^-\d\.]/g, ''));
      },

      set: function (bottom) {
        $(el).css('bottom', bottom);
      }
    });

    this.property('left', {
      get: function () {
        return parseInt($(el).css('left').replace(/[^-\d\.]/g, ''));
      },

      set: function (left) {
        $(el).css('left', left);
      }
    });

    this.property('right', {
      get: function () {
        return parseInt($(el).css('right').replace(/[^-\d\.]/g, ''));
      },

      set: function (right) {
        $(el).css('right', right);
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
    if (content.percentY <= 0) return;
    if (content.scrollTop <= 0) return;
    this.preventDefault();

    content.scrollTop = content.scrollTop - distance;
    content.trigger('scroll-up', distance);
    content.trigger('scrolling').trigger('scrolling-y');
  }

  function scrollDown(distance) {
    if (content.percentY >= 100) return;
    if (content.scrollTop >= content.availableScrollHeight) return;
    this.preventDefault();

    content.scrollTop = content.scrollTop + distance;
    content.trigger('scroll-down', distance);
    content.trigger('scrolling').trigger('scrolling-y');
  }

  function scrollLeft(distance) {
    if (content.percentX <= 0) return;
    if (content.scrollLeft <= 0) return;
    this.preventDefault();

    content.scrollLeft = content.scrollLeft - distance;
    content.trigger('scroll-left', distance);
    content.trigger('scrolling').trigger('scrolling-x');
  }

  function scrollRight(distance) {
    if (content.percentX >= 100) return;
    if (content.scrollLeft >= content.availableScrollWidth) return;
    this.preventDefault();

    content.scrollLeft = content.scrollLeft + distance;
    content.trigger('scroll-right', distance);
    content.trigger('scrolling').trigger('scrolling-x');
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
