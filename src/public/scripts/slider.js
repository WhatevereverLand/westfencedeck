$(function() {
  var $slides = $('.slide');

  $slides.click(function slideClick(event) {
    console.log('event fired');
    $(event.target).addClass('slideout');
  });
});
