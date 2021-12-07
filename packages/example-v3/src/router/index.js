import { createRouter, createWebHashHistory  } from 'vue-router'
import PageLayout from '../components/Layout.vue'

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
        component: () => import("@/views/page/page-container.vue"),
        children: [
          {
            path: "path4",
            name: "path4",
            component: () => import("@/views/page/page4.vue"),
          },
          {
            path: "path5",
            name: "path5",
            component: () => import("@/views/page/page5.vue"),
          },
        ],
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("@/views/page/page2.vue"),
      },
      {
        path: "page3",
        name: "page3",
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
