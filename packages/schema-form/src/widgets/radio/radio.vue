<template>
  <el-radio-group v-model="currentValue" @input="onInput">
    <el-radio v-for="item in options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import radioMixin from "./mixin";
export default {
  name: "inner-radio",
  mixins: [radioMixin],
};
</script>
