<template>
    <section id="app">
        <section class="menu-wrap">
            <router-link to="/demo-form">表单</router-link>
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
    }
</style>
