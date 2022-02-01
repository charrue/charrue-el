import { resolveComponent, openBlock, createElementBlock, createBlock, withCtx, createElementVNode, normalizeClass, toDisplayString, Fragment, renderList, createVNode, normalizeStyle, createCommentVNode, renderSlot } from 'vue';

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

var script$1 = {
  name: "SidebarItem",
  props: {
    menuItem: {
      type: Object,
      required: true
    },
    prefixIconClass: String,
    menuTextClass: String
  }
};

const _hoisted_1$1 = { class: "global-aside-el-menu" };
const _hoisted_2$1 = { slot: "title" };
const _hoisted_3$1 = { slot: "title" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sidebar_item = resolveComponent("sidebar-item", true);
  const _component_el_submenu = resolveComponent("el-submenu");
  const _component_el_menu_item = resolveComponent("el-menu-item");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    $props.menuItem.children && $props.menuItem.children.length > 0 ? (openBlock(), createBlock(_component_el_submenu, {
      key: 0,
      index: $props.menuItem.path,
      "popper-append-to-body": ""
    }, {
      default: withCtx(() => [
        createElementVNode("template", _hoisted_2$1, [
          createElementVNode("div", {
            class: normalizeClass(["submenu-title", $props.menuItem.icon ? "submenu-title-with-icon" : ""])
          }, [
            createElementVNode("i", {
              class: normalizeClass(["aside-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
            }, null, 2),
            createElementVNode("span", {
              class: normalizeClass([$props.menuTextClass, "common-menu-text"])
            }, toDisplayString($props.menuItem.title), 3)
          ], 2)
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.menuItem.children, (child) => {
          return openBlock(), createBlock(_component_sidebar_item, {
            key: child.path,
            "is-nest": true,
            menuItem: child
          }, null, 8, ["menuItem"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["index"])) : (openBlock(), createBlock(_component_router_link, {
      key: 1,
      to: $props.menuItem.path,
      class: "menu-router-link"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_menu_item, {
          index: $props.menuItem.path
        }, {
          default: withCtx(() => [
            createElementVNode("template", _hoisted_3$1, [
              createElementVNode("div", {
                class: normalizeClass(["submenu-title", $props.menuItem.icon ? "submenu-title-with-icon" : ""])
              }, [
                createElementVNode("i", {
                  class: normalizeClass(["aside-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
                }, null, 2),
                createElementVNode("span", {
                  class: normalizeClass([$props.menuTextClass, "common-menu-text"])
                }, toDisplayString($props.menuItem.title), 3)
              ], 2)
            ])
          ]),
          _: 1
        }, 8, ["index"])
      ]),
      _: 1
    }, 8, ["to"]))
  ]);
}

script$1.render = render$1;
script$1.__file = "SidebarItem.vue";

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
var script = {
  name: "GlobalAside",
  components: {
    SidebarItem: script$1
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
    prefixIconClass: {
      type: String,
      default: ""
    },
    menuTextClass: {
      type: [String, Array, Object],
      default: ""
    },
    checkMenuDisabled: Function,
    routeParams: [Function, Object],
    asideWidths: {
      type: Array,
      default() {
        return [50, 200];
      }
    },
    homeUrl: {
      type: String,
      default: "/"
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
      return this.collapsed ? this.asideWidths[0] + "px" : this.asideWidths[1] + "px";
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
    this.formatMenuData = function({ menu, deep, index, path, parent } = {}) {
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
    };
  }
};

const _hoisted_1 = { class: "layout-global-aside-container" };
const _hoisted_2 = {
  key: 0,
  class: "logo-container"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_sidebar_item = resolveComponent("sidebar-item");
  const _component_el_menu = resolveComponent("el-menu");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "layout-global-aside-placeholder",
      style: normalizeStyle({ width: $options.width })
    }, null, 4),
    createElementVNode("div", {
      class: "layout-global-aside global-aside-el-menu",
      style: normalizeStyle({ width: $options.width, position: $props.absolute ? "absolute" : "fixed" })
    }, [
      $props.logo || $props.title ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_router_link, {
          to: $props.homeUrl,
          class: normalizeClass(["menu-router-link"])
        }, {
          default: withCtx(() => [
            $props.logo ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: $props.logo,
              alt: "logo"
            }, null, 8, _hoisted_3)) : createCommentVNode("v-if", true),
            $props.title ? (openBlock(), createElementBlock("h1", _hoisted_4, toDisplayString($props.title), 1)) : createCommentVNode("v-if", true)
          ]),
          _: 1
        }, 8, ["to"])
      ])) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "sidebar-top"),
      createVNode(_component_el_menu, {
        mode: "vertical",
        "unique-opened": "",
        collapse: $props.collapsed,
        "default-active": $data.activeRoutePath,
        "default-openeds": $data.openKeys,
        style: { "padding": "16px 0", "width": "100%" }
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedMenuData, (item) => {
            return openBlock(), createBlock(_component_sidebar_item, {
              key: item.path,
              menuItem: item
            }, null, 8, ["menuItem"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["collapse", "default-active", "default-openeds"]),
      renderSlot(_ctx.$slots, "sidebar-bottom")
    ], 4)
  ]);
}

script.render = render;
script.__file = "GlobalAside.vue";

script.install = (app) => {
  app.component(script.name, script);
};

export { script as default };
