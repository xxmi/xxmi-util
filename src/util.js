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
const _extendProperty = function (targetObj, property = {}, extend = {}) {
  for (const key in property) {
    targetObj[key] = targetObj[property[key]];
  }
  for (const key in extend) {
    targetObj[key] = extend[key];
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
const extendProperty = function (targetObj, property = {}, extend = {}) {
  if (Array.isArray(targetObj)) {
    for (let i = 0, l = targetObj.length; i < l; i++) {
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
const deleteProperty = function (obj, deleteProperty = []) {
  const _deleteProperty = Array.isArray(deleteProperty) ? deleteProperty : [deleteProperty];
  for (let i = 0; i < _deleteProperty.length; i++) {
    const key = _deleteProperty[i];
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
const deleteEmptyProperty = function (obj, deletePropertyList = []) {
  for (const key in obj) {
    if (obj[key] === 'undefined' || obj[key] === null || obj[key] === '' || (Array.isArray(obj[key]) && obj[key].length === 0)) {
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
const parseTree = function (settings = {
  key: 'id',
  parentKey: 'pid',
  childKey: 'children'
}, nodes = [], property = {}, extend = {}) {
  const {key, parentKey, childKey} = settings;
  if (!Array.isArray(nodes)) {
    return [nodes];
  }
  const menuNodes = [];
  const tmpMap = {};
  for (let i = 0, l = nodes.length; i < l; i++) {
    nodes[i] = _extendProperty(nodes[i], property, extend);
    tmpMap[nodes[i][key]] = nodes[i];
  }
  for (let i = 0, l = nodes.length; i < l; i++) {
    if (tmpMap[nodes[i][parentKey]] && nodes[i][key] !== nodes[i][parentKey]) {
      if (!tmpMap[nodes[i][parentKey]][childKey]) {
        tmpMap[nodes[i][parentKey]][childKey] = [];
      }
      tmpMap[nodes[i][parentKey]][childKey].push(nodes[i]);
    } else {
      menuNodes.push(nodes[i]);
    }
  }
  return menuNodes;
};

export {
  extendProperty,
  deleteProperty,
  deleteEmptyProperty,
  parseTree
};
