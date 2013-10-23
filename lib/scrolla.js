var $ = require('jquery'),
    Scroll = require('./scroll'),
    VerticalScrollbar = require('./vertical-scrollbar'),
    HorizontalScrollbar = require('./horizontal-scrollbar'),
    eventy = require('eventy');

module.exports = function Scrolla(el) {
  var scroll;
  var verticalScrollbar, horizontalScrollbar;

  var scrolla = function () {
    var scrolla = this;
    this.el = el;
    $(this.el).addClass('inited');

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

    this.property('horizontalScrollbar', {
      get: function () {
        return horizontalScrollbar;
      }
    });

    this.property('verticalScrollbar', {
      get: function () {
        return verticalScrollbar;
      }
    });

    scroll = new Scroll($(el).find('>.scroll').get(0));

    if (scroll.availableScrollWidth > 0) {
      horizontalScrollbar = createScrollbar('horizontal');
    }

    if (scroll.availableScrollHeight > 0) {
      verticalScrollbar = createScrollbar('vertical');
    }

    scroll.on('resize', onScrollResize);
    return this;
  }.call(eventy({}));

  scrolla.scroll = scroll;

  function onScrollResize() {
    if (scroll.availableScrollWidth > 0) {
      if (!horizontalScrollbar) {
        horizontalScrollbar = createScrollbar('horizontal');
      };
    } else {
      if (horizontalScrollbar) {
        horizontalScrollbar.destroy();
        horizontalScrollbar = null;
      }
    }

    if (scroll.availableScrollHeight > 0) {
      if (!verticalScrollbar) {
        verticalScrollbar = createScrollbar('vertical');
      }
    } else {
      if (verticalScrollbar) {
        verticalScrollbar.destroy();
        verticalScrollbar = null;
      }
    }    
  }

  function createScrollbar(direction) {
    var scrollbar;

    if (direction === 'vertical') scrollbar = new VerticalScrollbar();
    if (direction === 'horizontal') scrollbar = new HorizontalScrollbar();

    /*
      Append element to the DOM first, so you can get offsetWidth, clientWidth
      values not as zero
    */
    $(el).append(scrollbar.el);

    initScrollbarSize(scrollbar);
    listenScrolling(scrollbar);
    listenResize(scrollbar);

    return scrollbar;
  }

  /*
    Initialize scrollbar's size
  */
  function initScrollbarSize(scrollbar) {
    if (scrollbar.direction === 'horizontal') {
      scrollbar.track.thumb.percentWidth = scroll.percentWidth;
    }
    
    if (scrollbar.direction === 'vertical') {
      scrollbar.track.thumb.percentHeight = scroll.percentHeight;
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

  function listenResize(scrollbar) {
    if (scrollbar.direction === 'horizontal') {
      scroll.on('resize', function () {
        if (scroll.availableScrollWidth > 0) {
          scrollbar.track.thumb.percentWidth = scroll.percentWidth;
          scrollbar.track.thumb.percentX = scroll.percentX;
        }
      });
    }

    if (scrollbar.direction === 'vertical') {
      scroll.on('resize', function () {
        if (scroll.availableScrollHeight > 0) {
          scrollbar.track.thumb.percentHeight = scroll.percentHeight;
          scrollbar.track.thumb.percentY = scroll.percentY;
        }
      });
    }
  }

  scrolla.property('percentX', {
    get: function () {
      return scrolla.scroll.percentX;
    },

    set: function (percentage) {
      scrolla.scroll.percentX = percentage;
      scrolla.horizontalScrollbar.track.thumb.percentX = percentage;
    }
  });


  scrolla.property('percentY', {
    get: function () {
      return scrolla.scroll.percentY;
    },

    set: function (percentage) {
      scrolla.scroll.percentY = percentage;
      scrolla.verticalScrollbar.track.thumb.percentY = percentage;
    }
  });

  scrolla.top = function () {
    return this.percentY = 0
  }

  scrolla.bottom = function () {
    return this.percentY = 100;
  }

  scrolla.left = function () {
    return this.percentX = 0;
  }

  scrolla.right = function () {
    return this.percentX = 100;
  }

  return scrolla;
}
