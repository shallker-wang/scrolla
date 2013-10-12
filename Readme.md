scrolla
==========

Custom scrollbar component.

## Installation
```
$ component install shallker-wang/scrolla
```

## Quick Start
```javascript
var Scrolla = require('scrolla'),
    $ = require('jquery');

$(function () {
  $('.component.scrolla').each(function (i, el) {
    var scrolla = new Scrolla(el);
  });
});
```

## Structure
```jade
.component.scrolla
  .scroll
    p Content Lorem Ipsum

  .scrollbar.horizontal.bottom.inside
    .track
      .button.left
      .thumb
      .button.right

  .scrollbar.vertical.right.outside
    .track
      .button.top
      .thumb
      .button.bottom
```


## API

### scrolla
#### .percentX
#### .percentY
#### .top()
#### .bottom()
#### .left()
#### .right()

### scrolla.scroll
#### .percentX
#### .percentY
#### .scrollTop
#### .scrollLeft
#### .top
#### .bottom
#### .left
#### .right

### scrolla.verticalScrollbar
#### .width
#### .height
#### .direction
#### .position
#### .place
#### .top
#### .left
#### .shiftLeft(Number pixels)
#### .shiftRight(Number pixels)

### scrolla.horizontalScrollbar
#### .width
#### .height
#### .direction
#### .position
#### .place
#### .top
#### .left
#### .shiftUp(Number pixels)
#### .shiftDown(Number pixels)


## Compatibility
- IE 9+
- Firefox 3+
- Safari 4+
- Chrome 29+


## Test
http://shallker-wang.github.io/scrolla/test/horizontal.html   
http://shallker-wang.github.io/scrolla/test/vertical.html   
http://shallker-wang.github.io/scrolla/test/both.html   


## Todo
- [x] horizontal support
- [x] horizontal mouse scroll
- [ ] smooth scrolling
- [ ] unify scrolling speed on browsers
- [ ] four corner buttons


## License

  MIT
