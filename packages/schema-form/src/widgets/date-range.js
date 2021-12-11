import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-date-range",
  componentName: "el-date-picker",
  defaultProps: {
    type: "daterange",
    "range-separator": "-",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    'value-format': "yyyy-MM-dd",
  },
});
