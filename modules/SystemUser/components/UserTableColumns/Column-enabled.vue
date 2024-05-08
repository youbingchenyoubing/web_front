<template>
  <el-table-column
    prop="enabled"
    label="账号状态"
    align="center"
    min-width="80"
  >
    <template #default="{ row }">
      <el-tag>{{ row.enabled }}</el-tag>
    </template>
  </el-table-column>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
