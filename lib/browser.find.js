var request = require('request');
var cheerio = require('cheerio');

module.exports = function(req,cb) {

  var uas = req.headers['user-agent'];
  var url = 'http://useragentstring.com/?uas='+ uas+ '&getJSON=all';

  request(url, function(err,response,body) {

    var ua = JSON.parse(body); // user-agent
    var browser = {
      name : ua.agent_name,
      version : ua.agent_version.split('.')[0]
    };

    cb(browser);

  });

};
