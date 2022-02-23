'use strict';

var vue = require('vue');

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
function cleanPath(path) {
  return path.replace(/\/\//g, "/");
}
function isFunction(val) {
  return typeof val === "function";
}
const PluginKey$1 = "$CharrueLayoutPluginOptions";
const getComponentConfig = (version) => {
  const config = {};
  version = Number(version);
  if (version === 2) {
    config.subMenu = "el-submenu";
  } else if (version === 3) {
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
  return segments.map((_, index) => `/${segments.slice(0, index + 1).join("/")}`);
}
function menuDataFormatter(data, parentPath = "") {
  return data.map((item) => {
    let { path } = item;
    parentPath = cleanPath(parentPath);
    if (path && !isUrl(path)) {
      const isRootPath = path[0] === "/";
      if (path) {
        path = parentPath && isRootPath ? path : `${parentPath}/${path}`;
      }
    }
    path = cleanPath(path);
    const result = __spreadProps(__spreadValues$1({}, item), {
      path,
      parentPath
    });
    if (item.children) {
      result.children = menuDataFormatter(item.children, `${parentPath}/${item.path}`);
    }
    return result;
  });
}
function getMenuDataPathMapping(menuList) {
  const mapping = {};
  const setMapping = (list2) => {
    const itemList = [];
    list2.forEach((item) => {
      mapping[item.path] = item;
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        itemList.push(...item.children);
      }
    });
    return itemList;
  };
  let list = setMapping(menuList);
  while (list && list.length > 0) {
    list = setMapping(list);
  }
  return mapping;
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
        keys.push({
            // Use parenthesized substring match if available, index otherwise
            name: execResult[1] || index++,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}

var script$4 = {
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
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sidebar_item = vue.resolveComponent("sidebar-item", true);
  const _component_el_menu_item = vue.resolveComponent("el-menu-item");
  const _component_router_link = vue.resolveComponent("router-link");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
    $props.menuItem.children && $props.menuItem.children.length > 0 ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.subMenuComponent), {
      key: 0,
      index: $props.menuItem.path,
      "popper-append-to-body": ""
    }, {
      title: vue.withCtx(() => [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["submenu-title", [
            $props.menuItem.icon ? "submenu-title-with-icon" : ""
          ]])
        }, [
          vue.createElementVNode("i", {
            class: vue.normalizeClass(["charrue-sidebar-menu-icon", [$props.prefixIconClass, $props.menuItem.icon]])
          }, null, 2),
          vue.createElementVNode("span", {
            class: vue.normalizeClass(["charrue-sidebar-menu-text", [$props.menuTextClass]])
          }, vue.toDisplayString($props.menuItem.title), 3)
        ], 2)
      ]),
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.menuItem.children, (child) => {
          return vue.openBlock(), vue.createBlock(_component_sidebar_item, {
            key: child.path,
            route: $props.route,
            "is-nest": true,
            "menu-item": child,
            "sub-menu-component": $props.subMenuComponent
          }, null, 8, ["route", "menu-item", "sub-menu-component"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["index"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
      $props.route ? (vue.openBlock(), vue.createBlock(_component_router_link, {
        key: 0,
        to: $props.menuItem.path,
        class: "menu-router-link"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_menu_item, {
            index: $props.menuItem.path
          }, {
            title: vue.withCtx(() => [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(["charrue-sidebar-menu-text", [$props.menuTextClass]])
              }, vue.toDisplayString($props.menuItem.title), 3)
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode("i", {
                class: vue.normalizeClass(["charrue-sidebar-menu-icon", [$props.prefixIconClass, $props.menuItem.icon]])
              }, null, 2)
            ]),
            _: 1
          }, 8, ["index"])
        ]),
        _: 1
      }, 8, ["to"])) : (vue.openBlock(), vue.createBlock(_component_el_menu_item, {
        key: 1,
        index: $props.menuItem.path
      }, {
        title: vue.withCtx(() => [
          vue.createElementVNode("span", {
            class: vue.normalizeClass(["charrue-sidebar-menu-text", [$props.menuTextClass]])
          }, vue.toDisplayString($props.menuItem.title), 3)
        ]),
        default: vue.withCtx(() => [
          vue.createElementVNode("i", {
            class: vue.normalizeClass(["charrue-sidebar-menu-icon", [$props.prefixIconClass, $props.menuItem.icon]])
          }, null, 2)
        ]),
        _: 1
      }, 8, ["index"]))
    ], 2112))
  ]);
}

script$4.render = render$4;
script$4.__file = "layout-internal/libs/SidebarItem.vue";

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
var script$3 = {
  name: "GlobalAside",
  components: {
    SidebarItem: script$4
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
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      }
    },
    regexToPath: {
      type: Object
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
      return this.collapsed ? `${this.sidebarWidth[0]}px` : `${this.sidebarWidth[1]}px`;
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
  created() {
    if (this.route) {
      this.$watch("$route.path", (currentRoute) => {
        const matchedRegex = this.regexToPath ? Object.keys(this.regexToPath).find((reg) => pathToRegexp(reg).test(currentRoute)) : null;
        if (matchedRegex) {
          this.activeRoutePath = this.regexToPath[matchedRegex];
        } else {
          this.activeRoutePath = currentRoute;
        }
        const openKeys = urlToList(this.activeRoutePath);
        const currentRouteMenuData = this.menuDataPathMapping[this.activeRoutePath];
        if (currentRouteMenuData && currentRouteMenuData.parentPath) {
          urlToList(currentRouteMenuData.parentPath).forEach((path) => {
            if (!openKeys.includes(path)) {
              openKeys.push(path);
            }
          });
        }
        this.openKeys = openKeys;
      }, {
        immediate: true
      });
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
      const menuCopy = menu ? __spreadValues({}, menu) : {};
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
      const menuCopy = menu ? __spreadValues({}, menu) : {};
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
  }
};

const _hoisted_1$3 = { class: "charrue-layout-sidebar-container" };
const _hoisted_2$3 = {
  key: 0,
  class: "logo-container"
};
const _hoisted_3$2 = ["src"];
const _hoisted_4$1 = { key: 1 };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_sidebar_item = vue.resolveComponent("sidebar-item");
  const _component_el_menu = vue.resolveComponent("el-menu");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
    vue.createElementVNode("div", {
      class: "charrue-layout-sidebar-placeholder",
      style: vue.normalizeStyle({ width: $options.width })
    }, null, 4),
    vue.createElementVNode("div", {
      class: "charrue-layout-sidebar charrue-layout-sidebar-el-menu-container",
      style: vue.normalizeStyle({ width: $options.width, position: $props.absolute ? "absolute" : "fixed" })
    }, [
      $props.logo || $props.title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$3, [
        vue.createVNode(_component_router_link, {
          to: $props.homeUrl,
          class: "menu-router-link"
        }, {
          default: vue.withCtx(() => [
            $props.logo ? (vue.openBlock(), vue.createElementBlock("img", {
              key: 0,
              src: $props.logo,
              alt: "logo"
            }, null, 8, _hoisted_3$2)) : vue.createCommentVNode("v-if", true),
            $props.title ? (vue.openBlock(), vue.createElementBlock("h1", _hoisted_4$1, vue.toDisplayString($props.title), 1)) : vue.createCommentVNode("v-if", true)
          ]),
          _: 1
        }, 8, ["to"])
      ])) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "sidebar-top"),
      vue.createVNode(_component_el_menu, {
        class: "charrue-layout-sidebar-el-menu",
        mode: "vertical",
        "unique-opened": "",
        collapse: $props.collapsed,
        "default-active": $data.activeRoutePath,
        "default-openeds": $data.openKeys
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.computedMenuData, (item) => {
            return vue.openBlock(), vue.createBlock(_component_sidebar_item, {
              key: item.path,
              route: $props.route,
              "sub-menu-component": $props.subMenuComponent,
              "menu-item": item
            }, null, 8, ["route", "sub-menu-component", "menu-item"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["collapse", "default-active", "default-openeds"]),
      vue.renderSlot(_ctx.$slots, "sidebar-bottom")
    ], 4)
  ]);
}

script$3.render = render$3;
script$3.__file = "layout-internal/libs/LayoutSidebar.vue";

var script$2 = {
  name: "LayoutContent",
  props: {
    animation: {
      type: Boolean,
      default: true
    }
  }
};

const _hoisted_1$2 = { class: "charrue-layout-content-container" };
const _hoisted_2$2 = { class: "charrue-layout-content-header" };
const _hoisted_3$1 = { class: "charrue-layout-content-main" };
const _hoisted_4 = { class: "charrue-layout-content-footer" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$2, [
    vue.createElementVNode("div", _hoisted_2$2, [
      vue.renderSlot(_ctx.$slots, "content-header")
    ]),
    vue.createElementVNode("div", _hoisted_3$1, [
      $props.animation ? (vue.openBlock(), vue.createBlock(vue.Transition, {
        key: 0,
        name: "fade-transform",
        mode: "out-in"
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "content")
        ]),
        _: 3
      })) : vue.renderSlot(_ctx.$slots, "content", { key: 1 })
    ]),
    vue.createElementVNode("div", _hoisted_4, [
      vue.renderSlot(_ctx.$slots, "content-footer")
    ])
  ]);
}

script$2.render = render$2;
script$2.__file = "layout-internal/libs/LayoutContent.vue";

var script$1 = {
  name: "HamburgerTrigger",
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

const _hoisted_1$1 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" }, null, -1);
const _hoisted_2$1 = [
  _hoisted_1$1
];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "hamburger-container",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleClick && $options.toggleClick(...args))
  }, [
    (vue.openBlock(), vue.createElementBlock("svg", {
      class: vue.normalizeClass([{ "is-active": $props.isActive }, "hamburger-svg"]),
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
      width: "64",
      height: "64"
    }, _hoisted_2$1, 2))
  ]);
}

script$1.render = render$1;
script$1.__file = "layout-internal/libs/Hamburger.vue";

var script = {
  name: "CharrueLayout",
  components: {
    LayoutSidebar: script$3,
    LayoutContent: script$2,
    Hamburger: script$1
  },
  props: {
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
    },
    regexToPath: {
      type: Object
    }
  },
  emits: ["update:collapsed"],
  data() {
    return {
      version: 2,
      innerCollapse: false
    };
  },
  computed: {
    componentConfig() {
      return getComponentConfig(this.version || 2);
    },
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
    this.version = this[PluginKey$1].version;
    console.log(this);
  },
  methods: {
    toggleSideBar() {
      this.innerCollapse = !this.innerCollapse;
    }
  }
};

const _hoisted_1 = { class: "charrue-layout-header-main" };
const _hoisted_2 = { class: "charrue-layout-header-left" };
const _hoisted_3 = { class: "charrue-layout-header-right" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_layout_sidebar = vue.resolveComponent("layout-sidebar");
  const _component_hamburger = vue.resolveComponent("hamburger");
  const _component_layout_content = vue.resolveComponent("layout-content");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["charrue-layout", [$props.collapsed ? "hideSidebar" : "openSidebar"]])
  }, [
    vue.createVNode(_component_layout_sidebar, {
      collapsed: $data.innerCollapse,
      data: $props.data,
      logo: $props.logo,
      title: $props.title,
      route: $props.route,
      absolute: $props.absolute,
      authorized: $props.authorized,
      "sidebar-width": $props.sidebarWidth,
      "home-url": $props.homeUrl,
      "sub-menu-component": $options.componentConfig.subMenu,
      "regex-to-path": $props.regexToPath
    }, {
      "sidebar-top": vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "sidebar-top")
      ]),
      "sidebar-bottom": vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "sidebar-bottom")
      ]),
      _: 3
    }, 8, ["collapsed", "data", "logo", "title", "route", "absolute", "authorized", "sidebar-width", "home-url", "sub-menu-component", "regex-to-path"]),
    vue.createElementVNode("div", {
      class: "charrue-layout-main",
      style: vue.normalizeStyle($options.mainWidthStyle)
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["charrue-layout-header-container", { "fixed-header": $props.fixedHeader }]),
        style: vue.normalizeStyle($options.headerWidthStyle)
      }, [
        vue.createElementVNode("div", _hoisted_1, [
          vue.createElementVNode("div", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "header-left", {}, () => [
              vue.createVNode(_component_hamburger, { onToggleClick: $options.toggleSideBar }, null, 8, ["onToggleClick"])
            ])
          ]),
          vue.createElementVNode("div", _hoisted_3, [
            vue.renderSlot(_ctx.$slots, "header-right")
          ])
        ])
      ], 6),
      vue.createVNode(_component_layout_content, { animation: $props.animation }, {
        "content-header": vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "content-header")
        ]),
        content: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        "content-footer": vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "content-footer")
        ]),
        _: 3
      }, 8, ["animation"])
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
      version: 3
    };
    app.component(Layout.name, Layout);
  }
};

module.exports = index;
