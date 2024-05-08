<template>
  <SystemLayout>
    <main class="layers">
      <router-view #default="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
  </SystemLayout>
</template>

<script>
import SystemLayout from "@modules/common/SystemLayout/SystemLayout.vue"

export default {
  components: { SystemLayout }
}
</script>

<style lang="scss" scoped>
.layers {
  position: relative;
  min-height: calc(100% - 28px);
  padding: 1rem 1rem 2rem 1rem;

  :deep(.mon-filters) {
    margin-bottom: 1rem;

    .el-form-item {
      width: 300px;
    }
  }
  :deep(.mon-table-action) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }
  :deep(.mon-table-main-actions) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  :deep(.mon-table-footer) {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
