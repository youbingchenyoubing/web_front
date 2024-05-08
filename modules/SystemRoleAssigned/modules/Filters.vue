<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="用户名称" prop="username">
        <el-input
          placeholder="请输入用户名称"
          clearable
          v-model="form.username"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="mobile">
        <el-input
          placeholder="请输入手机号码"
          clearable
          v-model="form.mobile"
        />
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
  emits: ["search"],
  data() {
    return {
      form: {
        username: "",
        mobile: ""
      }
    }
  },
  methods: {
    handleReset() {
      this.$refs.formRef.resetFields()
      this.$emit("search", {})
    },
    handleSearch() {
      this.$emit(
        "search",
        Object.entries(this.form).reduce((query, [key, value]) => {
          value !== "" && (query[key] = value)
          return query
        }, {})
      )
    }
  }
}
</script>
