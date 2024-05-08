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
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="form.postName" placeholder="请输入岗位名称" />
        </el-form-item>

        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="form.postCode" placeholder="请输入岗位编码" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input
            v-model="form.sort"
            placeholder="请输入数字"
            :oninput="formatInputNumber"
          />
        </el-form-item>

        <el-form-item label="状态" prop="enabled">
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

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入岗位备注"
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
import { formatInputNumber } from "@share/helper/index.js"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiPostAdd, ApiPostGet, ApiPostUpdate } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        postName: "",
        postCode: "",
        sort: 1,
        enabled: 1,
        remark: ""
      },
      system_global_status: [],
      rules: {
        postName: [
          { required: true, message: "岗位名称为必填项", trigger: "blur" },
          { min: 1, message: "岗位名称为必填项", trigger: "blur" }
        ],
        postCode: [
          { required: true, message: "岗位编码为必填项", trigger: "blur" },
          { min: 1, message: "岗位编码为必填项", trigger: "blur" }
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
      return this.type === 1 ? "新增岗位" : "修改岗位"
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
        const res = await ApiPostGet({ id: this.ids[0] })
        Object.assign(this.form, { ...res, enabled: res.enabled.toString() })
      }
    },
    async invokeCreate() {
      const { postName, postCode, sort, enabled, remark } = this.form
      await ApiPostAdd({ postName, postCode, sort, enabled, remark })
      ElMessage.success("创建岗位成功")
    },
    async invokeUpdate(id) {
      const { postName, postCode, sort, enabled, remark } = this.form
      await ApiPostUpdate({ id, postName, postCode, sort, enabled, remark })
      ElMessage.success("修改岗位成功")
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
          "SystemPost->EditorDialog->onSubmit: 未知的操作类型 " + type
        )
      }

      this.onCancel()
      this.$emit("onSubmit")
    },
    onCancel() {
      const { formRef } = this.$refs
      this.show = false
      formRef.resetFields()
    },
    /* --------------  -------------- */
    formatInputNumber
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
