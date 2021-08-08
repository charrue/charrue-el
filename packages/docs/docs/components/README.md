---
title: 开始使用
---

Charrue ProComponents 是基于Element UI而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

这些行为和样式更改起来会比较困难，如果你的业务需要丰富的自定义建议直接使用 Element UI。
- [ProLayout](./pro/layout.html) 解决布局问题。
- ProTable
- ProForm
- ProList

## 安装
当前 ProComponents 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。
``` bash
npm install @charrue/layout -S
```

## CDN
目前可以通过 unpkg.com/element-ui 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。
``` html
<link rel="stylesheet" href="https://unpkg.com/@charrue/layout/dist/style/index.css">
<script src="https://unpkg.com/@charrue/layout/dist/umd/index.js"></script>
```

## 使用演示
组件具体的使用可以在仓库的[examples](https://github/charrue/pro-components/tree/master/packages/examples)文件夹下查看，或者访问CodeSandbox上导入该目录后的演示项目。

<iframe src="https://codesandbox.io/embed/github/charrue/pro-components/tree/master/packages/examples?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@charrue/examples"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>