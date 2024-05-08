<template>
  <el-form label-width="100px" ref="formRef" :model="form" :rules="rules">
    <el-form-item label="菜单图标" class="inline">
      <InputSelectIcons
        v-model="form.icon"
        placeholder="请点击选择所使用的图标"
      />
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

    <el-form-item class="inline">
      <template #label>
        <el-tooltip
          effect="dark"
          content="选择是外链则路由地址需要以`http(s)://`开头"
          placement="top"
        >
          <div class="center">
            <el-icon><QuestionFilled /></el-icon>
            <span class="l-4">是否外链</span>
          </div>
        </el-tooltip>
      </template>

      <el-radio-group v-model="form.outerChain">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item prop="path" class="inline">
      <template #label>
        <el-tooltip
          effect="dark"
          content="访问的路由地址，如：`/system/user`，如外网地址需内链访问则以`http(s)://`开头"
          placement="top"
        >
          <div class="center">
            <el-icon><QuestionFilled /></el-icon>
            <span class="l-4">路由地址</span>
          </div>
        </el-tooltip>
      </template>

      <el-input v-model="form.path" placeholder="请输入路由地址" />
    </el-form-item>

    <el-form-item prop="redirect" label="重定向地址" class="inline">
      <el-input v-model="form.redirect" placeholder="请输入重定向的地址" />
    </el-form-item>

    <el-form-item class="inline">
      <template #label>
        <el-tooltip
          effect="dark"
          content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
          placement="top"
        >
          <div class="center">
            <el-icon><QuestionFilled /></el-icon>
            <span class="l-4">是否显示</span>
          </div>
        </el-tooltip>
      </template>

      <el-radio-group v-model="form.visible">
        <el-radio
          v-for="item in system_global_visibility"
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
import InputSelectIcons from "@components/InputSelectIcons/InputSelectIcons.vue"
import { REG_HTTP } from "@constants/regexp"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
export default {
  data() {
    return {
      form: {
        icon: "",
        outerChain: false,
        path: "",
        visible: 0,
        enabled: 1,
        redirect: ""
      },
      rules: {
        path: [
          { required: true, message: "路由地址为必填项", trigger: "blur" },
          {
            message: "外链地址必须是`http(s)`开头",
            trigger: "blur",
            validator: (_, value) =>
              this.form.outerChain ? REG_HTTP.test(value) : true
          }
        ]
      },
      system_global_visibility: [],
      system_global_status: []
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum([
        "system_global_status",
        "system_global_visibility"
      ])
      Object.assign(this, res)

      if (!this._setValue) {
        Object.assign(this.form, {
          visible: res.system_global_visibility[0].v,
          enabled: res.system_global_status[0].v
        })
      }
    },
    /* --------------  -------------- */
    validate() {
      return this.$refs.formRef.validate()
    },
    resetFields() {
      this.$refs.formRef.resetFields()
    },
    setValues(value) {
      this._setValue = true
      Object.assign(this.form, value)
      this.form.outerChain = REG_HTTP.test(value.path.toString())
    }
  },
  components: { InputSelectIcons },
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
