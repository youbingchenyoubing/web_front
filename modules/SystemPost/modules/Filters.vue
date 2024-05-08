<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="岗位名称" prop="postName">
        <el-input
          placeholder="请输入岗位名称"
          clearable
          v-model="form.postName"
        />
      </el-form-item>

      <el-form-item label="岗位编码" prop="postCode">
        <el-input
          placeholder="请输入岗位编码"
          clearable
          v-model="form.postCode"
        />
      </el-form-item>

      <el-form-item label="状态" prop="enabled">
        <el-select
          placeholder="请选择启用状态"
          clearable
          v-model="form.enabled"
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
        postName: "",
        postCode: "",
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
  },
  created() {
    this.init()
  }
}
</script>
