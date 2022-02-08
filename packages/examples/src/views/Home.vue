<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HelloWorld
  },
  setup() {
    const menuData = ref([
      {
        title: "Home",
        path: "/home"
      },
      {
        title: "Home",
        path: "/home2"
      },
      {
        title: "Home",
        path: "/home3"
      },
      {
        title: "Home",
        path: "/home4"
      }
    ]);
    return {
      menuData
    };
  }
});
</script>
