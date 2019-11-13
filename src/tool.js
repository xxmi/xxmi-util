import includes from 'lodash/includes';

const getDataType = function (val) {
  const str = Object.prototype.toString.call(val);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
};
const DataType = function () {
};

Object.assign(DataType, {
  getType(val) {
    return getDataType(val);
  },
  isObject(val) {
    return getDataType(val) === 'object';
  },
  isArray(val) {
    return getDataType(val) === 'array';
  },
  isString(val) {
    return getDataType(val) === 'string';
  },
  isNumber(val) {
    return getDataType(val) === 'number';
  },
  isBoolean(val) {
    return getDataType(val) === 'boolean';
  },
  isUndefined(val) {
    return getDataType(val) === 'undefined';
  },
  isNull(val) {
    return getDataType(val) === 'null';
  },
  isMath(val) {
    return getDataType(val) === 'math';
  },
  isFunction(val) {
    return getDataType(val) === 'function';
  },
});

/**
 * 验证是纯数字
 * @param val
 * @return {boolean}
 */
const isNumber = function (val) {
  return /^[\d]+$/.test(val);
};

/**
 * 整数或者小数
 * @param val
 * @returns {boolean}
 */
const isIntegerOrDecimal = function (val) {
  return /^(-[1-9]\d*|[\d]|[1-9]\d*|-?([1-9]\d*|\d)\.\d+)$/.test(val);
};


/**
 * 是否 excel
 * @param type
 * @returns {boolean}
 */
const isExcel = function (type) {
  const EXCEL = ['.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  return includes(EXCEL, type);
};

/**
 * 是否为 excel
 * @param name
 * @param type
 * @returns {boolean}
 */
const isExcelFull = function (name = '', type = '') {
  const SUFFIX = ['.xlsx', '.xls'];
  const suffix = name.substr(name.lastIndexOf('.'));
  return includes(SUFFIX, suffix) || isExcel(type);
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
  return includes(DOC_SUFFIX, suffix) || includes(DOC, type);
};

/**
 * 判断值是否为 undefined、null、""
 * @param val
 * @returns {boolean}
 */
const isEmpty = function (val) {
  return typeof val === 'undefined' || val === null || val === '';
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
 * 检查flash 是否安装
 * @return {{f: number, v: number}}
 */
const flashChecker = function () {
  let hasFlash = false; // 是否安装了flash
  let version = 0; // flash版本
  if (document.all) {
    const swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (swf) {
      hasFlash = true;
      const VSwf = swf.GetVariable('$version');
      version = parseInt(VSwf.split(' ')[1].split(',')[0]);
    }
  } else {
    if (navigator.plugins && navigator.plugins.length > 0) {
      let swf = navigator.plugins['Shockwave Flash'];
      if (swf) {
        hasFlash = true;
        const words = swf.description.split(' ');
        for (let i = 0; i < words.length; ++i) {
          if (isNaN(parseInt(words[i]))) {
            continue;
          }
          version = parseInt(words[i]);
        }
      }
    }
  }
  return {
    enable: hasFlash,
    version,
  };
};


export {
  getDataType,
  DataType,
  isNumber,
  isIntegerOrDecimal,
  isExcel,
  isExcelFull,
  isDoc,
  isEmpty,
  deleteFileList,
  flashChecker,
};
