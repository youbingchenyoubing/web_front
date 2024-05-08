<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="800px"
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
        <el-form-item label="任务名称" prop="jobName" class="inline">
          <el-input v-model="form.jobName" placeholder="请输入任务名称" />
        </el-form-item>

        <el-form-item label="任务分组" prop="jobGroup" class="inline">
          <el-select
            placeholder="请选择任务组名"
            clearable
            v-model="form.jobGroup"
          >
            <el-option
              v-for="item in system_global_taskgroup"
              :key="item.k"
              :label="item.k"
              :value="item.k"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="调用方法" prop="invokeTarget">
          <template #label>
            <div>
              <span>调用方法</span>
              <el-tooltip placement="top" effect="dark">
                <template #content>
                  <p>Bean调用示例：ryTask.ryParams('ry')</p>
                  <p>
                    Class类调用示例：com.xx.quartz.task.RyTask.ryParams('ry')
                  </p>
                  <p>参数说明：支持字符串，布尔类型，长整型，浮点型，整型</p>
                </template>
                <el-icon class="l-4"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-input
            v-model="form.invokeTarget"
            placeholder="请输入调用方法(必须cn.xuexiluxian.open开头)"
          />
        </el-form-item>

        <el-form-item label="cron表达式" prop="cronExpression">
          <el-input
            v-model="form.cronExpression"
            placeholder="请输入cron表达式"
          >
            <template #append>
              <el-button @click="cronBox.show = true">生成cron表达式</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="执行策略" prop="misfirePolicy">
          <el-radio-group v-model="form.misfirePolicy">
            <el-radio
              v-for="item in system_misfire_policy"
              :key="item.v"
              :label="item.v"
            >
              {{ item.k }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否并发" prop="concurrent" class="inline">
          <el-radio-group v-model="form.concurrent">
            <el-radio
              v-for="item in system_global_yesorno"
              :key="item.v"
              :label="item.v"
            >
              {{ item.k }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status" class="inline">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="item in system_task_status"
              :key="item.v"
              :label="item.v"
            >
              {{ item.k }}
            </el-radio>
          </el-radio-group>
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

  <el-dialog title="Cron表达式生成器" v-model="cronBox.show">
    <crontab
      @hide="cronBox.show = false"
      @fill="form.cronExpression = $event"
      :expression="form.cronExpression"
    ></crontab>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus"
import { ApiJobAdd, ApiJobGet, ApiJobUpdate } from "../api"
import Crontab from "@components/Crontab/index.vue"
import { mapActions } from "pinia"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "type", "id"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        jobName: "",
        jobGroup: "",
        invokeTarget: "",
        cronExpression: "",
        misfirePolicy: "",
        concurrent: 1,
        status: 0
      },
      rules: {
        jobName: [
          { required: true, message: "任务名称为必填项", trigger: "blur" }
        ],
        invokeTarget: [
          { required: true, message: "调用方法为必填项", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "corn表达式为必填项", trigger: "blur" }
        ]
      },
      system_misfire_policy: [],
      system_task_status: [],
      system_global_yesorno: [],
      system_global_taskgroup: [],
      cronBox: {
        show: false
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
      return this.type === 1 ? "添加任务" : "修改任务"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      this.resolveDictItemEnum([
        "system_misfire_policy",
        "system_task_status",
        "system_global_yesorno",
        "system_global_taskgroup"
      ]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, {
          misfirePolicy: res.system_misfire_policy[0].v,
          status: res.system_task_status[0].v,
          concurrent: res.system_global_yesorno[0].v
        })
      })

      const { type, id } = this
      if (type === 2) {
        const res = await ApiJobGet({ id })
        Object.assign(this.form, {
          ...res,
          status: res.status.toString(),
          concurrent: res.concurrent.toString(),
          misfirePolicy: res.misfirePolicy.toString()
        })
      }
    },
    async invokeCreate() {
      const {
        jobName,
        jobGroup,
        invokeTarget,
        cronExpression,
        misfirePolicy,
        concurrent,
        status
      } = this.form
      await ApiJobAdd({
        jobName,
        jobGroup,
        invokeTarget,
        cronExpression,
        misfirePolicy,
        concurrent,
        status
      })
      ElMessage.success("添加任务成功")
    },
    async invokeUpdate() {
      const {
        jobName,
        jobGroup,
        invokeTarget,
        cronExpression,
        misfirePolicy,
        concurrent,
        status
      } = this.form
      await ApiJobUpdate({
        id: this.id,
        jobName,
        jobGroup,
        invokeTarget,
        cronExpression,
        misfirePolicy,
        concurrent,
        status
      })
      ElMessage.success("修改任务成功")
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
        await this.invokeUpdate()
      } else {
        return console.error(
          "TimingEditorDialog->onSubmit: 未知的操作类型 " + type
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
  },
  components: { Crontab }
}
</script>

<style lang="scss" scoped>
.form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }

  .l-4 {
    margin-left: 4px;
  }
}
</style>
