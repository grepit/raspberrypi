var express = require('express'),
  app = express();
  http = require('http');
  var fs = require("fs");
  httpServer = http.Server(app);
  var path = require('path');
var exec = require('child_process').exec;
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('system')
});



app.get('/see/', function(req, res) {
exec('./record.sh',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

setTimeout(function() { var cur = + new Date();
console.log(cur);
res.send('<html> <head> <title>see</title> <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> </head><body><p> </br></br></br></br> </br> </br> </br> <center><font size="12"><a  class="w3-btn w3-green" href="http://192.168.0.198:3000/show?='+cur+'"'+'> Click to See Him <img src="http://192.168.0.198:3000/public/camera.svg" alt="Mountain View" style="width:100px;height:50px;"></a> </center></font></p> </body></html>');  }, 10000);
})


function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.get('/show', nocache, sendContent);

function sendContent(req, res) {
  var localPath = 'public/index.html';
  var mimeType = '';
  fs.readFile(localPath, 'utf8', function (err, contents) {
    if (!err && contents) {
      res.header('Content-Type', mimeType);
      res.header('Content-Length', contents.length);
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });



}

console.log("go to browser :192.168.0.198:3000/see "); 


app.listen(3000);
