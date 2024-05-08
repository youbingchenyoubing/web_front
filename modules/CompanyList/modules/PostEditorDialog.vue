<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="780px"
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
        <el-form-item label="企业全名：" prop="name">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.name"
            :placeholder="type === 4 ? '' : '请输入企业全名'"
          />
        </el-form-item>

        <el-form-item label="企业简称：" prop="shortName">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.shortName"
            :placeholder="type === 4 ? '' : '请输入企业简称'"
          />
        </el-form-item>

        <el-form-item label="机构代码：" prop="institutionCode">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.institutionCode"
            :placeholder="type === 4 ? '' : '请输入机构代码'"
          />
        </el-form-item>

        <el-form-item label="税务代码：" prop="taxCode">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.taxCode"
            :placeholder="type === 4 ? '' : '请输入税务代码'"
          />
        </el-form-item>

        <el-form-item label="所属行业：" prop="industry">
          <el-select
            v-model="form.industry"
            placeholder="请选择"
            v-if="type != 4"
          >
            <el-option
              v-for="item in industrys"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ industryFormat(form.industry) }}</div>
        </el-form-item>

        <el-form-item label="企业类型：" prop="type">
          <el-select v-model="form.type" placeholder="请选择" v-if="type != 4">
            <el-option
              v-for="item in company_type"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ typeFormat(form.type) }}</div>
        </el-form-item>

        <el-form-item label="法人代表：" prop="legalPerson">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.legalPerson"
            :placeholder="type === 4 ? '' : '请输入法人代表'"
          />
        </el-form-item>

        <el-form-item label="行政区域：" prop="area">
          <el-select v-model="form.area" placeholder="请选择" v-if="type != 4">
            <el-option
              v-for="item in system_area"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ areaFormat(form.area) }}</div>
        </el-form-item>

        <el-form-item label="联系人：" prop="contactPerson">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.contactPerson"
            :placeholder="type === 4 ? '' : '请输入联系人'"
          />
        </el-form-item>

        <el-form-item label="联系电话：" prop="contactPhone">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.contactPhone"
            :placeholder="type === 4 ? '' : '请输入联系电话'"
          />
        </el-form-item>

        <el-form-item label="注册资本：" prop="registeredCapital">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.registeredCapital"
            :placeholder="type === 4 ? '' : '请输入注册资本'"
          />
        </el-form-item>

        <el-form-item label="注册日期：" prop="registeredDate">
          <el-date-picker
            v-model="form.registeredDate"
            type="date"
            placeholder="选择日期"
            v-if="type != 4"
          >
          </el-date-picker>
          <div class="select" v-else>{{ form.registeredDate }}</div>
        </el-form-item>

        <el-form-item label="注册地址：" prop="registeredAddress">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.registeredAddress"
            :placeholder="type === 4 ? '' : '请输入注册地址'"
          />
        </el-form-item>

        <el-form-item label="企业状态：" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            :disabled="type === 4"
            v-if="type != 4"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ statusFormat(form.status) }}</div>
        </el-form-item>

        <el-form-item label="详细地址：" prop="address">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.address"
            :placeholder="type === 4 ? '' : '请输入详细地址'"
          />
        </el-form-item>

        <el-form-item label="经营范围：" prop="businessScope">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.businessScope"
            :placeholder="type === 4 ? '' : '请输入经营范围'"
          />
        </el-form-item>

        <el-form-item label="是否限额：" prop="isQuota">
          <el-radio-group
            v-model="form.isQuota"
            :disabled="type === 4"
            v-if="type != 4"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <div class="select" v-else>{{ form.isQuota ? "是" : "否" }}</div>
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
import moment from "moment"
import { formatInputNumber } from "@share/helper/index.js"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiPostAdd, ApiPostGet, ApiPostUpdate } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: [
    "modelValue",
    "type",
    "ids",
  ],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        address: "",
        area: "",
        businessScope: "",
        contactPerson: "",
        contactPhone: "",
        createName: "",
        institutionCode: "",
        legalPerson: "",
        name: "",
        registeredAddress: "",
        registeredCapital: "",
        registeredDate: "",
        remark: "",
        shortName: "",
        status: "",
        taxCode: "",
        type: "",
        isQuota: 0
      },
      system_global_status: [],
      rules: {
        name: [
          { required: true, message: "企业名称为必填项", trigger: "blur" },
          { min: 1, message: "企业名称为必填项", trigger: "blur" }
        ],
        shortName: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入企业类型", trigger: "blur" }
        ],
      },
      statusOptions: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "异常"
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
        ? "企业详情"
        : this.type === 1
        ? "新增企业"
        : "修改企业"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    industryFormat(val) {
      let type = ""
      this.industrys.forEach(item => {
        if (val == item.v) {
          type = item.k
        }
      })
      return type
    },
    typeFormat(val) {
      let type = ""
      this.company_type.forEach(item => {
        if (val == item.v) {
          type = item.k
        }
      })
      return type
    },
    areaFormat(val) {
      let type = ""
      this.system_area.forEach(item => {
        if (val == item.v) {
          type = item.k
        }
      })
      return type
    },
    statusFormat(val) {
      let type = ""
      this.statusOptions.forEach(item => {
        if (val == item.value) {
          type = item.label
        }
      })
      return type
    },
    async init() {
      if ([2, 4].indexOf(this.type) > -1) {
        const res = await ApiPostGet({ id: this.ids[0] })
        if (res.registeredDate)
          res.registeredDate = moment(res.registeredDate).format("YYYY-MM-DD")
        Object.assign(this.form, { ...res })
      }
    },
    async invokeCreate() {
      var params = JSON.parse(JSON.stringify(this.form))
      delete params.id
      if (this.form.registeredDate)
        params.registeredDate = moment(this.form.registeredDate).format(
          "YYYY-MM-DD"
        )
      delete params.createBy
      delete params.createTime
      delete params.updateTime
      delete params.updateBy
      await ApiPostAdd(params)
      ElMessage.success("创建企业能耗成功")
    },
    async invokeUpdate(id) {
      var params = JSON.parse(JSON.stringify(this.form))
      params.id = id
      if (this.form.registeredDate)
        params.registeredDate = moment(this.form.registeredDate).format(
          "YYYY-MM-DD"
        )
      delete params.createBy
      delete params.createTime
      delete params.updateTime
      delete params.updateBy
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
  },
  created() {}
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
  width: 218px;
  padding: 1px 11px;
}
</style>
