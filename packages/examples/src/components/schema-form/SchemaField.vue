<template>
  <div>
    <el-col v-if="layout" :span="schema.span || 24" :offset="schema.offset">
      <el-form-item v-bind="formItemProps">
        <span v-if="schema.type === 'text'">{{
          value || schema.value || schema.default
        }}</span>
        <component
          v-else
          :is="componentName"
          :class="schema.class"
          :style="schema.style"
          :value="currentValue"
          v-bind="inputProps"
          @input="onInput"
        />
      </el-form-item>
    </el-col>
    <el-form-item v-bind="formItemProps" v-else>
      <span v-if="schema.type === 'text'">{{
        value || schema.value || schema.default
      }}</span>
      <component
        v-else
        :is="componentName"
        :class="schema.class"
        :style="schema.style"
        :value="currentValue"
        v-bind="inputProps"
        @input="onInput"
        v-on="$listeners"
      />
    </el-form-item>
  </div>
</template>
<script>
import { componentMap } from "./widgets";
export default {
  name: "SchemaField",
  inject: ["root"],
  props: {
    schema: {
      type: Object,
      required: true,
    },
    value: [Object, String, Number, Array, Boolean],
    layout: Boolean,
  },
  data() {
    return {
      currentValue: "",
      componentName: "el-input",
    };
  },
  computed: {
    formItemProps() {
      return {
        required: this.schema.required,
        label: this.schema.title || this.schema.property,
        prop: this.schema.property,
        size: this.schema.size,
        ...(this.schema["item-attrs"] || {}),
      };
    },
    inputProps() {
      const props = Object.assign({
        disabled: this.schema.readonly,
      }, this.schema["ui-props"], {
        schema: this.schema,
        placeholder: this.schema.placeholder,
      });
      return props;
    },
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      deep: true,
    },
  },
  methods: {
    onInput(value) {
      if (this.schema.type === "number") {
        // eslint-disable-next-line no-useless-escape
        this.currentValue = value.replace(/[^\d^\.]+/g, "");
        this.currentValue = Number(this.currentValue);
      } else if (
        this.schema.type === "string" &&
        typeof value === "string" &&
        this.schema.trim !== false
      ) {
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

      return component || type;
    },
  },
  created() {
    let currentValue = this.value != null ? this.value : this.schema.default;
    if (this.schema.type === "array" && !currentValue) {
      currentValue = [];
    }
    this.currentValue = currentValue;
    this.componentName = this.getComponentName();
  },
};
</script>
