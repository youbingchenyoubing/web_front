<template>
  <el-form label-width="100px" ref="formRef" :model="form" :rules="rules">
    <el-form-item class="inline">
      <template #label>
        <el-tooltip
          effect="dark"
          content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPerm('system:user:list')`)"
          placement="top"
        >
          <div class="center">
            <el-icon><QuestionFilled /></el-icon>
            <span class="l-4">权限字符</span>
          </div>
        </el-tooltip>
      </template>

      <el-input v-model="form.perms" placeholder="请输入权限标识" />
    </el-form-item>

    <el-form-item class="inline">
      <template #label>
        <el-tooltip
          effect="dark"
          content="选择停用则路由将不会出现在侧边栏，也不能被访问"
          placement="top"
        >
          <div class="center">
            <el-icon><QuestionFilled /></el-icon>
            <span class="l-4">状态</span>
          </div>
        </el-tooltip>
      </template>

      <el-radio-group v-model="form.enabled">
        <el-radio
          v-for="item in system_global_status"
          :key="item.v"
          :label="item.v"
        >
          {{ item.k }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  data() {
    return {
      form: {
        perms: "",
        enabled: ""
      },
      rules: {},
      system_global_status: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["system_global_status"])
      Object.assign(this, res)

      if (!this._setValue) {
        Object.assign(this.form, {
          enabled: res.system_global_status[0].v
        })
      }
    },
    validate() {
      return Promise.resolve(true)
    },
    resetFields() {
      this.$refs.formRef.resetFields()
    },
    setValues(value) {
      Object.assign(this.form, value)
      this._setValue = true
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.center {
  display: inline-flex;
  align-items: center;
}
.l-4 {
  margin-left: 4px;
}
</style>
