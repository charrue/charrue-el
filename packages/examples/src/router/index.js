import Vue from "vue";
import VueRouter from "vue-router";
import PageLayout from "@/components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/page/page1",
  },
  {
    path: '/extra',
    component: PageLayout,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      }
    ]
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
            path: "page4",
            name: "page4",
            component: () => import("@/views/page/page4.vue"),
          },
          {
            path: "page5",
            name: "page5",
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
        component: () => import("@/views/page/page3.vue"),
      },
      {
        path: "page3-plus",
        name: "page3-plus",
        component: () => import("@/views/page/page3-plus.vue"),
      },
    ],
  },
  {
    path: "/schema-table",
    name: "schema-table",
    component: PageLayout,
    children: [
      {
        path: "basic",
        name: 'basic',
        component: () => import("@/views/schema-table/basic.vue")
      }
    ]
  },
  {
    path: "/schema-form",
    name: "schema-form",
    component: PageLayout,
    children: [
      {
        path: "basic",
        name: 'schema-form-basic',
        component: () => import("@/views/schema-form/index.vue")
      }
    ]
  },
  {
    path: "/element-ui-extension",
    name: "element-ui-extension",
    component: PageLayout,
    redirect: "/element-ui-extension/index",
    children: [
      {
        path: "index",
        name: "element-ui-extension-index",
        component: () => import("@/views/element-ui-extension/index.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
