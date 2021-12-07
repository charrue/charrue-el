<template>
  <div>
    <layout
      :data="menuData"
      :route="false"
      :absolute="true"
      :collapsed.sync="collapsed"
    ></layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      menuData: [
        {
          path: "标题1",
          title: "标题1",
        },
        {
          path: "标题2",
          title: "标题2",
        },
      ],
    };
  },
};
</script>
