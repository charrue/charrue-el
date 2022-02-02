---
map:
  path: /layout
---





## Props

| 参数         | 说明                                                         | 类型               | 默认值      |
| ------------ | ------------------------------------------------------------ | ------------------ | ----------- |
| collapsed    | 控制菜单的收起和展开                                         | `Boolean`          | `false`     |
| fixedHeader  | 是否将Header固定在视图的顶部                                 | `Boolean`          | `true`      |
| data         | 侧边栏数据源                                                 | `MenuData[]`       | `[]`        |
| title        | 侧边栏的左上角的title                                        | `String`           | `''`        |
| logo         | 侧边栏的左上角的logo的url                                    | `String`           | `''`        |
| sidebarWidth | 侧边菜单折叠与展开的宽度                                     | `[Number, Number]` | `[54, 240]` |
| animation    | 在默认插槽的外部是否需要包裹`transition`                     | `Boolean`          | `true`      |
| absolute     | 对于侧边栏是否使用`absolute`布局，如果值为`false`则使用`fixed`布局 | `Boolean`          | `false`     |
| route        | 点击侧边栏时，是否进行路由跳转                               | `Boolean`          | `false`     |
| authorized   |                                                              |                    |             |
| homeUrl      | 点击title和logo后跳转的url                                   | `String`           | `/`         |



### MenuData

| 属性  | 说明             |
| ----- | ---------------- |
| title | 菜单项文字       |
| path  | 菜单项对应的路由 |
| icon  | 菜单项的图标     |









## Slots

| 名称           | 说明               |
| -------------- | ------------------ |
| header-left    | 顶栏左侧           |
| header-trigger | 顶栏折叠触发器区域 |
| header-right   | 顶栏右侧           |
| sidebar-top    | 侧栏顶部           |
| sidebar-bottom | 侧栏底部           |
| content-header | 内容区顶部         |
| default        | 内容区             |
| content-footer | 内容区底部         |

