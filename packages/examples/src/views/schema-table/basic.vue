<template>
  <schema-table
    :data="data"
    :columns="columns"
  >
  </schema-table>
</template>
<script>
import { Data, Columns } from './data'
export default {
  name: "basic",
  data() {
    return {
      data: Data,
      columns: Columns
    }
  }
}
</script>