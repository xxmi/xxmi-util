/**
 * 验证是纯数字
 * @param val
 * @return {boolean}
 */
const isNumber = function (val) {
  return /^[\d]+$/.test(val);
};


/**
 * 是否 excel
 * @param type
 * @returns {boolean}
 */
const isExcel = function (type) {
  const EXCEL = ['.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  return _.includes(EXCEL, type);
};


export {
  isNumber,
  isExcel
};

export default {
  isNumber,
  isExcel
};