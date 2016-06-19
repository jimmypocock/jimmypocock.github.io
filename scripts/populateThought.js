/* jshint strict: false */
/* globals $: false */
/* globals Mustache: false */

window.App = window.App || {};

window.App.populateThought = function(slug) {
  var rawFile = new XMLHttpRequest();
  var fileLocation = 'thoughts/' + slug + '.txt';
  rawFile.open('GET', fileLocation, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status === 0)
      {
        var allText = rawFile.responseText;
        var formattedText = allText.replace(/\n/g, '</br>');
        $.get('templates/thought.mst', function(template) {
          var rendered = Mustache.render(template, { thought: formattedText });
          $('#yield').html(rendered);
        });
      }
    }
  };
  rawFile.send(null);
};
