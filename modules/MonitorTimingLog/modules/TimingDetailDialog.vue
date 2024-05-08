<template>
  <el-dialog
    v-model="_show"
    title="调度日志详情"
    width="800px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <div class="dialog-content">
        <section class="item">
          <span class="item-label el-form-item__label">任务ID</span>
          <span class="content el-form-item__content">{{ detail.id }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">任务分组</span>
          <span class="content el-form-item__content">{{
            detail.jobGroup
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">任务名称</span>
          <span class="content el-form-item__content">{{
            detail.jobName
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">调用字符串</span>
          <span class="content el-form-item__content">{{
            detail.invokeTarget
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">日志消息</span>
          <span class="content el-form-item__content">{{
            detail.jobMessage
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">执行状态</span>
          <span class="content el-form-item__content">{{ detail.status }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">开始时间</span>
          <span class="content el-form-item__content">{{
            detail.startTime
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">结束时间</span>
          <span class="content el-form-item__content">{{
            detail.stopTime
          }}</span>
        </section>

        <section class="item">
          <span class="item-label el-form-item__label">创建时间</span>
          <span class="content el-form-item__content">{{
            detail.createTime
          }}</span>
        </section>

        <section class="item item-code">
          <span class="item-label el-form-item__label">异常信息</span>
          <span class="content el-form-item__content">
            <code>
              {{ detail.exceptionInfo }}
            </code>
          </span>
        </section>
      </div>
    </template>

    <template #footer>
      <el-button @click="onCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import { ApiTaskLoggerGet } from "../api"

export default {
  props: ["show", "id"],
  emits: ["update:show"],
  data() {
    return {
      detail: {}
    }
  },
  computed: {
    _show: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit("update:show", value)
      }
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum(["system_global_expstatus"])
      const EXPSTATUS = buildVKEnum(enums.system_global_expstatus)
      const res = await ApiTaskLoggerGet({ id: this.id })
      Object.assign(this.detail, { ...res, status: EXPSTATUS[res.status] })
    },
    onCancel() {
      this._show = false
      this.detail = {}
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

<style lang="scss" scoped>
.dialog-content {
  .item {
    display: inline-flex;
    align-items: flex-start;
    width: 50%;
  }

  .item-label {
    width: 100px;
    font-weight: bold;
  }

  .item-code {
    width: 100%;
    white-space: pre-wrap;

    code {
      padding: 4px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  }
}
</style>
