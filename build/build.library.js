const esbuild = require("rollup-plugin-esbuild")
const path = require("path")
const cwd = process.cwd()
const inputPath = path.resolve(cwd, './src/index')
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
    input: inputPath,
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
