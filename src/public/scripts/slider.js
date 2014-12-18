$(function() {
  var $arrowButtons = $('.slide-arrow-down');

  $arrowButtons.click(function arrowClick(event) {
    $(event.target).parents('.slide').addClass('slideout');
  });
});
