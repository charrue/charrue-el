<template>
  <el-select
    :ref="schema.ref ? schema.property : ''"
    :value="value"
    :placeholder="placeholder"
    :loading="loading"
    v-bind="uiProps"
    v-on="events"
    @input="onInput"
  >
    <el-option
      v-for="(item, index) in options"
      :key="`${item.value}-${index}`"
      :label="item.label"
      :value="item.value"
      v-bind="item.props || {}"
    >
    </el-option>
  </el-select>
</template>
<script>
const toPromise = (fn, ...args) => {
  const result = fn(...args);
  if (result instanceof Promise) {
    return result;
  } else {
    return Promise.resolve(result);
  }
};

export default {
  name: "inner-select",
  props: {
    schema: Object,
    value: [Number, String, Array, Object, Boolean],
    placeholder: String,
  },
  data() {
    return {
      uiProps: {},
      events: {},
      options: [],
      loading: undefined,
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
      toPromise(fn, ...args)
        .then((_options) => {
          if (Array.isArray(_options)) {
            this.options = _options;
          } else {
            this.options = [];
            console.error(
              `${this.schema.property}类型的表单的remote-method方法应该返回一个数组形式的数据`
            );
          }
          const index = this.options.findIndex(
            (item) => hasOwnProperty(item, "label") && hasOwnProperty(item, "value")
          );
          if (index !== -1) {
            console.warn(`${this.schema.property}表单的options类型第${index + 1}个选项格式有误`)
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.uiProps = this.schema["ui-props"] || {};
    if (this.schema.type === "array") {
      this.uiProps = Object.assign({}, this.uiProps, {
        multiple: true,
      });
    }

    // 处理 remote-method 获取远程数据后难以更新options的问题
    const originMethod = this.uiProps["remote-method"] || this.uiProps.remoteMethod;
    if (originMethod && typeof originMethod === "function") {
      this.uiProps["remote-method"] = (query) => {
        this.enumMethodToPromise(originMethod, query);
      };
    }

    let enums = this.schema.enums;
    // enums可以传入一个函数，以此来更新options
    if (typeof enums === "function") {
      this.enumMethodToPromise(enums);
    } else if (Array.isArray(enums)) {
      this.options = enums.map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return {
            label: item,
            value: item,
          };
        }
        return item;
      });
    } else {
      this.options = [];
    }

    [
      "change",
      "visible-change",
      "remove-tag",
      "clear",
      "blur",
      "focus",
    ].forEach((ev) => {
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
</script>
