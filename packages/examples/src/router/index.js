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
];

const router = new VueRouter({
  routes,
});

export default router;
