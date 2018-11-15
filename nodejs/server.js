const http = require('http'),
    url = require('url'),
    fs = require('fs');
require('./loginModule/loginModule.js');
var app = http.createServer(function (req, res) {
  var q = url.parse(req.url, true),
    myPath = q.pathname,
    filename = "." + myPath;
  
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  

    if(myPath.indexOf('.js') !== -1){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
    }else if(myPath.indexOf('.css') !== -1){
      res.writeHead(200, {'Content-Type': 'text/css'});
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'}); 
    }

    res.write(data, "utf8");
    return res.end();
  });
}).listen(8080);