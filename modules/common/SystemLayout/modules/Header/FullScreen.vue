<template>
  <div class="enlarge" @click="toggleFullScreen">
    <IconEnlarge v-if="!isFullscreen" />
    <IconNarrow v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    toggleFullScreen() {
      this.isFullscreen = !this.isFullscreen
    }
  },
  watch: {
    isFullscreen: {
      immediate: true,
      handler(show) {
        show
          ? document.documentElement.requestFullscreen()
          : document.exitFullscreen().catch(() => null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.enlarge {
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
