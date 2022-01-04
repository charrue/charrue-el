<template>
  <div class="global-aside-el-menu">
    <el-submenu
      v-if="menuItem.children && menuItem.children.length > 0"
      :index="menuItem.path"
      popper-append-to-body
    >
      <template slot="title">
        <div :class="['submenu-title', menuItem.icon ? 'submenu-title-with-icon' : '']">
          <i :class="['aside-menu-icon', prefixIconClass, menuItem.icon]"></i>
          <span :class="[menuTextClass, 'common-menu-text']">{{ menuItem.title }}</span>
        </div>
      </template>

      <sidebar-item
        v-for="child in menuItem.children"
        :key="child.path"
        :is-nest="true"
        :menuItem="child"
      />
    </el-submenu>
    <template v-else>
      <router-link :to="menuItem.path" class="menu-router-link">
        <el-menu-item :index="menuItem.path">
          <template slot="title">
            <div :class="['submenu-title', menuItem.icon ? 'submenu-title-with-icon' : '']">
              <i :class="['aside-menu-icon', prefixIconClass, menuItem.icon]"></i>
              <span :class="[menuTextClass, 'common-menu-text']">{{ menuItem.title }}</span>
            </div>
          </template>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
    prefixIconClass: String,
    menuTextClass: String
  },
};
</script>
