<template>
  <div :class="className">
    <Hamburger
      :is-active="opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="header-right">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
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
  },
  computed: {
    style() {
      return {
        width: `calc(100% - ${this.opened ? '54px' : '200px'})`,
      }
    },
    className() {
      return {
        "layout-global-header": true,
        "fixed-header": this.fixed,
      };
    },
  },
  methods: {
    toggleSideBar() {
      this.$emit("update:opened", !this.opened)
    },
  },
}
</script>
