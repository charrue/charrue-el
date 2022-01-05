<template>
  <div class="layout-global-aside-container">
    <div class="layout-global-aside-placeholder" :style="{ width }"></div>
    <div
      class="layout-global-aside global-aside-el-menu"
      :style="{ width, position: absolute ? 'absolute' : 'fixed' }"
    >
      <div v-if="logo || title" class="logo-container">
        <router-link :to="homeUrl" :class="['menu-router-link']">
          <img v-if="logo" :src="logo" alt="logo" />
          <h1 v-if="title">{{ title }}</h1>
        </router-link>
      </div>
      <slot name="aside-top"></slot>
      <el-menu
        class="vvvv"
        mode="vertical"
        unique-opened
        :collapse="collapsed"
        :default-active="activeRoutePath"
        :default-openeds="openKeys"
        style="padding: 16px 0; width: 100%"
      >
        <sidebar-item
          v-for="item in computedMenuData"
          :key="item.path"
          :menuItem="item"
        ></sidebar-item>
      </el-menu>
      <slot name="aside-bottom"></slot>
    </div>
  </div>
</template>
<script>
import {
  urlToList,
  menuDataFormatter,
  getMenuDataPathMapping,
  isFunction,
} from "./utils";
import SidebarItem from "./SidebarItem.vue";
export default {
  name: "GlobalAside",
  components: {
    SidebarItem,
  },
  props: {
    /**
     * 导航菜单数据
     */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 导航菜单是否处于折叠状态
     */
    collapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * 导航菜单标题区域的logo
     */
    logo: String,
    /**
     * 导航菜单标题区域的标题文字
     */
    title: String,
    /**
     * 是否启用路由模式，依赖vue-router
     */
    route: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否将侧边栏设置为position: absolute, 使得可以相对于其他容器进行定位
     */
    absolute: {
      type: Boolean,
      default: false,
    },
    /**
     * 控制导航菜单的展示
     * ({ menu, index, deep, path, parent }) => AsideMenuData[]
     */
    authorized: Function,
    /**
     * 导航菜单图标的图标前缀
     */
    prefixIconClass: {
      type: String,
      default: "",
    },
    /**
     * 菜单文字的类名
     */
    menuTextClass: {
      type: [String, Array, Object],
      default: "",
    },
    /**
     * 控制菜单是否可用
     */
    checkMenuDisabled: Function,
    /**
     * 菜单进行路由跳转时，携带的参数
     */
    routeParams: [Function, Object],
    /**
     * 导航菜单折叠，展开时的宽度
     */
    asideWidths: {
      type: Array,
      default() {
        return [50, 200];
      },
    },
    homeUrl: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      openKeys: [],
      activeRoutePath: "",
      menuData: [],
      menuDataPathMapping: {},
    };
  },
  computed: {
    width() {
      return this.collapsed ? this.asideWidths[0] + 'px' : this.asideWidths[1] + 'px';
    },
    computedMenuData() {
      const menuData = [];
      this.menuData.forEach((menu, index) => {
        const formattedMenu = this.formatMenuData({
          menu,
          index,
          deep: 0,
          path: menu.path,
          parent: null,
        });
        if (formattedMenu) {
          menuData.push(formattedMenu);
        }
      });

      return menuData;
    },
  },
  watch: {
    data: {
      handler() {
        this.filterAsideMenuData();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    filterAsideMenuData() {
      const _menuData = this.data
        .filter((t) => t.title && !t.hide)
        .map((t) => {
          if (this.authorized && this.authorized(t.authority, t)) {
            return t;
          }
          return t;
        })
        .filter((t) => !!t);

      this.menuData = menuDataFormatter(_menuData);
      this.menuDataPathMapping = getMenuDataPathMapping(this.menuData);
    },
    /**
     * @private
     * 对菜单数据进行格式化
     */
    _formatMenuData({ menu, deep, index, path, parent } = {}) {
      let menuCopy = menu ? { ...menu } : {};
      if (!this.authorized) return menuCopy;
      if (
        isFunction(this.authorized) &&
        !this.authorized({ menu: menuCopy, deep, index, path, parent })
      ) {
        return false;
      }

      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children
          .map((child) => {
            const currentPath = path.startsWith("/")
              ? child.path
              : `${path}/${child.path}`;
            return this._formatMenuData({
              menu: child,
              deep: deep + 1,
              index,
              path: currentPath,
              parent: menuCopy,
            });
          })
          .filter((t) => t);
      }

      return menuCopy;
    },
  },
  created() {
    console.log(this.$slots)
    if (this.route) {
      this.$watch(
        "$route.path",
        (val) => {
          if (
            this.menuDataPathMapping[val] &&
            this.menuDataPathMapping[val].redirect
          ) {
            this.activeRoutePath = this.menuDataPathMapping[val].redirect;
          } else {
            this.activeRoutePath = val;
          }

          this.openKeys = urlToList(val);
        },
        {
          immediate: true,
        }
      );
    }

    this.formatMenuData = function({ menu, deep, index, path, parent } = {}) {
      let menuCopy = menu ? { ...menu } : {};
      if (!this.authorized) return menuCopy;
      if (
        isFunction(this.authorized) &&
        !this.authorized({ menu: menuCopy, deep, index, path, parent })
      ) {
        return false;
      }

      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children
          .map((child) => {
            const currentPath = path.startsWith("/")
              ? child.path
              : `${path}/${child.path}`;
            return this.formatMenuData({
              menu: child,
              deep: deep + 1,
              index,
              path: currentPath,
              parent: menuCopy,
            });
          })
          .filter((t) => t);
      }

      return menuCopy;
    }
  },
};
</script>
