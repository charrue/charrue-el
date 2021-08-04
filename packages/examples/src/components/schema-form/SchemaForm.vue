<template>
  <el-form :model="formData" :rules="rules" v-bind="formProps" ref="form">
    <template v-if="layout">
      <el-row v-bind="gridProps">
        <schema-field
          v-for="(item, index) in computedFields"
          :key="index"
          :schema="item"
          :value="formData[item.property]"
          :layout="layout"
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
        @input="onInput"
        :layout="layout"
        v-on="events"
      ></schema-field>
      <slot name="extra"></slot>
    </template>
  </el-form>
</template>
<script>
import cloneDeep from 'lodash.clonedeep'
import SchemaField from "./SchemaField";
import { registerWidget } from "./register";

const noop = () => {
  //
};
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
    rules: Object,
    formProps: {
      type: Object,
      default() {
        return {};
      },
    },
    gridProps: {
      type: Object,
      default() {
        return {};
      },
    },
    layout: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    computedFields() {
      const defaultValue = {};
      const value = Object.keys(this.schema).map(k => {
        // eslint-disable-next-line no-prototype-builtins
        if (this.schema[k].hasOwnProperty("default")) {
          defaultValue[k] = this.schema[k].default;
        }
        return {
          property: k,
          ...this.schema[k],
        };
      });
      if (Object.keys(defaultValue).length > 0) {
        this.$emit("input", defaultValue);
      }
      return value;
    },
    events() {
      // eslint-disable-next-line no-unused-vars
      const { input, ...others } = this.$listeners;
      return others;
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
    schema: {
      handler(pre, cur) {
        this.$emit("schema-change", pre, cur);
      },
      deep: true,
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
    validate(successFn = noop, errorFn = noop) {
      if (this.$refs.form) {
        this.$refs.form.validate(async valid => {
          if (valid) {
            await successFn();
          } else {
            await errorFn();
            return false;
          }
        });
      }
    },
  },
  created() {
    Object.keys(this.widgets).forEach(key => {
      registerWidget(key, this.widgets[key]);
    });
  },
};
</script>
