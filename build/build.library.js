const path = require("path")
const fs = require("fs")
const esbuild = require("rollup-plugin-esbuild")
const cwd = process.cwd()

const inputJsPath = path.resolve(cwd, './src/index.js')
const inputTsPath = path.resolve(cwd, './src/index.ts')
const hasTsInputPath = fs.existsSync(inputTsPath)
const distPath = path.resolve(cwd, './dist')

const config = [
  {
    external: ["vue-demi"],
    plugins: [
      esbuild({
        minify: false,
        sourceMap: false,
        target: "esnext",
      }),
    ],
    input: hasTsInputPath ? inputTsPath : inputJsPath,
    output: [
      {
        dir: distPath,
        format: "es",
        globals: {
          'vue-demi': 'VueDemi'
        },
      },
    ],
  },
];
export default config;
