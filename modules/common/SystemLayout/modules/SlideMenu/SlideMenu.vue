<template>
  <el-scrollbar class="slide-menu">
    <el-menu
      :collapse="slideMenuCollapse"
      active-text-color="var(--el-color-primary)"
      background-color="#002140"
      text-color="#fff"
      :default-active="defaultActive"
      :collapse-transition="false"
      :unique-opened="true"
      @select="onMenuSelect"
    >
      <SlideMenuItem
        v-for="menu in authSlideMenuList"
        :data="menu"
        :key="menu.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SlideMenuItem from "./SlideMenuItem.vue"
import { AppRoutesMap } from "@router/index"
import { mapWritableState } from "pinia"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { REG_HTTP } from "@constants/regexp"

export default {
  data() {
    return {
      defaultActive: ""
    }
  },
  computed: {
    ...mapWritableState(useGlobalMenuStore, [
      "slideMenuCollapse",
      "preRenderSlideMenu",
      "authSlideMenuList"
    ])
  },
  methods: {
    /* --------------  -------------- */
    onMenuSelect(path, paths) {
      AppRoutesMap.get(paths.at(-1))
      if (REG_HTTP.test(path)) {
        return window.open(path, "_blank")
      }

      this.$router.push(path)
    }
  },
  watch: {
    $route(route) {
      this.defaultActive = route.path
    }
  },
  components: { SlideMenuItem },
  created() {
    const { path } = this.$route
    this.defaultActive = AppRoutesMap.get(path).meta.abstractMenu
      ? this.preRenderSlideMenu
      : path
  }
}
</script>

<style lang="scss" scoped>
.slide-menu {
  flex: 1;
  height: 100%;
  border-right: #ffffff;

  :deep(.is-horizontal) {
    display: none;
  }

  :deep(.el-menu) {
    border-right: 0;
    --el-menu-bg-color: transparent !important;
    .el-sub-menu .el-icon {
      color: #4e5969;
    }
    .menu-title,
    .el-sub-menu {
      border-right: none;
      color: #4e5969;
      background: transparent;
      &:hover {
        // background: linear-gradient(90deg, #ffffff 0%, #e9f7ff 100%);
      }
      .el-menu-item {
        margin-left: 8px;
        .el-icon {
          display: none;
        }
      }
    }
    .el-sub-menu .el-sub-menu__title {
      color: #4e5969;
      background: transparent !important;
      &:hover {
        background: linear-gradient(90deg, #ffffff 0%, #e9f7ff 100%);
      }
    }
    .el-menu-item {
      .el-icon {
        color: #4e5969;
      }
      &.is-active {
        .menu-title {
          color: #207cff;
        }
      }
      &:hover {
        background: linear-gradient(90deg, #ffffff 0%, #e9f7ff 100%);
      }
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    height: 100%;
    color: #fff;
    font-weight: bold;
    overflow: auto;
  }

  :deep(.el-menu-item.is-active) {
    // background: var(--el-menu-hover-bg-color);
    background: linear-gradient(90deg, #ffffff 0%, #e9f7ff 100%);
  }
}
</style>
