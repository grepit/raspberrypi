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
exec('. /home/pi/webcam/show/record.sh',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

setTimeout(function() { var cur = + new Date();
console.log(cur);
res.send('<html><body><p><font size="12"><a href="http://192.168.0.198:3000/show?='+cur+'"'+'> show </a></font></p> </body></html>');  }, 10000);
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

 


app.listen(3000);
