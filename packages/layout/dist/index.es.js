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

/* script */
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "charrue-layout-sidebar-el-menu-container" },
    [
      _vm.menuItem.children && _vm.menuItem.children.length > 0
        ? _c(
            _vm.subMenuComponent,
            {
              tag: "component",
              attrs: { index: _vm.menuItem.path, "popper-append-to-body": "" },
              scopedSlots: _vm._u(
                [
                  {
                    key: "title",
                    fn: function() {
                      return [
                        _c(
                          "div",
                          {
                            class: [
                              "submenu-title",
                              _vm.menuItem.icon ? "submenu-title-with-icon" : ""
                            ]
                          },
                          [
                            _c("i", {
                              class: [
                                "sidebar-menu-icon",
                                _vm.prefixIconClass,
                                _vm.menuItem.icon
                              ]
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                class: [_vm.menuTextClass, "common-menu-text"]
                              },
                              [_vm._v(_vm._s(_vm.menuItem.title))]
                            )
                          ]
                        )
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                false,
                1635619749
              )
            },
            [
              _vm._v(" "),
              _vm._l(_vm.menuItem.children, function(child) {
                return _c("sidebar-item", {
                  key: child.path,
                  attrs: {
                    route: _vm.route,
                    "is-nest": true,
                    menuItem: child,
                    subMenuComponent: _vm.subMenuComponent
                  }
                })
              })
            ],
            2
          )
        : [
            _vm.route
              ? _c(
                  "router-link",
                  {
                    staticClass: "menu-router-link",
                    attrs: { to: _vm.menuItem.path }
                  },
                  [
                    _c("el-menu-item", {
                      attrs: { index: _vm.menuItem.path },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "title",
                            fn: function() {
                              return [
                                _c(
                                  "div",
                                  {
                                    class: [
                                      "submenu-title",
                                      _vm.menuItem.icon
                                        ? "submenu-title-with-icon"
                                        : ""
                                    ]
                                  },
                                  [
                                    _c("i", {
                                      class: [
                                        "sidebar-menu-icon",
                                        _vm.prefixIconClass,
                                        _vm.menuItem.icon
                                      ]
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        class: [
                                          _vm.menuTextClass,
                                          "common-menu-text"
                                        ]
                                      },
                                      [_vm._v(_vm._s(_vm.menuItem.title))]
                                    )
                                  ]
                                )
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        1717388709
                      )
                    })
                  ],
                  1
                )
              : _c("el-menu-item", {
                  attrs: { index: _vm.menuItem.path },
                  scopedSlots: _vm._u([
                    {
                      key: "title",
                      fn: function() {
                        return [
                          _c(
                            "div",
                            {
                              class: [
                                "submenu-title",
                                _vm.menuItem.icon
                                  ? "submenu-title-with-icon"
                                  : ""
                              ]
                            },
                            [
                              _c("i", {
                                class: [
                                  "sidebar-menu-icon",
                                  _vm.prefixIconClass,
                                  _vm.menuItem.icon
                                ]
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  class: [_vm.menuTextClass, "common-menu-text"]
                                },
                                [_vm._v(_vm._s(_vm.menuItem.title))]
                              )
                            ]
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                })
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\SidebarItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SidebarItem = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5);

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
    SidebarItem
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

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "charrue-layout-sidebar-container" }, [
    _c("div", {
      staticClass: "charrue-layout-sidebar-placeholder",
      style: { width: _vm.width }
    }),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "charrue-layout-sidebar charrue-layout-sidebar-el-menu-container",
        style: {
          width: _vm.width,
          position: _vm.absolute ? "absolute" : "fixed"
        }
      },
      [
        _vm.logo || _vm.title
          ? _c(
              "div",
              { staticClass: "logo-container" },
              [
                _c(
                  "router-link",
                  { class: ["menu-router-link"], attrs: { to: _vm.homeUrl } },
                  [
                    _vm.logo
                      ? _c("img", { attrs: { src: _vm.logo, alt: "logo" } })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.title ? _c("h1", [_vm._v(_vm._s(_vm.title))]) : _vm._e()
                  ]
                )
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._t("sidebar-top"),
        _vm._v(" "),
        _c(
          "el-menu",
          {
            staticClass: "charrue-layout-sidebar-el-menu",
            attrs: {
              mode: "vertical",
              "unique-opened": "",
              collapse: _vm.collapsed,
              "default-active": _vm.activeRoutePath,
              "default-openeds": _vm.openKeys
            }
          },
          _vm._l(_vm.computedMenuData, function(item) {
            return _c("sidebar-item", {
              key: item.path,
              attrs: {
                route: _vm.route,
                subMenuComponent: _vm.subMenuComponent,
                menuItem: item
              }
            })
          }),
          1
        ),
        _vm._v(" "),
        _vm._t("sidebar-bottom")
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\LayoutSidebar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var LayoutSidebar = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4);

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

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "hamburger-container", on: { click: _vm.toggleClick } },
    [
      _c(
        "svg",
        {
          staticClass: "hamburger-svg",
          class: { "is-active": _vm.isActive },
          attrs: {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg",
            width: "64",
            height: "64"
          }
        },
        [
          _c("path", {
            attrs: {
              d:
                "M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
            }
          })
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\Hamburger.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Hamburger = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3);

var script$2 = {
  name: "LayoutHeader",
  components: {
    Hamburger
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

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "charrue-layout-header-container",
      class: { "fixed-header": _vm.fixed }
    },
    [
      _c("div", { staticClass: "charrue-layout-header-main" }, [
        _c(
          "div",
          { staticClass: "charrue-layout-header-left" },
          [
            _c("hamburger", { on: { "toggle-click": _vm.toggleSideBar } }),
            _vm._v(" "),
            _vm._t("header-left")
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "charrue-layout-header-right" },
          [_vm._t("header-right")],
          2
        )
      ])
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\LayoutHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var LayoutHeader = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2);

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

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("section", { staticClass: "charrue-layout-content-container" }, [
    _c(
      "div",
      { staticClass: "charrue-layout-content-header" },
      [_vm._t("content-header")],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "charrue-layout-content-main", style: _vm.contentStyle },
      [
        _vm.animation
          ? [
              _c(
                "transition",
                { attrs: { name: "fade-transform", mode: "out-in" } },
                [_vm._t("content")],
                2
              )
            ]
          : [_vm._t("content")]
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\LayoutContent.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var LayoutContent = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1);

var script = {
  name: "Layout",
  components: {
    LayoutSidebar,
    LayoutHeader,
    LayoutContent
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

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "charrue-layout",
      class: [_vm.collapsed ? "hideSidebar" : "openSidebar"]
    },
    [
      _c("layout-sidebar", {
        attrs: {
          collapsed: _vm.innerCollapse,
          data: _vm.data,
          logo: _vm.logo,
          title: _vm.title,
          "route-params": _vm.routeParams,
          route: _vm.route,
          absolute: _vm.absolute,
          authorized: _vm.authorized,
          sidebarWidth: _vm.sidebarWidth,
          homeUrl: _vm.homeUrl,
          subMenuComponent: _vm.componentConfig.subMenu
        },
        scopedSlots: _vm._u(
          [
            {
              key: "sidebar-top",
              fn: function() {
                return [_vm._t("sidebar-top")]
              },
              proxy: true
            },
            {
              key: "sidebar-bottom",
              fn: function() {
                return [_vm._t("sidebar-bottom")]
              },
              proxy: true
            }
          ],
          null,
          true
        )
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "charrue-layout-main", style: _vm.mainWidthStyle },
        [
          _c("layout-header", {
            style: _vm.headerWidthStyle,
            attrs: { collapse: _vm.innerCollapse, fixed: _vm.fixedHeader },
            on: {
              "update:collapse": function(val) {
                return (_vm.innerCollapse = val)
              }
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "header-trigger",
                  fn: function() {
                    return [_vm._t("header-trigger")]
                  },
                  proxy: true
                },
                {
                  key: "header-left",
                  fn: function() {
                    return [_vm._t("header-left")]
                  },
                  proxy: true
                },
                {
                  key: "header-right",
                  fn: function() {
                    return [_vm._t("header-right")]
                  },
                  proxy: true
                }
              ],
              null,
              true
            )
          }),
          _vm._v(" "),
          _c("layout-content", {
            attrs: {
              "content-style": _vm.contentStyle,
              animation: _vm.animation
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "content-header",
                  fn: function() {
                    return [_vm._t("content-header")]
                  },
                  proxy: true
                },
                {
                  key: "content",
                  fn: function() {
                    return [_vm._t("default")]
                  },
                  proxy: true
                }
              ],
              null,
              true
            )
          })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\layout-internal\\libs\\Layout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var _Layout = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__);

const Layout = _Layout;
const PluginKey = PluginKey$1;

var index = {
  install(Vue) {
    Vue.prototype[PluginKey] = {
      version: 2
    };
    Vue.component(Layout.name, Layout);
  }
};

export { index as default };
