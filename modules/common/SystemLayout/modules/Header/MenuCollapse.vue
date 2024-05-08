<template>
  <el-icon class="menu-collapse" size="1.2rem" @click="toggleCollapse">
    <component :is="icon" />
  </el-icon>
</template>

<script>
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { mapWritableState } from "pinia"

export default {
  computed: {
    ...mapWritableState(useGlobalMenuStore, ["slideMenuCollapse"]),
    icon() {
      return this.slideMenuCollapse ? "Expand" : "Fold"
    }
  },
  methods: {
    toggleCollapse() {
      this.slideMenuCollapse = !this.slideMenuCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-collapse {
  margin-right: 12px;
  color: currentColor;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
