<template>
  <div
    class="layout-container"
    :class="[collapsed ? 'hideSidebar' : 'openSidebar']"
  >
    <GlobalAside
      :collapsed="!opened"
      :data="data"
      :logo="logo"
      :title="title"
      :route-params="routeParams"
      :authorized="authorized"
      :asideWidths="asideWidths"
      v-bind="$attrs"
    >
      <template #aside-top>
        <slot name="aside-top"></slot>
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom"></slot>
      </template>
    </GlobalAside>
    <div class="layout__main" :style="contentWidthStyle">
      <GlobalHeader v-model:opened="opened" :fixed="fixedHeader" :style="contentWidthStyle">
        <template #header-trigger>
          <slot name="header-trigger"></slot>
        </template>
        <template #header-left>
          <slot name="header-left"></slot>
        </template>
        <template #header-right>
          <slot name="header-right"></slot>
        </template>
      </GlobalHeader>
      <ContentView :content-style="contentStyle">
        <template #header>
          <slot name="content-header"></slot>
        </template>
        <template #content>
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
