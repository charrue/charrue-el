<template>
  <div class="charrue-layout-sidebar-el-menu-container">
    <component
      :is="subMenuComponent"
      v-if="menuItem.children && menuItem.children.length > 0"
      :index="menuItem.path"
      popper-append-to-body
    >
      <template #title>
        <div
          :class="[
            'submenu-title',
            menuItem.icon ? 'submenu-title-with-icon' : '',
          ]"
        >
          <i :class="['sidebar-menu-icon', prefixIconClass, menuItem.icon]"></i>
          <span :class="[menuTextClass, 'common-menu-text']">{{
            menuItem.title
          }}</span>
        </div>
      </template>

      <sidebar-item
        v-for="child in menuItem.children"
        :key="child.path"
        :route="route"
        :is-nest="true"
        :menuItem="child"
        :subMenuComponent="subMenuComponent"
      />
    </component>
    <template v-else>
      <router-link v-if="route" :to="menuItem.path" class="menu-router-link">
        <el-menu-item :index="menuItem.path">
          <template #title>
            <div
              :class="[
                'submenu-title',
                menuItem.icon ? 'submenu-title-with-icon' : '',
              ]"
            >
              <i
                :class="['sidebar-menu-icon', prefixIconClass, menuItem.icon]"
              ></i>
              <span :class="[menuTextClass, 'common-menu-text']">{{
                menuItem.title
              }}</span>
            </div>
          </template>
        </el-menu-item>
      </router-link>
      <el-menu-item v-else :index="menuItem.path">
        <template #title>
          <div
            :class="[
              'submenu-title',
              menuItem.icon ? 'submenu-title-with-icon' : '',
            ]"
          >
            <i :class="['sidebar-menu-icon', prefixIconClass, menuItem.icon]"></i>
            <span :class="[menuTextClass, 'common-menu-text']">{{
              menuItem.title
            }}</span>
          </div>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    subMenuComponent: {
      type: String,
      default: "el-submenu",
    },
    menuItem: {
      type: Object,
      required: true,
    },
    prefixIconClass: String,
    menuTextClass: String,
    route: Boolean,
  },
};
</script>
