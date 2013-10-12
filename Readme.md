scroll
==========

Custom scrollbar component.

## Installation
```
$ component install shallker-wang/scroll
```

## Quick Start
```javascript
var Scroll = require('scroll'),
    $ = require('jquery');

$(function () {
  $('.component.scroll').each(function (i, el) {
    var scroll = new Scroll(el);
  });
});
```

## Structure
```jade
.component.scroll
  .content
    p Lorem Ipsum

  .scrollbar.horizontal
    .track
      .button.left
      .thumb
      .button.right

  .scrollbar.vertical
    .track
      .button.top
      .thumb
      .button.bottom
```


## API

#### scroll.top()

#### scroll.bottom()

#### scroll.left()

#### scroll.right()


## Compatibility
- IE 9+
- Firefox 3+
- Safari 4+
- Chrome 29+


## Test
http://shallker-wang.github.io/scroll/test/index.html   


## Todo
- ~~horizontal support~~
- smooth scrolling
- four corner buttons


## License

  MIT
