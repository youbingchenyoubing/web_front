<template>
  <el-scrollbar class="NavigateBar">
    <NavigateTabItem
      v-for="(item, index) in historyList"
      :key="item.path"
      :route="item"
      :index="index"
    />
  </el-scrollbar>
  <div ref="ruler"></div>
</template>

<script>
import { AppRoutesMap } from "@router/route"
import { resolveURLQuery } from "@share/helper"
import { useGlobalHistoryStore } from "@store/HistoryGlobalStore"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { mapState, mapWritableState } from "pinia"
import NavigateTabItem from "./NavigateTabItem.vue"

export default {
  data() {
    return {
      maxWidth: "100%"
    }
  },
  computed: {
    ...mapWritableState(useGlobalHistoryStore, ["historyList"]),
    ...mapState(useGlobalMenuStore, ["slideMenuCollapse"])
  },
  methods: {
    onCloseCurrentPage({ path }) {
      const index = this.historyList.findIndex(item => item.path === path)
      const lastIndex = this.historyList.length - 1
      const targetPath =
        index === lastIndex
          ? this.historyList[0].path
          : this.historyList[index].path
      this.historyList.splice(index, 1)
      this.$router.splice(targetPath)
    },
    onReloadPage() {
      const { path, query } = this.$route
      this.$router.replace({
        path: `/link/${encodeURIComponent(path)}?${resolveURLQuery(query)}`,
        replace: true
      })
    },
    onCloseOtherPage(route) {
      this.historyList = [this.historyList.at(0), route]
    },
    onCloseRightPage(index) {
      this.historyList = this.historyList.slice(0, index + 1)
    },
    onCloseAllPage() {
      const home = this.historyList.at(0)
      this.historyList = [home]
      this.$router.replace(home.path)
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
    },
    slideMenuCollapse(collapse) {
      //  this.slideMenuCollapse ? "64px" : "200px"
      const curWidth = Number(this.maxWidth.split("px")[0])
      this.maxWidth = (collapse ? curWidth + 136 : curWidth - 136) + "px"
    }
  },
  components: { NavigateTabItem },
  mounted() {
    this.maxWidth = this.$refs.ruler.offsetWidth + "px"
  }
}
</script>

<style lang="scss" scoped>
.NavigateBar {
  flex-shrink: 0;
  position: sticky;
  top: 50px;
  left: 0px;
  z-index: 8;
  padding: 0 8px;
  max-width: v-bind(maxWidth);
  height: auto;
  background-color: #fff;
  // box-shadow: var(--el-box-shadow-lighter);
  transition: max-width 0.6s;

  :deep(.el-scrollbar__view) {
    white-space: nowrap;
  }

  :deep(.el-button--primary) {
    --el-button-bg-color: #6b82a2;
    --el-button-border-color: #6b82a2;
  }
}
</style>
