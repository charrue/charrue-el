<template>
  <div
    class="charrue-layout-header-container"
    :class="{ 'fixed-header': fixed }"
  >
    <div class="charrue-layout-header-main">
      <div class="charrue-layout-header-left">
        <hamburger @toggle-click="toggleSideBar" />
        <slot name="header-left"></slot>
      </div>
      <div class="charrue-layout-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import Hamburger from "./Hamburger.vue"
export default {
  name: "LayoutHeader",
  components: {
    Hamburger,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:collapse"],
  methods: {
    toggleSideBar() {
      this.$emit("update:collapse", !this.collapse);
    },
  },
};
</script>
