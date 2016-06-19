/* globals $: false */
/* jshint strict: false */

$(function () {

  function fullscreen(){
    $('.page').css('height', $(window).height());
  }

  fullscreen();
  $(window).resize(function() {
    fullscreen();
  });

});
