import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-textarea",
  componentName: "el-input",
  defaultProps: {
    type: "textarea",
    autosize: {
      minRows: 2,
    },
  },
});
