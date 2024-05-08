<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="1000px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        :inline="true"
        :rules="rules"
        label-width="200px"
        class="form"
      >
        <el-form-item label="企业名称：" prop="companyId">
          <el-select
            v-model="form.companyId"
            filterable
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
          <div class="select" style="width: 400px" v-else>
            {{ getCompany(form.companyId) }}
          </div>
        </el-form-item>

        <!-- <el-form-item label="年度：" prop="year">
          <el-date-picker
            v-model="form.year"
            type="year"
            :editable="false"
            placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item> -->

        <el-form-item label="能耗月份：" prop="month">
          <el-date-picker
            v-model="form.month"
            :editable="false"
            type="date"
            placeholder="选择月"
            v-if="type != 4"
          >
          </el-date-picker>
          <div class="select" v-else>{{ form.month }}</div>
        </el-form-item>

        <el-form-item label="用电量（万千瓦时）：" prop="electricityAmount">
          <el-input
            class="input"
            v-model="form.electricityAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用电量'"
          />
        </el-form-item>
        <el-form-item label="用煤量（万吨）：" prop="coalAmount">
          <el-input
            class="input"
            v-model="form.coalAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用煤量'"
          />
        </el-form-item>
        <el-form-item label="用油量（万吨）：" prop="oilAmount">
          <el-input
            class="input"
            v-model="form.oilAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用油量'"
          />
        </el-form-item>
        <el-form-item label="用气量（万立方米）：" prop="gasAmount">
          <el-input
            class="input"
            v-model="form.gasAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用气量'"
          />
        </el-form-item>
        <el-form-item label="用水量（万吨）：" prop="waterAmount">
          <el-input
            class="input"
            v-model="form.waterAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用水量'"
          />
        </el-form-item>
        <el-form-item label="用水蒸气量（百万千焦）：" prop="steamAmount">
          <el-input
            class="input"
            v-model="form.steamAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入用水蒸气量'"
          />
        </el-form-item>
        <el-form-item label="其它（万吨）：" prop="otherAmount">
          <el-input
            class="input"
            v-model="form.otherAmount"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入其它'"
          />
        </el-form-item>

        <el-form-item label="产出能源量当量值：" prop="outputEquivalentValue">
          <el-input
            class="input"
            v-model="form.outputEquivalentValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入当量值'"
          />
        </el-form-item>

        <el-form-item
          label="产出能源量当等价值："
          prop="outputEquivalenceValue"
        >
          <el-input
            class="input"
            v-model="form.outputEquivalenceValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入当等价值'"
          />
        </el-form-item>
        <el-form-item
          label="综合能源消费总量等价值："
          prop="complexEquivalenceValue"
        >
          <el-input
            class="input"
            v-model="form.complexEquivalenceValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入总量等价值'"
          />
        </el-form-item>
        <el-form-item
          label="综合能源消费总量当量值："
          prop="complexEquivalentValue"
        >
          <el-input
            class="input"
            v-model="form.complexEquivalentValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入总量当量值'"
          />
        </el-form-item>
        <el-form-item label="产值/营业收入：" prop="outputValue">
          <el-input
            class="input"
            v-model="form.outputValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入产值/营业收入'"
          />
        </el-form-item>
        <el-form-item label="单位产值能耗等价值：" prop="unitEquivalenceValue">
          <el-input
            class="input"
            v-model="form.unitEquivalenceValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入单位产值能耗等价值'"
          />
        </el-form-item>
        <el-form-item label="单位产值能耗当量值：" prop="unitEquivalentValue">
          <el-input
            class="input"
            v-model="form.unitEquivalentValue"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入单位产值能耗当量值'"
          />
        </el-form-item>
        <el-form-item label="折标煤量：" prop="standardCoalVolume">
          <el-input
            class="input"
            v-model="form.standardCoalVolume"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入折标煤量'"
          />
        </el-form-item>
        <el-form-item label="碳排放量：" prop="carbonEmission">
          <el-input
            class="input"
            v-model="form.carbonEmission"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入碳排放量'"
          />
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :class="type === 4 ? 'detail' : ''"
            :placeholder="type === 4 ? '' : '请输入备注'"
            :maxlength="200"
            show-word-limit
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
        carbonEmission: 0,
        coalAmount: 0,
        companyId: "",
        complexEquivalenceValue: 0,
        complexEquivalentValue: 0,
        createName: "",
        electricityAmount: 0,
        gasAmount: 0,
        month: null,
        oilAmount: 0,
        otherAmount: 0,
        outputEquivalenceValue: 0,
        outputEquivalentValue: 0,
        outputValue: 0,
        remark: "",
        shortName: "",
        standardCoalVolume: 0,
        steamAmount: 0,
        unitEquivalenceValue: 0,
        unitEquivalentValue: 0,
        waterAmount: 0,
        year: 0
      },
      system_global_status: [],
      rules: {
        companyId: {
          required: true,
          message: "请选择企业名称",
          trigger: "change"
        },
        month: [
          { required: true, message: "请选择能耗月份", trigger: "change" }
        ]
      },
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
      return this.type === 1
        ? "企业能耗录入"
        : this.type === 4
        ? "企业能耗详情"
        : "修改企业能耗"
    }
  },
  mounted() {
    this.initCompany()
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async initCompany() {
      const { records } = await ApiCompanyGet({ current: 0, size: 200 })
      this.company = records.map(item => {
        var row = { value: item.id, label: item.name }
        return row
      })
    },
    getCompany(companyId) {
      if (companyId) {
        const company = this.company.filter(item => item.value == companyId)
        return company[0].label
      }
    },
    async init() {
      if ([2, 4].indexOf(this.type) > -1) {
        const res = await ApiPostGet({ id: this.ids[0] })
        Object.assign(this.form, {
          ...res,
          month: `${res.year}-${res.month}`
        })
      }
    },
    async invokeCreate() {
      var params = JSON.parse(JSON.stringify(this.form))
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
      delete params.createBy
      delete params.createTime
      delete params.updateTime
      delete params.updateBy
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
  }
}
</script>
<style lang="scss" scoped>
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
.input {
  :deep(.el-input__inner) {
    width: 194px;
  }
}
.textarea {
  width: 678px;
}
.select {
  width: 215px;
  padding: 1px 12px;
}
</style>
