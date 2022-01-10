import { createApp } from 'vue'
import router from "./router/index"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from "element-plus/lib/locale/lang/zh-cn"
import "dayjs/locale/zh-cn"
import App from './App.vue'
import Layout from "@charrue/layout-next"
import "@charrue/layout-next/src/styles/index.scss";
import { FormField } from "@charrue/element-ui-plus-extension"


const app = createApp(App)
app.component("layout", Layout)
app.component("form-field", FormField)

app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')