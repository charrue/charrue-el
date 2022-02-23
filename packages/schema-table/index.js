import { SchemaTable, PluginKey } from "@charrue/schema-table-internal"

export default {
  install(Vue) {
    Vue.prototype[PluginKey] = {
      version: 2
    }
    Vue.component(SchemaTable.name, SchemaTable)
  }
}
