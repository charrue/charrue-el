import { createInnerWidget } from "./createWidget";

export default createInnerWidget({
  name: "inner-image",
  componentName: "el-image",
  defaultProps: {
    lazy: true,
    "preview-src-list": [],
  },
  created() {
    let style = {};
    if (this.schema && this.schema.size) {
      let size =
        typeof this.schema.size === "number"
          ? this.schema.size + "px"
          : this.schema.size;
      this.style = {
        width: size,
        height: size,
      };
    }
    this.extraProps = {
      src: this.value,
      "preview-src-list": [this.value],
      style: style,
    };
  },
});
