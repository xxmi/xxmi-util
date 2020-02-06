(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.XxmiUtil = {}));
}(this, (function (exports) { 'use strict';

  /**
   * 秒转 HH:mm:ss
   * @param second 秒
   * @return {string}
   */
  var secondConvertTime = function secondConvertTime(second) {
    var _hour = Math.floor(second / 3600); // 小时


    var _minute = Math.floor(second % 3600 / 60); // 分钟


    var _second = (second % 60).toFixed(3); // 秒


    return "".concat(_hour < 10 ? '0' + _hour : _hour, ":").concat(_minute < 10 ? '0' + _minute : _minute, ":").concat(_second < 10 ? '0' + _second : _second);
  };

  exports.secondConvertTime = secondConvertTime;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
