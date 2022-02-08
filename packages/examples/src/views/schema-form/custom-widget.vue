<template>
  <div class="flex">
    <el-input
      style="width: 50px"
      size="mini"
      :value="value"
      v-bind="props"
      @input="onInput"
    >
    </el-input>
    <span>个</span>
  </div>
</template>

<script>
export default {
  name: "InnerCustomWidget",
  props: {
    schema: Object,
    value: [Number, String, Array, Object, Boolean],
  },
  data() {
    return {
      props: {},
    };
  },
  created() {
    this.props = this.schema["ui-props"] || {};
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
