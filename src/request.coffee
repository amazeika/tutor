if typeof window is 'undefined'
  request = module.exports = require 'request'
  request.$$ = (callback, transform) -> (err, res, body) ->
    if err
      callback err
    else if res.statusCode isnt 200
      callback new Error 'unexpected status code'
    else
      try
        callback null, transform body
      catch err
        callback err
