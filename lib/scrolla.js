var $ = require('jquery'),
    Scroll = require('./scroll'),
    VerticalScrollbar = require('./vertical-scrollbar'),
    HorizontalScrollbar = require('./horizontal-scrollbar'),
    eventy = require('eventy');

module.exports = function Scrolla(el) {
  var scroll;

  var scrolla = function () {
    var scrolla = this;
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

    scroll = new Scroll($(el).find('>.scroll').get(0));
    return this;
  }.call(eventy({}));

  scrolla.scroll = scroll;

  (function checkSize() {
    if (scroll.availableScrollWidth > 0) {
      if (!scrolla.horizontalScrollbar) {
        scrolla.horizontalScrollbar = createScrollbar('horizontal');
      };
    } else {
      if (scroll.horizontalScrollbar) {
        scrolla.horizontalScrollbar.destroy();
        scrolla.horizontalScrollbar = null;
      }
    }

    if (scroll.availableScrollHeight > 0) {
      if (!scrolla.verticalScrollbar) {
        scrolla.verticalScrollbar = createScrollbar('vertical');
      };
    } else {
      if (scroll.verticalScrollbar) {
        scrolla.verticalScrollbar.destroy();
        scrolla.verticalScrollbar = null;
      }
    }

    setTimeout(checkSize, 200);
  })()

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
