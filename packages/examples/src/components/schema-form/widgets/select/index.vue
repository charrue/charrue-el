<template>
  <el-select
    :ref="schema.property"
    :value="value"
    @input="onInput"
    v-bind="props"
    v-on="events"
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
export default {
  name: "inner-select",
  props: {
    schema: Object,
    value: [Number, String, Array, Object, Boolean],
  },
  data() {
    return {
      props: {},
      events: {},
    };
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
    setEnums(options) {
      this.$set(this, "options", options);
    },
  },
  computed: {
    options() {
      return (this.schema.enums || []).map(item => {
        if (typeof item === "string" || typeof item === "number") {
          return {
            label: item,
            value: item,
          };
        }
        return item;
      });
    },
  },
  created() {
    this.props = this.schema["ui-props"] || {};
    if (this.schema.type === "array") {
      this.props = Object.assign({}, this.props, {
        multiple: true,
      });
    }

    [
      "change",
      "visible-change",
      "remove-tag",
      "clear",
      "blur",
      "focus",
    ].forEach(ev => {
      this.events[ev] = (...args) => {
        this.$emit(`${this.schema.property}:${ev}`, ...args);
      };
    });
  },
};
</script>
