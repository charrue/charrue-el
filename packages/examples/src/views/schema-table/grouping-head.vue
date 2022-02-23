<template>
  <schema-table
    :data="data"
    :columns="columns"
  >
  </schema-table>
</template>

<script>
import { MultiColumns, MultiColumnsData } from "./data";
export default {
  name: "BasicSchemaTablePage",
  data() {
    return {
      data: MultiColumnsData,
      columns: MultiColumns,
    };
  },
};
</script>