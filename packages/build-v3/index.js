const vue = require('rollup-plugin-vue')
const runBuild = require("@charrue/build-v2")

// eslint-disable-next-line no-unused-vars
const [_, __, inputPath, packageName ] = process.argv

runBuild(packageName, inputPath, vue)
