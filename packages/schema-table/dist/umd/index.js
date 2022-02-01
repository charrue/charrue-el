(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.clonedeep')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash.clonedeep'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CharrueLayout = {}, global.cloneDeep));
})(this, (function (exports, cloneDeep) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

  var script$1 = {
    name: 'MutliColumn',
    functional: true,
    props: {
      item: {
        type: Object,

        default() {
          return {};
        }

      }
    },

    render(h, ctx) {
      const {
        item
      } = ctx.props;
      const CellContent = ctx.parent.cellContent;
      const children = item.children && Array.isArray(item.children) && item.children.length > 0 ? item.children.map(child => h('mutli-column', {
        attrs: {
          item: child
        },
        scopedSlots: {
          default(props) {
            if (CellContent) {
              return CellContent.call(ctx, h, {
                row: props.row,
                $index: props.$index,
                label: props.column.label,
                prop: props.column.property
              });
            }

            return h('span', [props.row[props.column.property]]);
          }

        }
      })) : null;
      return h('el-table-column', {
        attrs: {
          label: item.label,
          prop: item.prop,
          ...(item.attrs || {})
        },
        scopedSlots: {
          default(props) {
            if (CellContent) {
              return CellContent.call(ctx, h, {
                row: props.row,
                $index: props.$index,
                label: props.column.label,
                prop: props.column.property
              });
            }

            return h('span', [props.row[props.column.property]]);
          }

        }
      }, children);
    }

  };

  /* script */
              const __vue_script__$1 = script$1;
              
  /* template */

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = undefined;
    /* component normalizer */
    function __vue_normalize__$1(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-table\\src\\mutli-column.vue";

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
    

    
    var MutliColumn = __vue_normalize__$1(
      {},
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1);

  //
  var script = {
    name: 'SchemaTable',
    components: {
      MutliColumn
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

      /* el-table的props */
      tableProps: Object,

      /* 如果是boolean，表示启用多选模式，如果是一个对象，表示多选列的props */
      selection: [Boolean, Object],

      /** 分页多选时，是否把非当前页选中的数据记录下来 */
      shouldCacheSelection: Boolean,

      /* 如果是boolean，表示启用详细模式，如果是一个数组，表示详细区域需要展示的列 */
      expand: [Array, Boolean],

      /* 表格是否在加载中 */
      loading: Boolean,

      /* 加载效果的选项 */
      loadingOptions: Object,

      /* 详细区域的props */
      expandOptions: Object,

      /* 额外的列的props */
      extraColumnProps: {
        type: Object,

        default() {
          return {};
        }

      },

      /**
       * 如果是boolean，表示启用索引
       * 如果是一个Function，表示自定义索引,它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示
       * 该属性传入数字时，将作为索引的起始值
       */
      index: [Function, Boolean, Number],

      /**
       * 用于自定义渲染表头数据
       * 第一个参数为渲染函数
       * 剩余参数为当前列的表头信息和位置索引(同el-table的header插槽)$index, column
       */
      theadContent: Function,

      /**
       * 自定义操作列的表头元素
       */
      extraHeadContent: Function,

      /**
       * 是否展示额外的列
       */
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
        events: {},
        prevPage: 0,
        prevSize: 0,
        startSelect: false,
        selectionData: {}
      };
    },

    computed: {
      tableData() {
        if (this.shouldCacheSelection) {
          return this.data.map((item, index) => {
            return { ...item,
              __key: (this.page - 1) * this.size + index + 1
            };
          });
        } else {
          return cloneDeep__default["default"](this.data);
        }
      },

      computedIndex() {
        // 如果分页了，则索引序号从`size`开始计数
        if (this.index === true) {
          return index => this.size * (this.page - 1) + index + 1;
        }

        return this.index;
      },

      computedTotal() {
        return Number(this.total);
      }

    },
    methods: {
      /**
       * @private 派发 el-pagination 的 size-change 事件
       */
      handlePaginationSizeChange(size) {
        // 记录上一次的分页条数
        this.prevSize = this.size;
        this.cachedSelectionData = Object.values(this.selectionData).reduce((acc, cur) => {
          acc = acc.concat(cur);
          return acc;
        }, []);
        console.log(this.cachedSelectionData);
        this.$emit("size-change", size);
        this.setCurrentPageRowSelection();
      },

      /**
       * @private
       */
      handlePaginationCurrentChange(page) {
        // 记录上一次的页码数
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

      /**
       * @private
       */
      handlePaginationPrevClick(page) {
        this.$emit("prev-click", page);
      },

      /**
       * @private
       */
      handlePaginationNextClick(page) {
        this.$emit("next-click", page);
      },

      /**
       * @private
       */
      onSelectionChange(value) {
        if (this.shouldCacheSelection) {
          this.selectionData[this.page] = value;
        }

        this.$emit("selection-change", value);
      },

      setCurrentPageRowSelection() {
        this.$nextTick(() => {
          this.tableData.forEach(row => {
            const index = this.cachedSelectionData.findIndex(t => t.__key === row.__key);

            if (index !== -1) {
              this.$refs.elTableRef.toggleRowSelection(row, true);
            }
          });
        });
      },

      /**
       * @private 把el-table的事件代理到schema-table上
       */
      proxyElTableEvents() {
        const elTableEvents = ["select", "select-all", "cell-mouse-enter", "cell-mouse-leave", "cell-click", "cell-dblclick", "row-click", "row-contextmenu", "row-dblclick", "header-click", "header-contextmenu", "sort-change", "filter-change", "current-change", "header-dragend", "expand-change"];
        elTableEvents.forEach(item => {
          this.events[item] = (...args) => {
            this.$emit(item, ...args);
          };
        });
      },

      /**
       * @private 把el-table的方法代理到schema-table上
       */
      proxyElTableMethods() {
        const elTableMethods = ["clearSelection", "toggleAllSelection", "toggleRowExpansion", "setCurrentRow", "clearSort", "clearFilter", "doLayout", "sort"];
        elTableMethods.forEach(item => {
          this[item] = (...args) => {
            this.$refs.elTableRef[item](...args);
          };
        });
      }

    },

    created() {
      this.proxyElTableMethods();
      this.proxyElTableEvents();
      this.prevSize = this.size;
      this.prevPage = this.page;
      this.cachedSelectionData = []; // 用于记录当前页之前的勾选总数据，不需要进行响应式转化

      this.prevCachedSelectionData = [];
    }

  };

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "charrue-crud" }, [
      _vm.$slots.header
        ? _c(
            "div",
            { staticClass: "charrue-crud__header" },
            [_vm._t("header")],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "charrue-crud__body" },
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
                ? _c("el-table-column", {
                    attrs: { type: "index", index: _vm.computedIndex }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$scopedSlots["expand"]
                ? _c("el-table-column", {
                    attrs: { type: "expand" },
                    scopedSlots: _vm._u(
                      [
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
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.columns, function(item, index) {
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
                      key: item.prop + "-" + item.label + "-" + index,
                      attrs: { label: item.label, prop: item.prop },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(scope) {
                              return [
                                _vm.$scopedSlots.theader
                                  ? [_vm._t("theader", null, { scope: scope })]
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
                                    _vm.$scopedSlots[item.prop]
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
                  ),
                  [
                    _vm._v(" "),
                    _vm._v(" "),
                    item.children
                      ? _vm._l(item.children || [], function(child, idx) {
                          return _c("mutli-column", {
                            key: idx,
                            attrs: { "item-column": child }
                          })
                        })
                      : _vm._e()
                  ],
                  2
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
                    ),
                    [
                      _c(
                        "template",
                        { slot: "header" },
                        [
                          _vm.$scopedSlots.extraColumnHeader
                            ? [
                                _vm._t("extraColumnHeader", null, {
                                  scope: _vm.scope
                                })
                              ]
                            : _c("span", [_vm._v("操作")])
                        ],
                        2
                      )
                    ],
                    2
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
                  class: ["charrue-pagination-wrapper", _vm.pagination.class],
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-table\\src\\schema-table.vue";

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
    

    
    var SchemaTable = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__);

  exports["default"] = SchemaTable;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
