/* globals $: false */
/* jshint strict: false */

window.App = window.App || {};
window.App.fullscreen = function() {
  $('.page').css('height', $(window).height());
};

$(function () {

  window.App.fullscreen();
  $(window).resize(function() {
    window.App.fullscreen();
  });

});
