<template>
  <div class="home">
    <layout
      :collapsed.sync="collapsed"
      :data="menuData"
      title="Vue Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :menu-title-render="titleRender"
      :menu-header-extra-render="menuHeaderExtraRender"
      :route-params="routeParams"
    >
      <template slot="sidebar-top">
        <div class="side-top-title">主题切换</div>
        <el-radio-group class="radio-container" v-model="theme" @change="onThemeChange">
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
import Layout from '@charrue/layout'
import "@charrue/layout/src/styles/index.scss"
import { ref, watch } from "vue";
export default {
  name: "PageLayout",
  components: {
    Layout
  },
  setup() {
    const collapsed = ref(false);
    watch(collapsed, (val) => {
      console.log(val);
    });
    const menuData = ref([
      {
        title: "page",
        path: "/page",
        icon: 'el-icon-document',
        children: [
          {
            path: "page1",
            title: "page1",
            icon: 'el-icon-document',
            // redirect: "path5",
            redirect: "/page/page1/path5",
            children: [
              {
                path: "path4",
                title: "path4",
                icon: 'el-icon-document'
              },
              {
                path: "path5",
                title: "path5",
                icon: 'el-icon-document'
              },
            ],
          },
          {
            path: "page2",
            title: "page3",
            icon: 'el-icon-document'
          },
        ],
      },
      // {
      //   title: "schema-table",
      //   path: "/schema-table",
      //   children: [
      //     {
      //       path: 'basic',
      //       title: 'basic'
      //     }
      //   ]
      // },
    ]);

    const titleRender = ({ menu }) => {
      return menu.title + '?'
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
    const onThemeChange = (value) => {
      const cls = Array.from(document.body.classList)
      const idx = cls.findIndex(t => t.startsWith("theme-"))
      console.log()
      if (idx > -1) {
        cls.splice(idx, 1)
      }
      cls.push(`theme-${value}`)
      document.body.className = cls.join(" ")
    }
    return {
      collapsed,
      routeParams,
      menuData,
      titleRender,
      menuHeaderExtraRender,
      theme,
      onThemeChange
    };
  },
}
</script>