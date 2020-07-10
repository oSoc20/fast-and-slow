import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import {
  VlCore,
  VlUtil,
  VlGrid,
  VlColumn,
  VlRegion,
  VlLayout,
  VlTitle,
  VlInputField,
  VlCheckbox,
  VlDataTable,
  VlButton
} from'@govflanders/vl-ui-vue-components';

Vue.component('vl-grid', VlGrid);
Vue.component('vl-column', VlColumn);
Vue.component('vl-region', VlRegion);
Vue.component('vl-layout', VlLayout);
Vue.component('vl-title', VlTitle);
Vue.component('vl-input-field', VlInputField);
Vue.component('vl-checkbox', VlCheckbox);
Vue.component('vl-data-table', VlDataTable);
Vue.component('vl-button', VlButton)

Vue.use(VlCore);
Vue.use(VlUtil);

new Vue({
  render: h => h(App),
}).$mount('#app')
