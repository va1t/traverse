var express = require('express');
var cheerio = require('cheerio');
var request = require('request-promise');

var app = express();

var urls = ['http://www.foxnews.com/world'];

app.get('/world', function(req, res) {
  
  var results = {};

  for(var i=0; i<urls.length; i++) {

    request(urls[i])
    .then(function(html) {
      var $ = cheerio.load(html);
      $('.title').filter(function(){
        var entry = $(this).children().first();
        if(!results.hasOwnProperty(entry.text())) {
          results[entry.text()] = entry.attr('href');
        }
      });      
    })
    .then(function(){
      res.send(results);
    })
    .catch(function(err) {
      console.log('['+ urls[i] +'] Error: ' + error );
      res.send('ERROR :(');
    });

  }
});

app.get('/', function(req, res) {
  res.send('Hi :)');
});

app.listen('8080');
console.log('Listening on port 8080..');