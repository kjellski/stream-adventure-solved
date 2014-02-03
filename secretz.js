var crypto = require('crypto')
  , zlib = require('zlib')
  , tar = require('tar')
  , through = require('through')
  , concat = require('concat-stream')
  ;
// decrypt input to gzip
var decrypter = crypto.createDecipher(process.argv[2], process.argv[3]);

// gunzip file to tar
var unzipper = zlib.createGunzip();

// parse the tar
var parser = tar.Parse();
parser.on('entry', function (entry) {
  if(entry.type !== 'File') return;
  var path = entry.path;
  var hasher = crypto.createHash('md5', { encoding: 'hex' });

  var printer = function (data) {
    process.stdout.write(data.toString() + ' ' + path + '\n');
  }
  entry.pipe(hasher).pipe(concat(printer));
});

process.stdin
  .pipe(decrypter)
  .pipe(unzipper)
  .pipe(parser);