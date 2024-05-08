<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="企业名称" prop="companyName">
        <el-input
          placeholder="请输入企业名称"
          clearable
          v-model="form.companyName"
        />
      </el-form-item>

      <el-form-item label="年度" prop="year">
        <el-date-picker
          v-model="form.year"
          type="year"
          placeholder="选择年"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <!-- 
      <el-form-item label="月份" prop="month">
        <el-date-picker
          v-model="form.month"
          type="month"
          placeholder="选择月"
          clearable
        >
        </el-date-picker>
      </el-form-item> -->

      <el-form-item label="开始月份" prop="startMonth">
        <el-date-picker
          v-model="form.startMonth"
          type="month"
          placeholder="选择月"
          clearable
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束月份" prop="endMonth">
        <el-date-picker
          v-model="form.endMonth"
          type="month"
          placeholder="选择月"
          clearable
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="上报状态" prop="reportStatus">
        <el-select v-model="form.reportStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        companyName: "",
        startTime: "",
        endTime: "",
        reportStatus: ""
      },
      system_global_status: [],
      statusList: [
        {
          value: "1",
          label: "已上报"
        },
        {
          value: "0",
          label: "未上报"
        },
        {
          value: "2",
          label: "部分上报"
        }
      ]
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

<style scoped>
.el-form {
  padding: 18px 16px 0 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
