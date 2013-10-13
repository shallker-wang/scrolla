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
```javascript
var scrolla = new Scrolla(el);
```

### scrolla
#### .percentX
```javascript
scrolla.percentX = 0;
scrolla.percentX = 50;
scrolla.percentX = 100;
```

#### .percentY
```javascript
scrolla.percentY = 0;
scrolla.percentY = 50;
scrolla.percentY = 100;
```

#### .top()
#### .bottom()
#### .left()
#### .right()


### scrolla.horizontalScrollbar
#### .width
#### .height

#### .direction
```javascript
scrolla.horizontalScrollbar.direction  // 'horizontal', read only
```

#### .position
```javascript
scrolla.horizontalScrollbar.position = 'top';
scrolla.horizontalScrollbar.position = 'bottom';
```

#### .place
```javascript
scrolla.horizontalScrollbar.place = 'inside';
scrolla.horizontalScrollbar.place = 'outside';
```

#### .shiftUp(Number pixels)
```javascript
scrolla.horizontalScrollbar.shiftUp(10);
```

#### .shiftDown(Number pixels)
```javascript
scrolla.horizontalScrollbar.shiftDown(10);
```


### scrolla.verticalScrollbar
#### .width
#### .height

#### .direction
```javascript
scrolla.verticalScrollbar.direction  // 'vertical', read only
```

#### .position
```javascript
scrolla.verticalScrollbar.position = 'left';
scrolla.verticalScrollbar.position = 'right';
```

#### .place
```javascript
scrolla.verticalScrollbar.place = 'inside';
scrolla.verticalScrollbar.place = 'outside';
```

#### .shiftLeft(Number pixels)
```javascript
scrolla.verticalScrollbar.shiftLeft(10);
```

#### .shiftRight(Number pixels)
```javascript
scrolla.verticalScrollbar.shiftRgiht(10);
```

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
