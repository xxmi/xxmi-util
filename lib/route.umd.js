(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.XxmiUtil = {}));
}(this, function (exports) { 'use strict';

  var decode = decodeURIComponent;

  function parseQuery(query) {
    var res = {};
    query = query.trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return res;
    }

    query.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join('=')) : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
    return res;
  }

  function query() {
    return parseQuery(location.search);
  }

  exports.query = query;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
