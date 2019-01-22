import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


export default new VueRouter({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      component: () => import('component/index.vue')
    },
    {
      path: '/demo-form',
      component: () => import('component/demo-form.vue')
    },
    {
      path: '/upload-image',
      component: () => import('component/upload-image/index.vue')
    },
    {
      path: '/canvas',
      component: () => import('component/canvas/index.vue')
    },
    {
      path: '*', redirect: '/'
    }
  ]
});