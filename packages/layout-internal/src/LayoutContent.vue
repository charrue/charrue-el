<template>
  <section class="charrue-layout-content-container">
    <div class="charrue-layout-content-header">
      <slot name="header"></slot>
    </div>
    <div class="charrue-layout-content-main" :style="contentStyle">
      <template v-if="animation">
        <transition name="fade-transform" mode="out-in">
          <slot name="content"></slot>
        </transition>
      </template>
      <template v-else>
        <slot name="content"></slot>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "LayoutContent",
  props: {
    contentStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    animation: {
      type: Boolean,
      default: true,
    }
  },
};
</script>
