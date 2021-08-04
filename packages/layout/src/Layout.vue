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
      :title-render="titleRender"
      v-bind="$attrs"
    />
    <div class="layout__main">
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
    routeParams: {
      type: Object,
      default() {
        return {};
      },
    },
    titleRender: Function,
    contentStyle: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      opened: false,
    }
  },
  watch: {
    collapsed: {
      handler(val) {
        this.opened = !val
      },
      immediate: true,
    },
    opened(val) {
      this.$emit("update:collapsed", val)
    },
  },
}
</script>
