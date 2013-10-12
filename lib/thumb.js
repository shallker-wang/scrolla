var $ = require('jquery');
var eventy = require('eventy');

module.exports = function Thumb(el) {
  var track = this;
  var scrolling;

  var thumb = function() {
    this.el = el;
    $(this.el).on('mousedown', onMouseDown);
    $(document).on('mouseup', onDocumentMouseUp);
    $(document).on('mousemove', onDocumentMouseMove);
    return this;
  }.call(Object.create(track));

  function onMouseDown(mousedown) {
    mousedown.preventDefault();
    mousedown.stopPropagation();
    scrolling = true;
    thumb.trigger('scroll-start');
  }

  function onDocumentMouseUp(mouseup) {
    scrolling = false;
    thumb.trigger('scroll-stop');
  }

  function onDocumentMouseMove(mousemove) {
    if (!scrolling) return;
    mousemove.preventDefault();

    if (track.direction === 'horizontal') {
      var offset = mousemove.pageX - track.pageX;
      var percentage =  (offset - thumb.width / 2) / (track.width - thumb.width) * 100;

      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      thumb.percentX = percentage;      
    }

    if (track.direction === 'vertical') {
      var offset = mousemove.pageY - track.pageY;
      var percentage =  (offset - thumb.height / 2) / (track.height - thumb.height) * 100;

      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      thumb.percentY = percentage;
    }

    track.trigger('scrolling');
  }

  thumb.property = function(name, defines) {
    Object.defineProperty(thumb, name, defines);
  }

  thumb.property('width', {
    get: function () {
      return el.offsetWidth;
    },

    set: function (value) {
      return $(el).width(value);
    }
  });

  thumb.property('height', {
    get: function () {
      return el.offsetHeight;
    },

    set: function (value) {
      return $(el).height(value);
    }
  });

  thumb.property('top', {
    get: function () {
      return parseInt($(el).css('top').replace(/[^-\d\.]/g, ''));
    },

    set: function (top) {
      $(el).css('top', top);
      thumb.trigger('top', thumb.top);
    }
  });

  thumb.property('left', {
    get: function () {
      return parseInt($(el).css('left').replace(/[^-\d\.]/g, ''));
    },

    set: function (left) {
      $(el).css('left', left);
      thumb.trigger('left', thumb.left);
    }
  });

  thumb.property('availableMovingWidth', {
    get: function () {
      return track.width - thumb.width;
    }
  });

  thumb.property('availableMovingHeight', {
    get: function () {
      return track.height - thumb.height;
    }
  });

  thumb.property('percentX', {
    get: function () {
      return thumb.left / thumb.availableMovingWidth * 100;
    },

    set: function (percentage) {
      $(el).css('left', percentage / 100 * thumb.availableMovingWidth + 'px');
      thumb.trigger('percent-x', thumb.percentage);
    }
  });

  thumb.property('percentY', {
    get: function () {
      return thumb.top / thumb.availableMovingHeight * 100;
    },

    set: function (percentage) {
      $(el).css('top', percentage / 100 * thumb.availableMovingHeight + 'px');
      thumb.trigger('percent-y', thumb.percentage);
    }
  });

  thumb.property('percentWidth', {
    get: function () {
      return thumb.width / track.width;
    },

    set: function (percentage) {
      return thumb.width = percentage / 100 * track.width;
    }
  });

  thumb.property('percentHeight', {
    get: function () {
      return thumb.height / track.height;
    },

    set: function (percentage) {
      return thumb.height = percentage / 100 * track.height;
    }
  });

  return thumb;
}
