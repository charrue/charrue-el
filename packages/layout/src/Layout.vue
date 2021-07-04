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
    />
    <div class="layout__main">
      <GlobalHeader :opened.sync="opened" :fixed="fixedHeader" />
      <ContentView>
        <slot></slot>
      </ContentView>
    </div>
  </div>
</template>
<script lang="ts">
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
