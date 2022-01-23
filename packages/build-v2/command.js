const vue = require('rollup-plugin-vue').default
const { resolveInput, runBuild } = require("./index")

const {
  input,
  name,
  ignoreDependencies
} = resolveInput()

runBuild({
  input,
  name,
  ignoreDependencies,
  rollupVuePlugin: vue
})
