const vue = require('rollup-plugin-vue')
const { resolveInput, runBuild } = require("@charrue/build-v2")

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
