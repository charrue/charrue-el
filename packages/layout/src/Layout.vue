<template>
  <div
    class="layout-container"
    :class="[opened ? 'openSidebar' : 'hideSidebar']"
  >
    <GlobalAside
      :collapsed="!opened"
      :data="data"
      :logo="logo"
      :title="title"
      :route-params="routeParams"
      :authorized="authorized"
      v-bind="$attrs"
    >
      <template slot="sidebar-top">
        <slot name="sidebar-top"></slot>
      </template>
      <template slot="sidebar-bottom">
        <slot name="sidebar-bottom"></slot>
      </template>
    </GlobalAside>
    <div class="layout__main" :style="{ width: `calc(100% - ${collapsed ? '54px' : '200px'})` }">
      <GlobalHeader :opened.sync="opened" :fixed="fixedHeader">
        <template slot="header-trigger">
          <slot name="header-trigger"></slot>
        </template>
        <template slot="header-left">
          <slot name="header-left"></slot>
        </template>
        <template slot="header-right">
          <slot name="header-right"></slot>
        </template>
      </GlobalHeader>
      <ContentView :content-style="contentStyle">
        <template slot="header">
          <slot name="content-header"></slot>
        </template>
        <template slot="content">
          <slot></slot>
        </template>
      </ContentView>
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
  },
  data() {
    return {
      opened: false,
    };
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
