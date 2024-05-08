<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="公告标题" prop="title">
        <el-input placeholder="请输入公告标题" clearable v-model="form.title" />
      </el-form-item>

      <el-form-item label="公告类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择公告类型" clearable>
          <el-option
            v-for="item in system_notice_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="enabled" clearable>
        <el-select
          v-model="form.enabled"
          placeholder="请选择启用状态"
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
        key: "",
        type: "",
        enabled: ""
      },
      system_global_status: [],
      system_notice_type: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_status",
        "system_notice_type"
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
