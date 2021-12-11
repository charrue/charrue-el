import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-multi-dates",
  componentName: "el-date-picker",
  defaultProps: {
    placeholder: "选择日期",
    type: "dates",
    'value-format': "yyyy-MM-dd",
  },
});
