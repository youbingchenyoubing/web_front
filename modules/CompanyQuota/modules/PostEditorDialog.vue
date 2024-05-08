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

        <!-- <el-form-item label="月份：" prop="month">
          <el-date-picker
            v-model="form.month"
            type="month"
            placeholder="选择月"
            v-if="type != 4"
          >
          </el-date-picker>
          <div class="select" v-else>{{ form.month }}</div>
        </el-form-item> -->

        <el-form-item label="选择企业：" prop="companyId">
          <el-select
            v-model="form.companyId"
            placeholder="请选择"
            v-if="type != 4"
          >
            <el-option
              v-for="item in company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ form.shortName }}</div>
        </el-form-item>

        <el-form-item label="能耗类型：" prop="type">
          <el-select
            v-model="form.type"
            @change="chooseType"
            placeholder="请选择"
            v-if="type != 4"
          >
            <el-option
              v-for="item in energy_type"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            >
            </el-option>
          </el-select>
          <div class="select" v-else>{{ form.type }}</div>
        </el-form-item>

        <el-form-item label="能源配额：" prop="amount">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.amount"
            :placeholder="type === 4 ? '' : '请输入能源配额'"
          />
        </el-form-item>

        <el-form-item label="能源单位：" prop="unit">
          <el-input
            class="input"
            :class="type === 4 ? 'detail' : ''"
            v-model="form.unit"
            disabled="true"
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
import moment from "moment"
import { formatInputNumber } from "@share/helper/index.js"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiPostAdd, ApiPostGet, ApiPostUpdate, ApiCompanyGet } from "../api"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "ids"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        amount: "",
        companyId: "",
        createName: "",
        industry: "",
        month: null,
        remark: "",
        shortName: "",
        type: "",
        unit: "",
        year: null
      },
      system_global_status: [],
      rules: {
        year: [{ required: true, message: "请选择年度", trigger: "change" }],
        companyId: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择能耗类型", trigger: "change" }]
      },
      energy_type: [],
      company: []
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
  mounted() {
    this.initCompany()
    this.getEnergyType()
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async initCompany() {
      const { records } = await ApiCompanyGet({ current: 0, size: 200 })
      var company = records.filter(item => item.isQuota == 1)
      if (company)
        this.company = company.map(item => ({
          value: item.id,
          label: item.shortName
        }))
    },
    async getEnergyType() {
   
    },
    async init() {
      if ([2, 4].indexOf(this.type) > -1) {
        const res = await ApiPostGet({ id: this.ids[0] })
        Object.assign(this.form, { ...res, year: `${res.year}` })
      }
    },
    async invokeCreate() {
      var params = JSON.parse(JSON.stringify(this.form))
      if (this.form.year) {
        var year = moment(this.form.year).format("YYYY")
        params.year = year
      }
      if (this.form.companyId) {
        params.shortName = this.company.find(
          item => item.value == this.form.companyId
        ).label
      }
      delete params.id
      delete params.createTime
      delete params.createBy
      delete params.updateTime
      delete params.updateBy
      await ApiPostAdd(params)
      ElMessage.success("创建企业能耗配额成功")
    },
    async invokeUpdate(id) {
      var params = JSON.parse(JSON.stringify(this.form))
      if (this.form.year) {
        var year = moment(this.form.year).format("YYYY")
        params.year = year
      }
      if (this.form.companyId) {
        params.shortName = this.company.find(
          item => item.value == this.form.companyId
        ).label
      }
      params.id = id
      delete params.createTime
      delete params.createBy
      delete params.updateTime
      delete params.updateBy
      await ApiPostUpdate(params)
      ElMessage.success("修改企业能耗配额成功")
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
    chooseType(e) {
      if ("电" == e) {
        this.form.unit = "万千瓦时"
      } else if ("煤" == e) {
        this.form.unit = "万吨"
      } else if ("油" == e) {
        this.form.unit = "万吨"
      } else if ("气" == e) {
        this.form.unit = "万立方米"
      } else if ("水" == e) {
        this.form.unit = "万吨"
      } else if ("水蒸气" == e) {
        this.form.unit = "百万千焦"
      } else {
        this.form.unit = "万吨"
      }
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
  padding: 1px 12px;
}
</style>
