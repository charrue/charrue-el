/* eslint-disable */
/**
 * npm run build:component <name>
 * 组件打包
 * 如果带上了组件名，则只打包该组件，否则打包全部的组件
 */
const path = require('path')
const fs = require('fs')
const { getPackages } = require('@lerna/project')
const css = require('rollup-plugin-css-only')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')
const ts = require('typescript')


const compPath = process.argv[2]

const runBuild = async (name) => {
  const pkgs = await getPackages()
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name =>
      name.includes('@charrue') &&
      !name.includes('example'),
    )
  if (name && inputs.includes(`@charrue/${name}`)) {
    build(name)
  } else {
    await Promise.all(inputs.map(async (item) => {
      await build(item)
    }))
  }


  async function build(name) {
    const getPkgDir = (...args) => {
      return path.resolve(__dirname, `../packages/${name}`, ...args)
    }
    let deps = require(getPkgDir("package.json")).dependencies || {}
    deps = Object.keys(deps)

    if (!name) return

    const tsconfigPath = getPkgDir('tsconfig.json')
    if (fs.existsSync(tsconfigPath)) {
      const tsconfigJSON = ts.readConfigFile(tsconfigPath, ts.sys.readFile).config;
      tsCompilerOptions = ts.parseJsonConfigFileContent(
        tsconfigJSON,
        ts.sys,
        './'
      ).options;
    }

    const inputOptions = {
      input: getPkgDir("./src/index.js"),
      plugins: [
        // terser(),
        nodeResolve(),
        css(),
        vue({
          target: 'browser',
          css: false,
        }),
        typescript({
          // typescript: ts,
          // tsconfig: tsconfigPath,
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
            'exclude': [
              'node_modules',
              '__tests__',
            ],
          },
          abortOnError: false,
        }),
      ],
      external(id) {
        return /^vue/.test(id)
          || /^@charrue/.test(id)
          || deps.some(k => new RegExp('^' + k).test(id))
      },
    }
    const getOutFile = () => {
      return getPkgDir(`./dist/index.js`)
    }
    const outOptions = {
      format: 'es',
      file: getOutFile(),
    }

    const bundle = await rollup.rollup(inputOptions)
    console.log(name, 'done')
    await bundle.write(outOptions)
  }
}

runBuild(compPath)
