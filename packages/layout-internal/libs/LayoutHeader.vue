<template>
  <div
    class="charrue-layout-header-container"
    :class="{ 'fixed-header': fixed }"
  >
    <div class="charrue-layout-header-main">
      <div class="charrue-layout-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="charrue-layout-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LayoutHeader",
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
  methods: {
    toggleSideBar() {
      this.$emit("update:collapse", !this.collapse);
    },
  },
};
</script>
