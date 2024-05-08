<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="510px"
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
        <el-form-item label="文件上传：" prop="url">
          <div style="position: relative">
            <el-upload
              action
              style="width: 300px"
              class="upload"
              ref="upload"
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
            <div class="link">
              <a target="_blank" href="/template.xlsx">模板下载</a>
            </div>
          </div>
        </el-form-item>

        <!-- <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :maxlength="200"
            show-word-limit
            class="textarea"
          />
        </el-form-item> -->
      </el-form>
    </template>

    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
import { formatInputNumber } from "@share/helper/index.js"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiUploadFile } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        url: "",
        remark: ""
      },
      system_global_status: [],
      rules: {
        url: [{ required: true, message: "", trigger: "blur" }]
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
      return "企业能耗导入"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      this.resolveDictItemEnum(["system_global_status"]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, { enabled: res.system_global_status[0].v })
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    async importHandle({ file }) {
      const res = await ApiUploadFile({ file })
      this.$emit("init")
      ElMessage.success("上传成功")
      var _this = this
      setTimeout(function () {
        _this.onCancel()
      }, 2000)
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
<style scoped>
.upload {
  margin-bottom: 10px;
}
.upload-btn {
  display: flex;
  align-items: center;
}
.link {
  margin-left: 50px;
  margin-bottom: 20px;
  color: #207cff;
  position: absolute;
  top: 0;
  right: 40px;
}
.textarea {
  width: 300px;
}
</style>
