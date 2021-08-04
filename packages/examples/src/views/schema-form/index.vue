<template>
  <div id="app">
    <div>
      <el-radio-group v-model="type" @change="onChange">
        <div class="line">
          <el-radio label="basic">基础样例</el-radio>
          <el-radio label="innerFormComponent">内置组件</el-radio>
          <el-radio label="defaultValue">默认值</el-radio>
        </div>
        <div class="line">
          <el-radio label="componentProps">设置表单组件属性</el-radio>
          <el-radio label="formGrid">表单布局</el-radio>
          <el-radio label="formProps">设置表单属性</el-radio>
          <el-radio label="formRules">设置表单规则</el-radio>
        </div>
        <div class="line">
          <el-radio label="customWidget">添加表单组件</el-radio>
          <el-radio label="widgetEvents">表单组件事件</el-radio>
        </div>
      </el-radio-group>
    </div>

    <el-alert v-if="tipContent" type="info">
      <div v-html="tipContent"></div>
    </el-alert>
    <div class="content">
      <schema-form
        class="form-content"
        :schema="schema"
        v-model="formData"
        v-bind="schemaFormProps"
        v-on="schemaFormEvents"
      ></schema-form>
      <div class="value-content" v-html="formDataValue"></div>
    </div>
  </div>
</template>
<script>
import {
  basic,
  innerFormComponent,
  defaultValue,
  componentProps,
  formGrid,
  customWidget,
  widgetEvents,
} from "./setting";
import customWidgetComponent from "./custom-widget.vue";

export function getQueryVariable() {
  const result = {};
  const { search } = window.location;
  const query = search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    result[pair[0]] = decodeURIComponent(pair[1]);
  }
  return result;
}

export default {
  name: "App",
  data() {
    return {
      type: "basic",
      schemas: {
        basic,
        innerFormComponent,
        defaultValue,
        componentProps,
      },
      schema: basic,
      formData: {},
      schemaFormProps: {},
      schemaFormEvents: {},
      tipContent: "",
      query: {},
    };
  },
  computed: {
    formDataValue() {
      return JSON.stringify(this.formData, null, 2).trim();
    },
  },
  methods: {
    onChange(val) {
      this.$set(this, "schemaFormProps", {});
      this.$set(this, "formData", {});
      this.tipContent = "";

      switch (val) {
        case "formProps": {
          this.$set(this, "schemaFormProps", {
            formProps: {
              labelPosition: "left",
              labelWidth: "100px",
            },
          });
          this.$set(this, "schema", basic);
          break;
        }
        case "formRules": {
          this.$set(this, "schemaFormProps", {
            rules: {
              name: [
                { required: true, message: "请输入姓名", trigger: "blur" },
              ],
              age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
            },
          });
          this.$set(this, "schema", basic);
          break;
        }
        case "formGrid": {
          this.$set(this, "schemaFormProps", {
            layout: true,
            gridProps: {
              gutter: 20,
            },
          });
          this.$set(this, "schema", formGrid);
          break;
        }
        case "customWidget": {
          this.$set(this, "schemaFormProps", {
            widgets: {
              "custom-widget": customWidgetComponent,
            },
          });
          this.$set(this, "schema", customWidget);
          break;
        }
        case "widgetEvents": {
          this.tipContent = `
            可通过<b>NAME:EVENT</b>的方式监听到schema-form内部的表单组件的指定事件<br>
            表单名称和事件名称通过:连接<br>
            例如通过<b>subject:visible-change</b>，监听<i>el-select</i>组件的下拉触发时机
            `;
          this.$set(this, "schemaFormEvents", {
            "subject:visible-change": () => {
              this.schema.subject.enums = [
                { label: "语文", value: "2" },
                { label: "数学", value: "3" },
              ];
            },
          });
          this.$set(this, "schema", widgetEvents);
          break;
        }
        default: {
          this.$set(this, "schema", this.schemas[val]);
          break;
        }
      }
    },
  },
  watch: {
    query(val) {
      if (val.type) {
        this.type = val.type;
        this.onChange(val.type);
      }
    },
  },
  created() {
    const query = getQueryVariable();
    this.query = query;
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  margin-top: 20px;

  .form-content {
    flex: 1;
    border-right: 1px solid #707070;
    padding: 20px;
  }
  .value-content {
    flex: 0 0 300px;
    padding: 20px;
    color: #707070;
    box-sizing: border-box;
    white-space: pre-wrap;
  }
}
.primary-border .el-input__inner {
  border-color: greenyellow;
}
.line {
  margin: 10px 0;
}
</style>
