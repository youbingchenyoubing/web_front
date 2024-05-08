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
          v-model="form.shortName"
        />
      </el-form-item>

      <el-form-item label="年度" prop="year">
        <el-date-picker v-model="form.year" type="year" placeholder="选择年">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="月份" prop="month">
        <el-date-picker v-model="form.month" type="month" placeholder="选择月">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="录入人" prop="createName">
        <el-input
          placeholder="请输入录入人"
          clearable
          v-model="form.createName"
        />
      </el-form-item>

      <el-form-item label="录入时间" prop="createTime">
        <el-date-picker
          v-model="form.createTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        shortName: "",
        year: "",
        month: "",
        createName: "",
        createTime: null
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
      console.log(
        "%cMyProject%cline:91%cquery",
        "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
        "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
        "color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px",
        query
      )
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
