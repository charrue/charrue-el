;(function (window) {
  if (window.VueDemi) {
    return
  }
  var VueDemi = {}
  var Vue = window.Vue
  if (Vue) {
    if (Vue.version.slice(0, 2) === '2.') {
      var VueCompositionAPI = window.VueCompositionAPI
      if (VueCompositionAPI) {
        for (var key in VueCompositionAPI) {
          VueDemi[key] = VueCompositionAPI[key]
        }
        VueDemi.isVue2 = true
        VueDemi.isVue3 = false
        VueDemi.install = function (){}
        VueDemi.Vue = Vue
        VueDemi.Vue2 = Vue
        VueDemi.version = Vue.version
      } else {
        console.error(
          '[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.'
        )
      }
    } else if (Vue.version.slice(0, 2) === '3.') {
      for (var key in Vue) {
        VueDemi[key] = Vue[key]
      }
      VueDemi.isVue2 = false
      VueDemi.isVue3 = true
      VueDemi.install = function (){}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = undefined
      VueDemi.version = Vue.version
      VueDemi.set = function(target, key, val) {
        if (Array.isArray(target)) {
          target.length = Math.max(target.length, key)
          target.splice(key, 1, val)
          return val
        }
        target[key] = val
        return val
      }
      VueDemi.del = function(target, key) {
        if (Array.isArray(target)) {
          target.splice(key, 1)
          return
        }
        delete target[key]
      }
    } else {
      console.error('[vue-demi] Vue version ' + Vue.version + ' is unsupported.')
    }
  } else {
    console.error(
      '[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.'
    )
  }
  window.VueDemi = VueDemi
})(window)
;
;this.CharrueDemo = (function (vue) {
  'use strict';

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
    const _component_sidebar_item = vue.resolveComponent("sidebar-item", true);
    const _component_el_submenu = vue.resolveComponent("el-submenu");
    const _component_el_menu_item = vue.resolveComponent("el-menu-item");
    const _component_router_link = vue.resolveComponent("router-link");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
      $props.menuItem.children && $props.menuItem.children.length > 0 ? (vue.openBlock(), vue.createBlock(_component_el_submenu, {
        key: 0,
        index: $props.menuItem.path,
        "popper-append-to-body": ""
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("template", _hoisted_2$1, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["submenu-title", $props.menuItem.icon ? "submenu-title-with-icon" : ""])
            }, [
              vue.createElementVNode("i", {
                class: vue.normalizeClass(["aside-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
              }, null, 2),
              vue.createElementVNode("span", {
                class: vue.normalizeClass([$props.menuTextClass, "common-menu-text"])
              }, vue.toDisplayString($props.menuItem.title), 3)
            ], 2)
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.menuItem.children, (child) => {
            return vue.openBlock(), vue.createBlock(_component_sidebar_item, {
              key: child.path,
              "is-nest": true,
              menuItem: child
            }, null, 8, ["menuItem"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["index"])) : (vue.openBlock(), vue.createBlock(_component_router_link, {
        key: 1,
        to: $props.menuItem.path,
        class: "menu-router-link"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_menu_item, {
            index: $props.menuItem.path
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("template", _hoisted_3$1, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["submenu-title", $props.menuItem.icon ? "submenu-title-with-icon" : ""])
                }, [
                  vue.createElementVNode("i", {
                    class: vue.normalizeClass(["aside-menu-icon", $props.prefixIconClass, $props.menuItem.icon])
                  }, null, 2),
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass([$props.menuTextClass, "common-menu-text"])
                  }, vue.toDisplayString($props.menuItem.title), 3)
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
    const _component_router_link = vue.resolveComponent("router-link");
    const _component_sidebar_item = vue.resolveComponent("sidebar-item");
    const _component_el_menu = vue.resolveComponent("el-menu");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createElementVNode("div", {
        class: "layout-global-aside-placeholder",
        style: vue.normalizeStyle({ width: $options.width })
      }, null, 4),
      vue.createElementVNode("div", {
        class: "layout-global-aside global-aside-el-menu",
        style: vue.normalizeStyle({ width: $options.width, position: $props.absolute ? "absolute" : "fixed" })
      }, [
        $props.logo || $props.title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createVNode(_component_router_link, {
            to: $props.homeUrl,
            class: vue.normalizeClass(["menu-router-link"])
          }, {
            default: vue.withCtx(() => [
              $props.logo ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                src: $props.logo,
                alt: "logo"
              }, null, 8, _hoisted_3)) : vue.createCommentVNode("v-if", true),
              $props.title ? (vue.openBlock(), vue.createElementBlock("h1", _hoisted_4, vue.toDisplayString($props.title), 1)) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["to"])
        ])) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "sidebar-top"),
        vue.createVNode(_component_el_menu, {
          mode: "vertical",
          "unique-opened": "",
          collapse: $props.collapsed,
          "default-active": $data.activeRoutePath,
          "default-openeds": $data.openKeys,
          style: { "padding": "16px 0", "width": "100%" }
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.computedMenuData, (item) => {
              return vue.openBlock(), vue.createBlock(_component_sidebar_item, {
                key: item.path,
                menuItem: item
              }, null, 8, ["menuItem"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["collapse", "default-active", "default-openeds"]),
        vue.renderSlot(_ctx.$slots, "sidebar-bottom")
      ], 4)
    ]);
  }

  script.render = render;
  script.__file = "GlobalAside.vue";

  script.install = (app) => {
    app.component(script.name, script);
  };

  return script;

})(vue);
