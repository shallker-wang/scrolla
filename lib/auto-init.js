var $ = require('jquery');
var Scrolla = require('./scrolla');

$(function () {
  $('.component.scrolla.auto-init').each(function (i, element) {
    new Scrolla(element);
  });
});
