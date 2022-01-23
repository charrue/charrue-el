<template>
  <div
    class="global-charrue-layout"
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
      :asideWidths="asideWidths"
      :homeUrl="homeUrl"
      :subMenuComponent="componentConfig.subMenu"
    >
      <template slot="sidebar-top">
        <slot name="sidebar-top"></slot>
      </template>
      <template slot="sidebar-bottom">
        <slot name="sidebar-bottom"></slot>
      </template>
    </layout-sidebar>

    <div class="global-charrue-layout-main" :style="contentWidthStyle">
      <layout-header
        :collapse="innerCollapse"
        :fixed="fixedHeader"
        :style="contentWidthStyle"
        @update:collapse="(val) => innerCollapse = val"
      >
        <template slot="header-trigger">
          <slot name="header-trigger"></slot>
        </template>
        <template slot="header-left">
          <slot name="header-left"></slot>
        </template>
        <template slot="header-right">
          <slot name="header-right"></slot>
        </template>
      </layout-header>

      <layout-content
        :content-style="contentStyle"
        :animation="animation"
      >
        <template slot="header">
          <slot name="content-header"></slot>
        </template>
        <template slot="content">
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
import { getComponentConfig, PluginKey } from "./utils"

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
        return [2, 3].indexOf(value) > -1
      },
      default: 2
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
    asideWidths: {
      type: Array,
      default() {
        return [54, 200];
      },
    },
    animation: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    },
    route: {
      type: Boolean,
      default: true
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
      componentConfig: {}
    };
  },
  computed: {
    contentWidthStyle() {
      return {
        width: `calc(100% - ${this.collapsed ? this.asideWidths[0] : this.asideWidths[1]}px)`,
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
  }
};
</script>
