var $ = require('jquery'),
    Content = require('./content'),
    Scrollbar = require('./scrollbar'),
    eventy = require('eventy');

module.exports = function Scroll(el) {
  var content;

  var scroll = function () {
    var self = this;
    this.el = el;

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
        return self.width / content.width * 100;
      }
    });

    this.property('percentHeight', {
      get: function () {
        return self.height / content.height * 100;
      }
    });

    this.property('percentX', {
      get: function () {
        return content.left / self.availableScrollWidth * 100;
      },

      set: function (percentage) {
        content.left = self.availableScrollWidth * percentage / 100;
        self.trigger('percent-x', self.percentX);
      }
    });

    this.property('percentY', {
      get: function () {
        return content.top / self.availableScrollHeight * 100;
      },

      set: function (percentage) {
        content.top = - self.availableScrollHeight * percentage / 100;
        self.trigger('percent-x', self.percentX);
      }
    });

    this.property('availableScrollWidth', {
      get: function () {
        return content.width - self.width;
      }
    });

    this.property('availableScrollHeight', {
      get: function () {
        return content.height - self.height;
      }
    });

    content = new Content(el);
    return this;
  }.call(eventy({}));

  scroll.content = content;

  (function checkSize() {
    if (content.availableScrollWidth > 0) {
      if (!scroll.horizontalScrollbar) {
        scroll.horizontalScrollbar = createScrollbar('horizontal');
      };
    } else {
      if (scroll.horizontalScrollbar) {
        scroll.horizontalScrollbar.destroy();
        scroll.horizontalScrollbar = null;
      }
    }

    if (content.availableScrollHeight > 0) {
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
      scrollbar.width = content.width;
      scrollbar.left = content.pageX + 'px';
      scrollbar.track.thumb.percentWidth = content.percentWidth;
    }
    
    if (scrollbar.direction === 'vertical') {
      scrollbar.height = content.height;
      scrollbar.top = content.pageY + 'px';
      scrollbar.track.thumb.percentHeight = content.percentHeight;
    }
  }

  /*
    Reset content size according to scrollbar's position and place
  */
  function resetContentSize(scrollbar) {
    if (scrollbar.direction === 'vertical') {
      if (scrollbar.position === 'left') {}

      if (scrollbar.position === 'right') {
        content.marginRight = content.marginRight + scrollbar.width + 'px';

        if (scrollbar.place === 'outside') {
          scrollbar.left = content.pageX + content.width + 'px';
        }

        if (scrollbar.place === 'inside') {
          scrollbar.left = content.pageX + content.width - scrollbar.width + 'px';
          content.width = content.width - scrollbar.width + 'px';
        }
      }

      scrollbar.on('place', function (place) {
        if (place === 'outside') {
          scrollbar.left = scrollbar.left + scrollbar.width + 'px';
          content.width = content.width + scrollbar.width + 'px';
        }

        if (place === 'inside') {
          scrollbar.left = scrollbar.left - scrollbar.width + 'px';
          content.width = content.width - scrollbar.width + 'px';
        }
      });
    }

    if (scrollbar.direction === 'horizontal') {
      if (scrollbar.position === 'top') {}

      if (scrollbar.position === 'bottom') {
        content.marginBottom = content.marginBottom + scrollbar.height + 'px';

        if (scrollbar.place === 'outside') {
          scrollbar.top = content.pageY + content.height + 'px';
        }

        if (scrollbar.place === 'inside') {
          scrollbar.top = content.pageY + content.height - scrollbar.height + 'px';
          content.height = content.height - scrollbar.height + 'px';
        }
      }

      scrollbar.on('place', function (place) {
        if (place === 'outside') {
          scrollbar.top = scrollbar.top + scrollbar.height + 'px';
          content.height = content.height + scrollbar.height + 'px';
        }

        if (place === 'inside') {
          scrollbar.top = scrollbar.top - scrollbar.height + 'px';
          content.height = content.height - scrollbar.height + 'px';
        }
      });
    }
  }

  function listenScrolling(scrollbar) {
    if (scrollbar.direction === 'vertical') {
      scrollbar.on('scrolling', function (distance) {
        content.percentY = scrollbar.track.thumb.percentY;
      });

      content.on('scrolling-y', function (distance) {
        scrollbar.track.thumb.percentY = content.percentY;
      });          
    }

    if (scrollbar.direction === 'horizontal') {
      scrollbar.on('scrolling', function (distance) {
        content.percentX = scrollbar.track.thumb.percentX;
      });

      content.on('scrolling-x', function (distance) {
        scrollbar.track.thumb.percentX = content.percentX;
      });
    }
  }

  function createScrollbar(direction) {
    var scrollbar = new Scrollbar(direction);

    /*
      Append element to the DOM first, so you can get offsetWidth, clientWidth
      values not as zero
    */
    $(el).after(scrollbar.el);

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
