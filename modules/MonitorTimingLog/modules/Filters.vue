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

      <el-form-item label="执行状态" prop="status">
        <el-select
          placeholder="请选择执行状态"
          clearable
          v-model="form.concurrent"
        >
          <el-option
            v-for="item in system_global_expstatus"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="操作时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="[
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 1, 1, 23, 59, 59)
          ]"
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
        status: "",
        date: []
      },
      system_global_taskgroup: [],
      system_global_expstatus: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_taskgroup",
        "system_global_expstatus"
      ])
      Object.assign(this, res)
    },
    handleReset() {
      this.$emit("onSearch", {})
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const { jobName, jobGroup, status, date } = this.form
      const query = Object.entries({
        jobName,
        jobGroup,
        status,
        beginTime: date[0],
        endTime: date[1]
      }).reduce((query, [key, value]) => {
        value !== "" && value !== undefined && (query[key] = value)
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
