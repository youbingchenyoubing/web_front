<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="762px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        :inline="true"
        :rules="type === 4 ? '' : rules"
        label-width="100px"
        class="form"
      >
        <el-form-item label="年度：" prop="year">
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="选择年"
            v-if="type != 4"
          >
          </el-date-picker>
          <div class="select" v-else>{{ form.year }}</div>
        </el-form-item>

        <el-form-item label="月份：" prop="month">
          <el-date-picker
            v-model="form.month"
            type="month"
            placeholder="选择月"
            v-if="type != 4"
          >
          </el-date-picker>
          <div class="select" v-else>{{ form.month }}</div>
        </el-form-item>

        <el-form-item label="选择企业：" prop="companyId">
          <el-select
            v-model="form.companyId"
            placeholder="请选择"
            v-if="type != 4"
          >
            <el-option
              v-for="item in companyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ form.cate }}</div>
        </el-form-item>

        <el-form-item label="能耗类型：" prop="program">
          <el-select
            v-model="form.program"
            placeholder="请选择"
            v-if="type != 4"
          >
            <el-option
              v-for="item in programs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ form.cate }}</div>
        </el-form-item>

        <el-form-item label="能源配额：" prop="name1">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.name1"
            :placeholder="type === 4 ? '' : '请输入能源配额'"
          />
        </el-form-item>

        <el-form-item label="能源单位：" prop="name2">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.name2"
            :placeholder="type === 4 ? '' : '请输入能源单位'"
          />
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :placeholder="type === 4 ? '' : '请输入备注'"
            :maxlength="200"
            show-word-limit
            :class="type === 4 ? 'detail' : ''"
            class="textarea"
          />
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">{{
          type == 4 ? "关闭" : "取消"
        }}</el-button>
        <el-button type="primary" v-if="type != 4" @click="onSubmit">
          确认
        </el-button>
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
        name: [
          { required: true, message: "企业名称为必填项", trigger: "blur" },
          { min: 1, message: "企业名称为必填项", trigger: "blur" }
        ],
        year: [{ required: true, message: "请选择年度", trigger: "blur" }]
      },
      programs: [
        {
          value: "水",
          label: "水"
        },
        {
          value: "电",
          label: "电"
        },
        {
          value: "天然气",
          label: "天然气"
        }
      ],
      companyList: [
        {
          value: "北京华正养老",
          label: "北京华正养老"
        },
        {
          value: "中金汇理商业",
          label: "中金汇理商业"
        }
      ]
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
      return this.type === 4
        ? "配额详情"
        : this.type === 1
        ? "新增配额"
        : "修改配额"
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
      ElMessage.success("创建企业能耗成功")
    },
    async invokeUpdate(id) {
      const { postName, postCode, sort, enabled, remark } = this.form
      await ApiPostUpdate({ id, postName, postCode, sort, enabled, remark })
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
    width: 202px;
  }
}
.detail {
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border: 0;
    cursor: default;
    .el-input__inner {
      border: 0;
      cursor: default !important;
    }
  }
  :deep(.el-textarea__inner) {
    box-shadow: none;
    border: 0;
    cursor: default;
  }
  :deep(.el-input__count) {
    display: none;
  }
}
.textarea {
  width: 580px;
}
.select {
  width: 225px;
}
</style>
