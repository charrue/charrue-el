import { Layout, PluginKey } from "@charrue/layout-internal"

export default {
  install(Vue) {
    Vue.prototype[PluginKey] = {
      version: 2
    }
    Vue.component(Layout.name, Layout)
  }
}
