<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="字典名称" prop="dictType">
        <el-select
          v-model="form.dictType"
          clearable
          placeholder="请选择字典名称"
        >
          <el-option
            v-for="item in dictTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.type"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="字典键" prop="key">
        <el-input placeholder="请输入字典键" clearable v-model="form.key" />
      </el-form-item>

      <el-form-item label="字典值" prop="value">
        <el-input placeholder="请输入字典值" clearable v-model="form.value" />
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
import { ApiDictTypePage } from "@modules/SystemDictType/api"

export default {
  props: ["show", "dictTypeInfo"],
  emits: ["onSearch", "update:dictTypeInfo"],
  data() {
    return {
      form: {
        dictType: "",
        key: "",
        value: ""
      },
      dictTypeOptions: []
    }
  },
  methods: {
    async init() {
      const { type } = this.$route.query
      const res = await ApiDictTypePage({ current: 1, size: 100 })
      this.dictTypeOptions = res.records
      this.form.dictType = type
      this.$emit(
        "update:dictTypeInfo",
        res.records.find(item => item.type === type)
      )
    },
    handleReset() {
      this.$emit("onSearch", {})
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const { dictType, key, value } = this.form
      this.$emit("onSearch", { dictType: dictType, key, value })
      this.$emit(
        "update:dictTypeInfo",
        this.dictTypeOptions.find(item => item.type === dictType)
      )
    }
  },
  created() {
    this.init()
  }
}
</script>
