import { createRouter, createWebHashHistory } from "vue-router"
import PageLayout from "../components/Layout.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/page/page1",
  },
  {
    path: "/page",
    component: PageLayout,
    children: [
      {
        path: "page1",
        name: "page1",
        redirect: "/page/page1/page4",
        component: () => import("../views/page/page-container.vue"),
        children: [
          {
            path: "page4",
            name: "page4",
            component: () => import("../views/page/page4.vue"),
          },
          {
            path: "page5",
            name: "page5",
            component: () => import("../views/page/page5.vue"),
          },
        ],
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("../views/page/page2.vue"),
      },
      {
        path: "page3",
        name: "page3",
      },
    ],
  },
  {
    path: "/element-ui-plus-extension",
    component: PageLayout,
    children: [
      {
        path: "form-field",
        component: () => import("../views/element-ui-plus-extension/form-field.vue"),
      }
    ]
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
