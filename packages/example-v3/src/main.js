import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import ElementPlus, { ElSubMenu } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(ElementPlus)
app.use(router);
app.component("el-submenu", ElSubMenu)
// app.use(ElementPlus);
app.mount("#app");
