<template>
  <div :class="className">
    <slot name="header-trigger">
      <Hamburger
        :is-active="opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
    </slot>
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
import Hamburger from "./Hamburger.vue";
export default {
  name: "GlobalHeader",
  components: {
    Hamburger,
  },
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
  computed: {
    className() {
      return {
        "layout-global-header": true,
        "fixed-header": this.fixed,
      };
    },
  },
  methods: {
    toggleSideBar() {
      this.$emit("update:opened", !this.opened);
    },
  },
};
</script>
