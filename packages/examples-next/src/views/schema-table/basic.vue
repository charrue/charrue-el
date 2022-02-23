<template>
  <div class="schema-table-page">
    <schema-table :version="3" :data="data" :columns="columns">
      <template #actions>
        <el-button type="text">查看详情</el-button>
      </template>
    </schema-table>
  </div>
</template>

<script>
import { Data, Columns } from "./data"
export default {
  name: "SchemaTableBasicPage",
  data() {
    return {
      data: Data,
      columns: Columns
    }
  }
}
</script>

<style lang="scss">
@import "./common.scss";
</style>