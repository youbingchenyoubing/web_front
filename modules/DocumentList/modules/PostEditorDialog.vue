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
        label-width="100px"
        class="form"
      >
        <el-form-item label="企业名称：" prop="companyId">
          <el-select
            v-model="form.companyId"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文件类型：" prop="type">
          <el-select
            v-model="form.type"
            clearable
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in file_type"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间" v-if="form.type != 1" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="开始时间" v-if="form.type == 1" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="开始时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间" v-if="form.type == 1" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="文件名称：" prop="newFileName">
          <el-input
            class="input"
            v-model="form.newFileName"
            placeholder="请输入文件名称"
          />
        </el-form-item>

        <el-form-item label="附件：" prop="url">
          <el-upload
            action
            style="width: 400px"
            :on-change="fileChange"
            class="upload"
            ref="upload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :http-request="importHandle"
          >
            <div class="upload-btn">
              <el-button size="small" type="primary">点击上传</el-button>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :maxlength="200"
            show-word-limit
            class="textarea"
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
import moment from "moment"
import { ApiUploadFile } from "@api/index"
import { formatInputNumber } from "@share/helper/index.js"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiPostAdd, ApiPostGet, ApiCompanyGet, ApiDeleteFile } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        companyId: "",
        endTime: null,
        fileName: "",
        newFileName: "",
        remark: "",
        startTime: null,
        type: "",
        time: null,
        url: ""
      },
      system_global_status: [],
      rules: {
        companyId: {
          required: true,
          message: "请选择企业名称",
          trigger: "change"
        },
        type: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ],
        newFileName: [
          { required: true, message: "请填写文件名称", trigger: "change" }
        ],
        url: [{ required: true, message: "请上传附件", trigger: "change" }]
      },
      company: [],
      file_type: []
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
      return "新增档案文件"
    }
  },
  mounted() {
    this.initCompany()
    this.getFileType()
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    async handleRemove(e) {
      const res = await ApiDeleteFile({ url: this.form.url })
      ElMessage.success("删除成功")
    },
    async importHandle({ file }) {
      const res = await ApiUploadFile({ file })
      this.form.url = res.url
      this.form.fileName = res.originalFileName
      this.$refs.formRef.clearValidate("url") //清除文字校验
      ElMessage.success("上传成功")
    },
    async initCompany() {
      const { records } = await ApiCompanyGet({ current: 1, size: 200 })
      this.company = records.map(item => {
        var row = { value: item.id, label: item.name }
        return row
      })
    },
    async getFileType() {
    },
    async init() {
      if (this.type === 2) {
        const res = await ApiPostGet({ id: this.ids[0] })
        Object.assign(this.form, {
          ...res,
          month: `${res.year}-${res.month}`
        })
      }
    },
    async invokeCreate() {
      var params = JSON.parse(JSON.stringify(this.form))
      if (params.time)
        params.time = moment(params.time).format("YYYY-MM-DD HH:mm:ss")

      if (params.type == 1 && params.startTime) {
        params.startTime = moment(params.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        )
        params.time = params.startTime
      }
      if (params.type == 1 && params.startTime) {
        params.endTime = moment(params.endTime).format("YYYY-MM-DD HH:mm:ss")
      }

      await ApiPostAdd(params)
      ElMessage.success("创建企业能耗成功")
    },
    async invokeUpdate(id) {
      var params = this.form
      params.id = id
      if (this.form.month) {
        var month = moment(this.form.month).format("YYYY-MM")
        var monthArr = month.split("-")
        params.year = monthArr[0]
        params.month = monthArr[1]
      }
      if (this.form.companyId) {
        params.shortName = this.company.find(
          item => item.value == this.form.companyId
        ).label
      }
      await ApiPostUpdate(params)
      ElMessage.success("修改企业能耗成功")
    },
    /* --------------  -------------- */
    async onSubmit() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      if (!this.form.url) {
        return ElMessage.error("请上传附件")
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
<style lang="scss" scoped>
.input {
  :deep(.el-input__inner) {
    width: 196px;
  }
}
.textarea {
  width: 678px;
}
</style>
