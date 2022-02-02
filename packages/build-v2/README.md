# @charrue/build-v2

## 介绍

针对于本项目所使用的vue单文件打包工具。

由于存在需要将同一份代码打包为可用vue2版和vue3版使用的需求，但是使用rollup打包时，`rollup-plugin-vue`最新版只能打包出vue3可使用的代码，而如果想要打包出vue2可使用的代码，则需要使用5.x的版本。

针对此情况，创建了两个包，`@charrue/build-v2` 和 `@charrue/build-v3`。

`@charrue/build-v2`使用`rollup-plugin-vue@4.3.0`，用于打包出vue2的代码；`@charrue/build-v3`使用`rollup-plugin-vue^6.0.0-beta.11`，用于打包出vue3的代码。



## 使用

``` javascript
import { runBuild } from "@charrue/build-v2";
// 针对个人需求可以下载5.x或6.x的版本
const vue = require('rollup-plugin-vue')

runBuild({
  input,
  name,
  ignoreDependencies,
  rollupVuePlugin: vue
})
```

使用时只需要引入`@charrue/build-v2`提供的固定的打包配置，并传入你需要的版本的`rollup-plugin-vue`即可。其中的配置项并不会关心使用的是哪个版本的`rollup-plugin-vue`，只会将你传入的`rollupVuePlugin`参数拿过来直接使用，实现了文件打包与`rollup-plugin-vue`解耦。