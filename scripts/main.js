$(function() {

  var getTemplate = function(slug, data) {
    var fileLocation = 'templates/' + slug + '.mst';
    $.get(fileLocation, function(template) {
      var rendered = Mustache.render(template, data);
      $('#yield').html(rendered);
    });
  };

  var populateNavLinks = function(links) {
    $('#nav .link').hide(150);
    $.get('templates/navLink.mst', function(template) {
      for (var i = 0; i < links.length; i++) {
        var rendered = Mustache.render(template, links[i]);
        $(rendered).appendTo('#nav');
      }
    });
  };

  var populateThought = function(slug) {
    var rawFile = new XMLHttpRequest();
    var fileLocation = 'thoughts/' + slug + '.txt';
    rawFile.open('GET', fileLocation, false);
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status === 0)
        {
          var
          allText       = rawFile.responseText,
          textArr       = allText.split(/\n/).filter(function(v){ return v !== ''; }),
          title         = textArr.shift(),
          formattedText = textArr.join('</br></br>');
          getTemplate('thought',
            {
              title: title,
              thought: formattedText,
              url: window.location.href + '/#/thoughts/' + slug
            }
          );
        }
      }
    };
    rawFile.send(null);
  };

  var resetYield = function() {
    $('#yield').empty();
  };

  var
  homeNavLinks = [
    {
      route:  '/#/developer',
      icon:   'fa-code',
      text:   'Developer'
    },
    {
      route:  '/#/thoughts',
      icon:   'fa-lightbulb-o',
      text:   'Thinker'
    },
    {
      route:  '/#/conversationalist',
      icon:   'fa-coffee',
      text:   'Conversationalist'
    },
  ],
  developerNavLinks = [
    {
      route:  '/#/',
      icon:   'fa-home',
      text:   'Home'
    },
    {
      route:  'https://www.roverpass.com',
      icon:   'fa-code',
      text:   'RoverPass'
    },
    {
      route:  'https://www.github.com/jimmypocock',
      icon:   'fa-github-alt',
      text:   'GitHub'
    },
    {
      route:  'https://codepen.io/jimmypocock',
      icon:   'fa-codepen',
      text:   'CodePen'
    },
  ],
  conversationalistNavLinks = [
    {
      route:  '/#/',
      icon:   'fa-home',
      text:   'Home'
    },
    {
      route:  'https://www.linkedin.com/in/jimmypocock',
      icon:   'fa-linkedin',
      text:   'LinkedIn'
    },
    {
      route:  'https://twitter.com/jimmypocock',
      icon:   'fa-twitter',
      text:   'Twitter'
    },
    {
      route:  'mailto:jimmypocock@yahoo.com',
      icon:   'fa-envelope',
      text:   'Personal Email'
    },
    {
      route:  'mailto:jimmy@roverpass.com',
      icon:   'fa-envelope-o',
      text:   'Professional Email'
    }
  ],
  thoughtsNavLinks = [
    {
      route:  '/#/',
      icon:   'fa-home',
      text:   'Home'
    },
    {
      route:  '/#/thoughts/on-the-harambe-incident',
      icon:   'fa-lightbulb-o',
      text:   'On the Harambe Incident'
    }
  ],
  thoughtNavLinks = [
    {
      route:  '/#/thoughts',
      icon:   'fa-angle-double-left',
      text:   'Thoughts'
    }
  ];

  crossroads.addRoute('/', function() {
    populateNavLinks(homeNavLinks);
    resetYield();
  });

  crossroads.addRoute('/developer', function(slug) {
    populateNavLinks(developerNavLinks);
    resetYield();
  });

  crossroads.addRoute('/conversationalist', function(slug) {
    populateNavLinks(conversationalistNavLinks);
    resetYield();
  });

  crossroads.addRoute('/thoughts', function(slug) {
    populateNavLinks(thoughtsNavLinks);
    resetYield();
  });

  crossroads.addRoute('/thoughts/{slug}', function(slug) {
    populateNavLinks(thoughtNavLinks);
    populateThought(slug);
  });

  // log all routes
  crossroads.routed.add(console.log, console);

  crossroads.bypassed.add(function(request) {
    console.error(request + ' seems to be a dead end...');
  });

  function parseHash(newHash, oldHash){
    // second parameter of crossroads.parse() is the "defaultArguments" and should be an array
    // so we ignore the "oldHash" argument to avoid issues.
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes

  hasher.init(); //start listening for hash changes
});
