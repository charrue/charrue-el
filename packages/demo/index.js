import Layout from "./GlobalAside.vue";

Layout.install = (app) => {
  app.component(Layout.name, Layout);
};

export default Layout;
