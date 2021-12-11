import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-time",
  componentName: "el-time-picker",
  defaultProps: {
    'arrow-control': true,
    'value-format': "HH:mm:ss",
  },
});
