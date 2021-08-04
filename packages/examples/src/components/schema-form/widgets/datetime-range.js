import { createInnerWidget } from './createWidget'
import dayjs from 'dayjs'

export default createInnerWidget({
  name: "inner-datetime-range",
  componentName: "el-date-picker",
  defaultProps: {
    type: "datetimerange",
    "range-separator": "-",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
  },
  valueProcessor(val) {
    if (Array.isArray(val)) {
      return val.map(item => dayjs(item).format("YYYY-MM-DD HH:mm:ss"))
    }
    return val
  },
})
