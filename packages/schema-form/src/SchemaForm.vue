<template>
  <el-form
    class="charrue-schema-form-container"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    v-bind="formProps"
    ref="elFormRef"
    :disabled="disabled"
  >
    <template v-if="col ? true : layout">
      <el-row :gutter="gutter" :justify="justify" :align="align">
        <schema-field
          v-for="item in computedFields"
          :key="item.property"
          :schema="item"
          :value="formData[item.property]"
          :layout="col ? true : layout"
          :col="col"
          @input="onInput"
          v-on="events"
        ></schema-field>
        <slot name="extra"></slot>
      </el-row>
    </template>
    <template v-else>
      <schema-field
        v-for="item in computedFields"
        :key="item.property"
        :schema="item"
        :value="formData[item.property]"
        :layout="col ? true : layout"
        :col="col"
        @input="onInput"
        v-on="events"
      ></schema-field>
      <slot name="extra"></slot>
    </template>
  </el-form>
</template>
<script>
import cloneDeep from "lodash.clonedeep";
import SchemaField from "./SchemaField.vue";
import { defaultReadonlyWidgets } from "./widgets";
import { registerWidget } from "./register";

export default {
  name: "SchemaForm",
  components: {
    SchemaField,
  },
  provide() {
    return {
      root: this,
    };
  },
  props: {
    schema: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    value: {
      type: Object,
      required: true,
    },
    widgets: {
      type: Object,
      default() {
        return {};
      },
    },
    readonlyWidgets: {
      type: Object,
      default() {
        return {};
      },
    },
    rules: Object,
    labelWidth: [String, Number],
    labelPosition: String,
    size: String,
    formProps: {
      type: Object,
      default() {
        return {};
      },
    },
    gutter: Number,
    justify: {
      type: String,
      default: "start",
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
      },
    },
    readonly: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    computedFields() {
      let defaultValue = {};
      const value = Object.keys(this.schema).map((k) => {
        // eslint-disable-next-line no-prototype-builtins
        if (this.schema[k].hasOwnProperty("default")) {
          defaultValue[k] = this.schema[k].default;
        }
        return {
          ...this.schema[k],
          property: k,
          type: this.schema[k].type || "string",
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
            trigger: "change",
          }]
        }
        return acc;
      }, []);
    },
    events() {
      // eslint-disable-next-line no-unused-vars
      const { input, ...others } = this.$listeners;
      return (others || {});
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

      return {
        ...widgets,
        ...defaultReadonlyWidgets,
      };
    },
  },
  watch: {
    value: {
      handler() {
        this.setCurrentValue();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setCurrentValue() {
      if (!(this.formData && this.value === this.formData)) {
        if (this.value) {
          this.formData = cloneDeep(this.value);
        } else {
          this.formData = {};
        }
      }
    },
    onInput(key, value) {
      this.$set(this.formData, key, value);
      const cloneValue = cloneDeep(this.formData);
      this.$emit("input", cloneValue);
      this.$emit("change", cloneValue);
    },
    validate() {
      if (this.$refs.form) {
        return this.$refs.elFormRef.validate()
      } else {
        return Promise.reject(new Error("el-form ref not found"))
      }
    },
  },
  created() {
    Object.keys(this.widgets).forEach((key) => {
      registerWidget(key, this.widgets[key]);
    });
    ["clearValidate", "validateField", "resetFields"].forEach((method) => {
      this[method] = () => {
        if (this.$refs.form) {
          this.$refs.form[method].call(this);
        }
      };
    });
  },
};
</script>
