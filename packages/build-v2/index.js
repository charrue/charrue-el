const minimist = require("minimist")
const rimraf = require("rimraf")
const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const esbuild = require("rollup-plugin-esbuild")
const dts = require('rollup-plugin-dts').default
const { camelize, upperCaseFirst } = require("./utils")

const pwd = process.cwd()

const VUE_DEMI_IIFE = fs.readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8')
const injectVueDemi = {
  name: 'inject-vue-demi',
  renderChunk(code) {
    return `${VUE_DEMI_IIFE};\n;${code}`
  },
}

const runBuild = async ({ name, input, rollupVuePlugin, ignoreDependencies } = {}) => {
  const isTs = input.endsWith('.ts')
  const getPkgDir = (...args) => {
    return path.resolve(pwd, ...args)
  }
  let deps = require(getPkgDir("package.json")).dependencies || {}
  deps = Object.keys(deps)

  if (!name) return
  rimraf.sync(getPkgDir("./dist"))

  const inputOptions = {
    input: getPkgDir(input),
    plugins: [
      nodeResolve(),
      rollupVuePlugin({
        target: 'browser',
        css: false,
      }),
      esbuild({
        target: "es2015",
      }),
      isTs && dts()
    ],
    external(id) {
      const aboutVue = /^vue/.test(id)
      const aboutCharrue = ["all", "charrue"].indexOf(ignoreDependencies) > -1 ? false : /^@charrue/.test(id)
      const aboutDep = ["all", "dependencies"].indexOf(ignoreDependencies) > -1? false : deps.some(k => new RegExp('^' + k).test(id))
      return aboutVue || aboutCharrue || aboutDep
    },
  }

  const getOutFile = (name = "index.js") => {
    return getPkgDir(`./dist/${name}`)
  }
  const outOptions = [
    {
      format: 'cjs',
      file: getOutFile('index.cjs.js'),
      globals: {
        'vue-demi': 'VueDemi'
      },
    },
    {
      format: 'es',
      file: getOutFile('index.es.js'),
      globals: {
        'vue-demi': 'VueDemi'
      },
    },
    {
      format: 'iife',
      extend: true,
      file: getOutFile(`index.iife.js`),
      name: upperCaseFirst(camelize(`charrue-${name}`)),
      globals: {
        'vue-demi': 'VueDemi'
      },
      plugins: [
        deps['vue-demi'] && injectVueDemi,
      ],
    },
  ]

  const bundle = await rollup.rollup(inputOptions)
  console.log(name, 'done')
  await Promise.all(outOptions.map(async (t) => await bundle.write(t)))
}

const resolveInput = () => {
  const argv = minimist(process.argv.slice(2))
  const {
    input,
    name,
    ['ignore-dependencies']: ignoreDependencies
  } = argv

  return {
    input,
    name,
    ignoreDependencies
  }
}

exports.runBuild = runBuild
exports.resolveInput = resolveInput
