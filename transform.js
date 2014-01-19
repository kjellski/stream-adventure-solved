var through = require('through');

var write = function (buf) {
  this.queue(buf.toString().toUpperCase());
}

var end = function () {
  this.queue(null);
}

var upper = through(write, end);
process.stdin
  .pipe(upper)
  .pipe(process.stdout);