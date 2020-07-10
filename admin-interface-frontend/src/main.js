import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import {
  VlCore,
  VlUtil
} from'@govflanders/vl-ui-vue-components';

Vue.use(VlCore);
Vue.use(VlUtil);

new Vue({
  render: h => h(App),
}).$mount('#app')
