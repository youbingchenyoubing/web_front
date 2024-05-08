<template>
  <h4 class="block-title">
    <slot></slot>
  </h4>
  <div class="block-line"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.block-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: #6379bb;
  user-select: none;
}

.block-line {
  margin: 4px 0 1rem 0;
  height: 1px;
  background: var(--el-border-color);
  border-radius: 12px;
}
</style>
