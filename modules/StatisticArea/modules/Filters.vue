<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="对比区域" prop="areaList">
        <el-cascader
          :options="system_area"
          :props="{
            multiple: true,
            checkStrictly: true,
            value: 'v',
            label: 'k'
          }"
          clearable
          v-model="form.areaList"
        ></el-cascader>
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
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      selectedValue: [],
      props: { multiple: true },
      system_area: [],
      form: {
        areaList: "",
        startTime: "",
        endTime: ""
      },
      statusList: [
        {
          value: "1",
          label: "已上报"
        },
        {
          value: "0",
          label: "未上报"
        }
      ]
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["system_area"])
      Object.assign(this, res)
    },
    handleReset() {
      this.$emit("onSearch", {
        areaList: "",
        startTime: "",
        endTime: ""
      })
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
