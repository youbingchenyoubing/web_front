<template>
  <div class="SystemUser-DepartTree">
    <el-input v-model="input" placeholder="请输入部门名称">
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <el-tree
      class="tree"
      ref="treeRef"
      :data="treeList"
      :props="treeProps"
      :filter-node-method="onTreeFilter"
      :expand-on-click-node="false"
      highlight-current
      default-expand-all
      node-key="id"
      @node-click="onTreeClick"
    />
  </div>
</template>

<script>
import { ApiUnitTree } from "@modules/SystemDepartment/api"

export default {
  emits: ["onChange"],
  data() {
    return {
      input: "",
      treeList: [],
      treeProps: { label: "name", children: "children" }
    }
  },
  methods: {
    async init() {
      this.treeList = await ApiUnitTree().catch(() => null)
    },
    /* --------------  -------------- */
    onTreeClick({ id }) {
      const { treeRef } = this.$refs
      if (id === this.preTreeCurrentKey) {
        treeRef.setCurrentKey(null)
        this.$emit("onChange", { unitId: "" })
        return
      }

      this.preTreeCurrentKey = treeRef.getCurrentKey()
      this.$emit("onChange", { unitId: id })
    },
    onTreeFilter(value, data) {
      return data.name.includes(value)
    }
  },
  watch: {
    input(n) {
      clearTimeout(this.inputTimeout)
      this.inputTimeout = setTimeout(() => {
        this.$refs.treeRef.filter(n)
      }, 700)
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.SystemUser-DepartTree {
  padding-right: 1rem;
  min-width: 200px;

  .tree {
    padding-top: 1rem;
  }
}
</style>
