<template>
  <el-dropdown trigger="contextmenu" size="small" class="NavigateTabItem">
    <template #default>
      <router-link :to="route.path">
        <el-button
          size="small"
          :type="currentPath === route.path ? 'primary' : 'default'"
        >
          <span v-if="currentPath === route.path" class="point"></span>
          <span class="title">{{ route.title }}</span>
          <span
            v-if="route.path !== '/'"
            class="close"
            @click.stop="onCloseCurrentPage"
          >
            <el-icon size=".6rem"><CloseBold /></el-icon>
          </span>
        </el-button>
      </router-link>
    </template>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="currentPath === route.path">
          <span @click="onReloadPage" class="NavigateTabItem-item">
            <el-icon><RefreshRight /></el-icon>
            刷新页面
          </span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="onCloseOtherPage" class="NavigateTabItem-item">
            <el-icon><Close /></el-icon>
            关闭其他
          </span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="onCloseRightPage" class="NavigateTabItem-item">
            <el-icon><Right /></el-icon>
            关闭右侧
          </span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="onCloseAllPage" class="NavigateTabItem-item">
            <el-icon><CircleClose /></el-icon>
            关闭全部
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { AppRoutesMap } from "@router/route"
import { useGlobalHistoryStore } from "@store/HistoryGlobalStore"
import { mapWritableState } from "pinia"

export default {
  props: ["route", "index"],
  computed: {
    ...mapWritableState(useGlobalHistoryStore, ["historyList"]),
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    onCloseCurrentPage(e) {
      e.preventDefault()
      e.stopPropagation()

      const { path } = this.route
      const index = this.historyList.findIndex(item => item.path === path)
      const lastIndex = this.historyList.length - 1
      this.historyList.splice(index, 1)

      // 只有关闭的是`当前所在`路由才需要跳转
      if (this.currentPath === path) {
        const targetPath =
          index === lastIndex
            ? this.historyList.at(index - 1).path
            : this.historyList.at(-1).path
        this.$router.push(targetPath)
      }
    },
    onReloadPage() {
      const { path, query } = this.$route
      this.$router.replace({
        path: `/link/${encodeURIComponent(path)}`,
        replace: true,
        query
      })
    },
    onCloseOtherPage() {
      const route = this.route
      if (this.currentPath === route.path) {
        this.historyList = [this.historyList[0], route]
      } else {
        this.historyList = [this.historyList[0]]
        this.$router.push(route.path)
      }
    },
    onCloseRightPage() {
      const { route, index } = this
      if (this.currentPath === route.path) {
        this.historyList = this.historyList.slice(0, index + 1)
      } else {
        this.historyList = this.historyList.slice(0, index)
        this.$router.push(route.path)
      }
    },
    onCloseAllPage() {
      this.historyList = [this.historyList[0]]
      this.$router.push("/")
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ path }) {
        const list = this.historyList
        if (list.some(item => item.path === path)) {
          return
        }

        const route = AppRoutesMap.get(path)
        if (!route) {
          return
        }

        list.push({ path, title: route.meta.title })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.NavigateTabItem {
  margin-right: 4px;
  display: inline-block;
  height: 36px;
  line-height: 36px;

  .point {
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 200px;
  }

  .close {
    display: inline-flex;
    padding: 2px;
    border-radius: 50%;

    &:hover {
      background: #dbdbdc;
    }
  }
}

:global(.NavigateTabItem-item) {
  display: inline-flex;
  align-items: center;
}
</style>
