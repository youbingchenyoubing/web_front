<template>
  <el-dialog
    v-model="_show"
    title="列显示"
    width="600px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onClose"
  >
    <template #default>
      <div class="config-group">
        <el-checkbox-group v-model="selectedColumns">
          <el-checkbox
            v-for="item in columns"
            :label="item.key"
            :key="item.key"
            :checked="item.visible"
          >
            {{ item.title }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </template>

    <template #footer>
      <footer class="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </footer>
    </template>
  </el-dialog>
</template>

<script>
import { TABLE_COLUMNS } from "../constants"

export default {
  props: ["tableColumns", "show"],
  emits: ["update:show", "onChange"],
  data() {
    return {
      columns: TABLE_COLUMNS,
      selectedColumns: []
    }
  },
  computed: {
    _show: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit("update:show", value)
      }
    }
  },
  methods: {
    onSubmit() {
      const map = new Map()
      const result = []
      this.selectedColumns.forEach(c => map.set(c, true))
      this.columns.forEach(col => {
        if (map.has(col.key)) {
          col.visible = true
          result.push(col.key)
          return
        }

        col.visible = false
      })
      this.$emit("onChange", result)
      this.onClose()
    },
    onClose() {
      this._show = false
      this.resetCheckedColumns()
    },
    resetCheckedColumns() {
      return (this.selectedColumns = this.columns
        .filter(col => col.visible)
        .map(col => col.key))
    }
  },
  created() {
    this.resetCheckedColumns()
    this.$emit("onChange", this.selectedColumns)
  }
}
</script>

<style lang="scss" scoped>
.config-group {
  :deep(.el-checkbox-group) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>
