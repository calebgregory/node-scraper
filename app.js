var path = require('path');
var serve = require(path.join(process.cwd(),'/lib/serve'));

var port = process.env.PORT || 1337;
serve(port);

console.log('\nhttp://localhost:'+port+'/\n');
