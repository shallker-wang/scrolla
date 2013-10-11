var $ = require('jquery');
var eventy = require('eventy');

module.exports = function Content(el) {
  var checkSizeInterval = 500;

  var content = function () {
    this.el = el;
    $(this.el).on('mousewheel DOMMouseScroll', onMousewheel);
    return this;
  }.call(eventy({}));

  function onMousewheel(mousewheel) {
    var ev = mousewheel.originalEvent;
    var delta = ev.detail ? -ev.detail * 10 : ev.wheelDelta;

    if (delta > 0) {
      scrollUp(delta);
    } else {
      scrollDown(-delta);
    }

    function scrollUp(distance) {
      if (content.percentY <= 0) return;
      if (content.scrollTop <= 0) return;
      mousewheel.preventDefault();

      content.scrollTop = content.scrollTop - distance;
      content.trigger('scroll-up', distance);
      content.trigger('scrolling');
    }

    function scrollDown(distance) {
      if (content.percentY >= 100) return;
      if (content.scrollTop >= content.availableScrollHeight) return;
      mousewheel.preventDefault();

      content.scrollTop = content.scrollTop + distance;
      content.trigger('scroll-down', distance);
      content.trigger('scrolling');
    }
  }

  content.property = function(name, defines) {
    Object.defineProperty(content, name, defines);
  }

  /*
    Return or set width of content, this way call avoid using method
  */
  content.property('width', {
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
  content.property('height', {
    get: function () {
      return el.offsetHeight;
    },

    set: function (value) {
      return $(el).height(value);
    }
  });

  content.property('availableScrollWidth', {
    get: function () {
      return content.contentWidth - content.width;
    }
  });

  content.property('availableScrollHeight', {
    get: function () {
      return content.contentHeight - content.height;
    }
  });

  content.property('contentWidth', {
    get: function () {
      return el.scrollWidth;
    }
  });

  content.property('contentHeight', {
    get: function () {
      return el.scrollHeight;
    }
  });

  content.property('percentWidth', {
    get: function () {
      return content.width / content.contentWidth * 100;
    }
  });

  content.property('percentHeight', {
    get: function () {
      return content.height / content.contentHeight * 100;
    }
  });

  content.property('scrollTop', {
    get: function () {
      return el.scrollTop;
    },

    set: function (value) {
      el.scrollTop = value;
      content.trigger('scroll-top', content.scrollTop);
    }
  });

  content.property('scrollLeft', {
    get: function () {
      return el.scrollLeft;
    },

    set: function (value) {
      el.scrollLeft = value;
      content.trigger('scroll-left', content.scrollLeft);
    }
  });

  content.property('percentX', {
    get: function () {
      return content.scrollLeft / content.availableScrollWidth * 100;
    },

    set: function (percentage) {
      el.scrollLeft = percentage / 100 * content.availableScrollWidth;
      content.trigger('percent-x', content.percentX);
    }
  });

  content.property('percentY', {
    get: function () {
      return content.scrollTop / content.availableScrollHeight * 100;
    },

    set: function (percentage) {
      el.scrollTop = percentage / 100 * content.availableScrollHeight;
      content.trigger('percent-y', content.percentY);
    }
  });

  return content;
}
