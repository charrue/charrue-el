import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import ElementPlus from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn"
import "dayjs/locale/zh-cn"
import Layout from "@charrue/layout-next"
import 'element-plus/dist/index.css'
import "@charrue/layout-next/index.css";
import "./styles/index.scss";
import { FormField } from "@charrue/element-ui-plus-extension"


const app = createApp(App)
app.component("form-field", FormField)

app.use(Layout)
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')