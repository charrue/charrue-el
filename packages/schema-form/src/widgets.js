import Select from "./widgets/select/index.vue";
import Checkbox from "./widgets/checkbox/checkbox.vue";
import CheckboxButton from "./widgets/checkbox/button.vue";
import Radio from "./widgets/radio/radio.vue";
import RadioButton from "./widgets/radio/button.vue";
import Textarea from "./widgets/textarea";
import DateRange from "./widgets/date-range";
import MonthRange from "./widgets/month-range";
import DateWidget from "./widgets/date";
import DateTimeRange from "./widgets/date-time-range";
import MultiDates from "./widgets/multi-dates";
import DateTime from "./widgets/date-time";
import Time from "./widgets/time";
import TimeRange from "./widgets/time-range";
import ImageWidget from "./widgets/image";

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
  date: DateWidget,
  "date-range": DateRange,
  "month-range": MonthRange,
  "date-time-range": DateTimeRange,
  "multi-dates": MultiDates,
  "date-time": DateTime,
  "time": Time,
  "time-range": TimeRange,
  image: ImageWidget,
};

export const componentMap = new Map();

Object.keys(baseMap).forEach((key) => {
  componentMap.set(key, baseMap[key]);
});

export const defaultReadonlyWidgets = {
  string: "span",
  number: "span",
  textarea: "span",
};
