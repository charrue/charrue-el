import { createApp } from 'vue'
import router from "./router/index"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Layout from "@charrue/layout-next"
import "@charrue/layout-next/src/styles/index.scss";


const app = createApp(App)
app.component("layout", Layout)

app.use(ElementPlus)
app.use(router)
app.mount('#app')