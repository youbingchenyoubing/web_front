<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="字典名称" prop="name">
        <el-input placeholder="请输入字典名称" clearable v-model="form.name" />
      </el-form-item>

      <el-form-item label="类型编码" prop="type">
        <el-input placeholder="请输入类型编码" clearable v-model="form.type" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
        <el-button @click="handleReset">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-collapse-transition>
</template>

<script>
export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        name: "",
        type: ""
      }
    }
  },
  methods: {
    handleReset() {
      this.$emit("onSearch", {})
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const query = Object.entries(this.form).reduce((query, [key, value]) => {
        value !== "" && (query[key] = value)
        return query
      }, {})
      this.$emit("onSearch", query)
    }
  }
}
</script>
