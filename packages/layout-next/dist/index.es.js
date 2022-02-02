import { resolveComponent, openBlock, createElementBlock, createBlock, resolveDynamicComponent, withCtx, createElementVNode, normalizeClass, toDisplayString, Fragment, renderList, createVNode, normalizeStyle, createCommentVNode, renderSlot, Transition } from 'vue';

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const PluginKey$1 = "$CharrueLayoutPluginOptions";
const getComponentConfig = (version) => {
  const config = {};
  if (version == 2) {
    config.subMenu = "el-submenu";
  } else if (version == 3) {
    config.subMenu = "el-sub-menu";
  } else {
    console.error(`[charrue layout] version ${version} is not supported`);
  }
  return config;
};
const HttpReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
function isUrl(path) {
  return HttpReg.test(path);
}
function urlToList(url) {
  const segments = url.split("/").filter((i) => i);
  return segments.map((_, index) => {
    return `/${segments.slice(0, index + 1).join("/")}`;
  });
}
function menuDataFormatter(data, parentPath = "") {
  return data.map((item) => {
    let { path, redirect } = item;
    if (path && !isUrl(path)) {
      const isRootPath = path[0] === "/";
      if (path) {
        path = parentPath && isRootPath ? path : `${parentPath}/${path}`;
      }
    }
    path = cleanPath(path);
    if (redirect && redirect[0] !== "/") {
      redirect = cleanPath(`${path}/${redirect}`);
    }
    const result = __spreadProps(__spreadValues$1({}, item), {
      path,
      redirect
    });
    if (item.children) {
      result.children = menuDataFormatter(item.children, `${parentPath}/${item.path}`);
    }
    return result;
  });
}
function getMenuDataPathMapping(processedMenuData, _mapping = {}) {
  if (!Array.isArray(processedMenuData))
    return _mapping;
  let mapping = __spreadValues$1({}, _mapping);
  processedMenuData.forEach((item) => {
    if (item.path) {
      mapping[item.path] = item;
    }
    if (item.children) {
      mapping = getMenuDataPathMapping(item.children, mapping);
    }
  });
  return mapping;
}
function cleanPath(path) {
  return path.replace(/\/\//g, "/");
}
function isFunction(val) {
  return typeof val === "function";
}

var script$5 = {
  name: "SidebarItem",
  props: {
    subMenuComponent: {
      type: String,
      default: "el-submenu"
    },
    menuItem: {
      type: Object,
      required: true
    },
    prefixIconClass: String,
    menuTextClass: String,
    route: Boolean
  }
};

const _hoisted_1$4 = { class: "charrue-layout-sidebar-el-menu-container" };
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sidebar_item = resolveComponent("sidebar-item", true);
  const _component_el_menu_item = resolveComponent("el-menu-item");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    $props.menuItem.children && $props.menuItem.children.length > 0 ? (openBlock(), createBlock(resolveDynamicComponent($props.subMenuComponent), {
      key: 0,
      index: $props.menuItem.path,
      "popper-append-to-body": ""
    }, {
      title: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass([
            "submenu-title",
            $props.menuItem.icon ? "submenu-title-with-icon" : ""
          ])
        }, [
          createElementVNode("i", {
            class: normalizeClass(["sidebar-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
          }, null, 2),
          createElementVNode("span", {
            class: normalizeClass([$props.menuTextClass, "common-menu-text"])
          }, toDisplayString($props.menuItem.title), 3)
        ], 2)
      ]),
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.menuItem.children, (child) => {
          return openBlock(), createBlock(_component_sidebar_item, {
            key: child.path,
            route: $props.route,
            "is-nest": true,
            menuItem: child,
            subMenuComponent: $props.subMenuComponent
          }, null, 8, ["route", "menuItem", "subMenuComponent"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["index"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      $props.route ? (openBlock(), createBlock(_component_router_link, {
        key: 0,
        to: $props.menuItem.path,
        class: "menu-router-link"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_menu_item, {
            index: $props.menuItem.path
          }, {
            title: withCtx(() => [
              createElementVNode("div", {
                class: normalizeClass([
                  "submenu-title",
                  $props.menuItem.icon ? "submenu-title-with-icon" : ""
                ])
              }, [
                createElementVNode("i", {
                  class: normalizeClass(["sidebar-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
                }, null, 2),
                createElementVNode("span", {
                  class: normalizeClass([$props.menuTextClass, "common-menu-text"])
                }, toDisplayString($props.menuItem.title), 3)
              ], 2)
            ]),
            _: 1
          }, 8, ["index"])
        ]),
        _: 1
      }, 8, ["to"])) : (openBlock(), createBlock(_component_el_menu_item, {
        key: 1,
        index: $props.menuItem.path
      }, {
        title: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass([
              "submenu-title",
              $props.menuItem.icon ? "submenu-title-with-icon" : ""
            ])
          }, [
            createElementVNode("i", {
              class: normalizeClass(["sidebar-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
            }, null, 2),
            createElementVNode("span", {
              class: normalizeClass([$props.menuTextClass, "common-menu-text"])
            }, toDisplayString($props.menuItem.title), 3)
          ], 2)
        ]),
        _: 1
      }, 8, ["index"]))
    ], 2112))
  ]);
}

script$5.render = render$5;
script$5.__file = "layout-internal/libs/SidebarItem.vue";

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var script$4 = {
  name: "GlobalAside",
  components: {
    SidebarItem: script$5
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    logo: String,
    title: String,
    route: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    },
    authorized: Function,
    checkMenuDisabled: Function,
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      }
    },
    homeUrl: {
      type: String,
      default: "/"
    },
    subMenuComponent: {
      type: String
    }
  },
  data() {
    return {
      openKeys: [],
      activeRoutePath: "",
      menuData: [],
      menuDataPathMapping: {}
    };
  },
  computed: {
    width() {
      return this.collapsed ? this.sidebarWidth[0] + "px" : this.sidebarWidth[1] + "px";
    },
    computedMenuData() {
      const menuData = [];
      this.menuData.forEach((menu, index) => {
        const formattedMenu = this.formatMenuData({
          menu,
          index,
          deep: 0,
          path: menu.path,
          parent: null
        });
        if (formattedMenu) {
          menuData.push(formattedMenu);
        }
      });
      return menuData;
    }
  },
  watch: {
    data: {
      handler() {
        this.filterAsideMenuData();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    filterAsideMenuData() {
      const _menuData = this.data.filter((t) => t.title && !t.hide).map((t) => {
        if (this.authorized && this.authorized(t.authority, t)) {
          return t;
        }
        return t;
      }).filter((t) => !!t);
      this.menuData = menuDataFormatter(_menuData);
      this.menuDataPathMapping = getMenuDataPathMapping(this.menuData);
    },
    _formatMenuData({ menu, deep, index, path, parent } = {}) {
      let menuCopy = menu ? __spreadValues({}, menu) : {};
      if (!this.authorized)
        return menuCopy;
      if (isFunction(this.authorized) && !this.authorized({ menu: menuCopy, deep, index, path, parent })) {
        return false;
      }
      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children.map((child) => {
          const currentPath = path.startsWith("/") ? child.path : `${path}/${child.path}`;
          return this._formatMenuData({
            menu: child,
            deep: deep + 1,
            index,
            path: currentPath,
            parent: menuCopy
          });
        }).filter((t) => t);
      }
      return menuCopy;
    },
    formatMenuData({ menu, deep, index, path, parent } = {}) {
      let menuCopy = menu ? __spreadValues({}, menu) : {};
      if (!this.authorized)
        return menuCopy;
      if (isFunction(this.authorized) && !this.authorized({ menu: menuCopy, deep, index, path, parent })) {
        return false;
      }
      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children.map((child) => {
          const currentPath = path.startsWith("/") ? child.path : `${path}/${child.path}`;
          return this.formatMenuData({
            menu: child,
            deep: deep + 1,
            index,
            path: currentPath,
            parent: menuCopy
          });
        }).filter((t) => t);
      }
      return menuCopy;
    }
  },
  created() {
    if (this.route) {
      this.$watch("$route.path", (val) => {
        if (this.menuDataPathMapping[val] && this.menuDataPathMapping[val].redirect) {
          this.activeRoutePath = this.menuDataPathMapping[val].redirect;
        } else {
          this.activeRoutePath = val;
        }
        this.openKeys = urlToList(val);
      }, {
        immediate: true
      });
    }
  }
};

const _hoisted_1$3 = { class: "charrue-layout-sidebar-container" };
const _hoisted_2$3 = {
  key: 0,
  class: "logo-container"
};
const _hoisted_3$1 = ["src"];
const _hoisted_4 = { key: 1 };
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_sidebar_item = resolveComponent("sidebar-item");
  const _component_el_menu = resolveComponent("el-menu");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("div", {
      class: "charrue-layout-sidebar-placeholder",
      style: normalizeStyle({ width: $options.width })
    }, null, 4),
    createElementVNode("div", {
      class: "charrue-layout-sidebar charrue-layout-sidebar-el-menu-container",
      style: normalizeStyle({ width: $options.width, position: $props.absolute ? "absolute" : "fixed" })
    }, [
      $props.logo || $props.title ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
        createVNode(_component_router_link, {
          to: $props.homeUrl,
          class: normalizeClass(["menu-router-link"])
        }, {
          default: withCtx(() => [
            $props.logo ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: $props.logo,
              alt: "logo"
            }, null, 8, _hoisted_3$1)) : createCommentVNode("v-if", true),
            $props.title ? (openBlock(), createElementBlock("h1", _hoisted_4, toDisplayString($props.title), 1)) : createCommentVNode("v-if", true)
          ]),
          _: 1
        }, 8, ["to"])
      ])) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "sidebar-top"),
      createVNode(_component_el_menu, {
        class: "charrue-layout-sidebar-el-menu",
        mode: "vertical",
        "unique-opened": "",
        collapse: $props.collapsed,
        "default-active": $data.activeRoutePath,
        "default-openeds": $data.openKeys
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedMenuData, (item) => {
            return openBlock(), createBlock(_component_sidebar_item, {
              route: $props.route,
              key: item.path,
              subMenuComponent: $props.subMenuComponent,
              menuItem: item
            }, null, 8, ["route", "subMenuComponent", "menuItem"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["collapse", "default-active", "default-openeds"]),
      renderSlot(_ctx.$slots, "sidebar-bottom")
    ], 4)
  ]);
}

script$4.render = render$4;
script$4.__file = "layout-internal/libs/LayoutSidebar.vue";

var script$3 = {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-click"],
  methods: {
    toggleClick() {
      this.$emit("toggle-click", this.isActive);
    }
  }
};

const _hoisted_1$2 = /* @__PURE__ */ createElementVNode("path", { d: "M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" }, null, -1);
const _hoisted_2$2 = [
  _hoisted_1$2
];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "hamburger-container",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleClick && $options.toggleClick(...args))
  }, [
    (openBlock(), createElementBlock("svg", {
      class: normalizeClass([{ "is-active": $props.isActive }, "hamburger-svg"]),
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
      width: "64",
      height: "64"
    }, _hoisted_2$2, 2))
  ]);
}

script$3.render = render$3;
script$3.__file = "layout-internal/libs/Hamburger.vue";

var script$2 = {
  name: "LayoutHeader",
  components: {
    Hamburger: script$3
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:collapse"],
  methods: {
    toggleSideBar() {
      this.$emit("update:collapse", !this.collapse);
    }
  }
};

const _hoisted_1$1 = { class: "charrue-layout-header-main" };
const _hoisted_2$1 = { class: "charrue-layout-header-left" };
const _hoisted_3 = { class: "charrue-layout-header-right" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_hamburger = resolveComponent("hamburger");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["charrue-layout-header-container", { "fixed-header": $props.fixed }])
  }, [
    createElementVNode("div", _hoisted_1$1, [
      createElementVNode("div", _hoisted_2$1, [
        createVNode(_component_hamburger, { onToggleClick: $options.toggleSideBar }, null, 8, ["onToggleClick"]),
        renderSlot(_ctx.$slots, "header-left")
      ]),
      createElementVNode("div", _hoisted_3, [
        renderSlot(_ctx.$slots, "header-right")
      ])
    ])
  ], 2);
}

script$2.render = render$2;
script$2.__file = "layout-internal/libs/LayoutHeader.vue";

var script$1 = {
  name: "LayoutContent",
  props: {
    contentStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    animation: {
      type: Boolean,
      default: true
    }
  }
};

const _hoisted_1 = { class: "charrue-layout-content-container" };
const _hoisted_2 = { class: "charrue-layout-content-header" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "content-header")
    ]),
    createElementVNode("div", {
      class: "charrue-layout-content-main",
      style: normalizeStyle($props.contentStyle)
    }, [
      $props.animation ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: "fade-transform",
        mode: "out-in"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "content")
        ]),
        _: 3
      })) : renderSlot(_ctx.$slots, "content", { key: 1 })
    ], 4)
  ]);
}

script$1.render = render$1;
script$1.__file = "layout-internal/libs/LayoutContent.vue";

var script = {
  name: "Layout",
  components: {
    LayoutSidebar: script$4,
    LayoutHeader: script$2,
    LayoutContent: script$1
  },
  props: {
    version: {
      type: Number,
      validator(value) {
        return [2, 3].indexOf(value) > -1;
      },
      default: 2
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    logo: String,
    title: String,
    routeParams: [Function, Object],
    contentStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      }
    },
    animation: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    },
    route: {
      type: Boolean,
      default: true
    },
    authorized: Function,
    homeUrl: {
      type: String,
      default: "/"
    }
  },
  data() {
    return {
      innerCollapse: false,
      componentConfig: {}
    };
  },
  computed: {
    mainWidthStyle() {
      return {
        width: `calc(100% - ${this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1]}px)`
      };
    },
    headerWidthStyle() {
      let width = "100%";
      if (this.fixedHeader) {
        width = `calc(100% - ${this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1]}px)`;
      }
      return {
        width
      };
    }
  },
  watch: {
    collapsed: {
      handler(val) {
        this.innerCollapse = val;
      },
      immediate: true
    },
    innerCollapse(val) {
      this.$emit("update:collapsed", val);
    }
  },
  created() {
    this.componentConfig = getComponentConfig(this[PluginKey$1].version || 2);
  },
  emits: ["update:collapsed"]
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_layout_sidebar = resolveComponent("layout-sidebar");
  const _component_layout_header = resolveComponent("layout-header");
  const _component_layout_content = resolveComponent("layout-content");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["charrue-layout", [$props.collapsed ? "hideSidebar" : "openSidebar"]])
  }, [
    createVNode(_component_layout_sidebar, {
      collapsed: $data.innerCollapse,
      data: $props.data,
      logo: $props.logo,
      title: $props.title,
      "route-params": $props.routeParams,
      route: $props.route,
      absolute: $props.absolute,
      authorized: $props.authorized,
      sidebarWidth: $props.sidebarWidth,
      homeUrl: $props.homeUrl,
      subMenuComponent: $data.componentConfig.subMenu
    }, {
      "sidebar-top": withCtx(() => [
        renderSlot(_ctx.$slots, "sidebar-top")
      ]),
      "sidebar-bottom": withCtx(() => [
        renderSlot(_ctx.$slots, "sidebar-bottom")
      ]),
      _: 3
    }, 8, ["collapsed", "data", "logo", "title", "route-params", "route", "absolute", "authorized", "sidebarWidth", "homeUrl", "subMenuComponent"]),
    createElementVNode("div", {
      class: "charrue-layout-main",
      style: normalizeStyle($options.mainWidthStyle)
    }, [
      createVNode(_component_layout_header, {
        collapse: $data.innerCollapse,
        fixed: $props.fixedHeader,
        style: normalizeStyle($options.headerWidthStyle),
        "onUpdate:collapse": _cache[0] || (_cache[0] = (val) => $data.innerCollapse = val)
      }, {
        "header-trigger": withCtx(() => [
          renderSlot(_ctx.$slots, "header-trigger")
        ]),
        "header-left": withCtx(() => [
          renderSlot(_ctx.$slots, "header-left")
        ]),
        "header-right": withCtx(() => [
          renderSlot(_ctx.$slots, "header-right")
        ]),
        _: 3
      }, 8, ["collapse", "fixed", "style"]),
      createVNode(_component_layout_content, {
        "content-style": $props.contentStyle,
        animation: $props.animation
      }, {
        "content-header": withCtx(() => [
          renderSlot(_ctx.$slots, "content-header")
        ]),
        content: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["content-style", "animation"])
    ], 4)
  ], 2);
}

script.render = render;
script.__file = "layout-internal/libs/Layout.vue";

const Layout = script;
const PluginKey = PluginKey$1;

var index = {
  install(app) {
    app.config.globalProperties[PluginKey] = {
      version: 2
    };
    app.component(Layout.name, Layout);
  }
};

export { index as default };