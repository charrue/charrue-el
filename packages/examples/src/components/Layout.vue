<template>
  <div class="home">
    <layout :data="menuData">
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
export default defineComponent({
  name: "PageLayout",
  setup() {
    const menuData = ref([
      {
        title: "page",
        path: "/page",
        children: [
          {
            path: "page1",
            title: "page1",
            children: [
              {
                path: "path4",
                title: "path4"
              },
              {
                path: "path5",
                title: "path5"
              }
            ]
          },
          {
            path: "page2",
            title: "page3"
          }
        ]
      },
      {
        title: "page3",
        path: "/paeg/page3"
      }
    ]);
    return {
      menuData
    };
  }
});
</script>
