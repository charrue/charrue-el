import { Layout, PluginKey } from "@charrue/layout-internal"

export default {
  install(app) {
    app.config.globalProperties[PluginKey] = {
      version: 2
    }
    app.component(Layout.name, Layout)
  }
}
