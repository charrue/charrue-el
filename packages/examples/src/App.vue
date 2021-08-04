<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
}
/* :root {
  --layout-aside-content-bg-color: green;
  --layout-aside-hover-text-color: #000;
  --layout-aside-hover-bg-color: red;
} */

/* 滚动槽 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
