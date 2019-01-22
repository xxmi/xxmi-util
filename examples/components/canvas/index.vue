<template>
    <div>
        <img id="myImage" src="./images/original2.png"
             class="image">
        <canvas id="myCanvas" class="canvas" :width="list[currIndex].width" :height="list[currIndex].height">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
        <hr>
        <el-row>
            在文本框上点击2次，既可以看到效果
        </el-row>
        <div v-for="(item,index) in list" @click="currIndex = index">
            <el-row>
                <el-col :span="4">{{item.explain}}</el-col>
                <el-col :span="20">
                    <el-input type="textarea"
                              v-model="JSON.stringify(list[index])"
                              @change="change"
                              @click.native="change(JSON.stringify(list[index]))"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'CanvasDrawImage',
    data () {
      return {
        currIndex: 0,
        list: [
          {explain: '不旋转：1', deg: 0, x: 0, y: 0, width: 217, height: 369},
          {explain: '旋转 90°：6', deg: 1, x: 0, y: -369, width: 369, height: 217},
          {explain: '旋转 180°：3', deg: 2, x: -217, y: -369, width: 217, height: 369},
          {explain: '旋转 270°或者逆时针90°：8', deg: 3, x: -217, y: 0, width: 369, height: 217}
        ]
      };
    },
    created () {
      this.$nextTick(() => {
      });
    },
    methods: {
      change (val) {
        const img = document.getElementById('myImage');
        const {deg, x, y, width, height} = JSON.parse(val);
        const myCanvas = document.getElementById('myCanvas');
        const ctx = myCanvas.getContext('2d');
        let degree = 90 * Math.PI / 180;
        if (deg >= 1) {
          ctx.rotate(degree * deg);
        }
        // 注意：旋转是以0,0为中心点
        // 在画布上定位图像，并规定图像的宽度和高度：
        ctx.drawImage(img, x, y, 217, 369);
      }
    }
  };
</script>

<style lang="less" scoped>

    .image {
        border: 1px solid #d3d3d3;
    }

    .canvas {
        margin-left: 20px;
        border: 1px solid #d3d3d3;
    }

</style>