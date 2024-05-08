<template>
  <el-table-column width="40">
    <template #header>
      <el-checkbox v-model="checkedAll" />
    </template>

    <template #default="{ row }">
      <el-checkbox v-model="row.checked" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {}
  },
  computed: {
    checkedAll: {
      get() {
        const d = this.tableData
        return d.length === 0 ? false : d.every(row => row.checked)
      },
      set(value) {
        this.tableData.forEach(row => (row.checked = value))
      }
    }
  },
  inheritAttrs: false
}
</script>
