<template>
  <div
    :class="{
      'layout-global-header': true,
      'fixed-header': fixed,
    }"
  >
    <div class="global-header-content">
      <div class="global-header-content__left">
        <slot name="header-left"></slot>
      </div>
      <div class="global-header-content__right">
        <slot name="header-right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GlobalHeader",
  props: {
    opened: {
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
      this.$emit("update:opened", !this.opened);
    },
  },
};
</script>
