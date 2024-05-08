<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="企业简称" prop="shortName">
        <el-input
          placeholder="请输入企业简称"
          clearable
          v-model="form.shortName"
        />
      </el-form-item>

      <el-form-item label="所属行业" prop="industry">
        <el-select v-model="form.industry" clearable placeholder="请选择">
          <el-option
            v-for="item in industrys"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="能耗项目" prop="type">
        <el-select v-model="form.type" clearable placeholder="请选择">
          <el-option
            v-for="item in energy_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年度" prop="year">
        <el-date-picker
          v-model="form.year"
          clearable
          type="year"
          placeholder="选择年"
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
        industry: "",
        type: "",
        area: ""
      },
      system_global_status: [],
      industrys: [],
      energy_type: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["industrys"])
      Object.assign(this, res)
    },
    async getEnergyType() {
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
    this.getEnergyType()
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
