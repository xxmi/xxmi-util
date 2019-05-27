/**
 * 秒转 HH:mm:ss
 * @param second 秒
 * @return {string}
 */
const secondConvertTime = function (second) {
  const _hour = Math.floor(second / 3600); // 小时
  const _minute = Math.floor(second % 3600 / 60); // 分钟
  const _second = (second % 60).toFixed(3); // 秒
  return `${_hour < 10 ? '0' + _hour : _hour}:${_minute < 10 ? '0' + _minute : _minute}:${_second < 10 ? '0' + _second : _second}`;
};

export {
  secondConvertTime,
};
