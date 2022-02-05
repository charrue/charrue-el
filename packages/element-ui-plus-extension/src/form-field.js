import { h, resolveComponent }  from "vue"


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
const FormField  = (props, context) => {
  const { type, trim } = props
  if (!context) return null

  const onInput = (val) => {
    const value = getFormattedValue(type, val, { trim })
    context.emit("update:modelValue", value)
  }

  const createField = (componentName, componentProps = {}, componentEvents = {}) => h(resolveComponent(componentName), {
        modelValue: props.modelValue,
        ...context.attrs,
        'onUpdate:modelValue': onInput,
        ...componentProps,
        ...componentEvents,
      }, context.slots
    )
  if (type === "number" || type === "string") {
    return createField("el-input")
  }

  if (type === "date") return createField("el-date-picker", {
    type: "date",
    "value-format": "YYYY-MM-DD",
  })

  if (type === "time") return createField("el-time-picker", {
    'arrow-control': true,
    'value-format': "HH:mm:ss",
  })
  if (type === "week") return createField("el-date-picker", {
    type: "week",
    format: "yyyy 第 WW 周",
    "value-format": "YYYY-MM-DD",
  })

  if (type === "datetime") return createField("el-date-picker", {
    type: "datetime",
    "value-format": "YYYY-MM-DD HH:mm:ss",
  })

  if (type === "daterange") return createField("el-date-picker", {
    type: "daterange",
    "range-separator": "-",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    'value-format': "YYYY-MM-DD",
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
    'value-format': "YYYY-MM-DD HH:mm:ss",
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
    'value-format': "YYYY-MM-DD",
  })

  return null
}

FormField.props = ['type', 'modelValue', 'trim']
export default FormField
