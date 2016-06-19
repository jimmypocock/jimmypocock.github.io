// window.App = window.App || {};

// window.App.populateThought = function(slug) {
//   var rawFile = new XMLHttpRequest();
//   var fileLocation = 'thoughts/' + slug + '.txt';
//   rawFile.open('GET', fileLocation, false);
//   rawFile.onreadystatechange = function () {
//     if(rawFile.readyState === 4)
//     {
//       if(rawFile.status === 200 || rawFile.status === 0)
//       {
//         var allText = rawFile.responseText;
//         var title = allText.slice(0, allText.indexOf(/\n/));
//         var formattedText = allText.replace(/\n/g, '</br>');
//         // var title = slug.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//         $.get('templates/thought.mst', function(template) {
//           var rendered = Mustache.render(template, { title: title, thought: formattedText });
//           $('#yield').html(rendered);
//         });
//       }
//     }
//   };
//   rawFile.send(null);
// };
