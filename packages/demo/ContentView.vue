<template>
  <section class="layout-main-container">
    <div class="layout-main__header">
      <slot name="header"></slot>
    </div>
    <div class="layout-main__content" :style="contentStyle">
      <transition name="fade-transform" mode="out-in">
        <slot name="content"></slot>
      </transition>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue-demi"
export default defineComponent({
  name: "ContentView",
  props: {
    contentStyle: {
      type: Object,
      default() {
        return {}
      },
    },
  },
});
</script>
