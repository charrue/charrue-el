<template>
  <div class="charrue-schema-field-wrapper">
    <el-col
      v-if="layout"
      :span="schema.span || 24"
      v-bind="responsiveColProps"
    >
      <el-form-item v-bind="formItemProps">
        <template v-if="root.readonly || schema.type === 'text'">
          <span
            v-if="schema.type === 'text' || readonlyComponentName === 'span'"
            >{{ value || schema.value || schema.default }}</span
          >
          <component
            v-else
            :is="readonlyComponentName"
            :value="value || schema.value || schema.default"
            :schema="schema"
            :data-property="schema.property"
          />
        </template>
        <component
          v-else
          class="charrue-schema-field-item"
          :data-property="schema.property"
          :is="componentName"
          :class="schema.class"
          :style="schema.style"
          :value="currentValue"
          v-bind="inputProps"
          @input="onInput"
          v-on="inputEvents"
        />
      </el-form-item>
    </el-col>
    <el-form-item v-bind="formItemProps" v-else>
      <span :data-property="schema.property" v-if="schema.type === 'text'">{{
        value || schema.value || schema.default
      }}</span>
      <component
        v-else
        class="charrue-schema-field-item"
        :data-property="schema.property"
        :is="componentName"
        :class="schema.class"
        :style="schema.style"
        :value="currentValue"
        v-bind="inputProps"
        @input="onInput"
        v-on="inputEvents"
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
    value: null,
    layout: Boolean,
    col: Number,
  },
  data() {
    return {
      currentValue: "",
      componentName: "el-input",
      readonlyComponentName: "",
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
      const props = Object.assign({}, this.schema["ui-props"], {
        schema: this.schema,
        placeholder: this.schema.placeholder || `请输入${this.schema.title}`,
      });
      return props;
    },
    responsiveColProps() {
      const defaultProps = this.schema.colProps || {};
      if (!this.col) return defaultProps;
      if (this.col === 4) {
        return Object.assign(
          {
            xl: 4,
            lg: 6,
            md: 12,
            sm: 12,
            xs: 24,
          },
          defaultProps
        );
      }
      if (this.col === 3) {
        return Object.assign(
          {
            xl: 4,
            lg: 8,
            md: 12,
            sm: 12,
            xs: 24,
          },
          defaultProps
        );
      }
      return defaultProps;
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
        this.currentValue =
          this.currentValue === "" ? "" : Number(this.currentValue);
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
      if (this.root.readonly)
        this.readonlyComponentName =
          this.root.computedReadonlyWidgets[widget || type];
      this.readonlyComponentName = this.readonlyComponentName || "span";

      return component || type;
    },
    /**
     * 派发表单的各种事件，事件名为`<property>:<event>`
     */
    dispatchInputEvent() {
      const inputEventKeys = ["blur", "focus", "change", "clear"];
      this.inputEvents = inputEventKeys.reduce((acc, cur) => {
        acc[cur] = (val) => {
          this.$emit(`${this.schema.property}:${cur}`, val);
        };
        return acc;
      }, {});
    },
  },
  created() {
    let currentValue = this.value != null ? this.value : this.schema.default;
    if (this.schema.type === "array" && !currentValue) {
      currentValue = [];
    }
    this.currentValue = currentValue;
    this.componentName = this.getComponentName();
    this.dispatchInputEvent();
  },
};
</script>
