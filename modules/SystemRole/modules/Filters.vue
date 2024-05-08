<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          placeholder="请输入角色名称"
          clearable
          v-model="form.roleName"
        />
      </el-form-item>

      <el-form-item label="角色编码" prop="rolePerm">
        <el-input
          placeholder="请输入角色编码"
          clearable
          v-model="form.rolePerm"
        />
      </el-form-item>

      <el-form-item label="状态" prop="enabled">
        <el-select placeholder="请选择状态" clearable v-model="form.enabled">
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
  emits: ["search"],
  data() {
    return {
      form: {
        roleName: "",
        rolePerm: "",
        enabled: ""
      },
      system_global_status: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["system_global_status"])
      Object.assign(this, res)
    },
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
  },
  created() {
    this.init()
  }
}
</script>
