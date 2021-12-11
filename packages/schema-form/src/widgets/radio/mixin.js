export default {
  props: {
    schema: Object,
    value: [Number, String, Boolean],
  },
  data() {
    return {
      options: [],
      props: {},
      currentValue: "",
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
  },
  created() {
    this.options = (this.schema.enums || []).map((item) => {
      if (
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean"
      ) {
        return {
          label: item,
          value: item,
        };
      }
      return item;
    });
    this.props = this.schema["ui-props"] || {};
  },
};
