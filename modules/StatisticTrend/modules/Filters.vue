<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="行业" prop="industry">
        <el-select v-model="form.industry" placeholder="请选择" clearable>
          <el-option
            v-for="item in industrys"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否限额" prop="isQuota">
        <el-select v-model="form.isQuota" placeholder="请选择" clearable>
          <el-option
            v-for="item in quotas"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="企业名称" prop="companyName">
        <el-input
          placeholder="请输入企业名称"
          clearable
          v-model="form.companyName"
        />
      </el-form-item>

      <el-form-item label="开始月份" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="month"
          placeholder="选择月"
          clearable
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束月份" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="month"
          placeholder="选择月"
          clearable
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
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
import { formatStamp } from "@share/helper"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        industry: "",
        isQuota: "",
        companyName: ""
      },
      industrys: [],
      quotas: [
        {
          value: "1",
          label: "限额企业"
        },
        {
          value: "0",
          label: "非限额企业"
        }
      ]
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["industrys"])
      Object.assign(this, res)
    },
    handleReset() {
      this.$emit("onSearch", null)
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

<style scoped>
.el-form {
  padding: 18px 16px 0 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
