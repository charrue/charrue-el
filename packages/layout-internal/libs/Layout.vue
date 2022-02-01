<template>
  <div
    class="charrue-layout"
    :class="[collapsed ? 'hideSidebar' : 'openSidebar']"
  >
    <layout-sidebar
      :collapsed="innerCollapse"
      :data="data"
      :logo="logo"
      :title="title"
      :route-params="routeParams"
      :route="route"
      :absolute="absolute"
      :authorized="authorized"
      :sidebarWidth="sidebarWidth"
      :homeUrl="homeUrl"
      :subMenuComponent="componentConfig.subMenu"
    >
      <template #sidebar-top>
        <slot name="sidebar-top"></slot>
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom"></slot>
      </template>
    </layout-sidebar>

    <div class="charrue-layout-main" :style="mainWidthStyle">
      <layout-header
        :collapse="innerCollapse"
        :fixed="fixedHeader"
        :style="headerWidthStyle"
        @update:collapse="(val) => (innerCollapse = val)"
      >
        <template #header-trigger>
          <slot name="header-trigger"></slot>
        </template>
        <template #header-left>
          <slot name="header-left"></slot>
        </template>
        <template #header-right>
          <slot name="header-right"></slot>
        </template>
      </layout-header>

      <layout-content :content-style="contentStyle" :animation="animation">
        <template #content-header>
          <slot name="content-header"></slot>
        </template>
        <template #content>
          <slot></slot>
        </template>
      </layout-content>
    </div>
  </div>
</template>
<script>
import LayoutSidebar from "./LayoutSidebar.vue";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutContent from "./LayoutContent.vue";
import { getComponentConfig, PluginKey } from "./utils";

export default {
  name: "Layout",
  components: {
    LayoutSidebar,
    LayoutHeader,
    LayoutContent,
  },
  props: {
    version: {
      type: Number,
      validator(value) {
        return [2, 3].indexOf(value) > -1;
      },
      default: 2,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    logo: String,
    title: String,
    routeParams: [Function, Object],
    contentStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      },
    },
    animation: {
      type: Boolean,
      default: true,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    route: {
      type: Boolean,
      default: true,
    },
    authorized: Function,
    homeUrl: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      innerCollapse: false,
      componentConfig: {},
    };
  },
  computed: {
    mainWidthStyle() {
      return {
        width: `calc(100% - ${ this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1] }px)`,
      };
    },
    headerWidthStyle() {
      let width = "100%";
      if (this.fixedHeader) {
        width = `calc(100% - ${ this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1] }px)`;
      }

      return {
        width,
      };
    },
  },
  watch: {
    collapsed: {
      handler(val) {
        this.innerCollapse = val;
      },
      immediate: true,
    },
    innerCollapse(val) {
      this.$emit("update:collapsed", val);
    },
  },
  created() {
    this.componentConfig = getComponentConfig(this[PluginKey].version || 2);
  },
  emits: ["update:collapsed"],
};
</script>
