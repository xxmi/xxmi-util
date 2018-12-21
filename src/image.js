import _ from 'lodash';

const IMAGE_TYPE = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

/**
 * 判断是否为图片类型
 * @param imgType 图片类型
 * @return {boolean|*} true:是；false:否
 */
function isImage (imgType) {
  return _.includes(IMAGE_TYPE, imgType);
};

export {isImage};
export default {
  isImage
};