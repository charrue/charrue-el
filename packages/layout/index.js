import { Layout, PluginKey } from "@charrue/layout-internal"
import "@charrue/layout-internal/styles/index.css";

export default {
  install(Vue) {
    Vue.prototype[PluginKey] = {
      version: 2
    }
    Vue.component(Layout.name, Layout)
  }
}
