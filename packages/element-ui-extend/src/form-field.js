const getFormattedValue = (type, val = "", { trim } = {}) => {
  if (type === "number") {
    if (val === "") return val
    // eslint-disable-next-line no-useless-escape
    return Number(val.replace(/[^\d^\.]+/g, ""))
  }
  if (type === "string") {
    return trim ? val.trim() : val
  }
  return val
}

export default {
  functional: true,
  props: {
    /**
     * 表单组件类型
     */
    type: {
      type: String,
      default: "string"
    },
    value: null,
    /**
     * 是否清除输入框的空格
     */
    trim: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { props, slots, listeners, data } = context
    const { type, trim } = props
    const attrs = Object.assign({}, data.attrs)

    const onInput = (val) => {
      if (listeners.input) {
        const value = getFormattedValue(type, val, { trim })
        listeners.input(value)
      }
    }

    const createField = (componentName, componentProps = {}, componentEvents = {}) => {
      return h(componentName, {
        props: {
          value: props.value,
          ...componentProps,
          ...attrs
        },
        on: {
          input: onInput,
          ...componentEvents
        },
        slots
      })
    }
    if (type === "number" || type === "string") {
      return createField("el-input")
    }

    const pickerOptions = Object.assign({
      firstDayOfWeek: 1
    }, attrs['picker-options'], attrs.pickerOptions)

    if (type === "date") return createField("el-date-picker", {
      type: "date",
      "value-format": "yyyy-MM-dd",
      'picker-options': pickerOptions
    })

    if (type === "time") return createField("el-time-picker", {
      'arrow-control': true,
      'value-format': "HH:mm:ss",
    })
    if (type === "week") return createField("el-date-picker", {
      type: "week",
      format: "yyyy 第 WW 周",
      "value-format": "yyyy-MM-dd",
      'picker-options': pickerOptions
    })

    if (type === "datetime") return createField("el-date-picker", {
      type: "datetime",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      'picker-options': pickerOptions
    })

    if (type === "daterange") return createField("el-date-picker", {
      type: "daterange",
      "range-separator": "-",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      'value-format': "yyyy-MM-dd",
      'picker-options': pickerOptions
    })

    if (type === "timerange") return createField("el-time-picker", {
      'is-range': true,
      'arrow-control': true,
      'range-separator': "~",
      'start-placeholder': "开始时间",
      'end-placeholder': "结束时间",
      'value-format': "HH:mm:ss",
    })

    if (type === "datetimerange") return createField("el-date-picker", {
      type: "datetimerange",
      "range-separator": "~",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      'value-format': "yyyy-MM-dd HH:mm:ss",
    })

    if (type === "monthrange") return createField("el-date-picker", {
      type: "monthrange",
      "range-separator": "-",
      "start-placeholder": "开始月份",
      "end-placeholder": "结束月份",
      'value-format': "yyyy-MM",
    })

    if (type === "dates") return createField("el-date-picker", {
      type: "dates",
      'value-format': "yyyy-MM-dd",
      'picker-options': pickerOptions
    })
  }
}