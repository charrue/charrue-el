import { createInnerWidget } from './createWidget'

export default createInnerWidget({
  name: "inner-textarea",
  componentName: "el-input",
  defaultProps: {
    placeholder: "选择日期",
    type: "textarea",
    autosize: {
      minRows: 2,
    },
  },
})
