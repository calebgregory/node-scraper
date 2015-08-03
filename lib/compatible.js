var request = require('request');
var cheerio = require('cheerio');

module.exports = function(thisThing,browser,cb) {

  var url = 'http://caniuse.com/'+ thisThing;

  request(url, function(err,response,body) {

    var $ = cheerio.load(body);

    $('.support-list', '.support-container');
    var browserClass = '.browser--'+ browser.name.toLowerCase();
    var yeOrNe = $(browserClass)
      .parent()
      .find('li')
      .filter(function(i,el){
        return $(this).text() === browser.version;
      })
      .attr('title');

    cb(yeOrNe.indexOf('Supported') > -1);

  });

};
