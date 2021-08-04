const defaultValueProcessor = val => val

export function createInnerWidget({
  name,
  componentName = 'el-input',
  valueProcessor = defaultValueProcessor,
  props = {},
  defaultProps = {},
}) {
  return {
    name,
    props: {
      schema: Object,
      value: [Number, String, Array, Object, Boolean],
      ...props,
    },
    render(h) {
      const { value, schema } = this
      // eslint-disable-next-line no-unused-vars
      const { input, ...events } = this.$listeners
      let props = {
        placeholder: '请选择',
      }
      props = Object.assign({}, props, defaultProps, schema['ui-props'])

      return h(componentName, {
        props: {
          value,
          ...props,
        },
        on: {
          input(val) {
            const value = valueProcessor(val)
            this.$emit("input", value)
          },
          ...events,
        },
      })

    },
  }
}
