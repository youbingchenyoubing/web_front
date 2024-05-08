<template>
  <SystemLayout>
    <main class="System">
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
.System {
  position: relative;
  min-height: calc(100% - 28px);
  padding: 1rem 1rem 2rem 1rem;
  background: #fff;
  margin: 20px;
  border-radius: 4px;

  :deep(.sys-filters) {
    margin-bottom: 1rem;

    .el-form-item {
      width: 300px;
    }
  }
  :deep(.sys-table-action) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }
  :deep(.sys-table-main-actions) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  :deep(.sys-table-footer) {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
