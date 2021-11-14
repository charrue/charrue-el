<template>
  <div class="charrue-crud">
    <div v-if="$slots.header" class="charrue-crud__header">
      <slot name="header" />
    </div>
    <div class="charrue-crud__body">
      <el-table
        ref="elTableRef"
        v-loading="loading"
        :data="tableData"
        :element-loading-text="loadingOptions && loadingOptions.text"
        :element-loading-spinner="loadingOptions && loadingOptions.spinner"
        :element-loading-background="
          loadingOptions && loadingOptions.background
        "
        v-bind="tableProps"
        v-on="events"
      >
        <!-- 多选操作 -->
        <el-table-column
          v-if="selection"
          type="selection"
          v-bind="typeof selection === 'boolean' ? {} : selection"
        />

        <!-- 表格首列之前显示索引 -->
        <el-table-column v-if="index" type="index" :index="computedIndex" />

        <!-- 遍历columns，渲染行数据 -->
        <!-- key使用name,label,index的拼接，不使用index，防止column的个数没有变化，但是值发生变化后，表头不更新 -->
        <el-table-column
          v-for="(item, index) in columns"
          v-show="item.hidden !== true"
          :key="`${item.prop}-${item.label}-${index}`"
          :label="item.label"
          :prop="item.prop"
          v-bind="item.attrs"
        >
          <!-- 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <template v-if="$scopedSlots.theader">
              <slot name="theader" :scope="scope" />
            </template>
            <span v-else>{{ item.label }}</span>
          </template>

          <!-- 自定义单元格 -->
          <template slot-scope="scope">
            <div class="cell-wrapper">
              <template v-if="$scopedSlots[item.prop]">
                <slot :name="item.prop" :scope="scope" />
              </template>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </div>
          </template>
          <!-- 多级表头 -->
          <template v-if="item.children">
            <mutli-column
              v-for="(child, idx) in item.children || []"
              :key="idx"
              :item-column="child"
            />
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="showExtraColumn" v-bind="extraColumnProps">
          <template slot="header">
            <template v-if="$scopedSlots.extraColumnHeader">
              <slot name="extraColumnHeader" :scope="scope" />
            </template>
            <span v-else>操作</span>
            <span>操作</span>
          </template>
          <!-- 删除操作 -->
          <template slot-scope="scope">
            <!-- 提供插槽，展示其他的内容 -->
            <slot name="actions" :scope="scope" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div
        v-if="pagination"
        :class="['charrue-pagination-wrapper', pagination.class]"
        :style="pagination.style"
      >
        <el-pagination
          v-bind="typeof pagination === 'boolean' ? {} : pagination"
          :current-page="currentPage"
          @update:current-page="onCurrentPageChange"
          :total="computedTotal"
          :page-size="pageSize"
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          @prev-click="handlePaginationPrevClick"
          @next-click="handlePaginationNextClick"
        />
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>
<script>
import MutliColumn from "./MutliColumn.jsx";
import cloneDeep from "lodash.clonedeep";

export default {
  components: {
    MutliColumn,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    /* el-table的props */
    tableProps: Object,
    /* 如果是boolean，表示启用多选模式，如果是一个对象，表示多选列的props */
    selection: [Boolean, Object],
    /* 如果是boolean，表示启用详细模式，如果是一个数组，表示详细区域需要展示的列 */
    expand: [Array, Boolean],
    /* 表格是否在加载中 */
    loading: Boolean,
    /* 加载效果的选项 */
    loadingOptions: Object,
    /* 详细区域的props */
    expandOptions: Object,
    /* 额外的列的props */
    extraColumnProps: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * 如果是boolean，表示启用索引
     * 如果是一个Function，表示自定义索引,它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示
     * 该属性传入数字时，将作为索引的起始值
     */
    index: [Function, Boolean, Number],
    /**
     * 用于自定义渲染表头数据
     * 第一个参数为渲染函数
     * 剩余参数为当前列的表头信息和位置索引(同el-table的header插槽)$index, column
     */
    theadContent: Function,
    /**
     * 自定义操作列的表头元素
     */
    extraHeadContent: Function,
    /**
     * 是否展示额外的列
     */
    showExtraColumn: {
      type: Boolean,
      default: true,
    },
    pagination: [Boolean, Object],
    currentPage: Number,
    total: [Number, String],
    pageSize: Number,
  },
  data() {
    return {
      events: {},
    };
  },
  computed: {
    tableData() {
      return cloneDeep(this.data);
    },
  },
  methods: {
    /**
     * @private 派发 el-pagination 的 size-change 事件
     */
    handlePaginationSizeChange(pageSize) {
      this.$emit("pagination-size-change", pageSize);
    },
    /**
     * @private
     */
    handlePaginationCurrentChange(currentPage) {
      this.$emit("pagination-current-change", currentPage);
    },
    /**
     * @private
     */
    handlePaginationPrevClick(currentPage) {
      this.$emit("pagination-prev-click", currentPage);
    },
    /**
     * @private
     */
    handlePaginationNextClick(currentPage) {
      this.$emit("pagination-next-click", currentPage);
    },
    /**
     * @private
     */
    onCurrentPageChange(value) {
      this.$emit("update:currentPage", value);
    },

    /**
     * @private 把el-table的事件代理到schema-table上
     */
    proxyElTableEvents() {
      const elTableEvents = [
        "select",
        "select-all",
        "selection-change",
        "cell-mouse-enter",
        "cell-mouse-leave",
        "cell-click",
        "cell-dblclick",
        "row-click",
        "row-contextmenu",
        "row-dblclick",
        "header-click",
        "header-contextmenu",
        "sort-change",
        "filter-change",
        "current-change",
        "header-dragend",
        "expand-change",
      ];
      elTableEvents.forEach((item) => {
        this.events[item] = (...args) => {
          this.$emit(item, ...args);
        };
      });
    },
    /**
     * @private 把el-table的方法代理到schema-table上
     */
    proxyElTableMethods() {
      const elTableMethods = [
        "clearSelection",
        "toggleAllSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearSort",
        "clearFilter",
        "doLayout",
        "sort",
      ];
      elTableMethods.forEach((item) => {
        this[item] = (...args) => {
          this.$refs.elTableRef[item](...args);
        };
      });
    },
  },
  created() {
    this.proxyElTableMethods();
    this.proxyElTableEvents();
  },
};
</script>
