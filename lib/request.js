(function() {
  var request;

  if (typeof window === 'undefined') {
    request = module.exports = require('request');
    request.$$ = function(callback, transform) {
      return function(err, res, body) {
        if (err) {
          return callback(err);
        } else if (res.statusCode !== 200) {
          return callback(new Error('unexpected status code'));
        } else {
          try {
            return callback(null, transform(body));
          } catch (err) {
            return callback(err);
          }
        }
      };
    };
  }

}).call(this);
