<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="600px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="90px"
        class="form"
      >
        <el-form-item label="参数键" prop="k">
          <el-input v-model="form.k" placeholder="请输入参数键" />
        </el-form-item>

        <el-form-item label="参数值" prop="v">
          <el-input v-model="form.v" placeholder="请输入参数值" />
        </el-form-item>

        <el-form-item label="状态" prop="remarks">
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

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiConfigAdd, ApiConfigGet, ApiConfigUpdate } from "../api"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "keys", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        k: "",
        v: "",
        enabled: 1
      },
      rules: {
        k: [
          { required: true, message: "参数键名为必填项", trigger: "blur" },
          { min: 1, message: "参数键名为必填项", trigger: "blur" }
        ],
        v: [
          { required: true, message: "参数键值为必填项", trigger: "blur" },
          { min: 1, message: "参数键值为必填项", trigger: "blur" }
        ]
      },
      system_global_status: []
    }
  },
  computed: {
    show: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    },
    title() {
      return this.type === 1 ? "添加参数配置" : "修改参数配置"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      this.resolveDictItemEnum(["system_global_status"]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, { enabled: res.system_global_status[0].v })
      })

      if (this.type === 2) {
        ApiConfigGet({ key: this.keys[0] }).then(res => {
          Object.assign(this.form, { ...res, enabled: res.enabled.toString() })
        })
      }
    },
    async invokeCreate() {
      const { k, v, enabled } = this.form
      await ApiConfigAdd({ k, v, enabled })
      ElMessage.success("添加参数配置成功")
    },
    async invokeUpdate(id) {
      const { k, v, enabled } = this.form
      await ApiConfigUpdate({ id, k, v, enabled })
      ElMessage.success("修改参数配置成功")
    },
    /* --------------  -------------- */
    async onSubmit() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      const { type } = this
      if (type === 1) {
        await this.invokeCreate()
      } else if (type === 2) {
        await this.invokeUpdate(this.ids[0])
      } else if (type === 3) {
        await Promise.all(this.ids.map(this.invokeUpdate))
      } else {
        return console.error(
          "SystemParams->EditorDialog->onSubmit: 未知的操作类型 " + type
        )
      }

      this.onCancel()
      this.$emit("onSubmit")
    },
    onCancel() {
      const { formRef } = this.$refs
      this.show = false
      formRef.resetFields()
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(value) {
        if (value) {
          this.init()
        }
      }
    }
  }
}
</script>
