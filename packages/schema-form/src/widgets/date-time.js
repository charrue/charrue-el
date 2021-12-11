import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-date-time",
  componentName: "el-date-picker",
  defaultProps: {
    type: "datetime",
    'value-format': "yyyy-MM-dd",
  },
});
