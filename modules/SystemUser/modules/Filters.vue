<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
      label-width="68px"
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

      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入用户邮箱" clearable v-model="form.email" />
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input placeholder="请输入手机号码" clearable v-model="form.phone" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择用户性别" clearable>
          <el-option
            v-for="item in system_global_gender"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="账号状态" prop="enabled">
        <el-select
          v-model="form.enabled"
          placeholder="请选择账号状态"
          clearable
        >
          <el-option
            v-for="item in system_global_status"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
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
        enabled: ""
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
