<script lang="ts">
import { isUrl, urlToList, menuDataFormatter } from "./utils";
import { RegisterMenuData } from "./types";
export default {
  name: "GlobalAside",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    logo: String,
    title: String,
    Authorized: Function,
    prefixIconClass: {
      type: String,
      default: "",
    },
    menuTextClass: {
      type: String,
      default: "",
    },
    checkMenuDisabled: Function,
    routerParams: {
      type: Object,
      default() {
        return {};
      },
    },
    siderWidths: {
      type: Array,
      default() {
        return ["64px", "200px"];
      },
    },
  },
  data() {
    return {
      openKeys: [],
      activeRoutePath: '',
      menuData: [],
    }
  },
  computed: {
    _siderWidths() {
      return [
        this.siderWidths ? this.siderWidths[0] : "54px",
        this.siderWidths ? this.siderWidths[1] : "200px",
      ]
    },
    width() {
      return this.collapsed ? this._siderWidths[0] : this._siderWidths[1]
    },
  },
  watch: {
    data: {
      handler(val) {
        const _menuData = val
          .filter(t => t.title && !t.hide)
          .map(t => {
            if (this.Authorized && this.Authorized(t.authority, t)) {
              return t;
            }
            return t;
          })
          .filter(t => !!t);

        this.menuData = menuDataFormatter(_menuData);
      },
      immediate: true,
      deep: true,
    },
    '$route.path': {
      handler(val) {
        this.activeRoutePath = val;
        this.openKeys = urlToList(val);
      },
      immediate: true,
    },
  },
  render(h) {
    const renderIcon = (menuItem: RegisterMenuData) => {
      return h("i", {
        class: `${this.prefixIconClass} ${menuItem.icon || ""}`,
        slot: "title",
      });
    };
    const renderTitle = (menuItem: RegisterMenuData) => {
      return h(
        "span",
        { class: this.menuTextClass, slot: "title" },
        menuItem.title,
      );
    };

    const renderMenu = (menuData: RegisterMenuData[]) => {
      return menuData.map(t => {
        if (t.children && t.children.length > 0) return renderSubMenu(t);
        return renderMenuItem(t);
      });
    };

    const renderMenuItem = (menuItem: RegisterMenuData) => {
      const { path, icon } = menuItem;
      const Icon = renderIcon(menuItem);
      const Title = renderTitle(menuItem);
      const ElMenuItem = h(
        "el-menu-item",
        {
          props: {
            index: path,
            disabled: this.checkMenuDisabled && this.checkMenuDisabled(menuItem),
          },
        },
        [icon && Icon, Title],
      );

      if (isUrl(path)) {
        return h("a", {
          attrs: {
            href: path,
            target: menuItem.target,
          },
        });
      } else {
        const routerLinkProps = Object.assign(
          {
            to: path,
            query: menuItem.query,
            params: menuItem.params,
            redirect: menuItem.redirect,
          },
          this.routerParams,
        );

        return h(
          "router-link",
          {
            class: "router-menu",
            props: routerLinkProps,
          },
          [ElMenuItem],
        );
      }
    };

    const renderSubMenu = (menuItem: RegisterMenuData) => {
      if (menuItem.children && menuItem.children.length > 0) {
        return h(
          "el-submenu",
          {
            props: {
              index: menuItem.path,
              ...(menuItem.subMenuProps || {}),
            },
            key: menuItem.path,
          },
          [
            menuItem.icon && renderIcon(menuItem),
            menuItem.title && renderTitle(menuItem),
            renderMenu(menuItem.children || []),
          ],
        );
      }
    };

    const {
      logo,
      title,
      collapsed,
      activeRoutePath,
      openKeys,
      menuData,
    } = this;
    const renderSider = () => {
      return h(
        "div",
        {
          class: "layout-global-aside",
          style: {
            width: this.width,
          },
        },
        [
          logo &&
            title &&
            h(
              "div",
              {
                class: "logo-container",
              },
              [
                h(
                  "router-link",
                  {
                    class: "menu-router-link",
                    props: {
                      to: "/",
                    },
                  },
                  [
                    logo &&
                      h("img", {
                        attrs: {
                          src: logo,
                        },
                      }),
                    title && h("h1", title),
                  ],
                ),
              ],
            ),
          h(
            "el-menu",
            {
              props: {
                mode: "vertical",
                "unique-opened": true,
                collapse: collapsed,
                "default-active": activeRoutePath,
                "default-openeds": openKeys,
              },
              style: {
                padding: "16px 0",
                width: "100%",
              },
            },
            renderMenu(menuData),
          ),
        ],
      );
    };

    const renderSiderPlaceholder = () => {
      return h("div", {
        class: "layout-global-aside-placeholder",
        style: {
          width: this.width,
        },
      });
    };
    return h(
      "div",
      {
        class: "layout-global-aside-container",
      },
      [renderSiderPlaceholder(), renderSider()],
    );
  },
}
</script>
