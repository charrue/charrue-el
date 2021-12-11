import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-month-range",
  componentName: "el-date-picker",
  defaultProps: {
    type: "monthrange",
    "range-separator": "-",
    "start-placeholder": "开始月份",
    "end-placeholder": "结束月份",
    'value-format': "yyyy-MM",
  },
});
