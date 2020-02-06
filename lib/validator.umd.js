(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.XxmiUtil = {}));
}(this, (function (exports) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  var getDataType = function getDataType(val) {
    var str = Object.prototype.toString.call(val);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
  };

  var DataType = function DataType() {};

  Object.assign(DataType, {
    getType: function getType(val) {
      return getDataType(val);
    },
    isObject: function isObject(val) {
      return getDataType(val) === 'object';
    },
    isArray: function isArray(val) {
      return getDataType(val) === 'array';
    },
    isString: function isString(val) {
      return getDataType(val) === 'string';
    },
    isNumber: function isNumber(val) {
      return getDataType(val) === 'number';
    },
    isBoolean: function isBoolean(val) {
      return getDataType(val) === 'boolean';
    },
    isUndefined: function isUndefined(val) {
      return getDataType(val) === 'undefined';
    },
    isNull: function isNull(val) {
      return getDataType(val) === 'null';
    },
    isMath: function isMath(val) {
      return getDataType(val) === 'math';
    },
    isFunction: function isFunction(val) {
      return getDataType(val) === 'function';
    }
  });
  /**
   * 整数或者小数
   * @param val
   * @returns {boolean}
   */


  var isIntegerOrDecimal = function isIntegerOrDecimal(val) {
    return /^(-[1-9]\d*|[\d]|[1-9]\d*|-?([1-9]\d*|\d)\.\d+)$/.test(val);
  };
  /**
   * 判断值是否为 undefined、null、""
   * @param val
   * @returns {boolean}
   */


  var isEmpty = function isEmpty(val) {
    return typeof val === 'undefined' || val === null || val === '';
  };

  /**
   * 验证账号
   * @param rule
   * @param val
   * @param callback
   */

  var validateAccount = function validateAccount(rule, val, callback) {
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


  var validatePassword = function validatePassword(rule, val, callback) {
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


  var validatePhone = function validatePhone(rule, val, callback) {
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


  var validatePhoneCode = function validatePhoneCode(rule, val, callback) {
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


  var validateNumber = function validateNumber(rule, val, callback) {
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


  var validateIntegerOrDecimal = function validateIntegerOrDecimal(rule, val, callback) {
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


  var validateLetterNumber = function validateLetterNumber(rule, val, callback) {
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


  var validateLetterNumberChinese = function validateLetterNumberChinese(rule, val, callback) {
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


  var validateUnderlineLetterNumberChinese = function validateUnderlineLetterNumberChinese(rule, val, callback) {
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


  var validateChineseLetterNumberHrUnderline = function validateChineseLetterNumberHrUnderline(rule, val, callback) {
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


  var validateChineseLetterHrUnderline = function validateChineseLetterHrUnderline(rule, val, callback) {
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


  var validateChineseLetterHrSpace = function validateChineseLetterHrSpace(rule, val, callback) {
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


  var validateIdentityCard = function validateIdentityCard(rule, value, callback) {
    if (value === '') {
      return callback();
    }

    if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
      return callback(new Error('格式错误'));
    }

    callback();
  }; //功能：判断IPv4地址的正则表达式：


  var IPV4_REGEX = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/; //功能：判断标准IPv6地址的正则表达式

  var IPV6_STD_REGEX = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/; //功能：判断一般情况压缩的IPv6正则表达式

  var IPV6_COMPRESS_REGEX = /^((?:[0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4})*)?)::((?:([0-9A-Fa-f]{1,4}:)*[0-9A-Fa-f]{1,4})?)$/;
  /*由于IPv6压缩规则是必须要大于等于2个全0块才能压缩
           不合法压缩 ： fe80:0000:8030:49ec:1fc6:57fa:ab52:fe69
  ->           fe80::8030:49ec:1fc6:57fa:ab52:fe69
          该不合法压缩地址直接压缩了处于第二个块的单独的一个全0块，
          上述不合法地址不能通过一般情况的压缩正则表达式IPV6_COMPRESS_REGEX判断出其不合法
          所以定义了如下专用于判断边界特殊压缩的正则表达式
  (边界特殊压缩：开头或末尾为两个全0块，该压缩由于处于边界，且只压缩了2个全0块，不会导致':'数量变少)*/
  //功能：抽取特殊的边界压缩情况

  var IPV6_COMPRESS_REGEX_BORDER = /^(::(?:[0-9A-Fa-f]{1,4})(?::[0-9A-Fa-f]{1,4}){5})|((?:[0-9A-Fa-f]{1,4})(?::[0-9A-Fa-f]{1,4}){5}::)$/; //判断是否为合法IPv4地址

  var isIPv4Address = function isIPv4Address(val) {
    return IPV4_REGEX.test(val);
  }; //判断是否为合法IPv6地址


  var isIPv6Address = function isIPv6Address(val) {
    var NUM = 0;

    for (var i = 0; i < val.length; i++) {
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


  var validateIp = function validateIp(rule, val, callback) {
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


  var validatePreAndAfterSpace = function validatePreAndAfterSpace(rule, val, callback) {
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


  var clearError = function clearError() {
    var filed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'validateError';

    if (this.$data && this.$data[filed]) {
      for (var key in this.$data[filed]) {
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


  var showError = function showError() {
    var codes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var filed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'validateError';

    if (this.$data && this.$data[filed]) {
      var validateError = this.$data[filed];
      var codeList = Array.isArray(codes) ? codes : [{
        code: codes
      }];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = codeList.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var codeItem = _step.value;
          var code = codeItem.code;

          for (var _i = 0, _Object$entries = Object.entries(validateError); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (Object.keys(value).includes(code)) {
              this.$data[filed][key].message = value[code];
              break;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };

  var custom = {};
  /**
   * 安装到 Vue 的原型
   * 用时可直接：this.validate.account
   * @param Vue
   */

  var install = function install(Vue) {
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
      preAndAfterSpace: validatePreAndAfterSpace
    };
    Object.assign(Vue.prototype.validate, custom);
    Vue.prototype.clearError = clearError;
    Vue.prototype.showError = showError;
  };

  var Validator = function Validator(Vue) {
    install(Vue);
  };

  Validator.push = function (args) {
    custom = Object.assign(custom, args);
  };

  exports.clearError = clearError;
  exports.default = Validator;
  exports.install = install;
  exports.showError = showError;
  exports.validateAccount = validateAccount;
  exports.validateChineseLetterHrSpace = validateChineseLetterHrSpace;
  exports.validateChineseLetterHrUnderline = validateChineseLetterHrUnderline;
  exports.validateChineseLetterNumberHrUnderline = validateChineseLetterNumberHrUnderline;
  exports.validateIdentityCard = validateIdentityCard;
  exports.validateIntegerOrDecimal = validateIntegerOrDecimal;
  exports.validateIp = validateIp;
  exports.validateLetterNumber = validateLetterNumber;
  exports.validateLetterNumberChinese = validateLetterNumberChinese;
  exports.validateNumber = validateNumber;
  exports.validatePassword = validatePassword;
  exports.validatePhone = validatePhone;
  exports.validatePhoneCode = validatePhoneCode;
  exports.validateUnderlineLetterNumberChinese = validateUnderlineLetterNumberChinese;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
