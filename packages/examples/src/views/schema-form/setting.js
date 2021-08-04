export const basic = {
  name: {
    title: "姓名",
    type: "string",
  },
  age: {
    title: "年龄(只能输入数字)",
    type: "number",
    prop: "age",
  },
};

export const innerFormComponent = {
  name: {
    title: "姓名",
    type: "string",
  },
  age: {
    title: "年龄(只能输入数字)",
    type: "number",
    prop: "age",
  },
  sex: {
    title: "性别",
    type: "string",
    "ui-widget": "radio",
    enums: ["男", "女"],
  },
  edu: {
    title: "学历",
    type: "string",
    "ui-widget": "select",
    enums: ["本科以下", "本科", "硕士", "博士"],
  },
  hobby: {
    title: "爱好",
    type: "array",
    enums: ["篮球", "足球", "健身", "游戏", "读书"],
  },
  subject: {
    title: "学科",
    type: "array",
    "ui-widget": "select",
    enums: [
      { label: "高数", value: "1" },
      { label: "英语", value: "2" },
    ],
  },
  copyright: {
    type: "text",
    title: "版权",
    default: "Copyright",
  },
  introduce: {
    type: "textarea",
    title: "介绍",
  },
};

export const defaultValue = {
  name: {
    title: "姓名",
    type: "string",
    default: "Vue",
  },
  age: {
    title: "年龄(只能输入数字)",
    type: "number",
    prop: "age",
    default: 21,
  },
};

export const componentProps = {
  name: {
    title: "姓名",
    type: "string",
    "ui-props": {
      clearable: true,
      placeholder: "请输入姓名",
      "prefix-icon": "el-icon-search",
    },
    style: "width: 200px",
    class: "primary-border",
  },
  subject: {
    title: "学科",
    type: "array",
    "ui-widget": "select",
    enums: ["高数", "地理", "英语"],
    "ui-props": {
      filterable: true,
      clearable: true,
      placeholder: "请选择学科",
      "allow-create": true,
    },
  },
};

export const formGrid = {
  name: {
    title: "姓名",
    type: "string",
    span: 12,
  },
  age: {
    title: "年龄(只能输入数字)",
    type: "number",
    prop: "age",
    span: 12,
  },
  sex: {
    title: "性别",
    type: "string",
    "ui-widget": "radio",
    enums: ["男", "女"],
    span: 12,
  },
  edu: {
    title: "学历",
    type: "string",
    "ui-widget": "select",
    enums: ["本科以下", "本科", "硕士", "博士"],
    span: 12,
  },
  hobby: {
    title: "爱好",
    type: "array",
    enums: ["篮球", "足球", "健身", "游戏", "读书"],
    span: 12,
  },
  subject: {
    title: "学科",
    type: "array",
    "ui-widget": "select",
    enums: [
      { label: "高数", value: "1" },
      { label: "英语", value: "2" },
    ],
    span: 12,
  },
  copyright: {
    type: "text",
    title: "版权",
    default: "Copyright",
    span: 12,
  },
  introduce: {
    type: "textarea",
    title: "介绍",
    span: 12,
  },
};

export const customWidget = {
  name: {
    title: "姓名",
    type: "string",
  },
  num: {
    title: "个数",
    type: "string",
    "ui-widget": "custom-widget",
  },
};

export const widgetEvents = {
  subject: {
    title: "学科",
    type: "string",
    "ui-widget": "select",
    enums: [],
  },
};
