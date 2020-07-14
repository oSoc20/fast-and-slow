import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
// import { VlModalToggle } from '@govflanders/vl-ui-modal';
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
  VlButton,
  VlInputGroup,
  VlFormMessageLabel,
  VlActionGroup,
  VlDropdownNavigation,
  VlLinkList,
  VlLinkListItem,
  VlLink,
  VlIcon,
  VlModal,
  VlModalToggle
} from'@govflanders/vl-ui-vue-components';

Vue.component('vl-grid', VlGrid);
Vue.component('vl-column', VlColumn);
Vue.component('vl-region', VlRegion);
Vue.component('vl-layout', VlLayout);
Vue.component('vl-title', VlTitle);
Vue.component('vl-input-field', VlInputField);
Vue.component('vl-checkbox', VlCheckbox);
Vue.component('vl-data-table', VlDataTable);
Vue.component('vl-button', VlButton);
Vue.component('vl-input-group', VlInputGroup);
Vue.component('vl-form-message-label', VlFormMessageLabel);
Vue.component('vl-action-group', VlActionGroup);
Vue.component('vl-dropdown-navigation', VlDropdownNavigation);
Vue.component('vl-link-list', VlLinkList);
Vue.component('vl-link-list-item', VlLinkListItem);
Vue.component('vl-link', VlLink);
Vue.component('vl-icon', VlIcon);
Vue.component('vl-modal', VlModal);
Vue.directive('vl-modal-toggle', VlModalToggle)

Vue.use(VlCore);
Vue.use(VlUtil);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
