import includes from 'lodash/includes';
// https://github.com/exif-js/exif-js
import Exif from 'exif-js';

const IMAGE_TYPE = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', '.png', '.jpg'];

/**
 * 判断是否为图片类型
 * @param imgType 图片类型
 * @return {boolean|*} true:是；false:否
 */
function isImage(imgType) {
  return includes(IMAGE_TYPE, imgType);
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
async function getImageOrientation(url) {
  return await new Promise((resolve) => {

    const getOrientation = (image) => {
      Exif.getData(image, function () {
        Exif.getAllTags(this);
        const orientation = Exif.getTag(this, 'Orientation');
        resolve(typeof orientation !== 'undefined' && orientation !== '' ? orientation : 1);
      });
    };

    if (url instanceof File) {
      getOrientation(url);
    } else {
      const img = new Image();
      img.src = url;
      img.onload = function () {
        getOrientation(img);
      };
      img.onerror = function () {
        resolve(1);
      };
    }
  });
}

/**
 * 返回图片旋转度数
 * @param url 图片地址
 * @return {Promise<number>}
 */
async function getImageRotateDeg(url) {
  const orientation = await getImageOrientation(url);
  let deg = 0;
  switch (orientation) {
    case 1:
      deg = 0;
      break;
    case 6:
      deg = 90;
      break;
    case 8:
      deg = -90;
      break;
    case 3:
      deg = 180;
      break;
  }
  return deg;
}

/**
 * 读取文件
 * @param file 上传的图片文件
 * @return {Promise<any>} 返回 base64的图片
 */
async function loadFile(file) {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return await new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 加载图片
 * @param src 路径
 * @return {Promise<any>} Image
 */
async function loadImg(base64) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = base64; // 可设置为：路径 或者 base64的图片
  return await new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 根据 orientation 属性旋转图片并返回File
 * @param file 上传的文件
 * @return {Promise<any>}
 */
async function rotateImage(file) {
  return await new Promise(async (resolve) => {
    const orientation = await getImageOrientation(file);
    if (orientation === 1) {
      return resolve(file);
    }

    const base64 = await loadFile(file);
    const image = await loadImg(base64);
    let width = image.naturalWidth; // 宽
    let height = image.naturalHeight; // 高
    let degree = 90 * Math.PI / 180;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // {deg: 0, x: 0, y: 0, width: 217, height: 369},
    // {deg: 1, x: 0, y: -369, width: 369, height: 217},
    // {deg: 2, x: -217, y: -369, width: 217, height: 369},
    // {deg: 3, x: -217, y: 0, width: 369, height: 217}

    switch (orientation) {
      case 1: // 不旋转
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        break;
      case 6: // 需要顺时针（向右）90度旋转
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(image, 0, -height, width, height);
        break;
      case 3: // 需要180度旋转
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree * 2);
        ctx.drawImage(image, -width, -height, width, height);
        break;
      case 8: // 需要逆时针（向左）90度旋转
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree * 3);
        ctx.drawImage(image, -width, 0, width, height);
        break;
      default:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        break;
    }
    canvas.toBlob((blob) => {
      blob.name = file.name;
      resolve(blob);
    }, file.type ? file.type : 'image/jpeg', 0.5);
  });
}


export {
  isImage,
  getImageOrientation,
  getImageRotateDeg,
  rotateImage,
};
