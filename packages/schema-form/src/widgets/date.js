import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-date",
  componentName: "el-date-picker",
  defaultProps: {
    placeholder: "选择日期",
    type: "date",
    'value-format': "yyyy-MM-dd",
  },
});
