'use strict';

var combine = require('stream-combiner')
  , zlib = require('zlib')
  , through = require('through')
  , split = require('split');

module.exports = function () {
  var group;
  
  function write(buf){
    if (buf.length === 0) return;
    
    var row = JSON.parse(buf);

    if (row.type === 'genre'){
      // we've collected a group
      if (group)
        this.queue(JSON.stringify(group) + '\n');

      group = { name: row.name, books: [] };
    } else {
      group.books.push(row.name);
    }
  };

  function end() {
    if(group)
      this.queue(JSON.stringify(group) + '\n');

    this.queue(null);
  }

  var grouper = through(write, end);

  return combine(
    // read newline-separated json,
    split(),
    // group books into genres,
    grouper,
    // then gzip the output
    zlib.createGzip()
  )
}