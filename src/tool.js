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

/**
 * 判断是 doc 文档
 * @param type
 * @return {*}
 */
const isDoc = function (name = '', type = '') {
  const DOC = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
  const DOC_SUFFIX = ['.doc', '.docx'];
  const suffix = name.substr(name.lastIndexOf('.'));
  return _.includes(DOC_SUFFIX, suffix) || _.includes(DOC, type);
};

/**
 * 删除文件
 * @param fileList 文件列表
 * @param uid 唯一ID
 * @returns {boolean}
 */
const deleteFileList = function (fileList, uid) {
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].uid === uid) {
      fileList.splice(i, 1);
      return false;
    }
  }
};

/**
 * vue
 * 清除表单错误信息
 */
const clearError = function (filed = 'validateError') {
  if (this.$data && this.$data[filed]) {
    for (const key in this.$data[filed]) {
      this.$data[filed][key].message = '';
    }
  }
};

/**
 * 显示错误信息
 * @param code 错误代码
 * @param message 错误消息
 */
const showError = function (codes = [], filed = 'validateError') {
  if (this.$data && this.$data[filed]) {
    const validateError = this.$data[filed];
    const codeList = _.isArray(codes) ? codes : [{code: codes}];
    for (const codeItem of codeList.values()) {
      const {code} = codeItem;
      for (const [key, value] of Object.entries(validateError)) {
        if (Object.keys(value).includes(code)) {
          this.$data[filed][key].message = value[code];
          break;
        }
      }
    }
  }
};

export {
  isNumber,
  isExcel,
  isDoc,
  deleteFileList,
  clearError
};

export default {
  isNumber,
  isExcel,
  isDoc,
  deleteFileList,
  clearError
};