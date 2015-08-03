var http = require('http');
var path = require('path');

var findBrowser = require(path.join(process.cwd(),'/lib/browser.find'));
var compatible = require(path.join(process.cwd(),'/lib/compatible'));

module.exports = function(port) {

  var server = http.createServer(function(req,res) {
    if(req.method === 'GET' &&
        (req.url === '/flexbox'
      || req.url === '/border-radius'
      || req.url === '/transitions')) {

      res.writeHeader(200, {
        'Content-Type' : 'text/plain',
        'Access-Control-Allow-Origin' : '*'
      });

      findBrowser(req,function(myBrowser){

        // to be more general, we could use req.url.split('/')[1] here
        var thisThing = req.url.split('/')[1];
        compatible(thisThing,myBrowser,function(yeOrNe) {
          res.end(yeOrNe ? 'ye' : 'ne');
        });

      });

    } else {

      res.writeHeader(404);
      res.end('Content not found :/\n');

    }
  });
  server.listen(port);

}
