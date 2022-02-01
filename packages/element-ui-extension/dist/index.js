const getFormattedValue = (type, val = "", { trim } = {}) => {
  if (type === "number") {
    if (val === "")
      return val;
    return Number(val.replace(/[^\d^.]+/g, ""));
  }
  if (type === "string") {
    return trim ? val.trim() : val;
  }
  return val;
};
var _FormField = {
  functional: true,
  name: "FormField",
  props: {
    type: {
      type: String,
      default: "string",
      validator(type) {
        return [
          "string",
          "number",
          "date",
          "time",
          "week",
          "datetime",
          "daterange",
          "timerange",
          "monthrange",
          "dates"
        ].includes(type);
      }
    },
    value: {
      type: [String, Number, Array, Object, Date],
      default: ""
    },
    trim: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { props, slots, listeners, data } = context;
    const { type, trim } = props;
    const attrs = Object.assign({}, data.attrs);
    const onInput = (val) => {
      if (listeners.input) {
        const value = getFormattedValue(type, val, { trim });
        listeners.input(value);
      }
    };
    const createField = (componentName, componentProps = {}, componentEvents = {}) => {
      return h(componentName, {
        props: {
          value: props.value,
          ...componentProps,
          ...attrs
        },
        on: {
          input: onInput,
          ...componentEvents
        },
        slots
      });
    };
    if (type === "number" || type === "string") {
      return createField("el-input");
    }
    const pickerOptions = Object.assign({
      firstDayOfWeek: 1
    }, attrs["picker-options"], attrs.pickerOptions);
    if (type === "date")
      return createField("el-date-picker", {
        type: "date",
        "value-format": "yyyy-MM-dd",
        "picker-options": pickerOptions
      });
    if (type === "time")
      return createField("el-time-picker", {
        "arrow-control": true,
        "value-format": "HH:mm:ss"
      });
    if (type === "week")
      return createField("el-date-picker", {
        type: "week",
        format: "yyyy \u7B2C WW \u5468",
        "value-format": "yyyy-MM-dd",
        "picker-options": pickerOptions
      });
    if (type === "datetime")
      return createField("el-date-picker", {
        type: "datetime",
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "picker-options": pickerOptions
      });
    if (type === "daterange")
      return createField("el-date-picker", {
        type: "daterange",
        "range-separator": "-",
        "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
        "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
        "value-format": "yyyy-MM-dd",
        "picker-options": pickerOptions
      });
    if (type === "timerange")
      return createField("el-time-picker", {
        "is-range": true,
        "arrow-control": true,
        "range-separator": "~",
        "start-placeholder": "\u5F00\u59CB\u65F6\u95F4",
        "end-placeholder": "\u7ED3\u675F\u65F6\u95F4",
        "value-format": "HH:mm:ss"
      });
    if (type === "datetimerange")
      return createField("el-date-picker", {
        type: "datetimerange",
        "range-separator": "~",
        "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
        "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
        "value-format": "yyyy-MM-dd HH:mm:ss"
      });
    if (type === "monthrange")
      return createField("el-date-picker", {
        type: "monthrange",
        "range-separator": "-",
        "start-placeholder": "\u5F00\u59CB\u6708\u4EFD",
        "end-placeholder": "\u7ED3\u675F\u6708\u4EFD",
        "value-format": "yyyy-MM"
      });
    if (type === "dates")
      return createField("el-date-picker", {
        type: "dates",
        "value-format": "yyyy-MM-dd",
        "picker-options": pickerOptions
      });
  }
};

const FormField = _FormField;

export { FormField };
