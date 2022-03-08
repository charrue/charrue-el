var script$1 = {
  name: "MultiColumn",
  props: {
    label: String,
    prop: [String, Number],
    children: Array
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-table-column",
    { attrs: { label: _vm.label, prop: _vm.prop } },
    [
      _vm.children && _vm.children.length > 0
        ? _vm._l(_vm.children, function(child, index) {
            return _c("multi-column", {
              key: "multi-column-" + (child.prop || "") + "-" + index,
              attrs: {
                label: child.label,
                prop: child.prop,
                children: child.children || []
              }
            })
          })
        : _vm._e()
    ],
    2
  )
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
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-table-internal\\libs\\multi-column.vue";

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
  

  
  var MultiColumn = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1);

var rfdc_1 = rfdc;

function copyBuffer (cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

function rfdc (opts) {
  opts = opts || {};

  if (opts.circles) return rfdcCircles(opts)
  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        a2[k] = fn(cur);
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {};
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = clone(cur);
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {};
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = cloneProto(cur);
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  var refs = [];
  var refsNew = [];

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        var index = refs.indexOf(cur);
        if (index !== -1) {
          a2[k] = refsNew[index];
        } else {
          a2[k] = fn(cur);
        }
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = clone(cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = cloneProto(cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }
}

const PluginKey$1 = "$CharrueSchemaTablePluginOptions";

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const cloneDeep = rfdc_1();
var script = {
  name: "CharrueSchemaTable",
  components: {
    MultiColumn
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    tableProps: Object,
    selection: [Boolean, Object],
    shouldCacheSelection: Boolean,
    expand: [Array, Boolean],
    loading: Boolean,
    loadingOptions: Object,
    expandOptions: Object,
    expandHeader: {
      type: String
    },
    expandProps: {
      type: Object,
      default() {
        return {};
      }
    },
    extraColumnProps: {
      type: Object,
      default() {
        return {};
      }
    },
    index: [Function, Boolean, Number],
    indexHeader: {
      type: String
    },
    indexProps: {
      type: Object,
      default() {
        return {};
      }
    },
    theadContent: Function,
    extraColumnTitle: {
      type: String,
      default: "\u64CD\u4F5C"
    },
    showExtraColumn: {
      type: Boolean,
      default: true
    },
    pagination: [Boolean, Object],
    page: Number,
    total: [Number, String],
    size: Number
  },
  data() {
    return {
      version: 2,
      events: {},
      prevPage: 0,
      prevSize: 0,
      startSelect: false,
      selectionData: {},
      cachedSelectionData: [],
      prevCachedSelectionData: []
    };
  },
  computed: {
    tableData() {
      if (this.shouldCacheSelection) {
        return this.data.map((item, index) => {
          return __spreadProps(__spreadValues({}, item), {
            __key: (this.page - 1) * this.size + index + 1
          });
        });
      }
      return cloneDeep(this.data);
    },
    computedIndex() {
      if (this.index === true) {
        return (index) => this.size * (this.page - 1) + index + 1;
      }
      return this.index;
    },
    computedTotal() {
      return Number(this.total);
    },
    slots() {
      if (this.version === 2) {
        return __spreadValues(__spreadValues({}, this.$slots), this.$scopedSlots);
      }
      return this.$slots;
    }
  },
  created() {
    this.version = this[PluginKey$1].version || 2;
    this.proxyElTableMethods();
    this.proxyElTableEvents();
    this.prevSize = this.size;
    this.prevPage = this.page;
    this.cachedSelectionData = [];
    this.prevCachedSelectionData = [];
  },
  methods: {
    handlePaginationSizeChange(size) {
      this.prevSize = this.size;
      this.cachedSelectionData = Object.values(this.selectionData).reduce((acc, cur) => {
        acc = acc.concat(cur);
        return acc;
      }, []);
      this.$emit("size-change", size);
      this.setCurrentPageRowSelection();
    },
    handlePaginationCurrentChange(page) {
      this.prevPage = this.page;
      this.cachedSelectionData = Object.values(this.selectionData).reduce((acc, cur) => {
        acc = acc.concat(cur);
        return acc;
      }, []);
      this.$emit("update:page", page);
      this.$emit("page-change", page);
      this.setCurrentPageRowSelection();
    },
    onCurrentPageChange(page) {
      this.$emit("update:page", page);
    },
    handlePaginationPrevClick(page) {
      this.$emit("prev-click", page);
    },
    handlePaginationNextClick(page) {
      this.$emit("next-click", page);
    },
    onSelectionChange(value) {
      if (this.shouldCacheSelection) {
        this.selectionData[this.page] = value;
      }
      this.$emit("selection-change", value);
    },
    setCurrentPageRowSelection() {
      this.$nextTick(() => {
        this.tableData.forEach((row) => {
          const index = this.cachedSelectionData.findIndex((t) => t.__key === row.__key);
          if (index !== -1) {
            this.$refs.elTableRef.toggleRowSelection(row, true);
          }
        });
      });
    },
    proxyElTableEvents() {
      const elTableEvents = [
        "select",
        "select-all",
        "cell-mouse-enter",
        "cell-mouse-leave",
        "cell-click",
        "cell-dblclick",
        "row-click",
        "row-contextmenu",
        "row-dblclick",
        "header-click",
        "header-contextmenu",
        "sort-change",
        "filter-change",
        "current-change",
        "header-dragend",
        "expand-change"
      ];
      elTableEvents.forEach((item) => {
        this.events[item] = (...args) => {
          this.$emit(item, ...args);
        };
      });
    },
    proxyElTableMethods() {
      const elTableMethods = [
        "clearSelection",
        "toggleAllSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearSort",
        "clearFilter",
        "doLayout",
        "sort"
      ];
      elTableMethods.forEach((item) => {
        this[item] = (...args) => {
          this.$refs.elTableRef[item](...args);
        };
      });
    }
  }
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "charrue-schema-table" }, [
    _vm.slots.header
      ? _c(
          "div",
          { staticClass: "charrue-schema-table__header" },
          [_vm._t("header")],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "charrue-schema-table__body" },
      [
        _c(
          "el-table",
          _vm._g(
            _vm._b(
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.loading,
                    expression: "loading"
                  }
                ],
                ref: "elTableRef",
                attrs: {
                  data: _vm.tableData,
                  "element-loading-text":
                    _vm.loadingOptions && _vm.loadingOptions.text,
                  "element-loading-spinner":
                    _vm.loadingOptions && _vm.loadingOptions.spinner,
                  "element-loading-background":
                    _vm.loadingOptions && _vm.loadingOptions.background
                },
                on: { "selection-change": _vm.onSelectionChange }
              },
              "el-table",
              _vm.tableProps,
              false
            ),
            _vm.events
          ),
          [
            _vm.selection
              ? _c(
                  "el-table-column",
                  _vm._b(
                    { attrs: { type: "selection" } },
                    "el-table-column",
                    typeof _vm.selection === "boolean" ? {} : _vm.selection,
                    false
                  )
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.index
              ? _c(
                  "el-table-column",
                  _vm._b(
                    {
                      attrs: { type: "index", index: _vm.computedIndex },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function() {
                              return [
                                _vm.indexHeader
                                  ? _c("span", [
                                      _vm._v(_vm._s(_vm.indexHeader))
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                !_vm.indexHeader && _vm.slots["index-header"]
                                  ? _vm._t("index-header")
                                  : _vm._e()
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    "el-table-column",
                    _vm.indexProps,
                    false
                  )
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.slots["expand"]
              ? _c(
                  "el-table-column",
                  _vm._b(
                    {
                      attrs: { type: "expand" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function() {
                              return [
                                _vm.expandHeader
                                  ? _c("span", [
                                      _vm._v(_vm._s(_vm.expandHeader))
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                !_vm.expandHeader && _vm.slots["extra-header"]
                                  ? _vm._t("extra-header")
                                  : _vm._e()
                              ]
                            },
                            proxy: true
                          },
                          {
                            key: "default",
                            fn: function(props) {
                              return [_vm._t("expand", null, { scope: props })]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    },
                    "el-table-column",
                    _vm.expandProps,
                    false
                  )
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.columns, function(item, idx) {
              return _c(
                "el-table-column",
                _vm._b(
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: item.hidden !== true,
                        expression: "item.hidden !== true"
                      }
                    ],
                    key: item.prop + "-" + item.label + "-" + idx,
                    attrs: { label: item.label, prop: item.prop },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "header",
                          fn: function(scope) {
                            return [
                              item.children
                                ? _vm._l(item.children || [], function(
                                    child,
                                    i
                                  ) {
                                    return _c("multi-column", {
                                      key: (child.prop || "") + "-" + i,
                                      attrs: {
                                        label: child.label,
                                        prop: child.prop,
                                        children: child.children
                                      }
                                    })
                                  })
                                : _vm.slots.thead
                                ? [_vm._t("thead", null, { scope: scope })]
                                : _c("span", [_vm._v(_vm._s(item.label))])
                            ]
                          }
                        },
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _c(
                                "div",
                                { staticClass: "cell-wrapper" },
                                [
                                  _vm.slots[item.prop]
                                    ? [
                                        _vm._t(item.prop, null, {
                                          scope: scope
                                        })
                                      ]
                                    : _c("span", [
                                        _vm._v(_vm._s(scope.row[item.prop]))
                                      ])
                                ],
                                2
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  },
                  "el-table-column",
                  item.attrs,
                  false
                )
              )
            }),
            _vm._v(" "),
            _vm.showExtraColumn
              ? _c(
                  "el-table-column",
                  _vm._b(
                    {
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function() {
                              return [
                                _vm.slots.extraColumnHeader
                                  ? [_vm._t("extraColumnHeader")]
                                  : _c("span", [
                                      _vm._v(_vm._s(_vm.extraColumnTitle))
                                    ])
                              ]
                            },
                            proxy: true
                          },
                          {
                            key: "default",
                            fn: function(scope) {
                              return [_vm._t("actions", null, { scope: scope })]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    },
                    "el-table-column",
                    _vm.extraColumnProps,
                    false
                  )
                )
              : _vm._e()
          ],
          2
        ),
        _vm._v(" "),
        _vm.pagination
          ? _c(
              "div",
              {
                staticClass: "charrue-pagination-wrapper",
                class: [_vm.pagination.class],
                style: _vm.pagination.style
              },
              [
                _c(
                  "el-pagination",
                  _vm._b(
                    {
                      attrs: {
                        "current-page": _vm.page,
                        total: _vm.computedTotal,
                        "page-size": _vm.size
                      },
                      on: {
                        "update:current-page": _vm.onCurrentPageChange,
                        "size-change": _vm.handlePaginationSizeChange,
                        "current-change": _vm.handlePaginationCurrentChange,
                        "prev-click": _vm.handlePaginationPrevClick,
                        "next-click": _vm.handlePaginationNextClick
                      }
                    },
                    "el-pagination",
                    typeof _vm.pagination === "boolean" ? {} : _vm.pagination,
                    false
                  )
                )
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._t("footer")
      ],
      2
    )
  ])
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
    component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-table-internal\\libs\\schema-table.vue";

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
  

  
  var _SchemaTable = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__);

const SchemaTable = _SchemaTable;
const PluginKey = PluginKey$1;

var index = {
  install(Vue) {
    Vue.prototype[PluginKey] = {
      version: 2
    };
    Vue.component(SchemaTable.name, SchemaTable);
  }
};

export { index as default };
