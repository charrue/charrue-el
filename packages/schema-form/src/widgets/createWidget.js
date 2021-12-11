import { hasOwnProperty } from "../utils";

const defaultValueProcessor = (val) => val;

export function createInnerWidget({
  name,
  componentName = "el-input",
  valueProcessor = defaultValueProcessor,
  props = {},
  defaultProps = {},
  created = {},
  mounted = {},
  watch = {},
}) {
  return {
    name,
    props: {
      schema: Object,
      value: null,
      placeholder: String,
      ...props,
    },
    data() {
      return {
        extraProps: {},
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
        const { schema, ...props } = this.$props;
        return Object.assign(
          defaultProps,
          {
            ...(props || {}),
          },
          this.schema["ui-props"]
        )
      }
    },
    render(h) {
      const { value, schema = {} } = this;
      // eslint-disable-next-line no-unused-vars
      const { input, ...events } = this.$listeners;

      // el-input type="textarea" 时，为 textarea设置 data-property
      if (componentName === "el-input" && props.type === "textarea" && this.$el) {
        this.$el.querySelector("textarea").setAttribute("data-property", schema.property);
      }
      // el-date-picker 如果设置了type，则需要设置对应的formatter
      if (componentName === "el-date-picker") {
        if (props.type === "year") {
          props.format = "yyyy";
        } else if (props.type === "month") {
          props.format = "yyyy-MM";
        } else if (props.type === "week") {
          props.format = "yyyy 第 WW 周";
        }

        // 如果是日期类型，并且设置了type属性，但是没有设置format，则把format设置为yyyy-MM-dd
        // 解决在schema中存在多个date类型，且设置了type类型
        if (hasOwnProperty(props, "type") && !hasOwnProperty(props, "format")) {
          props.format = "yyyy-MM-dd"
        }
      }

      return h(componentName, {
        props: {
          value,
          src: value,
          ...this.uiProps,
        },
        style: this.uiProps.style,
        class: this.uiProps.class,
        attrs: {
          placeholder: this.uiProps.placeholder,
        },
        key: schema.property,
        on: {
          input: (val) => {
            const value = valueProcessor(val);
            this.$emit("input", value);
          },
          ...events,
        },
      });
    },
  };
}
