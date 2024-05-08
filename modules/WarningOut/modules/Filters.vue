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

      <el-form-item label="能耗项目" prop="reportStatus">
        <el-select v-model="form.type" placeholder="请选择" clearable>
          <el-option
            v-for="item in energy_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
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
        name: "",
        shortName: "",
        cate: "",
        type: "",
        area: ""
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
        }
      ],
      energy_type: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["energy_type"])
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
