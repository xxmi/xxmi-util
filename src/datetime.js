/**
 * 时间戳格式化
 * @returns {*}
 */
const timestampFormat = function (val) {
  let date = '';
  let time = '';
  if (/\d/.test(val)) {
    const datetime = new Date(val);
    let month = datetime.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let _date = datetime.getDate();
    _date = _date < 10 ? `0${_date}` : _date;
    let hours = datetime.getHours();
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = datetime.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = datetime.getSeconds();
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    date = `${datetime.getFullYear()}-${month}-${_date}`;
    time = `${hours}:${minutes}:${seconds}`;
  }
  return { date, time, datetime: `${date} ${time}` };
};

export {
  timestampFormat,
};

export default {
  timestampFormat,
};