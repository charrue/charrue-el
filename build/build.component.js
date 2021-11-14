/* eslint-disable */
/**
 * npm run build:component <name>
 * 组件打包
 * 如果带上了组件名，则只打包该组件，否则打包全部的组件
 */
const path = require('path')
const fs = require('fs')
const css = require('rollup-plugin-css-only')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue').default
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const ts = require('typescript')
const { packages } = require('./packages')

const compPath = process.argv[2]

const runBuild = async (name) => {
  const pkgs = packages
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
      external: ['vue', 'element-ui'],
      plugins: [
        // terser(),
        css(),
        commonjs(),
        nodeResolve(),
        babel({
          exclude: 'node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          presets: ["@vue/babel-preset-jsx"]
        }),
        vue({
          target: 'browser',
          css: false,
        }),
        // typescript({
        //   // typescript: ts,
        //   // tsconfig: tsconfigPath,
        //   tsconfigOverride: {
        //     compilerOptions: {
        //       declaration: false,
        //     },
        //     'exclude': [
        //       'node_modules',
        //       '__tests__',
        //     ],
        //   },
        //   abortOnError: false,
        // }),
      ],
      external(id) {
        return /^vue/.test(id)
          || /^@charrue/.test(id)
          || deps.some(k => new RegExp('^' + k).test(id))
      },
    }
    const getOutFile = (name = "index") => {
      return getPkgDir(`./dist/${name}.js`)
    }
    const outOptions = [
      {
        format: 'es',
        file: getOutFile(),
      },
      {
        format: 'umd',
        file: getOutFile(`umd/index`),
        name: 'CharrueLayout',
        exports: 'named',
      },
    ]

    const bundle = await rollup.rollup(inputOptions)
    console.log(name, 'done')
    await Promise.all(outOptions.map(async (t) => await bundle.write(t)))
  }
}

runBuild(compPath)
