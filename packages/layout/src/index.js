import _Layout from "./Layout.vue";
import _GlobalHeader from "./GlobalHeader.vue";
import _ContentView from "./ContentView.vue";
import _GlobalAside from "./GlobalAside.vue";

[_Layout, _GlobalHeader, _ContentView].forEach(comp => {
  comp.install = app => {
    app.component(comp.name, comp);
  };
});

export const Layout = _Layout;
export const GlobalHeader = _GlobalHeader;
export const ContentView = _ContentView;
export const GlobalAside = _GlobalAside;

export default Layout;
