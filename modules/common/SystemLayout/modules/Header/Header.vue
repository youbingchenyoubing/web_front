<template>
  <header class="system-header">
    <div class="l">
      <MenuCollapse />
      <Breadcrumb />
    </div>

    <div class="r">
      <FullScreen class="r-item" />
      <UserAvatar class="r-item" />
    </div>
  </header>
</template>

<script>
import FullScreen from "./FullScreen.vue"
import Breadcrumb from "./Breadcrumb.vue"
import MenuCollapse from "./MenuCollapse.vue"
import UserAvatar from "./UserAvatar.vue"

export default {
  components: { MenuCollapse, Breadcrumb, FullScreen, UserAvatar }
}
</script>

<style lang="scss" scoped>
.system-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9;
  background: #fff;
  box-shadow: var(--el-box-shadow-lighter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 50px;
}

.l {
  display: flex;
  align-items: center;
}

.r {
  display: flex;
  align-items: center;
  gap: 1rem;

  .r-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
