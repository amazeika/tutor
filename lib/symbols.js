(function() {
  var key, value, _ref;

  _ref = {
    'W': 'White',
    'U': 'Blue',
    'B': 'Black',
    'R': 'Red',
    'G': 'Green',
    '2': 'Two',
    'S': 'Snow',
    'T': 'Tap',
    'Q': 'Untap',
    'X': 'Variable Colorless',
    'W/P': 'Phyrexian White',
    'U/P': 'Phyrexian Blue',
    'B/P': 'Phyrexian Black',
    'R/P': 'Phyrexian Red',
    'G/P': 'Phyrexian Green'
  };
  for (key in _ref) {
    value = _ref[key];
    exports[value] = key;
  }

}).call(this);
