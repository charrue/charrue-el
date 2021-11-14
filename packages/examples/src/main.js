import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import CompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Layout from "@charrue/layout";
import "@charrue/layout/dist/style/index.css";
import SchemaTable from '@charrue/schema-table'

Vue.use(CompositionApi);
Vue.use(ElementUI);
Vue.use(Layout);
Vue.component('schema-table', SchemaTable)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
