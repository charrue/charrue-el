---
title: Layout-中后台页面级布局组件
---

# Layout-中后台页面级布局组件

Layout可以提供一个基础的、可定制的中后台标准布局，传入数据自动生成侧栏导航菜单。
搭配VueRouter使用后，能够实现点击导航菜单调整，并能够根据当前路由，自动展开侧栏中对应的菜单项。

## 代码演示


### 基础使用

<NewDemoBlock :code='`
<template>
  <div>
    <layout :data="menuData" :route="false"></layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "基础使用 无路由",
      menuData: [
        {
          title: "标题一",
          path: "page1"
        },
        {
          title: "标题二",
          path: "page2"
        },
      ]
    }
  }
}
</script>
`'>
  <div style="width: 100%" slot="demo">
    <iframe style="height: 300px;width: 100%;" src="/demos/layout/basic.html" frameborder="0"></iframe>
  </div>
</NewDemoBlock>

### 关闭路由模式


### absolute布局


### 自定义菜单标题渲染

### 菜单顶部区域渲染

## API

| 参数                  | 说明                                          | 类型                                  |
| --------------------- | --------------------------------------------- | ------------------------------------- |
| data                  | 侧边菜单的数据项                              | `RegisterMenuData[]`                  |
| collapsed             | 是否搜索                                      | `Boolean`                             |
| fixedHeader           | 是否固定顶部                                  | `Boolean`                             |
| logo                  | 侧栏的logo                                    | `String`                              |
| title                 | 侧栏的标题                                    | `String`                              |
| routeParams           | 路由跳转时携带的额外参数                      | `RouteParams`                         |
| titleRender           | 自定义导航菜单标题渲染                        | `(data: RegisterMenuData) => VNode`   |
| contentStyle          | 主题内容区的样式渲染                          | `String` | `Array` | `Object`         |
| route                 | 是否开启路由模式，依赖于VueRouter             | `Boolean`                             |
| absolute              | 侧栏布局是否使用absolute布局，默认是fixed布局 | `Boolean`                             |
| Authorized            | 控制侧栏菜单的显示，控制权限时使用            | `(data: RegisterMenuData) => boolean` |
| prefixIconClass       | 导航菜单图标的公共类名                        | `String` | `Array` | `Object`             |
| menuTextClass         | 导航菜单标题的公共类名                        | `String` | `Array` | `Object`             |
| checkMenuDisabled     | 控制导航菜单是否可用                          | `(data: RegisterMenuData) => boolean` |
| menuHeaderExtraRender | 控制侧栏菜单和标题之间的区域的渲染            | `(data: RegisterMenuData) => VNode`   |
| asideWidths           | 自定义侧栏的宽度                              | `[String, String]`                    |





## 插槽

| 名称           | 说明               |
| -------------- | ------------------ |
| header-trigger | 折叠触发器区域     |
| header-left    | 顶栏左侧区域       |
| header-right   | 顶栏右侧区域       |
| content-header | 主体内容的头部区域 |
| default        | 主体内容           |

