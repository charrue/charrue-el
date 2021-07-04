<template>
  <section class="layout-main-content">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <slot>
          <router-view :key="key" />
        </slot>
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
export default {
  name: "ContentView",
  computed: {
    key() {
      return this.$route ? this.$route.path : ""
    },
  },
}
</script>
