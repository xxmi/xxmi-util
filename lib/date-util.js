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

export { secondConvertTime };
