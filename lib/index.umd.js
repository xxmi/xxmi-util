(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.XxmiUtil = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  /**生成字母数组**/
  function getAllLetter() {
    var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    return letterStr.split(",");
  }
  /**生成一个随机数**/


  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**生成一个随机色**/


  function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
  }

  var Captcha =
  /*#__PURE__*/
  function () {
    // 创建一个图形验证码对象，接收options对象为参数
    function Captcha(options) {
      _classCallCheck(this, Captcha);

      /**版本号**/
      this.version = '1.0.0';
      this.options = {
        // 默认options参数值
        id: "",
        // 容器Id
        canvasId: "verifyCanvas",
        //canvas的ID
        width: "100",
        // 默认canvas宽度
        height: "30",
        // 默认canvas高度
        type: "blend",
        // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        code: "",
        // 生成的验证码
        fillStyle: 'auto' // 背景颜色；auto:自动生成；

      };

      if (Object.prototype.toString.call(options) == "[object Object]") {
        // 判断传入参数类型
        for (var i in options) {
          // 根据传入的参数，修改默认参数值
          this.options[i] = options[i];
        }
      } else {
        this.options.id = options;
      }

      this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
      this.options.letterArr = getAllLetter();

      this._init();

      this.refresh();
    }
    /**初始化方法**/


    _createClass(Captcha, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var con = document.getElementById(this.options.id);
        var canvas = document.createElement("canvas");
        this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
        this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
        canvas.id = this.options.canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = "pointer";
        canvas.innerHTML = "您的浏览器版本不支持canvas";
        con.appendChild(canvas);

        canvas.onclick = function () {
          _this.refresh();
        };
      }
      /**生成验证码**/

    }, {
      key: "refresh",
      value: function refresh() {
        this.options.code = "";
        var canvas = document.getElementById(this.options.canvasId);
        var ctx = null;

        if (canvas.getContext) {
          ctx = canvas.getContext('2d');
        } else {
          return;
        }

        ctx.textBaseline = "middle";
        ctx.fillStyle = this.options.fillStyle === 'auto' ? randomColor(180, 240) : this.options.fillStyle;
        ctx.fillRect(0, 0, this.options.width, this.options.height);
        var txtArr = '';

        if (this.options.type == "blend") {
          //判断验证码类型
          txtArr = this.options.numArr.concat(this.options.letterArr);
        } else if (this.options.type == "number") {
          txtArr = this.options.numArr;
        } else {
          txtArr = this.options.letterArr;
        }

        for (var i = 1; i <= 4; i++) {
          var txt = txtArr[randomNum(0, txtArr.length)];
          this.options.code += txt;
          ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; // 随机生成字体大小

          ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色

          ctx.shadowOffsetX = randomNum(-3, 3);
          ctx.shadowOffsetY = randomNum(-3, 3);
          ctx.shadowBlur = randomNum(-3, 3);
          ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
          var x = this.options.width / 5 * i;
          var y = this.options.height / 2;
          var deg = randomNum(-30, 30);
          /**设置旋转角度和坐标原点**/

          ctx.translate(x, y);
          ctx.rotate(deg * Math.PI / 180);
          ctx.fillText(txt, 0, 0);
          /**恢复旋转角度和坐标原点**/

          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
        }
        /**绘制干扰线**/


        for (var _i = 0; _i < 4; _i++) {
          ctx.strokeStyle = randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
          ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
          ctx.stroke();
        }
        /**绘制干扰点**/


        for (var _i2 = 0; _i2 < this.options.width / 4; _i2++) {
          ctx.fillStyle = randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      /**验证验证码**/

    }, {
      key: "validate",
      value: function validate(code) {
        code = code.toLowerCase();
        var v_code = this.options.code.toLowerCase();

        if (code == v_code) {
          return true;
        }

        return false;
      }
    }]);

    return Captcha;
  }();

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

  var dateUtil = /*#__PURE__*/Object.freeze({
    __proto__: null,
    secondConvertTime: secondConvertTime
  });

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

  var datetime = /*#__PURE__*/Object.freeze({
    __proto__: null,
    timestampFormat: timestampFormat
  });

  function formData (obj) {
    var map = {};

    var iteration = function iteration(data) {
      var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (Array.isArray(data)) {
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var mapKey = "".concat(parentKey, "[").concat(i, "]");

            if (_typeof(item) === 'object' || Array.isArray(item)) {
              iteration(item, mapKey);
            } else {
              map[mapKey] = item;
            }
          }
        }
      } else if (_typeof(data) === 'object' && Object.keys(data).length > 0) {
        for (var _i = 0, _Object$entries = Object.entries(data); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          var _mapKey = parentKey !== '' ? "".concat(parentKey, ".").concat(key) : key;

          if (_typeof(value) === 'object' && !(value instanceof File) || Array.isArray(value)) {
            iteration(value, _mapKey);
          } else {
            map[_mapKey] = value;
          }
        }
      }
    };

    iteration(obj);
    var formData = new window.FormData();

    for (var _i2 = 0, _Object$entries2 = Object.entries(map); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      formData.append(key, value);
    }

    return formData;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? _strictIndexOf(array, value, fromIndex)
      : _baseFindIndex(array, _baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf;

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
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

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
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
  }

  var isString_1 = isString;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber_1(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite_1(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  var toInteger_1 = toInteger;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return _arrayMap(props, function(key) {
      return object[key];
    });
  }

  var _baseValues = baseValues;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

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

  var isArguments_1 = isArguments;

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

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag$1 = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag$1] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

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

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$2.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object == null ? [] : _baseValues(object, keys_1(object));
  }

  var values_1 = values;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Checks if `value` is in `collection`. If `collection` is a string, it's
   * checked for a substring of `value`, otherwise
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * is used for equality comparisons. If `fromIndex` is negative, it's used as
   * the offset from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'a': 1, 'b': 2 }, 1);
   * // => true
   *
   * _.includes('abcd', 'bc');
   * // => true
   */
  function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike_1(collection) ? collection : values_1(collection);
    fromIndex = (fromIndex && !guard) ? toInteger_1(fromIndex) : 0;

    var length = collection.length;
    if (fromIndex < 0) {
      fromIndex = nativeMax(length + fromIndex, 0);
    }
    return isString_1(collection)
      ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
      : (!!length && _baseIndexOf(collection, value, fromIndex) > -1);
  }

  var includes_1 = includes;

  var exif = createCommonjsModule(function (module, exports) {
  (function() {

      var debug = false;

      var EXIF = function(obj) {
          if (obj instanceof EXIF) return obj;
          if (!(this instanceof EXIF)) return new EXIF(obj);
          this.EXIFwrapped = obj;
      };

      {
          if ( module.exports) {
              exports = module.exports = EXIF;
          }
          exports.EXIF = EXIF;
      }

      var ExifTags = EXIF.Tags = {

          // version tags
          0x9000 : "ExifVersion",             // EXIF version
          0xA000 : "FlashpixVersion",         // Flashpix format version

          // colorspace tags
          0xA001 : "ColorSpace",              // Color space information tag

          // image configuration
          0xA002 : "PixelXDimension",         // Valid width of meaningful image
          0xA003 : "PixelYDimension",         // Valid height of meaningful image
          0x9101 : "ComponentsConfiguration", // Information about channels
          0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

          // user information
          0x927C : "MakerNote",               // Any desired information written by the manufacturer
          0x9286 : "UserComment",             // Comments by user

          // related file
          0xA004 : "RelatedSoundFile",        // Name of related sound file

          // date and time
          0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
          0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
          0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
          0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
          0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

          // picture-taking conditions
          0x829A : "ExposureTime",            // Exposure time (in seconds)
          0x829D : "FNumber",                 // F number
          0x8822 : "ExposureProgram",         // Exposure program
          0x8824 : "SpectralSensitivity",     // Spectral sensitivity
          0x8827 : "ISOSpeedRatings",         // ISO speed rating
          0x8828 : "OECF",                    // Optoelectric conversion factor
          0x9201 : "ShutterSpeedValue",       // Shutter speed
          0x9202 : "ApertureValue",           // Lens aperture
          0x9203 : "BrightnessValue",         // Value of brightness
          0x9204 : "ExposureBias",            // Exposure bias
          0x9205 : "MaxApertureValue",        // Smallest F number of lens
          0x9206 : "SubjectDistance",         // Distance to subject in meters
          0x9207 : "MeteringMode",            // Metering mode
          0x9208 : "LightSource",             // Kind of light source
          0x9209 : "Flash",                   // Flash status
          0x9214 : "SubjectArea",             // Location and area of main subject
          0x920A : "FocalLength",             // Focal length of the lens in mm
          0xA20B : "FlashEnergy",             // Strobe energy in BCPS
          0xA20C : "SpatialFrequencyResponse",    //
          0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
          0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
          0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
          0xA214 : "SubjectLocation",         // Location of subject in image
          0xA215 : "ExposureIndex",           // Exposure index selected on camera
          0xA217 : "SensingMethod",           // Image sensor type
          0xA300 : "FileSource",              // Image source (3 == DSC)
          0xA301 : "SceneType",               // Scene type (1 == directly photographed)
          0xA302 : "CFAPattern",              // Color filter array geometric pattern
          0xA401 : "CustomRendered",          // Special processing
          0xA402 : "ExposureMode",            // Exposure mode
          0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
          0xA404 : "DigitalZoomRation",       // Digital zoom ratio
          0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
          0xA406 : "SceneCaptureType",        // Type of scene
          0xA407 : "GainControl",             // Degree of overall image gain adjustment
          0xA408 : "Contrast",                // Direction of contrast processing applied by camera
          0xA409 : "Saturation",              // Direction of saturation processing applied by camera
          0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
          0xA40B : "DeviceSettingDescription",    //
          0xA40C : "SubjectDistanceRange",    // Distance to subject

          // other tags
          0xA005 : "InteroperabilityIFDPointer",
          0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
      };

      var TiffTags = EXIF.TiffTags = {
          0x0100 : "ImageWidth",
          0x0101 : "ImageHeight",
          0x8769 : "ExifIFDPointer",
          0x8825 : "GPSInfoIFDPointer",
          0xA005 : "InteroperabilityIFDPointer",
          0x0102 : "BitsPerSample",
          0x0103 : "Compression",
          0x0106 : "PhotometricInterpretation",
          0x0112 : "Orientation",
          0x0115 : "SamplesPerPixel",
          0x011C : "PlanarConfiguration",
          0x0212 : "YCbCrSubSampling",
          0x0213 : "YCbCrPositioning",
          0x011A : "XResolution",
          0x011B : "YResolution",
          0x0128 : "ResolutionUnit",
          0x0111 : "StripOffsets",
          0x0116 : "RowsPerStrip",
          0x0117 : "StripByteCounts",
          0x0201 : "JPEGInterchangeFormat",
          0x0202 : "JPEGInterchangeFormatLength",
          0x012D : "TransferFunction",
          0x013E : "WhitePoint",
          0x013F : "PrimaryChromaticities",
          0x0211 : "YCbCrCoefficients",
          0x0214 : "ReferenceBlackWhite",
          0x0132 : "DateTime",
          0x010E : "ImageDescription",
          0x010F : "Make",
          0x0110 : "Model",
          0x0131 : "Software",
          0x013B : "Artist",
          0x8298 : "Copyright"
      };

      var GPSTags = EXIF.GPSTags = {
          0x0000 : "GPSVersionID",
          0x0001 : "GPSLatitudeRef",
          0x0002 : "GPSLatitude",
          0x0003 : "GPSLongitudeRef",
          0x0004 : "GPSLongitude",
          0x0005 : "GPSAltitudeRef",
          0x0006 : "GPSAltitude",
          0x0007 : "GPSTimeStamp",
          0x0008 : "GPSSatellites",
          0x0009 : "GPSStatus",
          0x000A : "GPSMeasureMode",
          0x000B : "GPSDOP",
          0x000C : "GPSSpeedRef",
          0x000D : "GPSSpeed",
          0x000E : "GPSTrackRef",
          0x000F : "GPSTrack",
          0x0010 : "GPSImgDirectionRef",
          0x0011 : "GPSImgDirection",
          0x0012 : "GPSMapDatum",
          0x0013 : "GPSDestLatitudeRef",
          0x0014 : "GPSDestLatitude",
          0x0015 : "GPSDestLongitudeRef",
          0x0016 : "GPSDestLongitude",
          0x0017 : "GPSDestBearingRef",
          0x0018 : "GPSDestBearing",
          0x0019 : "GPSDestDistanceRef",
          0x001A : "GPSDestDistance",
          0x001B : "GPSProcessingMethod",
          0x001C : "GPSAreaInformation",
          0x001D : "GPSDateStamp",
          0x001E : "GPSDifferential"
      };

       // EXIF 2.3 Spec
      var IFD1Tags = EXIF.IFD1Tags = {
          0x0100: "ImageWidth",
          0x0101: "ImageHeight",
          0x0102: "BitsPerSample",
          0x0103: "Compression",
          0x0106: "PhotometricInterpretation",
          0x0111: "StripOffsets",
          0x0112: "Orientation",
          0x0115: "SamplesPerPixel",
          0x0116: "RowsPerStrip",
          0x0117: "StripByteCounts",
          0x011A: "XResolution",
          0x011B: "YResolution",
          0x011C: "PlanarConfiguration",
          0x0128: "ResolutionUnit",
          0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
          0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
          0x0211: "YCbCrCoefficients",
          0x0212: "YCbCrSubSampling",
          0x0213: "YCbCrPositioning",
          0x0214: "ReferenceBlackWhite"
      };

      var StringValues = EXIF.StringValues = {
          ExposureProgram : {
              0 : "Not defined",
              1 : "Manual",
              2 : "Normal program",
              3 : "Aperture priority",
              4 : "Shutter priority",
              5 : "Creative program",
              6 : "Action program",
              7 : "Portrait mode",
              8 : "Landscape mode"
          },
          MeteringMode : {
              0 : "Unknown",
              1 : "Average",
              2 : "CenterWeightedAverage",
              3 : "Spot",
              4 : "MultiSpot",
              5 : "Pattern",
              6 : "Partial",
              255 : "Other"
          },
          LightSource : {
              0 : "Unknown",
              1 : "Daylight",
              2 : "Fluorescent",
              3 : "Tungsten (incandescent light)",
              4 : "Flash",
              9 : "Fine weather",
              10 : "Cloudy weather",
              11 : "Shade",
              12 : "Daylight fluorescent (D 5700 - 7100K)",
              13 : "Day white fluorescent (N 4600 - 5400K)",
              14 : "Cool white fluorescent (W 3900 - 4500K)",
              15 : "White fluorescent (WW 3200 - 3700K)",
              17 : "Standard light A",
              18 : "Standard light B",
              19 : "Standard light C",
              20 : "D55",
              21 : "D65",
              22 : "D75",
              23 : "D50",
              24 : "ISO studio tungsten",
              255 : "Other"
          },
          Flash : {
              0x0000 : "Flash did not fire",
              0x0001 : "Flash fired",
              0x0005 : "Strobe return light not detected",
              0x0007 : "Strobe return light detected",
              0x0009 : "Flash fired, compulsory flash mode",
              0x000D : "Flash fired, compulsory flash mode, return light not detected",
              0x000F : "Flash fired, compulsory flash mode, return light detected",
              0x0010 : "Flash did not fire, compulsory flash mode",
              0x0018 : "Flash did not fire, auto mode",
              0x0019 : "Flash fired, auto mode",
              0x001D : "Flash fired, auto mode, return light not detected",
              0x001F : "Flash fired, auto mode, return light detected",
              0x0020 : "No flash function",
              0x0041 : "Flash fired, red-eye reduction mode",
              0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
              0x0047 : "Flash fired, red-eye reduction mode, return light detected",
              0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
              0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
              0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
              0x0059 : "Flash fired, auto mode, red-eye reduction mode",
              0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
              0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
          },
          SensingMethod : {
              1 : "Not defined",
              2 : "One-chip color area sensor",
              3 : "Two-chip color area sensor",
              4 : "Three-chip color area sensor",
              5 : "Color sequential area sensor",
              7 : "Trilinear sensor",
              8 : "Color sequential linear sensor"
          },
          SceneCaptureType : {
              0 : "Standard",
              1 : "Landscape",
              2 : "Portrait",
              3 : "Night scene"
          },
          SceneType : {
              1 : "Directly photographed"
          },
          CustomRendered : {
              0 : "Normal process",
              1 : "Custom process"
          },
          WhiteBalance : {
              0 : "Auto white balance",
              1 : "Manual white balance"
          },
          GainControl : {
              0 : "None",
              1 : "Low gain up",
              2 : "High gain up",
              3 : "Low gain down",
              4 : "High gain down"
          },
          Contrast : {
              0 : "Normal",
              1 : "Soft",
              2 : "Hard"
          },
          Saturation : {
              0 : "Normal",
              1 : "Low saturation",
              2 : "High saturation"
          },
          Sharpness : {
              0 : "Normal",
              1 : "Soft",
              2 : "Hard"
          },
          SubjectDistanceRange : {
              0 : "Unknown",
              1 : "Macro",
              2 : "Close view",
              3 : "Distant view"
          },
          FileSource : {
              3 : "DSC"
          },

          Components : {
              0 : "",
              1 : "Y",
              2 : "Cb",
              3 : "Cr",
              4 : "R",
              5 : "G",
              6 : "B"
          }
      };

      function imageHasData(img) {
          return !!(img.exifdata);
      }


      function base64ToArrayBuffer(base64, contentType) {
          contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
          base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
          var binary = atob(base64);
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);
          for (var i = 0; i < len; i++) {
              view[i] = binary.charCodeAt(i);
          }
          return buffer;
      }

      function objectURLToBlob(url, callback) {
          var http = new XMLHttpRequest();
          http.open("GET", url, true);
          http.responseType = "blob";
          http.onload = function(e) {
              if (this.status == 200 || this.status === 0) {
                  callback(this.response);
              }
          };
          http.send();
      }

      function getImageData(img, callback) {
          function handleBinaryFile(binFile) {
              var data = findEXIFinJPEG(binFile);
              img.exifdata = data || {};
              var iptcdata = findIPTCinJPEG(binFile);
              img.iptcdata = iptcdata || {};
              if (EXIF.isXmpEnabled) {
                 var xmpdata= findXMPinJPEG(binFile);
                 img.xmpdata = xmpdata || {};               
              }
              if (callback) {
                  callback.call(img);
              }
          }

          if (img.src) {
              if (/^data\:/i.test(img.src)) { // Data URI
                  var arrayBuffer = base64ToArrayBuffer(img.src);
                  handleBinaryFile(arrayBuffer);

              } else if (/^blob\:/i.test(img.src)) { // Object URL
                  var fileReader = new FileReader();
                  fileReader.onload = function(e) {
                      handleBinaryFile(e.target.result);
                  };
                  objectURLToBlob(img.src, function (blob) {
                      fileReader.readAsArrayBuffer(blob);
                  });
              } else {
                  var http = new XMLHttpRequest();
                  http.onload = function() {
                      if (this.status == 200 || this.status === 0) {
                          handleBinaryFile(http.response);
                      } else {
                          throw "Could not load image";
                      }
                      http = null;
                  };
                  http.open("GET", img.src, true);
                  http.responseType = "arraybuffer";
                  http.send(null);
              }
          } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
              var fileReader = new FileReader();
              fileReader.onload = function(e) {
                  handleBinaryFile(e.target.result);
              };

              fileReader.readAsArrayBuffer(img);
          }
      }

      function findEXIFinJPEG(file) {
          var dataView = new DataView(file);
          if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
              return false; // not a valid jpeg
          }

          var offset = 2,
              length = file.byteLength,
              marker;

          while (offset < length) {
              if (dataView.getUint8(offset) != 0xFF) {
                  return false; // not a valid marker, something is wrong
              }

              marker = dataView.getUint8(offset + 1);

              // we could implement handling for other markers here,
              // but we're only looking for 0xFFE1 for EXIF data

              if (marker == 225) {

                  return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                  // offset += 2 + file.getShortAt(offset+2, true);

              } else {
                  offset += 2 + dataView.getUint16(offset+2);
              }

          }

      }

      function findIPTCinJPEG(file) {
          var dataView = new DataView(file);
          if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
              return false; // not a valid jpeg
          }

          var offset = 2,
              length = file.byteLength;


          var isFieldSegmentStart = function(dataView, offset){
              return (
                  dataView.getUint8(offset) === 0x38 &&
                  dataView.getUint8(offset+1) === 0x42 &&
                  dataView.getUint8(offset+2) === 0x49 &&
                  dataView.getUint8(offset+3) === 0x4D &&
                  dataView.getUint8(offset+4) === 0x04 &&
                  dataView.getUint8(offset+5) === 0x04
              );
          };

          while (offset < length) {

              if ( isFieldSegmentStart(dataView, offset )){

                  // Get the length of the name header (which is padded to an even number of bytes)
                  var nameHeaderLength = dataView.getUint8(offset+7);
                  if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                  // Check for pre photoshop 6 format
                  if(nameHeaderLength === 0) {
                      // Always 4
                      nameHeaderLength = 4;
                  }

                  var startOffset = offset + 8 + nameHeaderLength;
                  var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                  return readIPTCData(file, startOffset, sectionLength);

              }


              // Not the marker, continue searching
              offset++;

          }

      }
      var IptcFieldMap = {
          0x78 : 'caption',
          0x6E : 'credit',
          0x19 : 'keywords',
          0x37 : 'dateCreated',
          0x50 : 'byline',
          0x55 : 'bylineTitle',
          0x7A : 'captionWriter',
          0x69 : 'headline',
          0x74 : 'copyright',
          0x0F : 'category'
      };
      function readIPTCData(file, startOffset, sectionLength){
          var dataView = new DataView(file);
          var data = {};
          var fieldValue, fieldName, dataSize, segmentType;
          var segmentStartPos = startOffset;
          while(segmentStartPos < startOffset+sectionLength) {
              if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                  segmentType = dataView.getUint8(segmentStartPos+2);
                  if(segmentType in IptcFieldMap) {
                      dataSize = dataView.getInt16(segmentStartPos+3);
                      fieldName = IptcFieldMap[segmentType];
                      fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                      // Check if we already stored a value with this name
                      if(data.hasOwnProperty(fieldName)) {
                          // Value already stored with this name, create multivalue field
                          if(data[fieldName] instanceof Array) {
                              data[fieldName].push(fieldValue);
                          }
                          else {
                              data[fieldName] = [data[fieldName], fieldValue];
                          }
                      }
                      else {
                          data[fieldName] = fieldValue;
                      }
                  }

              }
              segmentStartPos++;
          }
          return data;
      }



      function readTags(file, tiffStart, dirStart, strings, bigEnd) {
          var entries = file.getUint16(dirStart, !bigEnd),
              tags = {},
              entryOffset, tag,
              i;

          for (i=0;i<entries;i++) {
              entryOffset = dirStart + i*12 + 2;
              tag = strings[file.getUint16(entryOffset, !bigEnd)];
              if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
              tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
          }
          return tags;
      }


      function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
          var type = file.getUint16(entryOffset+2, !bigEnd),
              numValues = file.getUint32(entryOffset+4, !bigEnd),
              valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
              offset,
              vals, val, n,
              numerator, denominator;

          switch (type) {
              case 1: // byte, 8-bit unsigned int
              case 7: // undefined, 8-bit byte, value depending on field
                  if (numValues == 1) {
                      return file.getUint8(entryOffset + 8, !bigEnd);
                  } else {
                      offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          vals[n] = file.getUint8(offset + n);
                      }
                      return vals;
                  }

              case 2: // ascii, 8-bit byte
                  offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                  return getStringFromDB(file, offset, numValues-1);

              case 3: // short, 16 bit int
                  if (numValues == 1) {
                      return file.getUint16(entryOffset + 8, !bigEnd);
                  } else {
                      offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                      }
                      return vals;
                  }

              case 4: // long, 32 bit int
                  if (numValues == 1) {
                      return file.getUint32(entryOffset + 8, !bigEnd);
                  } else {
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                      }
                      return vals;
                  }

              case 5:    // rational = two long values, first is numerator, second is denominator
                  if (numValues == 1) {
                      numerator = file.getUint32(valueOffset, !bigEnd);
                      denominator = file.getUint32(valueOffset+4, !bigEnd);
                      val = new Number(numerator / denominator);
                      val.numerator = numerator;
                      val.denominator = denominator;
                      return val;
                  } else {
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                          denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                          vals[n] = new Number(numerator / denominator);
                          vals[n].numerator = numerator;
                          vals[n].denominator = denominator;
                      }
                      return vals;
                  }

              case 9: // slong, 32 bit signed int
                  if (numValues == 1) {
                      return file.getInt32(entryOffset + 8, !bigEnd);
                  } else {
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                      }
                      return vals;
                  }

              case 10: // signed rational, two slongs, first is numerator, second is denominator
                  if (numValues == 1) {
                      return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                  } else {
                      vals = [];
                      for (n=0;n<numValues;n++) {
                          vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                      }
                      return vals;
                  }
          }
      }

      /**
      * Given an IFD (Image File Directory) start offset
      * returns an offset to next IFD or 0 if it's the last IFD.
      */
      function getNextIFDOffset(dataView, dirStart, bigEnd){
          //the first 2bytes means the number of directory entries contains in this IFD
          var entries = dataView.getUint16(dirStart, !bigEnd);

          // After last directory entry, there is a 4bytes of data,
          // it means an offset to next IFD.
          // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

          return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
      }

      function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
          // get the IFD1 offset
          var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

          if (!IFD1OffsetPointer) {
              // console.log('******** IFD1Offset is empty, image thumb not found ********');
              return {};
          }
          else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
              // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
              return {};
          }
          // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

          var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd);

          // EXIF 2.3 specification for JPEG format thumbnail

          // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
          // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
          // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
          // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
          // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

          if (thumbTags['Compression']) {
              // console.log('Thumbnail image found!');

              switch (thumbTags['Compression']) {
                  case 6:
                      // console.log('Thumbnail image format is JPEG');
                      if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                      // extract the thumbnail
                          var tOffset = tiffStart + thumbTags.JpegIFOffset;
                          var tLength = thumbTags.JpegIFByteCount;
                          thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                              type: 'image/jpeg'
                          });
                      }
                  break;

              case 1:
                  console.log("Thumbnail image format is TIFF, which is not implemented.");
                  break;
              default:
                  console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
              }
          }
          else if (thumbTags['PhotometricInterpretation'] == 2) {
              console.log("Thumbnail image format is RGB, which is not implemented.");
          }
          return thumbTags;
      }

      function getStringFromDB(buffer, start, length) {
          var outstr = "";
          for (n = start; n < start+length; n++) {
              outstr += String.fromCharCode(buffer.getUint8(n));
          }
          return outstr;
      }

      function readEXIFData(file, start) {
          if (getStringFromDB(file, start, 4) != "Exif") {
              return false;
          }

          var bigEnd,
              tags, tag,
              exifData, gpsData,
              tiffOffset = start + 6;

          // test for TIFF validity and endianness
          if (file.getUint16(tiffOffset) == 0x4949) {
              bigEnd = false;
          } else if (file.getUint16(tiffOffset) == 0x4D4D) {
              bigEnd = true;
          } else {
              return false;
          }

          if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
              return false;
          }

          var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

          if (firstIFDOffset < 0x00000008) {
              return false;
          }

          tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

          if (tags.ExifIFDPointer) {
              exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
              for (tag in exifData) {
                  switch (tag) {
                      case "LightSource" :
                      case "Flash" :
                      case "MeteringMode" :
                      case "ExposureProgram" :
                      case "SensingMethod" :
                      case "SceneCaptureType" :
                      case "SceneType" :
                      case "CustomRendered" :
                      case "WhiteBalance" :
                      case "GainControl" :
                      case "Contrast" :
                      case "Saturation" :
                      case "Sharpness" :
                      case "SubjectDistanceRange" :
                      case "FileSource" :
                          exifData[tag] = StringValues[tag][exifData[tag]];
                          break;

                      case "ExifVersion" :
                      case "FlashpixVersion" :
                          exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                          break;

                      case "ComponentsConfiguration" :
                          exifData[tag] =
                              StringValues.Components[exifData[tag][0]] +
                              StringValues.Components[exifData[tag][1]] +
                              StringValues.Components[exifData[tag][2]] +
                              StringValues.Components[exifData[tag][3]];
                          break;
                  }
                  tags[tag] = exifData[tag];
              }
          }

          if (tags.GPSInfoIFDPointer) {
              gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
              for (tag in gpsData) {
                  switch (tag) {
                      case "GPSVersionID" :
                          gpsData[tag] = gpsData[tag][0] +
                              "." + gpsData[tag][1] +
                              "." + gpsData[tag][2] +
                              "." + gpsData[tag][3];
                          break;
                  }
                  tags[tag] = gpsData[tag];
              }
          }

          // extract thumbnail
          tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

          return tags;
      }

     function findXMPinJPEG(file) {

          if (!('DOMParser' in self)) {
              // console.warn('XML parsing not supported without DOMParser');
              return;
          }
          var dataView = new DataView(file);
          if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
             return false; // not a valid jpeg
          }

          var offset = 2,
              length = file.byteLength,
              dom = new DOMParser();

          while (offset < (length-4)) {
              if (getStringFromDB(dataView, offset, 4) == "http") {
                  var startOffset = offset - 1;
                  var sectionLength = dataView.getUint16(offset - 2) - 1;
                  var xmpString = getStringFromDB(dataView, startOffset, sectionLength);
                  var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                  xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                  var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10;
                  //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                  //Without these namespaces, XML is thought to be invalid by parsers
                  xmpString = xmpString.slice(0, indexOfXmp)
                              + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                              + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                              + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                              + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                              + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                              + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                              + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                              + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                              + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                              + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                              + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                              + xmpString.slice(indexOfXmp);

                  var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                  return xml2Object(domDocument);
              } else{
               offset++;
              }
          }
      }

      function xml2json(xml) {
          var json = {};
        
          if (xml.nodeType == 1) { // element node
            if (xml.attributes.length > 0) {
              json['@attributes'] = {};
              for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                json['@attributes'][attribute.nodeName] = attribute.nodeValue;
              }
            }
          } else if (xml.nodeType == 3) { // text node
            return xml.nodeValue;
          }
        
          // deal with children
          if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
              var child = xml.childNodes.item(i);
              var nodeName = child.nodeName;
              if (json[nodeName] == null) {
                json[nodeName] = xml2json(child);
              } else {
                if (json[nodeName].push == null) {
                  var old = json[nodeName];
                  json[nodeName] = [];
                  json[nodeName].push(old);
                }
                json[nodeName].push(xml2json(child));
              }
            }
          }
          
          return json;
      }

      function xml2Object(xml) {
          try {
              var obj = {};
              if (xml.children.length > 0) {
                for (var i = 0; i < xml.children.length; i++) {
                  var item = xml.children.item(i);
                  var attributes = item.attributes;
                  for(var idx in attributes) {
                      var itemAtt = attributes[idx];
                      var dataKey = itemAtt.nodeName;
                      var dataValue = itemAtt.nodeValue;

                      if(dataKey !== undefined) {
                          obj[dataKey] = dataValue;
                      }
                  }
                  var nodeName = item.nodeName;

                  if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                  } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                      var old = obj[nodeName];

                      obj[nodeName] = [];
                      obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                  }
                }
              } else {
                obj = xml.textContent;
              }
              return obj;
            } catch (e) {
                console.log(e.message);
            }
      }

      EXIF.enableXmp = function() {
          EXIF.isXmpEnabled = true;
      };

      EXIF.disableXmp = function() {
          EXIF.isXmpEnabled = false;
      };

      EXIF.getData = function(img, callback) {
          if (((self.Image && img instanceof self.Image)
              || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
              && !img.complete)
              return false;

          if (!imageHasData(img)) {
              getImageData(img, callback);
          } else {
              if (callback) {
                  callback.call(img);
              }
          }
          return true;
      };

      EXIF.getTag = function(img, tag) {
          if (!imageHasData(img)) return;
          return img.exifdata[tag];
      };
      
      EXIF.getIptcTag = function(img, tag) {
          if (!imageHasData(img)) return;
          return img.iptcdata[tag];
      };

      EXIF.getAllTags = function(img) {
          if (!imageHasData(img)) return {};
          var a,
              data = img.exifdata,
              tags = {};
          for (a in data) {
              if (data.hasOwnProperty(a)) {
                  tags[a] = data[a];
              }
          }
          return tags;
      };
      
      EXIF.getAllIptcTags = function(img) {
          if (!imageHasData(img)) return {};
          var a,
              data = img.iptcdata,
              tags = {};
          for (a in data) {
              if (data.hasOwnProperty(a)) {
                  tags[a] = data[a];
              }
          }
          return tags;
      };

      EXIF.pretty = function(img) {
          if (!imageHasData(img)) return "";
          var a,
              data = img.exifdata,
              strPretty = "";
          for (a in data) {
              if (data.hasOwnProperty(a)) {
                  if (typeof data[a] == "object") {
                      if (data[a] instanceof Number) {
                          strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                      } else {
                          strPretty += a + " : [" + data[a].length + " values]\r\n";
                      }
                  } else {
                      strPretty += a + " : " + data[a] + "\r\n";
                  }
              }
          }
          return strPretty;
      };

      EXIF.readFromBinaryFile = function(file) {
          return findEXIFinJPEG(file);
      };
  }.call(commonjsGlobal));
  });
  var exif_1 = exif.EXIF;

  var IMAGE_TYPE = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', '.png', '.jpg'];
  /**
   * 判断是否为图片类型
   * @param imgType 图片类型
   * @return {boolean|*} true:是；false:否
   */

  function isImage(imgType) {
    return includes_1(IMAGE_TYPE, imgType);
  }
  /**
   * 获取图片方向
   * @param url 图片地址. http://localhost:8080/images/1001.jpg
   * @return {Promise<any>}
   *
   * 旋转角度   参数
   * 0°         1
   * 顺时针90°   6
   * 顺时针180°       3
   * 逆时针90°   8
   *
   */


  function getImageOrientation(_x) {
    return _getImageOrientation.apply(this, arguments);
  }
  /**
   * 返回图片旋转度数
   * @param url 图片地址
   * @return {Promise<number>}
   */


  function _getImageOrientation() {
    _getImageOrientation = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(url) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                var getOrientation = function getOrientation(image) {
                  exif.getData(image, function () {
                    exif.getAllTags(this);
                    var orientation = exif.getTag(this, 'Orientation');
                    resolve(typeof orientation !== 'undefined' && orientation !== '' ? orientation : 1);
                  });
                };

                if (url instanceof File) {
                  getOrientation(url);
                } else {
                  var img = new Image();
                  img.src = url;

                  img.onload = function () {
                    getOrientation(img);
                  };

                  img.onerror = function () {
                    resolve(1);
                  };
                }
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getImageOrientation.apply(this, arguments);
  }

  function getImageRotateDeg(_x2) {
    return _getImageRotateDeg.apply(this, arguments);
  }
  /**
   * 读取文件
   * @param file 上传的图片文件
   * @return {Promise<any>} 返回 base64的图片
   */


  function _getImageRotateDeg() {
    _getImageRotateDeg = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(url) {
      var orientation, deg;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getImageOrientation(url);

            case 2:
              orientation = _context2.sent;
              deg = 0;
              _context2.t0 = orientation;
              _context2.next = _context2.t0 === 1 ? 7 : _context2.t0 === 6 ? 9 : _context2.t0 === 8 ? 11 : _context2.t0 === 3 ? 13 : 15;
              break;

            case 7:
              deg = 0;
              return _context2.abrupt("break", 15);

            case 9:
              deg = 90;
              return _context2.abrupt("break", 15);

            case 11:
              deg = -90;
              return _context2.abrupt("break", 15);

            case 13:
              deg = 180;
              return _context2.abrupt("break", 15);

            case 15:
              return _context2.abrupt("return", deg);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _getImageRotateDeg.apply(this, arguments);
  }

  function loadFile(_x3) {
    return _loadFile.apply(this, arguments);
  }
  /**
   * 加载图片
   * @param src 路径
   * @return {Promise<any>} Image
   */


  function _loadFile() {
    _loadFile = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(file) {
      var fileReader;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              _context3.next = 4;
              return new Promise(function (resolve, reject) {
                fileReader.onload = function (e) {
                  resolve(e.target.result);
                };

                fileReader.onerror = function (err) {
                  reject(err);
                };
              });

            case 4:
              return _context3.abrupt("return", _context3.sent);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _loadFile.apply(this, arguments);
  }

  function loadImg(_x4) {
    return _loadImg.apply(this, arguments);
  }
  /**
   * 根据 orientation 属性旋转图片并返回File
   * @param file 上传的文件
   * @return {Promise<any>}
   */


  function _loadImg() {
    _loadImg = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(base64) {
      var img;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              img = new Image();
              img.setAttribute('crossOrigin', 'anonymous');
              img.src = base64; // 可设置为：路径 或者 base64的图片

              _context4.next = 5;
              return new Promise(function (resolve, reject) {
                img.onload = function () {
                  resolve(img);
                };

                img.onerror = function (err) {
                  reject(err);
                };
              });

            case 5:
              return _context4.abrupt("return", _context4.sent);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _loadImg.apply(this, arguments);
  }

  function rotateImage(_x5) {
    return _rotateImage.apply(this, arguments);
  }

  function _rotateImage() {
    _rotateImage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(file) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return new Promise(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5(resolve) {
                  var orientation, base64, image, width, height, degree, canvas, ctx;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return getImageOrientation(file);

                        case 2:
                          orientation = _context5.sent;

                          if (!(orientation === 1)) {
                            _context5.next = 5;
                            break;
                          }

                          return _context5.abrupt("return", resolve(file));

                        case 5:
                          _context5.next = 7;
                          return loadFile(file);

                        case 7:
                          base64 = _context5.sent;
                          _context5.next = 10;
                          return loadImg(base64);

                        case 10:
                          image = _context5.sent;
                          width = image.naturalWidth; // 宽

                          height = image.naturalHeight; // 高

                          degree = 90 * Math.PI / 180;
                          canvas = document.createElement('canvas');
                          ctx = canvas.getContext('2d'); // {deg: 0, x: 0, y: 0, width: 217, height: 369},
                          // {deg: 1, x: 0, y: -369, width: 369, height: 217},
                          // {deg: 2, x: -217, y: -369, width: 217, height: 369},
                          // {deg: 3, x: -217, y: 0, width: 369, height: 217}

                          _context5.t0 = orientation;
                          _context5.next = _context5.t0 === 1 ? 19 : _context5.t0 === 6 ? 23 : _context5.t0 === 3 ? 28 : _context5.t0 === 8 ? 33 : 38;
                          break;

                        case 19:
                          // 不旋转
                          canvas.width = width;
                          canvas.height = height;
                          ctx.drawImage(image, 0, 0, width, height);
                          return _context5.abrupt("break", 42);

                        case 23:
                          // 需要顺时针（向右）90度旋转
                          canvas.width = height;
                          canvas.height = width;
                          ctx.rotate(degree);
                          ctx.drawImage(image, 0, -height, width, height);
                          return _context5.abrupt("break", 42);

                        case 28:
                          // 需要180度旋转
                          canvas.width = width;
                          canvas.height = height;
                          ctx.rotate(degree * 2);
                          ctx.drawImage(image, -width, -height, width, height);
                          return _context5.abrupt("break", 42);

                        case 33:
                          // 需要逆时针（向左）90度旋转
                          canvas.width = height;
                          canvas.height = width;
                          ctx.rotate(degree * 3);
                          ctx.drawImage(image, -width, 0, width, height);
                          return _context5.abrupt("break", 42);

                        case 38:
                          canvas.width = width;
                          canvas.height = height;
                          ctx.drawImage(image, 0, 0, width, height);
                          return _context5.abrupt("break", 42);

                        case 42:
                          canvas.toBlob(function (blob) {
                            blob.name = file.name;
                            resolve(blob);
                          }, file.type ? file.type : 'image/jpeg', 0.5);

                        case 43:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x6) {
                  return _ref.apply(this, arguments);
                };
              }());

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _rotateImage.apply(this, arguments);
  }

  var image = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isImage: isImage,
    getImageOrientation: getImageOrientation,
    getImageRotateDeg: getImageRotateDeg,
    rotateImage: rotateImage
  });

  /**
   * 扩展属性
   * @param targetObj 目标对象（目标对象会被修改）
   * @param property 新增属性 {new:old} 把old属性的值写入new中
   * @param extend 扩展属性 {async:true}
   * @return {*}
   * @private
   *
   * 示例：
   * const targetObj = {id: 1001, url: 'xxmi.cn'};
   * const property = {uri:'url'}
   * const extend = {async: true};
   * const ep = _extendProperty(targetObj, property, extend);
   *
   * 原值：{ id: 1001, url: 'xxmi.cn' }
   * 结果：{ id: 1001, url: 'xxmi.cn', uri: 'xxmi.cn', async: true }
   */
  var _extendProperty = function _extendProperty(targetObj) {
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var key in property) {
      targetObj[key] = targetObj[property[key]];
    }

    for (var _key in extend) {
      targetObj[_key] = extend[_key];
    }

    return targetObj;
  };
  /**
   * 扩展属性
   * @param targetObj 目标对象 object|array[object]
   * @param property 新增属性 {new:old} 把old属性的值写入new中
   * @param extend 扩展属性 {async: true}
   * @return {*}
   */


  var extendProperty = function extendProperty(targetObj) {
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (Array.isArray(targetObj)) {
      for (var i = 0, l = targetObj.length; i < l; i++) {
        targetObj[i] = _extendProperty(targetObj[i], property, extend);
      }
    } else {
      targetObj = _extendProperty(targetObj, property, extend);
    }

    return targetObj;
  };
  /**
   * 删除指定属性
   * @param obj
   * @param deleteProperty ['name']
   * @returns {*}
   */


  var deleteProperty = function deleteProperty(obj) {
    var deleteProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var _deleteProperty = Array.isArray(deleteProperty) ? deleteProperty : [deleteProperty];

    for (var i = 0; i < _deleteProperty.length; i++) {
      var key = _deleteProperty[i];
      delete obj[key];
    }

    return obj;
  };
  /**
   * 删除 obj 为 'undefined' 或 null 或 '' 或者 array.length === 0 的属性
   * @param obj 对象
   * @param deletePropertyList 删除指定属性 ['name']（直接删除不判断是否为 null 或者 ''）
   * @returns {*}
   */


  var deleteEmptyProperty = function deleteEmptyProperty(obj) {
    var deletePropertyList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    for (var key in obj) {
      if (obj[key] === 'undefined' || obj[key] === null || obj[key] === '' || Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }

    return deleteProperty(obj, deletePropertyList);
  };
  /**
   * 解析 Tree
   * @param settings 配置
   * @param nodes 数据节点数组
   * @param property {new:old} 把 old 写入 new 中（新增属性）
   * @params extend 扩展属性 {async: true}
   * @returns {Promise<*>}
   */


  var parseTree = function parseTree() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      key: 'id',
      parentKey: 'pid',
      childKey: 'children'
    };
    var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var extend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var key = settings.key,
        parentKey = settings.parentKey,
        childKey = settings.childKey;

    if (!Array.isArray(nodes)) {
      return [nodes];
    }

    var menuNodes = [];
    var tmpMap = {};

    for (var i = 0, l = nodes.length; i < l; i++) {
      nodes[i] = _extendProperty(nodes[i], property, extend);
      tmpMap[nodes[i][key]] = nodes[i];
    }

    for (var _i = 0, _l = nodes.length; _i < _l; _i++) {
      if (tmpMap[nodes[_i][parentKey]] && nodes[_i][key] !== nodes[_i][parentKey]) {
        if (!tmpMap[nodes[_i][parentKey]][childKey]) {
          tmpMap[nodes[_i][parentKey]][childKey] = [];
        }

        tmpMap[nodes[_i][parentKey]][childKey].push(nodes[_i]);
      } else {
        menuNodes.push(nodes[_i]);
      }
    }

    return menuNodes;
  };

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    extendProperty: extendProperty,
    deleteProperty: deleteProperty,
    deleteEmptyProperty: deleteEmptyProperty,
    parseTree: parseTree
  });

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
   * 验证是纯数字
   * @param val
   * @return {boolean}
   */

  var isNumber = function isNumber(val) {
    return /^[\d]+$/.test(val);
  };
  /**
   * 整数或者小数
   * @param val
   * @returns {boolean}
   */


  var isIntegerOrDecimal = function isIntegerOrDecimal(val) {
    return /^(-[1-9]\d*|[\d]|[1-9]\d*|-?([1-9]\d*|\d)\.\d+)$/.test(val);
  };
  /**
   * 是否 excel
   * @param type
   * @returns {boolean}
   */


  var isExcel = function isExcel(type) {
    var EXCEL = ['.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return includes_1(EXCEL, type);
  };
  /**
   * 是否为 excel
   * @param name
   * @param type
   * @returns {boolean}
   */


  var isExcelFull = function isExcelFull() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var SUFFIX = ['.xlsx', '.xls'];
    var suffix = name.substr(name.lastIndexOf('.'));
    return includes_1(SUFFIX, suffix) || isExcel(type);
  };
  /**
   * 判断是 doc 文档
   * @param type
   * @return {*}
   */


  var isDoc = function isDoc() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var DOC = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    var DOC_SUFFIX = ['.doc', '.docx'];
    var suffix = name.substr(name.lastIndexOf('.'));
    return includes_1(DOC_SUFFIX, suffix) || includes_1(DOC, type);
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
   * 删除文件
   * @param fileList 文件列表
   * @param uid 唯一ID
   * @returns {boolean}
   */


  var deleteFileList = function deleteFileList(fileList, uid) {
    for (var i = 0; i < fileList.length; i++) {
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


  var flashChecker = function flashChecker() {
    var hasFlash = false; // 是否安装了flash

    var version = 0; // flash版本

    if (document.all) {
      var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');

      if (swf) {
        hasFlash = true;
        var VSwf = swf.GetVariable('$version');
        version = parseInt(VSwf.split(' ')[1].split(',')[0]);
      }
    } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        var _swf = navigator.plugins['Shockwave Flash'];

        if (_swf) {
          hasFlash = true;

          var words = _swf.description.split(' ');

          for (var i = 0; i < words.length; ++i) {
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
      version: version
    };
  };

  var tool = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDataType: getDataType,
    DataType: DataType,
    isNumber: isNumber,
    isIntegerOrDecimal: isIntegerOrDecimal,
    isExcel: isExcel,
    isExcelFull: isExcelFull,
    isDoc: isDoc,
    isEmpty: isEmpty,
    deleteFileList: deleteFileList,
    flashChecker: flashChecker
  });

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

  var decode = decodeURIComponent;

  function parseQuery(query) {
    var res = {};
    query = query.trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return res;
    }

    query.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join('=')) : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
    return res;
  }

  function query() {
    return parseQuery(location.search);
  }

  var route = /*#__PURE__*/Object.freeze({
    __proto__: null,
    query: query
  });

  exports.Captcha = Captcha;
  exports.DateUtil = dateUtil;
  exports.Datetime = datetime;
  exports.FormData = formData;
  exports.Image = image;
  exports.Route = route;
  exports.Tool = tool;
  exports.Util = util;
  exports.Validator = Validator;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
