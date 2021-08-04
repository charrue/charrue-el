import { createInnerWidget } from './createWidget'
import dayjs from 'dayjs'

export default createInnerWidget({
  name: "inner-date",
  componentName: "el-date-picker",
  defaultProps: {
    placeholder: "选择日期",
    type: "date",
  },
  valueProcessor(val) {
    return dayjs(val).format("YYYY-MM-DD")
  },
})
