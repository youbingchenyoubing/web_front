<template>
  <SystemLayout>
    <main class="User">
      <router-view #default="{ Component }">
        <Transition name="scale-slide" mode="out-in">
          <component :is="Component"></component>
        </Transition>
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
.User {
  position: relative;
  padding: 1rem;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  transition: all 0.2s ease-out;
  will-change: transform, opacity;
}
.scale-slide-enter-from,
.scale-slide-leave-to {
  opacity: 0;
}
.scale-slide-enter-to,
.scale-slide-leave-from {
  opacity: 1;
}
</style>
