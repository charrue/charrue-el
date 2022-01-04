<template>
  <schema-table
    :data="data"
    index
    :columns="columns"
    selection
    shouldCacheSelection
    :page.sync="page"
    :size="size"
    :pagination="paginationOptions"
    :total="total"
    @page-change="onPageChange"
    @size-change="onSizeChange"
    index-header="序号"
    expand-header="Expand"
  >
    <template v-slot:expand="{ scope }">
      <div>
        {{ scope.$index }}
      </div>
    </template>
  </schema-table>
</template>
<script>
import { Data, Columns } from "./data";
export default {
  name: "basic",
  data() {
    return {
      data: Data.slice(0, 5),
      columns: Columns,
      page: 1,
      size: 5,
      total: Data.length,
      paginationOptions: {
        layout: "total, sizes, prev, pager, next, jumper",
        "page-sizes": [5, 10, 100, 400],
        class: "center-pagination",
        style: "margin-top: 1em; height: 32px;",
        background: true,
      },
    };
  },
  methods: {
    onPageChange(page) {
      console.log(page)
      this.page = page;
      this.data = Data.slice(
        (page - 1) * this.size,
        page * this.size
      );
    },
    onSizeChange(size) {
      this.page = 1;
      this.size = size;
      this.data = Data.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
    },
  }
};
</script>