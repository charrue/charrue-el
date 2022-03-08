import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import CompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Layout from "@charrue/layout";
import "@charrue/layout/index.css";
import SchemaTable from '@charrue/schema-table'
import SchemaForm from '@charrue/schema-form'
import ImageCropper from '@charrue/image-cropper'
import { FormField } from "@charrue/element-ui-extension"

Vue.use(CompositionApi);
Vue.use(ElementUI);
Vue.use(Layout);
Vue.component('SchemaTable', SchemaTable)
Vue.component('SchemaForm', SchemaForm)
Vue.component('FormField', FormField)
Vue.component('ImageCropper', ImageCropper)

Vue.config.productionTip = false;

// eslint-disable-next-line vue/require-name-property
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
