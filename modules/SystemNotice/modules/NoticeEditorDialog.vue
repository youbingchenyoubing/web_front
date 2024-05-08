<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="1000px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
    :close-on-press-escape="false"
    :lock-scroll="true"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="90px"
        class="form"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入公告标题" />
        </el-form-item>

        <el-form-item label="公告类型" prop="type" class="inline">
          <el-select v-model="form.type" placeholder="请选择公告类型">
            <el-option
              v-for="item in system_notice_type"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="enabled" class="inline">
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

        <el-form-item label="公告内容" prop="content">
          <wang-editor
            @onChange="onContentChange"
            :defaultValue="form.content"
            ref="wangEditor"
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
import { ApiNoticeAdd, ApiNoticeGet, ApiNoticeUpdate } from "../api"
import WangEditor from "@components/wangEditor/wangEditor.vue"
import { mapActions } from "pinia"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        title: "",
        type: "",
        content: "",
        enabled: ""
      },
      rules: {
        title: [
          { required: true, message: "参数键名为必填项", trigger: "blur" },
          { min: 1, message: "参数键名为必填项", trigger: "blur" }
        ],
        type: [{ required: true, message: "参数键值为必填项", trigger: "blur" }]
      },
      system_global_status: [],
      system_notice_type: []
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
      return this.type === 1 ? "创建公告" : "修改公告"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      this.resolveDictItemEnum([
        "system_global_status",
        "system_notice_type"
      ]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, {
          enabled: res.system_global_status[0].v,
          type: res.system_notice_type[0].v
        })
      })

      if (this.type === 2) {
        const res = await ApiNoticeGet({ id: this.ids[0] })
        Object.assign(this.form, {
          ...res,
          enabled: res.enabled.toString(),
          type: res.type.toString()
        })
        this.$refs.wangEditor.valueHtml = res.content
      }
    },
    async invokeCreate() {
      const { title, type, content, enabled } = this.form
      await ApiNoticeAdd({ title, type, content, enabled })
      ElMessage.success("创建成功")
    },
    async invokeUpdate(id) {
      const { title, type, content, enabled } = this.form
      await ApiNoticeUpdate({ id, title, type, content, enabled })
      ElMessage.success("修改成功")
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
          "SystemNotice->EditorNoticeDialog->onSubmit: 未知的操作类型 " + type
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
    onContentChange(e) {
      this.form.content = e
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
  },
  components: { WangEditor }
}
</script>

<style lang="scss" scoped>
.form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }
}
</style>
