var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

var urls = ['http://www.foxnews.com/world.html'];

app.get('/world', function(req, res) {

  for(var i=0; i<urls.length; i++) {
    request(urls[i], function(error, response, html) {
      if(error) {
        console.log('['+ urls[i] +'] Error: ' + error );
      } else {
        var $ = cheerio.load(html);
        console.log($);
      }
    });
  }

  res.send('Done.');
});

app.get('/', function(req, res) {
  res.send('Hi :)');
});

app.listen('8080');
console.log('Listening on port 8080..');