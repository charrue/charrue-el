import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-date-time-range",
  componentName: "el-date-picker",
  defaultProps: {
    type: "datetimerange",
    "range-separator": "~",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    'value-format': "yyyy-MM-dd HH:mm:ss",
  },
});
