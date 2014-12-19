$(function() {
  var position = 0;

  var slideSelectors = [
    '#home-slide',
    '#fences-slide',
    '#decks-slide',
    '#other-slide',
    '#qualifications-slide',
    '#contact-slide'
  ];

  var $arrowButtonsDown = $('.slide-arrow-down');
  var $arrowButtonsUp = $('.slide-arrow-down');

  $arrowButtonsDown.click(function arrowDownClick(event) {
    $(event.target).parents('.slide').addClass('slideout');
    var nextSlide = $(slideSelectors[++position]);
    console.log('the next slide is', nextSlide);
    nextSlide.removeClass('start-hidden');
    nextSlide.addClass('slidein-delayed');
  });

  $arrowButtonsUp.click(function arrowUpClick(event) {
    $(event.target).parents('.slide').addClass('slideout');
    $(slideSelectors[--position]).addClass('slidein');
  });

});
