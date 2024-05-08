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
        <el-cascader
          :options="options"
          :props="{ multiple: true, checkStrickly: true }"
          clearable
          v-model="form.companyName"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="月份" prop="month">
        <el-date-picker
          v-model="form.month"
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
import _ from "lodash"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import { ApiCompanyGet } from "../api"

export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      selectedValue: [],
      props: { multiple: true },
      options: [],
      form: {
        companyName: "",
        month: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请选择对比企业", trigger: "blur" }
        ],
        month: [{ required: true, message: "请选择月份", trigger: "blur" }]
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
      ]
    }
  },
  computed: {
    selectedValues() {
      return this.selectedValue.map(item => {
        if (_.isArray(item)) {
          return _.last(item)
        } else {
          return item
        }
      })
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["system_global_status"])
      Object.assign(this, res)
      this.getCompanys()
    },
    async getCompanys() {
      const res = await ApiCompanyGet({ current: 0, size: 200 })
      this.options = res
    },
    handleReset() {
      this.$emit("onSearch", { companyName: "", month: "" })
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const query = Object.entries(this.form).reduce((query, [key, value]) => {
        value !== "" && (query[key] = value)
        return query
      }, {})
      this.$emit("onSearch", query)
    },
    change(val) {
      this.options = this.setCanSelect(this.options)
    },
    setCanSelect(items) {
      items.forEach((item, index) => {
        const disable = this.selectedValue.length >= 2
        items[index].disabled =
          this.selectedValues.indexOf(item.value) > -1 ? false : disable
        console.log("get", _.get(item, "children", false))
        if (item?.children?.length) {
          this.setCanSelect(item.children)
        }
      })
      return items
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
