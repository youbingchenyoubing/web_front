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
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入岗位名称" />
        </el-form-item>

        <el-form-item label="类型编码" prop="type">
          <el-input v-model="form.type" placeholder="请输入类型编码" />
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="form.remarks"
            type="textarea"
            placeholder="请输入备注"
            :maxlength="200"
            show-word-limit
          />
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
import { ApiDictTypeAdd, ApiDictTypeGet, ApiDictTypeUpdate } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        name: "",
        type: "",
        remarks: ""
      },
      rules: {
        name: [
          { required: true, message: "字典名称为必填项", trigger: "blur" },
          { min: 1, message: "字典名称为必填项", trigger: "blur" }
        ],
        type: [
          { required: true, message: "字典类型为必填项", trigger: "blur" },
          { min: 1, message: "字典类型为必填项", trigger: "blur" }
        ]
      }
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
      return this.type === 1 ? "添加字典类型" : "修改字典类型"
    }
  },
  methods: {
    async init() {
      if (this.type === 2) {
        const res = await ApiDictTypeGet({ id: this.ids[0] })
        Object.assign(this.form, res)
      }
    },
    async invokeCreate() {
      const { name, type, remarks } = this.form
      await ApiDictTypeAdd({ name, type, remarks })
      ElMessage.success("添加字典成功")
    },
    async invokeUpdate(id) {
      const { name, type, remarks } = this.form
      await ApiDictTypeUpdate({ id, name, type, remarks })
      ElMessage.success("修改字典成功")
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
          "SystemDict->EditorDialog->onSubmit: 未知的操作类型 " + type
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
