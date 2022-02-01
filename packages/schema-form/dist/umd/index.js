(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.clonedeep')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash.clonedeep'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CharrueLayout = {}, global.cloneDeep));
})(this, (function (exports, cloneDeep) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const toPromise = (fn, ...args) => {
    const result = fn(...args);

    if (result instanceof Promise) {
      return result;
    } else {
      return Promise.resolve(result);
    }
  };

  var script$6 = {
    name: "inner-select",
    props: {
      schema: Object,
      value: [Number, String, Array, Object, Boolean],
      placeholder: String
    },

    data() {
      return {
        uiProps: {},
        events: {},
        options: [],
        loading: undefined
      };
    },

    methods: {
      onInput(val) {
        this.$emit("input", val);
      },

      setEnums(options) {
        this.$set(this, "options", options);
      },

      enumMethodToPromise(fn, ...args) {
        this.loading = true;
        toPromise(fn, ...args).then(_options => {
          if (Array.isArray(_options)) {
            this.options = _options;
          } else {
            this.options = [];
            console.error(`${this.schema.property}类型的表单的remote-method方法应该返回一个数组形式的数据`);
          }

          const index = this.options.findIndex(item => hasOwnProperty(item, "label") && hasOwnProperty(item, "value"));

          if (index !== -1) {
            console.warn(`${this.schema.property}表单的options类型第${index + 1}个选项格式有误`);
          }
        }).finally(() => {
          this.loading = false;
        });
      }

    },

    created() {
      this.uiProps = this.schema["ui-props"] || {};

      if (this.schema.type === "array") {
        this.uiProps = Object.assign({}, this.uiProps, {
          multiple: true
        });
      } // 处理 remote-method 获取远程数据后难以更新options的问题


      const originMethod = this.uiProps["remote-method"] || this.uiProps.remoteMethod;

      if (originMethod && typeof originMethod === "function") {
        this.uiProps["remote-method"] = query => {
          this.enumMethodToPromise(originMethod, query);
        };
      }

      let enums = this.schema.enums; // enums可以传入一个函数，以此来更新options

      if (typeof enums === "function") {
        this.enumMethodToPromise(enums);
      } else if (Array.isArray(enums)) {
        this.options = enums.map(item => {
          if (typeof item === "string" || typeof item === "number") {
            return {
              label: item,
              value: item
            };
          }

          return item;
        });
      } else {
        this.options = [];
      }

      ["change", "visible-change", "remove-tag", "clear", "blur", "focus"].forEach(ev => {
        this.events[ev] = (...args) => {
          this.$emit(`${this.schema.property}:${ev}`, ...args);
        };
      });
    },

    mounted() {
      this.$el.removeAttribute("data-property");
      this.$el.querySelector("input").setAttribute("data-property", this.schema.property);
    }

  };

  /* script */
              const __vue_script__$6 = script$6;
              
  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-select",
      _vm._g(
        _vm._b(
          {
            ref: _vm.schema.ref ? _vm.schema.property : "",
            attrs: {
              value: _vm.value,
              placeholder: _vm.placeholder,
              loading: _vm.loading
            },
            on: { input: _vm.onInput }
          },
          "el-select",
          _vm.uiProps,
          false
        ),
        _vm.events
      ),
      _vm._l(_vm.options, function(item, index) {
        return _c(
          "el-option",
          _vm._b(
            {
              key: item.value + "-" + index,
              attrs: { label: item.label, value: item.value }
            },
            "el-option",
            item.props || {},
            false
          )
        )
      }),
      1
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* component normalizer */
    function __vue_normalize__$6(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script === 'function' ? script.options : script) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\widgets\\select\\index.vue";

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
    

    
    var Select = __vue_normalize__$6(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6);

  var checkboxMixin = {
    props: {
      schema: Object,
      value: Array
    },

    data() {
      return {
        options: [],
        props: {},
        currentValue: ""
      };
    },

    watch: {
      value: {
        handler(val) {
          this.currentValue = val;
        },

        immediate: true
      }
    },
    methods: {
      onInput(val) {
        this.$emit("input", val);
      }

    },

    created() {
      this.options = (this.schema.enums || []).map(item => {
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
          return {
            label: item,
            value: item
          };
        }

        return item;
      });
      this.props = this.schema["ui-props"] || {};
    }

  };

  //
  var script$5 = {
    name: "inner-checkbox",
    mixins: [checkboxMixin]
  };

  /* script */
              const __vue_script__$5 = script$5;
              
  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-checkbox-group",
      {
        on: { input: _vm.onInput },
        model: {
          value: _vm.currentValue,
          callback: function($$v) {
            _vm.currentValue = $$v;
          },
          expression: "currentValue"
        }
      },
      _vm._l(_vm.options, function(item) {
        return _c(
          "el-checkbox",
          { key: item.value, attrs: { label: item.value } },
          [_vm._v("\n    " + _vm._s(item.label) + "\n  ")]
        )
      }),
      1
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\widgets\\checkbox\\checkbox.vue";

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
    

    
    var Checkbox = __vue_normalize__$5(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5);

  //
  var script$4 = {
    name: "inner-checkbox-button",
    mixins: [checkboxMixin]
  };

  /* script */
              const __vue_script__$4 = script$4;
              
  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-checkbox-group",
      {
        on: { input: _vm.onInput },
        model: {
          value: _vm.currentValue,
          callback: function($$v) {
            _vm.currentValue = $$v;
          },
          expression: "currentValue"
        }
      },
      _vm._l(_vm.options, function(item) {
        return _c(
          "el-checkbox-button",
          { key: item.value, attrs: { label: item.value } },
          [_vm._v("\n    " + _vm._s(item.label) + "\n  ")]
        )
      }),
      1
    )
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\widgets\\checkbox\\button.vue";

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
    

    
    var CheckboxButton = __vue_normalize__$4(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4);

  var radioMixin = {
    props: {
      schema: Object,
      value: [Number, String, Boolean]
    },

    data() {
      return {
        options: [],
        props: {},
        currentValue: ""
      };
    },

    watch: {
      value: {
        handler(val) {
          this.currentValue = val;
        },

        immediate: true
      }
    },
    methods: {
      onInput(val) {
        this.$emit("input", val);
      }

    },

    created() {
      this.options = (this.schema.enums || []).map(item => {
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
          return {
            label: item,
            value: item
          };
        }

        return item;
      });
      this.props = this.schema["ui-props"] || {};
    }

  };

  //
  var script$3 = {
    name: "inner-radio",
    mixins: [radioMixin]
  };

  /* script */
              const __vue_script__$3 = script$3;
              
  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-radio-group",
      {
        on: { input: _vm.onInput },
        model: {
          value: _vm.currentValue,
          callback: function($$v) {
            _vm.currentValue = $$v;
          },
          expression: "currentValue"
        }
      },
      _vm._l(_vm.options, function(item) {
        return _c("el-radio", { key: item.value, attrs: { label: item.value } }, [
          _vm._v("\n    " + _vm._s(item.label) + "\n  ")
        ])
      }),
      1
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\widgets\\radio\\radio.vue";

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
    

    
    var Radio = __vue_normalize__$3(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3);

  //
  var script$2 = {
    name: "inner-radio-button",
    mixins: [radioMixin]
  };

  /* script */
              const __vue_script__$2 = script$2;
              
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-radio-group",
      {
        on: { input: _vm.onInput },
        model: {
          value: _vm.currentValue,
          callback: function($$v) {
            _vm.currentValue = $$v;
          },
          expression: "currentValue"
        }
      },
      _vm._l(_vm.options, function(item) {
        return _c(
          "el-radio-button",
          { key: item.value, attrs: { label: item.value } },
          [_vm._v("\n    " + _vm._s(item.label) + "\n  ")]
        )
      }),
      1
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\widgets\\radio\\button.vue";

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
    

    
    var RadioButton = __vue_normalize__$2(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2);

  const hasOwnProperty$1 = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  const defaultValueProcessor = val => val;

  function createInnerWidget({
    name,
    componentName = "el-input",
    valueProcessor = defaultValueProcessor,
    props = {},
    defaultProps = {},
    created = {},
    mounted = {},
    watch = {}
  }) {
    return {
      name,
      props: {
        schema: Object,
        value: null,
        placeholder: String,
        ...props
      },

      data() {
        return {
          extraProps: {}
        };
      },

      created() {
        this.componentName = componentName;

        if (typeof created === "function") {
          created.call(this);
        }
      },

      mounted() {
        if (typeof mounted === "function") {
          mounted.call(this);
        }
      },

      watch,
      computed: {
        uiProps() {
          // eslint-disable-next-line no-unused-vars
          const {
            schema,
            ...props
          } = this.$props;
          return Object.assign(defaultProps, { ...(props || {})
          }, this.schema["ui-props"]);
        }

      },

      render(h) {
        const {
          value,
          schema = {}
        } = this; // eslint-disable-next-line no-unused-vars

        const {
          input,
          ...events
        } = this.$listeners; // el-input type="textarea" 时，为 textarea设置 data-property

        if (componentName === "el-input" && props.type === "textarea" && this.$el) {
          this.$el.querySelector("textarea").setAttribute("data-property", schema.property);
        } // el-date-picker 如果设置了type，则需要设置对应的formatter


        if (componentName === "el-date-picker") {
          if (props.type === "year") {
            props.format = "yyyy";
          } else if (props.type === "month") {
            props.format = "yyyy-MM";
          } else if (props.type === "week") {
            props.format = "yyyy 第 WW 周";
          } // 如果是日期类型，并且设置了type属性，但是没有设置format，则把format设置为yyyy-MM-dd
          // 解决在schema中存在多个date类型，且设置了type类型


          if (hasOwnProperty$1(props, "type") && !hasOwnProperty$1(props, "format")) {
            props.format = "yyyy-MM-dd";
          }
        }

        return h(componentName, {
          props: {
            value,
            src: value,
            ...this.uiProps
          },
          style: this.uiProps.style,
          class: this.uiProps.class,
          attrs: {
            placeholder: this.uiProps.placeholder
          },
          key: schema.property,
          on: {
            input: val => {
              const value = valueProcessor(val);
              this.$emit("input", value);
            },
            ...events
          }
        });
      }

    };
  }

  var Textarea = createInnerWidget({
    name: "inner-textarea",
    componentName: "el-input",
    defaultProps: {
      type: "textarea",
      autosize: {
        minRows: 2
      }
    }
  });

  var DateRange = createInnerWidget({
    name: "inner-date-range",
    componentName: "el-date-picker",
    defaultProps: {
      type: "daterange",
      "range-separator": "-",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      'value-format': "yyyy-MM-dd"
    }
  });

  var MonthRange = createInnerWidget({
    name: "inner-month-range",
    componentName: "el-date-picker",
    defaultProps: {
      type: "monthrange",
      "range-separator": "-",
      "start-placeholder": "开始月份",
      "end-placeholder": "结束月份",
      'value-format': "yyyy-MM"
    }
  });

  var DateWidget = createInnerWidget({
    name: "inner-date",
    componentName: "el-date-picker",
    defaultProps: {
      placeholder: "选择日期",
      type: "date",
      'value-format': "yyyy-MM-dd"
    }
  });

  var DateTimeRange = createInnerWidget({
    name: "inner-date-time-range",
    componentName: "el-date-picker",
    defaultProps: {
      type: "datetimerange",
      "range-separator": "~",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      'value-format': "yyyy-MM-dd HH:mm:ss"
    }
  });

  var MultiDates = createInnerWidget({
    name: "inner-multi-dates",
    componentName: "el-date-picker",
    defaultProps: {
      placeholder: "选择日期",
      type: "dates",
      'value-format': "yyyy-MM-dd"
    }
  });

  var DateTime = createInnerWidget({
    name: "inner-date-time",
    componentName: "el-date-picker",
    defaultProps: {
      type: "datetime",
      'value-format': "yyyy-MM-dd"
    }
  });

  var Time = createInnerWidget({
    name: "inner-time",
    componentName: "el-time-picker",
    defaultProps: {
      'arrow-control': true,
      'value-format': "HH:mm:ss"
    }
  });

  var TimeRange = createInnerWidget({
    name: "inner-time-range",
    componentName: "el-time-picker",
    defaultProps: {
      'is-range': true,
      'arrow-control': true,
      'range-separator': "~",
      'start-placeholder': "开始时间",
      'end-placeholder': "结束时间",
      'value-format': "HH:mm:ss"
    }
  });

  var ImageWidget = createInnerWidget({
    name: "inner-image",
    componentName: "el-image",
    defaultProps: {
      lazy: true,
      "preview-src-list": []
    },

    created() {
      let style = {};

      if (this.schema && this.schema.size) {
        let size = typeof this.schema.size === "number" ? this.schema.size + "px" : this.schema.size;
        this.style = {
          width: size,
          height: size
        };
      }

      this.extraProps = {
        src: this.value,
        "preview-src-list": [this.value],
        style: style
      };
    }

  });

  const baseMap = {
    string: "el-input",
    boolean: "el-switch",
    number: "el-input",
    array: Checkbox,
    "checkbox-button": CheckboxButton,
    radio: Radio,
    "radio-button": RadioButton,
    select: Select,
    textarea: Textarea,
    enum: Select,
    text: "span",
    date: DateWidget,
    "date-range": DateRange,
    "month-range": MonthRange,
    "date-time-range": DateTimeRange,
    "multi-dates": MultiDates,
    "date-time": DateTime,
    "time": Time,
    "time-range": TimeRange,
    image: ImageWidget
  };
  const componentMap = new Map();
  Object.keys(baseMap).forEach(key => {
    componentMap.set(key, baseMap[key]);
  });
  const defaultReadonlyWidgets = {
    string: "span",
    number: "span",
    textarea: "span"
  };

  //
  var script$1 = {
    name: "SchemaField",
    inject: ["root"],
    props: {
      schema: {
        type: Object,
        required: true
      },
      value: null,
      layout: Boolean,
      col: Number
    },

    data() {
      return {
        currentValue: "",
        componentName: "el-input",
        readonlyComponentName: ""
      };
    },

    computed: {
      formItemProps() {
        return {
          required: this.schema.required,
          label: this.schema.title || this.schema.property,
          prop: this.schema.property,
          size: this.schema.size,
          ...(this.schema["item-attrs"] || {})
        };
      },

      inputProps() {
        const props = Object.assign({}, this.schema["ui-props"], {
          schema: this.schema,
          placeholder: this.schema.placeholder || `请输入${this.schema.title}`
        });
        return props;
      },

      responsiveColProps() {
        const defaultProps = this.schema.colProps || {};
        if (!this.col) return defaultProps;

        if (this.col === 4) {
          return Object.assign({
            xl: 4,
            lg: 6,
            md: 12,
            sm: 12,
            xs: 24
          }, defaultProps);
        }

        if (this.col === 3) {
          return Object.assign({
            xl: 4,
            lg: 8,
            md: 12,
            sm: 12,
            xs: 24
          }, defaultProps);
        }

        return defaultProps;
      }

    },
    watch: {
      value: {
        handler(val) {
          this.currentValue = val;
        },

        deep: true
      }
    },
    methods: {
      onInput(value) {
        if (this.schema.type === "number") {
          // eslint-disable-next-line no-useless-escape
          this.currentValue = value.replace(/[^\d^\.]+/g, "");
          this.currentValue = this.currentValue === "" ? "" : Number(this.currentValue);
        } else if (this.schema.type === "string" && typeof value === "string" && this.schema.trim !== false) {
          this.currentValue = value.trim();
        } else {
          this.currentValue = value;
        }

        this.$emit("input", this.schema.property, this.currentValue);
      },

      getComponentName() {
        const type = componentMap.get(this.schema.type);
        const widget = this.schema["ui-widget"];
        let component = "";

        if (componentMap.has(widget)) {
          component = componentMap.get(widget);
        } else if (this.root.widgets[widget]) {
          component = this.root.widgets[widget];
        } else if (widget) {
          throw new Error(`尚未注册${widget}组件`);
        }

        if (!type) {
          throw new Error(`尚未注册${this.schema.type}类型的组件`);
        }

        if (this.root.readonly) this.readonlyComponentName = this.root.computedReadonlyWidgets[widget || type];
        this.readonlyComponentName = this.readonlyComponentName || "span";
        return component || type;
      },

      /**
       * 派发表单的各种事件，事件名为`<property>:<event>`
       */
      dispatchInputEvent() {
        const inputEventKeys = ["blur", "focus", "change", "clear"];
        this.inputEvents = inputEventKeys.reduce((acc, cur) => {
          acc[cur] = val => {
            this.$emit(`${this.schema.property}:${cur}`, val);
          };

          return acc;
        }, {});
      }

    },

    created() {
      let currentValue = this.value != null ? this.value : this.schema.default;

      if (this.schema.type === "array" && !currentValue) {
        currentValue = [];
      }

      this.currentValue = currentValue;
      this.componentName = this.getComponentName();
      this.dispatchInputEvent();
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
      "div",
      { staticClass: "charrue-schema-field-wrapper" },
      [
        _vm.layout
          ? _c(
              "el-col",
              _vm._b(
                { attrs: { span: _vm.schema.span || 24 } },
                "el-col",
                _vm.responsiveColProps,
                false
              ),
              [
                _c(
                  "el-form-item",
                  _vm._b({}, "el-form-item", _vm.formItemProps, false),
                  [
                    _vm.root.readonly || _vm.schema.type === "text"
                      ? [
                          _vm.schema.type === "text" ||
                          _vm.readonlyComponentName === "span"
                            ? _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.value ||
                                      _vm.schema.value ||
                                      _vm.schema.default
                                  )
                                )
                              ])
                            : _c(_vm.readonlyComponentName, {
                                tag: "component",
                                attrs: {
                                  value:
                                    _vm.value ||
                                    _vm.schema.value ||
                                    _vm.schema.default,
                                  schema: _vm.schema,
                                  "data-property": _vm.schema.property
                                }
                              })
                        ]
                      : _c(
                          _vm.componentName,
                          _vm._g(
                            _vm._b(
                              {
                                tag: "component",
                                staticClass: "charrue-schema-field-item",
                                class: _vm.schema.class,
                                style: _vm.schema.style,
                                attrs: {
                                  "data-property": _vm.schema.property,
                                  value: _vm.currentValue
                                },
                                on: { input: _vm.onInput }
                              },
                              "component",
                              _vm.inputProps,
                              false
                            ),
                            _vm.inputEvents
                          )
                        )
                  ],
                  2
                )
              ],
              1
            )
          : _c(
              "el-form-item",
              _vm._b({}, "el-form-item", _vm.formItemProps, false),
              [
                _vm.schema.type === "text"
                  ? _c(
                      "span",
                      { attrs: { "data-property": _vm.schema.property } },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.value || _vm.schema.value || _vm.schema.default
                          )
                        )
                      ]
                    )
                  : _c(
                      _vm.componentName,
                      _vm._g(
                        _vm._b(
                          {
                            tag: "component",
                            staticClass: "charrue-schema-field-item",
                            class: _vm.schema.class,
                            style: _vm.schema.style,
                            attrs: {
                              "data-property": _vm.schema.property,
                              value: _vm.currentValue
                            },
                            on: { input: _vm.onInput }
                          },
                          "component",
                          _vm.inputProps,
                          false
                        ),
                        _vm.inputEvents
                      )
                    )
              ],
              1
            )
      ],
      1
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\SchemaField.vue";

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
    

    
    var SchemaField = __vue_normalize__$1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1);

  const registerWidget = (type, component, overwrite = false) => {
    if (componentMap.has(type) && !overwrite) {
      return; // throw new Error(`${type}类型的字段已存在`);
    }

    componentMap.set(type, component);
  };

  //
  var script = {
    name: "SchemaForm",
    components: {
      SchemaField
    },

    provide() {
      return {
        root: this
      };
    },

    props: {
      schema: {
        type: Object,
        required: true,

        default() {
          return {};
        }

      },
      value: {
        type: Object,
        required: true
      },
      widgets: {
        type: Object,

        default() {
          return {};
        }

      },
      readonlyWidgets: {
        type: Object,

        default() {
          return {};
        }

      },
      rules: Object,
      labelWidth: [String, Number],
      labelPosition: String,
      size: String,
      formProps: {
        type: Object,

        default() {
          return {};
        }

      },
      gutter: Number,
      justify: {
        type: String,
        default: "start"
      },
      align: String,
      layout: Boolean,

      /**
       * 针对于响应式设计，进行的预设
       * 分别是一行4列、一行3列
       */
      col: {
        type: Number,

        validate(value) {
          return value === 3 || value === 4;
        }

      },
      readonly: Boolean,
      disabled: Boolean
    },

    data() {
      return {
        formData: {}
      };
    },

    computed: {
      computedFields() {
        let defaultValue = {};
        const value = Object.keys(this.schema).map(k => {
          // eslint-disable-next-line no-prototype-builtins
          if (this.schema[k].hasOwnProperty("default")) {
            defaultValue[k] = this.schema[k].default;
          }

          return { ...this.schema[k],
            property: k,
            type: this.schema[k].type || "string"
          };
        });

        if (Object.keys(defaultValue).length > 0) {
          this.$emit("input", defaultValue);
        }

        return value;
      },

      requiredFields() {
        return Object.keys(this.schema).reduce((acc, k) => {
          if (this.schema[k].required) {
            acc[k] = [{
              required: true,
              message: this.schema[k].title + "不能为空",
              trigger: "change"
            }];
          }

          return acc;
        }, []);
      },

      events() {
        // eslint-disable-next-line no-unused-vars
        const {
          input,
          ...others
        } = this.$listeners;
        return others || {};
      },

      computedReadonlyWidgets() {
        let widgets = {};

        for (let key in this.readonlyWidgets) {
          let comp = this.readonlyWidgets[key];

          if (typeof comp === "string" || comp.render) {
            widgets[key] = comp;
          }

          if (typeof comp === "function") {
            widgets[key] = comp(this.value, key);
          }
        }

        return { ...widgets,
          ...defaultReadonlyWidgets
        };
      }

    },
    watch: {
      value: {
        handler() {
          this.setCurrentValue();
        },

        deep: true,
        immediate: true
      }
    },
    methods: {
      setCurrentValue() {
        if (!(this.formData && this.value === this.formData)) {
          if (this.value) {
            this.formData = cloneDeep__default["default"](this.value);
          } else {
            this.formData = {};
          }
        }
      },

      onInput(key, value) {
        this.$set(this.formData, key, value);
        const cloneValue = cloneDeep__default["default"](this.formData);
        this.$emit("input", cloneValue);
        this.$emit("change", cloneValue);
      },

      async validate() {
        if (this.$refs.form) {
          await this.$refs.elFormRef.validate();
        } else {
          throw new Error("el-form ref not found");
        }
      }

    },

    created() {
      Object.keys(this.widgets).forEach(key => {
        registerWidget(key, this.widgets[key]);
      });
      ["clearValidate", "validateField", "resetFields"].forEach(method => {
        this[method] = () => {
          if (this.$refs.form) {
            this.$refs.form[method].call(this);
          }
        };
      });
    }

  };

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-form",
      _vm._b(
        {
          ref: "elFormRef",
          staticClass: "charrue-schema-form-container",
          attrs: {
            model: _vm.formData,
            rules: _vm.rules,
            "label-width": _vm.labelWidth,
            "label-position": _vm.labelPosition,
            size: _vm.size,
            disabled: _vm.disabled
          }
        },
        "el-form",
        _vm.formProps,
        false
      ),
      [
        (_vm.col
        ? true
        : _vm.layout)
          ? [
              _c(
                "el-row",
                {
                  attrs: {
                    gutter: _vm.gutter,
                    justify: _vm.justify,
                    align: _vm.align
                  }
                },
                [
                  _vm._l(_vm.computedFields, function(item) {
                    return _c(
                      "schema-field",
                      _vm._g(
                        {
                          key: item.property,
                          attrs: {
                            schema: item,
                            value: _vm.formData[item.property],
                            layout: _vm.col ? true : _vm.layout,
                            col: _vm.col
                          },
                          on: { input: _vm.onInput }
                        },
                        _vm.events
                      )
                    )
                  }),
                  _vm._v(" "),
                  _vm._t("extra")
                ],
                2
              )
            ]
          : [
              _vm._l(_vm.computedFields, function(item) {
                return _c(
                  "schema-field",
                  _vm._g(
                    {
                      key: item.property,
                      attrs: {
                        schema: item,
                        value: _vm.formData[item.property],
                        layout: _vm.col ? true : _vm.layout,
                        col: _vm.col
                      },
                      on: { input: _vm.onInput }
                    },
                    _vm.events
                  )
                )
              }),
              _vm._v(" "),
              _vm._t("extra")
            ]
      ],
      2
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
      component.__file = "C:\\all\\code\\plow\\charrue-el\\packages\\schema-form\\src\\SchemaForm.vue";

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
    

    
    var SchemaForm = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__);

  exports["default"] = SchemaForm;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
