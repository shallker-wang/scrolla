var $ = require('jquery'),
    Content = require('./content'),
    Scrollbar = require('./scrollbar'),
    eventy = require('eventy');

module.exports = function Scroll(el) {
  var content;

  var scroll = function () {
    var scroll = this;
    this.el = el;
    content = new Content($(el).find('>.content').get(0));

    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('width', {
      get: function () {
        return el.offsetWidth;
      }
    });

    this.property('height', {
      get: function () {
        return el.offsetHeight;
      }
    });

    this.property('percentWidth', {
      get: function () {
        return scroll.width / content.width * 100;
      }
    });

    this.property('percentHeight', {
      get: function () {
        return scroll.height / content.height * 100;
      }
    });

    this.property('scrollTop', {
      get: function () {
        return -content.top;
      },

      set: function (value) {
        if (value < 0) return content.top = 0;
        if (value > scroll.availableScrollHeight) return content.top = -scroll.availableScrollHeight;
        return content.top = -value;
      }
    });

    this.property('scrollLeft', {
      get: function () {
        return -content.left;
      },

      set: function (value) {
        if (value < 0) return content.left = 0;
        if (value > scroll.availableScrollWidth) return content.left = -scroll.availableScrollWidth;
        return content.left = -value;
      }
    });

    this.property('percentX', {
      get: function () {
        return scroll.scrollLeft / scroll.availableScrollWidth * 100;
      },

      set: function (percentage) {
        scroll.scrollLeft = scroll.availableScrollWidth * percentage / 100;
        scroll.trigger('percent-x', scroll.percentX);
      }
    });

    this.property('percentY', {
      get: function () {
        return scroll.scrollTop / scroll.availableScrollHeight * 100;
      },

      set: function (percentage) {
        scroll.scrollTop = scroll.availableScrollHeight * percentage / 100;
        scroll.trigger('percent-x', scroll.percentX);
      }
    });

    this.property('availableScrollWidth', {
      get: function () {
        return content.width - scroll.width;
      }
    });

    this.property('availableScrollHeight', {
      get: function () {
        return content.height - scroll.height;
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

  scroll.content = content;

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

  (function checkSize() {
    if (scroll.availableScrollWidth > 0) {
      if (!scroll.horizontalScrollbar) {
        scroll.horizontalScrollbar = createScrollbar('horizontal');
      };
    } else {
      if (scroll.horizontalScrollbar) {
        scroll.horizontalScrollbar.destroy();
        scroll.horizontalScrollbar = null;
      }
    }

    if (scroll.availableScrollHeight > 0) {
      if (!scroll.verticalScrollbar) {
        scroll.verticalScrollbar = createScrollbar('vertical');
      };
    } else {
      if (scroll.verticalScrollbar) {
        scroll.verticalScrollbar.destroy();
        scroll.verticalScrollbar = null;
      }
    }

    setTimeout(checkSize, 200);
  })()

  /*
    Initialize scrollbar's size and position
  */
  function initScrollbarSizeAndPosition(scrollbar) {
    if (scrollbar.direction === 'horizontal') {
      scrollbar.width = scroll.width;
      // scrollbar.left = content.pageX + 'px';
      scrollbar.track.thumb.percentWidth = scroll.percentWidth;
    }
    
    if (scrollbar.direction === 'vertical') {
      scrollbar.height = scroll.height;
      // scrollbar.top = content.pageY + 'px';
      scrollbar.track.thumb.percentHeight = scroll.percentHeight;
    }
  }

  /*
    Reset content size according to scrollbar's position and place
  */
  function resetContentSize(scrollbar) {
    if (scrollbar.direction === 'horizontal') {
      if (scrollbar.position === 'top') {}

      if (scrollbar.position === 'bottom') {
        // content.marginBottom = content.marginBottom + scrollbar.height + 'px';

        if (scrollbar.place === 'outside') {
          // scrollbar.top = content.pageY + content.height + 'px';
        }

        if (scrollbar.place === 'inside') {
          // scrollbar.top = content.pageY + content.height - scrollbar.height + 'px';
          // content.height = content.height - scrollbar.height + 'px';
        }
      }

      scrollbar.on('place', function (place) {
        if (place === 'outside') {
          // scrollbar.top = scrollbar.top + scrollbar.height + 'px';
          // content.height = content.height + scrollbar.height + 'px';
        }

        if (place === 'inside') {
          // scrollbar.top = scrollbar.top - scrollbar.height + 'px';
          // content.height = content.height - scrollbar.height + 'px';
        }
      });
    }

    if (scrollbar.direction === 'vertical') {
      if (scrollbar.position === 'left') {}

      if (scrollbar.position === 'right') {
        // content.marginRight = content.marginRight + scrollbar.width + 'px';

        if (scrollbar.place === 'outside') {
          // scrollbar.left = content.width + 'px';
        }

        if (scrollbar.place === 'inside') {
          // scrollbar.left = content.width - scrollbar.width + 'px';
          // content.width = content.width - scrollbar.width + 'px';
        }
      }

      scrollbar.on('place', function (place) {
        if (place === 'outside') {
          // scrollbar.left = scrollbar.left + scrollbar.width + 'px';
          // content.width = content.width + scrollbar.width + 'px';
        }

        if (place === 'inside') {
          // scrollbar.left = scrollbar.left - scrollbar.width + 'px';
          // content.width = content.width - scrollbar.width + 'px';
        }
      });
    }
  }

  function listenScrolling(scrollbar) {
    if (scrollbar.direction === 'horizontal') {
      scrollbar.on('scrolling', function (distance) {
        scroll.percentX = scrollbar.track.thumb.percentX;
      });

      scroll.on('scrolling-x', function (distance) {
        scrollbar.track.thumb.percentX = scroll.percentX;
      });
    }

    if (scrollbar.direction === 'vertical') {
      scrollbar.on('scrolling', function (distance) {
        scroll.percentY = scrollbar.track.thumb.percentY;
      });

      scroll.on('scrolling-y', function (distance) {
        scrollbar.track.thumb.percentY = scroll.percentY;
      });          
    }
  }

  function createScrollbar(direction) {
    var scrollbar = new Scrollbar(direction);

    /*
      Append element to the DOM first, so you can get offsetWidth, clientWidth
      values not as zero
    */
    $(el).append(scrollbar.el);

    initScrollbarSizeAndPosition(scrollbar);
    resetContentSize(scrollbar);
    listenScrolling(scrollbar);

    return scrollbar;
  }

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

  // console.log('scroll.availableScrollWidth', scroll.availableScrollWidth)
  // console.log('scroll.availableScrollHeight', scroll.availableScrollHeight)

  return scroll;
}
