<template>
    <section class="upload-image">
        <div>
            <p>原本排列顺序（正常情况）</p>
            <img src="/upload-image/merge.png" alt="">
        </div>
        <hr>
        <div class="preview">
            <p>分别通过windows的图片查看器旋转了角度 <span>(但是预览出来的排列顺序却和原本排序顺序不一致)</span></p>
            <img src="/upload-image/1001.jpg" alt="">
            <img src="/upload-image/1002.jpg" alt="">
            <img src="/upload-image/1003.jpg" alt="">
            <img src="/upload-image/1004.jpg" alt="">
            <img src="/upload-image/v1002.jpg" alt="">
        </div>

        <hr>
        <div class="preview-bg">
            <p>通过 background:url 预览 <span>(同上)</span></p>
            <div class="bg1001"/>
            <div class="bg1002"/>
            <div class="bg1003"/>
            <div class="bg1004"/>
            <div class="v1002"/>
        </div>
        <hr>
        <div class="preview-png">
            <p>.png的图片不存在上面的现象</p>
            <img src="/upload-image/v1001.png" alt="">
        </div>
        <hr>
        <div>
            <p>v1002.jpg处理后的效果</p>
            <img src="/upload-image/v1003.jpg" width="100" height="100" alt="">
        </div>
        <hr>
        <div class="preview-solve">
            <p>
                3个解决方案: <br>
                （一）. 通过JS获取 .jpg 的 Orientation 属性，设置元素旋转 (这种方式不好，元素会随着旋转，布局就乱了)<br>
                （二）. 把图片转换为 .png 格式
                （三）. 通过 canvas 绘画此图
            </p>
            <div class="bg1001">1001.jpg 1：0°</div>
            <div class="bg1002">1002.jpg 6：90°</div>
            <div class="bg1003">1003.jpg 3：180°</div>
            <div class="bg1004">1004.jpg 8：-90°</div>
        </div>
        <hr>
        <div>
            <p>上传图片，如果有旋转则旋转（通过 canvas 从新绘画）</p>
            <img :src="uploadImageSrc" width="200" height="200">
            <input id="uploadFile" type="file" @change="uploadImage">
        </div>
    </section>
</template>

<script>
  import ImageUtil from '../../../../src/image';
  import downloadFile from 'downloadjs';

  export default {
    name: 'UploadImage',
    data () {
      return {
        uploadImageSrc: ''
      };
    },
    async created () {
      const result1 = await ImageUtil.getImageOrientation('/upload-image/1001.jpg');
      const result2 = await ImageUtil.getImageOrientation('/upload-image/1002.jpg');
      const result3 = await ImageUtil.getImageOrientation('/upload-image/1003.jpg');
      const result4 = await ImageUtil.getImageOrientation('/upload-image/1004.jpg');
      const v1002 = await ImageUtil.getImageOrientation('/upload-image/v1002.jpg');
      console.log(result1, result2, result3, result4, v1002);
    },
    methods: {
      async uploadImage (e) {
        const _this = this;
        const files = e.target.files;
        const file = files.length > 0 ? files[0] : null;
        if (file) {
          console.log(file);
          const blob = await ImageUtil.rotateImage(file);
          console.log('blob', blob);
          downloadFile(blob, blob.name, blob.type);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function (e) {
            const src = e.target.result;
            _this.uploadImageSrc = src;
          };
        }
        document.getElementById('uploadFile').value = '';
      }
    }
  };
</script>

<style lang="less" scoped>
    .preview {
        > img {
            width: 124px;
        }

        p > span {
            color: red;
        }
    }

    .preview-bg {
        p > span {
            color: red;
        }

        > div {
            display: inline-block;
            width: 124px;
            height: 116px;
            vertical-align: top;
            border: 1px solid black;

            &.bg1001 {
                background: url("../../../../public/upload-image/1001.jpg") no-repeat;
                background-size: 124px;
            }

            &.bg1002 {
                background: url("../../../../public/upload-image/1002.jpg") no-repeat;
                background-size: 124px;
                /*transform: rotate(90deg);*/
            }

            &.bg1003 {
                background: url("../../../../public/upload-image/1003.jpg") no-repeat;
                background-size: 124px;
            }

            &.bg1004 {
                background: url("../../../../public/upload-image/1004.jpg") no-repeat;
                background-size: 124px;
            }

            &.v1002 {
                background: url("../../../../public/upload-image/v1002.jpg") no-repeat;
                background-size: 124px;
                /*transform: rotate(90deg);*/
            }

        }
    }

    .preview-png {
        > img {
            border: 1px solid black;
        }
    }

    .preview-solve {

        > div {
            display: inline-block;
            width: 124px;
            height: 116px;
            vertical-align: top;
            border: 1px solid black;

            &.bg1001 {
                background: url("../../../../public/upload-image/1001.jpg") no-repeat;
                background-size: 124px;
                transform: rotate(0deg);
            }

            &.bg1002 {
                margin: 0 80px;
                background: url("../../../../public/upload-image/1002.jpg") no-repeat;
                background-size: 124px;
                transform: rotate(90deg);
            }

            &.bg1003 {
                background: url("../../../../public/upload-image/1003.jpg") no-repeat;
                background-size: 124px;
                transform: rotate(180deg);
            }

            &.bg1004 {
                margin: 0 80px;
                background: url("../../../../public/upload-image/1004.jpg") no-repeat;
                background-size: 124px;
                transform: rotate(-90deg);
            }
        }
    }
</style>