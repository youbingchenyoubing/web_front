<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="企业名称" prop="name">
        <el-input placeholder="请输入企业名称" clearable v-model="form.name" />
      </el-form-item>
      <el-form-item label="企业简称" prop="shortName">
        <el-input
          placeholder="请输入企业简称"
          clearable
          v-model="form.shortName"
        />
      </el-form-item>

      <el-form-item label="所属行业" prop="industry">
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

      <el-form-item label="企业类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择" clearable>
          <el-option
            v-for="item in company_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="行政区域" prop="area">
        <el-select v-model="form.area" placeholder="请选择" clearable>
          <el-option
            v-for="item in system_area"
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
      company_type: [],
      industrys: [],
      system_area: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async getIndustrys() {
      const res = await this.resolveDictItemEnum(["industrys"])
      Object.assign(this, res)
    },
    async getSystemArea() {
      const res = await this.resolveDictItemEnum(["system_area"])
      Object.assign(this, res)
    },
    async getCompanyType() {
      const res = await this.resolveDictItemEnum(["company_type"])
      Object.assign(this, res)
    },
    init() {
      this.getIndustrys()
      this.getSystemArea()
      this.getCompanyType()
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
