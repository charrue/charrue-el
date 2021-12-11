<template>
  <el-checkbox-group v-model="currentValue" @input="onInput">
    <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
import checkboxMixin from "./mixin";
export default {
  name: "inner-checkbox",
  mixins: [checkboxMixin],
};
</script>
