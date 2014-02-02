var duplexer = require('duplexer')
  , through = require('through');

module.exports = function (counter) {
  var countries = {};

  var write = function (buf) {
    countries[buf.country] = (countries[buf.country] || 0) + 1;
  }
  var end = function () { counter.setCounts(countries); }
  var countryCounter = through(write, end);
  
  return duplexer(countryCounter, counter);
};