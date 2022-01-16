<template>
  <div
    class="layout-container"
    :class="[collapsed ? 'hideSidebar' : 'openSidebar']"
  >
    <global-aside
      :collapsed="!opened"
      :data="data"
      :logo="logo"
      :title="title"
      :route-params="routeParams"
      :authorized="authorized"
      :asideWidths="asideWidths"
      v-bind="$attrs"
    >
      <template slot="sidebar-top">
        <slot name="sidebar-top"></slot>
      </template>
      <template slot="sidebar-bottom">
        <slot name="sidebar-bottom"></slot>
      </template>
    </global-aside>

    <div class="layout__main" :style="contentWidthStyle">
      <global-header :opened.sync="opened" :fixed="fixedHeader" :style="contentWidthStyle">
        <template slot="header-trigger">
          <slot name="header-trigger"></slot>
        </template>
        <template slot="header-left">
          <slot name="header-left"></slot>
        </template>
        <template slot="header-right">
          <slot name="header-right"></slot>
        </template>
      </global-header>

      <content-view :content-style="contentStyle">
        <template slot="header">
          <slot name="content-header"></slot>
        </template>
        <template slot="content">
          <slot></slot>
        </template>
      </content-view>
    </div>
  </div>
</template>
<script>
import GlobalAside from "./GlobalAside.vue";
import GlobalHeader from "./GlobalHeader.vue";
import ContentView from "./ContentView.vue";
export default {
  name: "Layout",
  components: {
    GlobalAside,
    GlobalHeader,
    ContentView,
  },
  props: {
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
    authorized: Function,
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
  },
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    contentWidthStyle() {
      return {
        width: `calc(100% - ${this.collapsed ? this.asideWidths[0] : this.asideWidths[1]}px)`,
      };
    }
  },
  watch: {
    collapsed: {
      handler(val) {
        this.opened = !val;
      },
      immediate: true,
    },
    opened(val) {
      this.$emit("update:collapsed", !val);
    },
  },
};
</script>
