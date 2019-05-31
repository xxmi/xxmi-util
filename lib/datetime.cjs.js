'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 时间戳格式化
 * @returns {*}
 */
var timestampFormat = function timestampFormat(val) {
  var date = '';
  var time = '';

  if (/\d/.test(val)) {
    var datetime = new Date(val);
    var month = datetime.getMonth() + 1;
    month = month < 10 ? "0".concat(month) : month;

    var _date = datetime.getDate();

    _date = _date < 10 ? "0".concat(_date) : _date;
    var hours = datetime.getHours();
    hours = hours < 10 ? "0".concat(hours) : hours;
    var minutes = datetime.getMinutes();
    minutes = minutes < 10 ? "0".concat(minutes) : minutes;
    var seconds = datetime.getSeconds();
    seconds = seconds < 10 ? "0".concat(seconds) : seconds;
    date = "".concat(datetime.getFullYear(), "-").concat(month, "-").concat(_date);
    time = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
  }

  return {
    date: date,
    time: time,
    datetime: "".concat(date, " ").concat(time)
  };
};

exports.timestampFormat = timestampFormat;
