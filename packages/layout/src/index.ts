import { App } from "vue-demi";
import _Layout from "./Layout.vue";
import _GlobalHeader from "./GlobalHeader.vue";
import _ContentView from "./ContentView.vue";
import _GlobalAside from "./GlobalAside.vue"
import { SFCWithInstall } from "./types";
[_Layout, _GlobalHeader, _ContentView].forEach((comp: any) => {
  comp.install = (app: App) => {
    app.component(comp.name, comp);
  };
});

export const Layout: SFCWithInstall<any> = _Layout;
export const GlobalHeader: SFCWithInstall<any> = _GlobalHeader;
export const ContentView: SFCWithInstall<any> = _ContentView;
export const GlobalAside: SFCWithInstall<any> = _GlobalAside;

export default Layout;
