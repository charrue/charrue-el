import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-time-range",
  componentName: "el-time-picker",
  defaultProps: {
    'is-range': true,
    'arrow-control': true,
    'range-separator': "~",
    'start-placeholder': "开始时间",
    'end-placeholder': "结束时间",
    'value-format': "HH:mm:ss",
  },
});
