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
          placeholder="请输入登录账号"
          clearable
          v-model="form.username"
        />
      </el-form-item>

      <el-form-item label="真实姓名" prop="realName">
        <el-input
          placeholder="请输入真实姓名"
          clearable
          v-model="form.realName"
        />
      </el-form-item>

      <el-form-item label="用户邮箱" prop="email">
        <el-input placeholder="请输入用户邮箱" clearable v-model="form.email" />
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input placeholder="请输入手机号码" clearable v-model="form.phone" />
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
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        username: "",
        realName: "",
        email: "",
        phone: "",
        gender: "",
        enabled: 1
      },
      system_global_status: [],
      system_global_gender: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_status",
        "system_global_gender"
      ])
      Object.assign(this, res)
    },
    handleReset() {
      const { formRef } = this.$refs
      formRef.resetFields()
      this.$emit("onSearch", {})
    },
    handleSearch() {
      const query = Object.entries(this.form).reduce((query, [key, value]) => {
        value !== "" && (query[key] = value)
        return query
      }, {})
      this.$emit("onSearch", query)
    }
  },
  created() {
    this.init()
  }
}
</script>
