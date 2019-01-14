import Vue from 'vue';
import router from './router';
import Validate from 'xxmi-util/lib/validator';
import ElementUi from 'element-ui';
import Highlight from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.prototype.hljs = function (...ids) {
  for (const id of ids.values()) {
    Highlight.highlightBlock(document.querySelector(`#${id} pre code`));
  }
};
Vue.use(Validate);
Vue.use(ElementUi);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
