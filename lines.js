var split = require('split'),
  through = require('through');

var lineCounter = 0;

function write(buf) {
  var line = buf.toString();
  if (lineCounter % 2 === 0) {
    this.queue(line.toLowerCase());
  } else {
    this.queue(line.toUpperCase());
  }

  this.queue('\n');
  lineCounter++;
}

function end() {
  this.queue(null);
}

var upperEvens = through(write, end);
process.stdin
  .pipe(split())
  .pipe(upperEvens)
  .pipe(process.stdout);