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

### scroll

#### .top()

#### .bottom()

#### .left()

#### .right()

### scroll.content

### scroll.verticalScrollbar

#### .width
#### .height
#### .direction
#### .position
#### .place
#### .top
#### .left

### scroll.horizontalScrollbar

#### .width
#### .height
#### .direction
#### .position
#### .place
#### .top
#### .left


## Compatibility
- IE 9+
- Firefox 3+
- Safari 4+
- Chrome 29+


## Test
http://shallker-wang.github.io/scroll/test/index.html   


## Todo
- ~~horizontal support~~
- horizontal mouse scroll
- smooth scrolling
- unify scrolling speed on browsers
- four corner buttons


## License

  MIT
