<template>
  <div class="home">
    <layout
      :data="menuData"
      title="Vue Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :menu-title-render="titleRender"
      :menu-header-extra-render="menuHeaderExtraRender"
      :route-params="{ query: { t: time } }"
    >
      <template slot="header-left">
        <div>LEFT</div>
      </template>
      <template slot="header-right">
        <div>RIGHT</div>
      </template>
      <template slot="content-header">
        <div style="padding: 20px">
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
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
            // redirect: "path5",
            redirect: "/page/page1/path5",
            children: [
              {
                path: "path4",
                title: "path4",
              },
              {
                path: "path5",
                title: "path5",
              },
            ],
          },
          {
            path: "page2",
            title: "page3",
          },
        ],
      },
      {
        title: "page3",
        path: "/paeg/page3",
      },
    ]);

    const titleRender = (h, { title }) => {
      return h("span", { slot: "title" }, `${title} =>`);
    };
    const menuHeaderExtraRender = (h) => {
      return h("div", { class: "progress-bar-wrapper" }, [
        h("div", { class: "progress-bar" }, [
          h("span", { class: "progress-bar-fill" }),
        ]),
      ]);
    };
    const time = Date.now();
    return {
      time,
      menuData,
      titleRender,
      menuHeaderExtraRender,
    };
  },
});
</script>
<style>
.menu-header-extra {
  height: 20px;
  width: 100%;
  background: #fff;
}

.progress-bar-wrapper {
  width: 90%;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  padding: 2px;
  border-radius: 5px;
}

.progress-bar-fill {
  display: block;
  height: 20px;
  border-radius: 5px;
  background-color: #84bf96;
  transition: width 1s ease;
  animation: fill 5s infinite linear;
}

@keyframes fill {
  0% {
    width: 0%;
  }

  25% {
    width: 30%;
    background-color: #45b97c;
  }
  50% {
    width: 50%;
    background-color: #007d65;
  }
  75% {
    width: 70%;
    background-color: #1d953f;
  }
  100% {
    width: 100%;
    background-color: #007947;
  }
}
</style>
