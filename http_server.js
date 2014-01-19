var http = require('http'),
  through = require('through');

// in this outer scope, this is bind wrong... 
// js is just weird sometimes, it doesn't seem correct...
// var write = function(buf) {
//   this.queue(buf.toString().toUpperCase());
// }
// var upper = through(write);

var server = http.createServer(function(req, res) {
  // solution given:
  // if (req.method === 'POST') {
  //   req.pipe(through(function(buf) {
  //     this.queue(buf.toString().toUpperCase());
  //   })).pipe(res);
  // } else res.end('send me a POST\n');

  var write = function(buf) {
    this.queue(buf.toString().toUpperCase());
  }
  var upper = through(write);

  if (req.method === 'POST') {
    req.pipe(upper).pipe(res);
  }
});

server.listen(process.argv[2]);