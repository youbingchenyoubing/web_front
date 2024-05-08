<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="菜单名称" prop="name">
        <el-input placeholder="请输入菜单名称" clearable v-model="form.name" />
      </el-form-item>

      <el-form-item label="状态" prop="enabled">
        <el-select placeholder="请选择状态" clearable v-model="form.enabled">
          <el-option
            v-for="item in system_global_status"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-select placeholder="请选择菜单类型" clearable v-model="form.type">
          <el-option
            v-for="item in system_menu_type"
            :key="item.v"
            :label="item.k"
            :value="item.v"
          />
        </el-select>
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
        name: "",
        enabled: "",
        type: ""
      },
      system_global_status: [],
      system_menu_type: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_status",
        "system_menu_type"
      ])
      Object.assign(this, res)
    },
    /* --------------  -------------- */
    handleReset() {
      this.$emit("onSearch", {})
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
