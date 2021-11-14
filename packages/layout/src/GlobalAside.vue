<script>
import {
  isUrl,
  urlToList,
  menuDataFormatter,
  getMenuDataPathMapping,
} from "./utils";
export default {
  name: "GlobalAside",
  props: {
    /**
     * 导航菜单数据
     */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 导航菜单是否处于折叠状态
     */
    collapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * 导航菜单标题区域的logo
     */
    logo: String,
    /**
     * 导航菜单标题区域的标题文字
     */
    title: String,
    /**
     * 是否启用路由模式，依赖vue-router
     */
    route: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否将侧边栏设置为position: absolute, 使得可以相对于其他容器进行定位
     */
    absolute: {
      type: Boolean,
      default: false,
    },
    /**
     * 控制导航菜单的展示
     */
    Authorized: Function,
    /**
     * 导航菜单图标的图标前缀
     */
    prefixIconClass: {
      type: String,
      default: "",
    },
    /**
     * 菜单文字的类名
     */
    menuTextClass: {
      type: [String, Array, Object],
      default: "",
    },
    /**
     * 控制菜单是否可用
     */
    checkMenuDisabled: Function,
    /**
     * 菜单进行路由跳转时，携带的参数
     */
    routeParams: [Function, Object],
    /**
     * 自定义导航菜单文字渲染
     */
    menuTitleRender: Function,
    /**
     * 导航菜单顶部标题下面的区域
     */
    menuHeaderExtraRender: Function,
    /**
     * 导航菜单折叠，展开时的宽度
     */
    asideWidths: {
      type: Array,
      default() {
        return ["54px", "200px"];
      },
    },
  },
  data() {
    return {
      openKeys: [],
      activeRoutePath: "",
      menuData: [],
      menuDataPathMapping: {},
    };
  },
  computed: {
    _siderWidths() {
      return [
        this.asideWidths ? this.asideWidths[0] : "54px",
        this.asideWidths ? this.asideWidths[1] : "200px",
      ];
    },
    width() {
      return this.collapsed ? this._siderWidths[0] : this._siderWidths[1];
    },
  },
  watch: {
    data: {
      handler(val) {
        const _menuData = val
          .filter((t) => t.title && !t.hide)
          .map((t) => {
            if (this.Authorized && this.Authorized(t.authority, t)) {
              return t;
            }
            return t;
          })
          .filter((t) => !!t);

        this.menuData = menuDataFormatter(_menuData);
        this.menuDataPathMapping = getMenuDataPathMapping(this.menuData);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    if (this.route) {
      this.$watch(
        "$route.path",
        (val) => {
          if (
            this.menuDataPathMapping[val] &&
            this.menuDataPathMapping[val].redirect
          ) {
            this.activeRoutePath = this.menuDataPathMapping[val].redirect;
          } else {
            this.activeRoutePath = val;
          }

          this.openKeys = urlToList(val);
        },
        {
          immediate: true,
        }
      );
    }
  },
  render(h) {
    const {
      logo,
      title,
      collapsed,
      activeRoutePath,
      openKeys,
      menuData,
      route,
      absolute,
      routeParams = {}
    } = this;

    const renderIcon = (menuItem) => {
      return h("i", {
        class: `${this.prefixIconClass} ${menuItem.icon || ""}`,
        slot: "title",
      });
    };
    const defaultMenuItemTitleRender = (menuItem) => {
      return h(
        "span",
        { class: this.menuTextClass, slot: "title" },
        menuItem.title
      );
    };
    const renderTitle = (menuItem) => {
      return this.menuTitleRender
        ? this.menuTitleRender.call(this, h, menuItem)
        : defaultMenuItemTitleRender.call(this, menuItem);
    };

    const renderMenu = (menuData) => {
      return menuData.map((t) => {
        if (t.children && t.children.length > 0) return renderSubMenu(t);
        return renderMenuItem(t);
      });
    };

    const renderMenuItem = (menuItem) => {
      const { path, icon } = menuItem;
      const Icon = renderIcon(menuItem);
      const Title = renderTitle(menuItem);
      const ElMenuItem = h(
        "el-menu-item",
        {
          props: {
            index: path,
            disabled:
              this.checkMenuDisabled && this.checkMenuDisabled(menuItem),
          },
        },
        [icon && Icon, Title]
      );

      if (isUrl(path)) {
        return h("a", {
          attrs: {
            href: path,
            target: menuItem.target,
          },
        });
      } else {
        let routerLinkProps = {
          to: {
            path: path,
            query: menuItem.query,
            params: menuItem.params,
            redirect: menuItem.redirect,
          },
        };

        if (typeof routeParams === 'function') {
          routerLinkProps.to = {
            ...routerLinkProps.to,
            ...routeParams(menuItem)
          }
        } else {
          routerLinkProps.to = {
            ...routerLinkProps.to,
            ...routeParams
          }
        }

        return h(
          menuRouteComponent,
          {
            class: "menu-router-link",
            props: routerLinkProps,
          },
          [ElMenuItem]
        );
      }
    };

    const renderSubMenu = (menuItem) => {
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
          ]
        );
      }
    };

    const renderMenuHeaderExtraRender = () => {
      if (this.menuHeaderExtraRender) {
        return this.menuHeaderExtraRender.call(this, h);
      }
      return null;
    };

    const menuRouteComponent = route ? "router-link" : "span";
    const renderSider = () => {
      return h(
        "div",
        {
          class: "layout-global-aside",
          style: {
            width: this.width,
            position: absolute ? "absolute" : "fixed",
          },
        },
        [
          (logo || title) &&
            h(
              "div",
              {
                class: "logo-container",
              },
              [
                h(
                  menuRouteComponent,
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
                  ]
                ),
              ]
            ),
            this.$slots['side-top'],
          renderMenuHeaderExtraRender(),
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
            renderMenu(menuData)
          ),
        ]
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
      [renderSiderPlaceholder(), renderSider()]
    );
  },
};
</script>
