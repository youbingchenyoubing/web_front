<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbPath" :key="index">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { resolveMenuPaths } from "../SlideMenu/helper"

export default {
  computed: {
    breadcrumbPath() {
      const { path } = this.$route
      const menuPath = resolveMenuPaths(path)
      const activeMenu = menuPath.at(-1)
      return activeMenu.meta.abstractMenu
        ? activeMenu.meta.menuPath
        : menuPath.map(menu => menu.meta)
    }
  }
}
</script>
