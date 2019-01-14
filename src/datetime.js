import moment from 'moment' ;

/**
 * 时间戳格式化
 * @returns {*}
 */
const timestampFormat = function (val) {
  let date = '';
  let time = '';
  if (/\d/.test(val)) {
    date = moment(val).format('YYYY-MM-DD');
    time = moment(val).format('HH:mm:ss');
  }
  return {date: '', time: '', datetime: `${date} ${time}`};
};

export {
  timestampFormat
};

export default {
  timestampFormat
};