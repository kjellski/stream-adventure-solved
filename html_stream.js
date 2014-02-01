var trumpet = require('trumpet')
  , tr = trumpet();
var through = require('through');

var write = function (buf) {
  this.queue(buf.toString().toUpperCase());
}
var end = function () {
  this.queue(null);
}
var upper = through(write, end);

// pipe into trumpet;
var classedHtmlStream = tr.select('.loud').createStream();

classedHtmlStream.pipe(upper).pipe(classedHtmlStream);
process.stdin.pipe(tr).pipe(process.stdout);