import Select from "./widgets/select/index";
import Checkbox from "./widgets/checkbox/checkbox.vue";
import CheckboxButton from "./widgets/checkbox/button.vue";
import Radio from "./widgets/radio/radio.vue";
import RadioButton from "./widgets/radio/button.vue";
import Textarea from "./widgets/textarea.js";
import TimeRangeWidget from "./widgets/datetime-range";
import DatetimeWidget from "./widgets/datetime";
import DateWidget from "./widgets/date.js";
import DateRangeWidget from "./widgets/date-range.js";
import SwitchWidget from './widgets/select'

const baseMap = {
  string: "el-input",
  boolean: "el-switch",
  number: "el-input",
  array: Checkbox,
  "checkbox-button": CheckboxButton,
  radio: Radio,
  "radio-button": RadioButton,
  select: Select,
  textarea: Textarea,
  enum: Select,
  text: "span",
  "date-range": DateRangeWidget,
  "datetime-range": TimeRangeWidget,
  date: DateWidget,
  'datetime': DatetimeWidget,
  switch: SwitchWidget
};

export const componentMap = new Map();

Object.keys(baseMap).forEach((key) => {
  componentMap.set(key, baseMap[key]);
});
