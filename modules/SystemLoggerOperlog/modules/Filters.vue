<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="模块名称" prop="title">
        <el-input placeholder="请输入模块名称" clearable v-model="form.title" />
      </el-form-item>

      <el-form-item label="操作人员" prop="operName">
        <el-input
          placeholder="请输入操作人员"
          clearable
          v-model="form.operName"
        />
      </el-form-item>

      <el-form-item label="业务类型" prop="businessType">
        <el-select
          placeholder="请选择业务类型"
          clearable
          v-model="form.businessType"
        >
          <el-option
            v-for="item in system_operator_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="执行状态" prop="status">
        <el-select placeholder="请选择执行状态" clearable v-model="form.status">
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
        title: "",
        operName: "",
        businessType: "",
        status: "",
        date: []
      },
      system_operator_type: [],
      system_global_expstatus: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_operator_type",
        "system_global_expstatus"
      ])
      Object.assign(this, res)
    },
    handleReset() {
      this.$emit("onSearch", {})
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const { title, operName, businessType, status, date } = this.form
      const query = Object.entries({
        title,
        operName,
        businessType,
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
