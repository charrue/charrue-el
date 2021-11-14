<template>
  <div class="home">
    <layout
      :collapsed.sync="collapsed"
      :data="menuData"
      :class="theme"
      title="Vue Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :menu-title-render="titleRender"
      :menu-header-extra-render="menuHeaderExtraRender"
      :route-params="routeParams"
    >
      <template slot="side-top">
        <div class="side-top-title">主题切换</div>
        <el-radio-group class="radio-container" v-model="theme">
          <el-radio label="normal">normal</el-radio>
          <el-radio label="light">light</el-radio>
          <el-radio label="dark">dark</el-radio>
        </el-radio-group>
      </template>
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
import { defineComponent, ref, watch } from "@vue/composition-api";
export default defineComponent({
  name: "PageLayout",
  setup() {
    const collapsed = ref(false);
    watch(collapsed, (val) => {
      console.log(val);
    });
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
        title: "schema-table",
        path: "/schema-table",
        children: [
          {
            path: 'basic',
            title: 'basic'
          }
        ]
      },
    ]);

    const titleRender = (h, { title }) => {
      return h("span", { slot: "title" }, `* ${title}`);
    };
    const menuHeaderExtraRender = (h) => {
      return h("div", { class: "progress-bar-wrapper" }, [
        h("div", { class: "progress-bar" }, [
          h("span", { class: "progress-bar-fill" }),
        ]),
      ]);
    };
    const routeParams = (item) => {
      return {
        query: {
          path: item.path,
        },
      };
    };

    const theme = ref("normal");
    return {
      collapsed,
      routeParams,
      menuData,
      titleRender,
      menuHeaderExtraRender,
      theme,
    };
  },
});
</script>
<style lang="scss">
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

.radio-container.el-radio-group {
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  .el-radio {
    margin-bottom: 10px;
  }
}
.side-top-title {
  margin-bottom: 10px;
  color: var(--layout-aside-active-text-color,#1cd17a);
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
<style>
.light {
  --layout-aside-content-bg-color: #ebf1f6;
  --layout-aside-active-text-color: #2f9afd;
  --layout-aside-active-bg-color: #f5f8fb;
  --layout-aside-normal-text-color: #606266;

  --layout-aside-hover-text-color: #2f9afd;
  --layout-aside-hover-bg-color: #f5f8fb;
}
.dark {
  --layout-aside-content-bg-color: #2c3643;
  --layout-aside-active-text-color: #cccccc;
  --layout-aside-active-bg-color: #2a2d2e;
  --layout-aside-normal-text-color: #ccbe9c;

  --layout-aside-hover-text-color: #cccccc;
  --layout-aside-hover-bg-color: #2a2d2e;
}
</style>