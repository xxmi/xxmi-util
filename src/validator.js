import { isEmpty, isIntegerOrDecimal } from './tool';

/**
 * 验证账号
 * @param rule
 * @param val
 * @param callback
 */
const validateAccount = function (rule, val, callback) {
  if (/^[a-zA-Z][a-zA-Z0-9_]{4,17}$/.test(val)) {
    callback();
  } else {
    callback(new Error('5~18个字符，可使用大小写字母、数字、下划线，需以字母开头'));
  }
};


/**
 * 验证密码
 * @param rule
 * @param val
 * @param callback
 */
const validatePassword = function (rule, val, callback) {
  if (/^[a-zA-Z0-9]{6,30}$/.test(val)) {
    callback();
  } else {
    callback(new Error('6~30个字符，可使用大小写字母、数字'));
  }
};


/**
 * 验证手机号码
 * @param rule
 * @param val
 * @param callback
 */
const validatePhone = function (rule, val, callback) {
  if (/^1[0-9]{10}$/.test(val)) {
    callback();
  } else {
    callback(new Error('请输入如正确的手机号码'));
  }
};

/**
 * 验证手机验证码
 * @param rule
 * @param val
 * @param callback
 */
const validatePhoneCode = function (rule, val, callback) {
  if (/^\d{,6}$/.test(val)) {
    callback();
  } else {
    callback(new Error('请输入6个数字的验证码'));
  }
};

/**
 * 验证只能输入数字
 * @param rule
 * @param val
 * @param callback
 */
const validateNumber = function (rule, val, callback) {
  if (/^[0-9]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入数字'));
  }
};

/**
 * 验证数组的是整数或者小数
 * @param rule
 * @param val
 * @param callback
 */
const validateIntegerOrDecimal = function (rule, val, callback) {
  if (isEmpty(val) || isIntegerOrDecimal(val)) {
    callback();
  } else {
    callback(new Error('只能输入整数或者小数'));
  }
};


/**
 * 验证只能输入字母数字
 * @param rule
 * @param val
 * @param callback
 */
const validateLetterNumber = function (rule, val, callback) {
  if (/^[A-Za-z0-9]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入字母、数字'));
  }
};

/**
 * 验证只能输入字母、数字、中文
 * @param rule
 * @param val
 * @param callback
 */
const validateLetterNumberChinese = function (rule, val, callback) {
  if (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入字母、数字、中文'));
  }
};

/**
 * 验证只能输入_、字母、数字、中文
 * @param rule
 * @param val
 * @param callback
 */
const validateUnderlineLetterNumberChinese = function (rule, val, callback) {
  if (/^[_A-Za-z0-9\u4e00-\u9fa5]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入_、字母、数字、中文'));
  }
};

/**
 * 验证只能输入：中英文、数字、-、_
 * @param rule
 * @param val
 * @param callback
 */
const validateChineseLetterNumberHrUnderline = function (rule, val, callback) {
  if (/^[-_A-Za-z0-9\u4e00-\u9fa5]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入：中英文、数字、-、_'));
  }
};

/**
 * 验证只能输入：中文、英文、-、_
 * @param rule
 * @param val
 * @param callback
 */
const validateChineseLetterHrUnderline = function (rule, val, callback) {
  if (/^[-_A-Za-z\u4e00-\u9fa5]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入：中文、英文、-、_'));
  }
};

/**
 * 验证只能输入：中英文、横线和空格,需以中英文开头和结尾
 * @param rule
 * @param val
 * @param callback
 */
const validateChineseLetterHrSpace = function (rule, val, callback) {
  if (/^[A-Za-z\u4e00-\u9fa5]+[-\sA-Za-z\u4e00-\u9fa5]*[A-Za-z\u4e00-\u9fa5]+$/.test(val)) {
    callback();
  } else {
    callback(new Error('只能输入：中英文、横线和空格,需以中英文开头和结尾'));
  }
};

/**
 * 验证身份证号码
 * @param rule
 * @param value
 * @param callback
 * @return {*}
 */
const validateIdentityCard = function (rule, value, callback) {
  if (value === '') {
    return callback();
  }
  if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
    return callback(new Error('格式错误'));
  }
  callback();
};


//功能：判断IPv4地址的正则表达式：
const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;

//功能：判断标准IPv6地址的正则表达式
const IPV6_STD_REGEX = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

//功能：判断一般情况压缩的IPv6正则表达式
const IPV6_COMPRESS_REGEX = /^((?:[0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4})*)?)::((?:([0-9A-Fa-f]{1,4}:)*[0-9A-Fa-f]{1,4})?)$/;

/*由于IPv6压缩规则是必须要大于等于2个全0块才能压缩
         不合法压缩 ： fe80:0000:8030:49ec:1fc6:57fa:ab52:fe69
->           fe80::8030:49ec:1fc6:57fa:ab52:fe69
        该不合法压缩地址直接压缩了处于第二个块的单独的一个全0块，
        上述不合法地址不能通过一般情况的压缩正则表达式IPV6_COMPRESS_REGEX判断出其不合法
        所以定义了如下专用于判断边界特殊压缩的正则表达式
(边界特殊压缩：开头或末尾为两个全0块，该压缩由于处于边界，且只压缩了2个全0块，不会导致':'数量变少)*/
//功能：抽取特殊的边界压缩情况
const IPV6_COMPRESS_REGEX_BORDER = /^(::(?:[0-9A-Fa-f]{1,4})(?::[0-9A-Fa-f]{1,4}){5})|((?:[0-9A-Fa-f]{1,4})(?::[0-9A-Fa-f]{1,4}){5}::)$/;

//判断是否为合法IPv4地址
const isIPv4Address = function (val) {
  return IPV4_REGEX.test(val);
};

//判断是否为合法IPv6地址
const isIPv6Address = function (val) {
  let NUM = 0;
  for (let i = 0; i < val.length; i++) {
    if (val.charAt(i) == ':') NUM++;
  }
  if (NUM > 7) return false;
  if (IPV6_STD_REGEX.test(val)) {
    return true;
  }
  if (NUM == 7) {
    return IPV6_COMPRESS_REGEX_BORDER.test(val);
  } else {
    return IPV6_COMPRESS_REGEX.test(val);
  }
};

/**
 * 验证IP地址
 * @param rule
 * @param val
 * @param callback
 */
const validateIp = function (rule, val, callback) {
  if (isIPv4Address(val) || isIPv6Address(val)) {
    callback();
  } else {
    callback(new Error('请输入正确的IP地址'));
  }
};

/**
 * 验证前后空格
 * @param rule
 * @param val
 * @param callback
 */
const validatePreAndAfterSpace = function (rule, val, callback) {
  if (/^\s+|\s+$/g.test(val)) {
    callback(new Error('前后不能输入空格'));
  } else {
    callback();
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
 * @param codes 错误代码
 * @param filed 验证器错误对象域。默认：validateError
 * 示例：
 *
 * validateError: {
      account: {
        'message':'', // 存放消息的字段
        '60008': '账户名称已存在' // 60008的错误代码的错误提示消息
      }
  }
 *
 * this.showError('60008');
 * this.showError([{code:'60008'}]]);
 */
const showError = function (codes = [], filed = 'validateError') {
  if (this.$data && this.$data[filed]) {
    const validateError = this.$data[filed];
    const codeList = Array.isArray(codes) ? codes : [{ code: codes }];
    for (const codeItem of codeList.values()) {
      const { code } = codeItem;
      for (const [key, value] of Object.entries(validateError)) {
        if (Object.keys(value).includes(code)) {
          this.$data[filed][key].message = value[code];
          break;
        }
      }
    }
  }
};


let custom = {};


/**
 * 安装到 Vue 的原型
 * 用时可直接：this.validate.account
 * @param Vue
 */
const install = function (Vue) {
  Vue.prototype.validate = {
    account: validateAccount,
    password: validatePassword,
    phone: validatePhone,
    phoneCode: validatePhoneCode,
    number: validateNumber,
    integerOrDecimal: validateIntegerOrDecimal,
    letterNumber: validateLetterNumber,
    letterNumberChinese: validateLetterNumberChinese,
    underlineLetterNumberChinese: validateUnderlineLetterNumberChinese,
    chineseLetterNumberHrUnderline: validateChineseLetterNumberHrUnderline,
    chineseLetterHrUnderline: validateChineseLetterHrUnderline,
    chineseLetterHrSpace: validateChineseLetterHrSpace,
    identityCard: validateIdentityCard,
    ip: validateIp,
    preAndAfterSpace: validatePreAndAfterSpace,
  };
  Object.assign(Vue.prototype.validate, custom);
  Vue.prototype.clearError = clearError;
  Vue.prototype.showError = showError;
};

export {
  validateAccount,
  validatePassword,
  validatePhone,
  validatePhoneCode,
  validateNumber,
  validateIntegerOrDecimal,
  validateLetterNumber,
  validateLetterNumberChinese,
  validateUnderlineLetterNumberChinese,
  validateChineseLetterNumberHrUnderline,
  validateChineseLetterHrUnderline,
  validateChineseLetterHrSpace,
  validateIdentityCard,
  validateIp,
  clearError,
  showError,
  install,
};

const Validator = function (Vue) {
  install(Vue);
};
Validator.push = function (args) {
  custom = Object.assign(custom, args);
};

export default Validator;
