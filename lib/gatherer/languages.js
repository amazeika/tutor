(function() {
  var extract, fetch, gatherer, languages, load, merge, pagination, request,
    __slice = [].slice;

  gatherer = require('../gatherer');

  languages = require('../languages');

  load = require('../load');

  pagination = require('../pagination');

  request = require('../request');

  module.exports = function(details, callback) {
    var $$;
    $$ = function(fn) {
      return function() {
        var err, rest;
        err = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (err) {
          return callback(err);
        } else {
          return fn.apply(null, rest);
        }
      };
    };
    fetch(1, details, $$(function(html) {
      var max, page, results, _i, _results;
      max = pagination(load(html)('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_languageList_pagingControls')).max;
      if (max === 1) {
        callback(null, merge(extract(html)));
        return;
      }
      results = [extract(html)];
      _results = [];
      for (page = _i = 2; 2 <= max ? _i <= max : _i >= max; page = 2 <= max ? ++_i : --_i) {
        _results.push(fetch(page, details, $$(function(html) {
          var _ref;
          results.push(extract(html));
          if (results.length === max) {
            return callback(null, merge((_ref = []).concat.apply(_ref, results)));
          }
        })));
      }
      return _results;
    }));
  };

  fetch = function(page, details, callback) {
    var url;
    url = gatherer.card.url('Languages.aspx', details, {
      page: page
    });
    return request({
      url: url,
      followRedirect: false
    }, function(err, res, body) {
      if (res.statusCode !== 200) {
        if (err == null) {
          err = new Error('unexpected status code');
        }
      }
      if (err) {
        return callback(err);
      } else {
        return callback(null, body);
      }
    });
  };

  extract = function(html) {
    var $;
    $ = load(html);
    return $('tr.cardItem').map(function() {
      var $name, code, id, language, name, trans_card_name, _ref;
      _ref = this.children(), trans_card_name = _ref[0], language = _ref[1];
      $name = $(trans_card_name);
      code = languages[$(language).text().trim()];
      name = $name.text().trim();
      id = +$name.find('a').attr('href').match(/multiverseid=(\d+)/)[1];
      return [code, name, id];
    });
  };

  merge = function(results) {
    var code, id, name, o, _i, _len, _ref, _ref1;
    o = {};
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      _ref = results[_i], code = _ref[0], name = _ref[1], id = _ref[2];
      if ((_ref1 = o[code]) == null) {
        o[code] = {
          name: name,
          ids: []
        };
      }
      o[code].ids.push(id);
    }
    for (code in o) {
      o[code].ids.sort();
    }
    return o;
  };

}).call(this);
