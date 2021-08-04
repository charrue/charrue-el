<template>
  <div class="flex">
    <el-input
      style="width: 50px"
      size="mini"
      :value="value"
      @input="onInput"
      v-bind="props"
    >
    </el-input>
    <span>个</span>
  </div>
</template>
<script>
export default {
  name: "inner-custom-widget",
  props: {
    schema: Object,
    value: [Number, String, Array, Object, Boolean],
  },
  data() {
    return {
      props: {},
    };
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
  },
  created() {
    this.props = this.schema["ui-props"] || {};
  },
};
</script>
<style>
.flex {
  display: flex;
}
</style>
