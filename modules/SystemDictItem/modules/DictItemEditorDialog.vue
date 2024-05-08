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
        <el-form-item label="字典类型">
          <el-input :value="dictType" disabled />
        </el-form-item>

        <el-form-item label="字典键" prop="k">
          <el-input v-model="form.k" placeholder="请输入字典键" />
        </el-form-item>

        <el-form-item label="字典值" prop="v">
          <el-input v-model="form.v" placeholder="请输入字典值" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="1" />
        </el-form-item>

        <el-form-item label="描述" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入字典描述"
            type="textarea"
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
import { ApiDictItemAdd, ApiDictItemGet, ApiDictItemUpdate } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids", "dictTypeInfo"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        k: "",
        v: "",
        sort: 1,
        remark: ""
      },
      rules: {
        k: [
          { required: true, message: "字典键名为必填项", trigger: "blur" },
          { min: 1, message: "字典键名为必填项", trigger: "blur" }
        ],
        v: [
          { required: true, message: "字典键名为必填项", trigger: "blur" },
          { min: 1, message: "字典键名为必填项", trigger: "blur" }
        ],
        sort: [{ required: true, message: "", trigger: "blur" }]
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
      return this.type === 1 ? "添加字典项" : "修改字典类项"
    },
    dictType() {
      const info = this.dictTypeInfo
      return `${info.name}（${info.type}）`
    }
  },
  methods: {
    async init() {
      if (this.type === 2) {
        const res = await ApiDictItemGet({ id: this.ids[0] })
        Object.assign(this.form, res)
      }
    },
    async invokeCreate() {
      const { k, v, sort, remark } = this.form
      await ApiDictItemAdd({
        k,
        v,
        sort,
        remark,
        typeId: this.dictTypeInfo.id
      })
      ElMessage.success("添加字典项成功")
    },
    async invokeUpdate(id) {
      const { k, v, sort, remark } = this.form
      await ApiDictItemUpdate({
        id,
        k,
        v,
        sort,
        remark,
        typeId: this.dictTypeInfo.id
      })
      ElMessage.success("修改字典项成功")
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
