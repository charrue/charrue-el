<template>
  <el-checkbox-group v-model="currentValue" @input="onInput">
    <el-checkbox-button
      v-for="item in options"
      :key="item.value"
      :label="item.value"
    >
      {{ item.label }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>
<script>
import checkboxMixin from "./mixin";
export default {
  name: "inner-checkbox-button",
  mixins: [checkboxMixin],
};
</script>
