var should = require('chai').should();
var http = require('http');
var request = require('request');
var path = require('path');

var bf = require(path.join(process.cwd(),'/lib/browser.find'));

describe('browser finder', function() {

  this.timeout(15000);

  describe('#browserName()', function() {

    it('should return the type of browser we\'re running on', function(done) {
      var goal = 'Chrome 46.0.2469.0';

      http.createServer(function(req,res) {
        console.log('server is firing');
        if(req.method === 'GET' && req.url === '/browsertest') {
          request('http://useragentstring.com', function(err,response,body) {
            console.log('request has been made');
            bf.browserName(body).should.equal(goal);
            done();
          });
          res.end('hello');
        }
      }).listen(1337);

      console.log('\nhttp://localhost:1337/browsertest\n');
    });

  });

});
