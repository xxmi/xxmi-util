<template>
    <section id="app">
        <section class="menu-wrap">
            <router-link to="/demo-form">1.表单</router-link>
            <router-link to="/upload-image">2.上传图片（解决图片被旋转问题）</router-link>
            <router-link to="/canvas">3.canvas 画图</router-link>
        </section>
        <router-view/>
    </section>
</template>

<script>


  export default {
    name: 'app',
    components: {},
    data () {
      return {};
    }
  };
</script>

<style lang="less" scoped>
    html {
        width: 100%;
        height: 100%;

        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app {
        height: 100%;
    }

    .menu-wrap {
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid red;

        > a {
            margin-right: 20px;
        }
    }
</style>
