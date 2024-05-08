<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="mon-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="任务名称" prop="jobName">
        <el-input
          placeholder="请输入任务名称"
          clearable
          v-model="form.jobName"
        />
      </el-form-item>

      <el-form-item label="任务组名" prop="jobGroup">
        <el-select
          placeholder="请选择任务组名"
          clearable
          v-model="form.jobGroup"
        >
          <el-option
            v-for="item in system_global_taskgroup"
            :key="item.k"
            :label="item.k"
            :value="item.k"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="任务状态" prop="status">
        <el-select placeholder="请选择任务状态" clearable v-model="form.status">
          <el-option
            v-for="item in system_task_status"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否并行" prop="concurrent">
        <el-select placeholder="请选择" clearable v-model="form.concurrent">
          <el-option
            v-for="item in system_global_yesorno"
            :key="item.v"
            :value="item.v"
            :label="item.k"
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
        jobName: "",
        jobGroup: "",
        concurrent: "",
        status: ""
      },
      system_global_yesorno: [],
      system_task_status: [],
      system_global_taskgroup: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_yesorno",
        "system_task_status",
        "system_global_taskgroup"
      ])
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
