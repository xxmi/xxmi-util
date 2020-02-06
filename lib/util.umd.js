(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.XxmiUtil = {}));
}(this, (function (exports) { 'use strict';

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

  exports.deleteEmptyProperty = deleteEmptyProperty;
  exports.deleteProperty = deleteProperty;
  exports.extendProperty = extendProperty;
  exports.parseTree = parseTree;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
