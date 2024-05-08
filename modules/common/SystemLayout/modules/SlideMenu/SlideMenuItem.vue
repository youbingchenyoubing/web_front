<template>
  <el-sub-menu v-if="hasChildren" :index="data.path">
    <template #title :index="data.path">
      <el-icon size="1rem"><component :is="data.meta.icon" /></el-icon>
      <span class="menu-title">{{ data.meta.title }}</span>
    </template>

    <SlideMenuItem
      v-for="menu in data.children"
      :key="menu.path"
      :data="menu"
    />
  </el-sub-menu>

  <el-menu-item v-else :index="data.path">
    <el-icon size="1rem"><component :is="data.meta.icon" /></el-icon>
    <span class="menu-title">{{ data.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    data: Object
  },
  computed: {
    hasChildren() {
      return Array.isArray(this.data.children) && this.data.children.length > 0
    }
  },
  name: "SlideMenuItem"
}
</script>

<style lang="scss" scoped>
.menu-title {
  margin-left: 4px;
}
</style>
