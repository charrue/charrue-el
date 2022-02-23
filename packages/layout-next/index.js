import { Layout, PluginKey } from "@charrue/layout-internal"

export default {
  install(app) {
    app.config.globalProperties[PluginKey] = {
      version: 3
    }
    app.component(Layout.name, Layout)
  }
}
