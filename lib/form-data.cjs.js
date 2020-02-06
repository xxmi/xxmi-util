'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function formData (obj) {
  var map = {};

  var iteration = function iteration(data) {
    var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (Array.isArray(data)) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var mapKey = "".concat(parentKey, "[").concat(i, "]");

          if (_typeof(item) === 'object' || Array.isArray(item)) {
            iteration(item, mapKey);
          } else {
            map[mapKey] = item;
          }
        }
      }
    } else if (_typeof(data) === 'object' && Object.keys(data).length > 0) {
      for (var _i = 0, _Object$entries = Object.entries(data); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var _mapKey = parentKey !== '' ? "".concat(parentKey, ".").concat(key) : key;

        if (_typeof(value) === 'object' && !(value instanceof File) || Array.isArray(value)) {
          iteration(value, _mapKey);
        } else {
          map[_mapKey] = value;
        }
      }
    }
  };

  iteration(obj);
  var formData = new window.FormData();

  for (var _i2 = 0, _Object$entries2 = Object.entries(map); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    formData.append(key, value);
  }

  return formData;
}

module.exports = formData;
