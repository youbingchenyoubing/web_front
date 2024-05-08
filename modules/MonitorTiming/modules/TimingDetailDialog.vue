<template>
  <el-dialog
    v-model="_show"
    title="任务详细"
    width="800px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <div class="dialog-content">
        <section class="item">
          <span class="label el-form-item__label">任务编号</span>
          <span class="content el-form-item__content">{{ detail.id }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">任务分组</span>
          <span class="content el-form-item__content">{{
            detail.jobGroup
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">任务名称</span>
          <span class="content el-form-item__content">{{
            detail.jobName
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">创建时间</span>
          <span class="content el-form-item__content">{{
            detail.createTime
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">cron表达式</span>
          <span class="content el-form-item__content">{{
            detail.cronExpression
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">下次执行时间</span>
          <span class="content el-form-item__content">{{
            detail.nextValidTime
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">任务状态</span>
          <span class="content el-form-item__content">{{ detail.status }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">是否并发</span>
          <span class="content el-form-item__content">{{
            detail.concurrent
          }}</span>
        </section>

        <section class="item">
          <span class="label el-form-item__label">执行策略</span>
          <span class="content el-form-item__content">{{
            detail.misfirePolicy
          }}</span>
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
import { ApiJobGet } from "../api"

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
      const enums = await this.resolveDictItemEnum([
        "system_misfire_policy",
        "system_task_status",
        "system_global_yesorno"
      ])
      const STATUS = buildVKEnum(enums.system_task_status)
      const POLICY = buildVKEnum(enums.system_misfire_policy)
      const YESORNO = buildVKEnum(enums.system_global_yesorno)

      const res = await ApiJobGet({ id: this.id })
      res.concurrent = YESORNO[res.concurrent]
      res.status = STATUS[res.status]
      res.misfirePolicy = POLICY[res.misfirePolicy]
      this.detail = res
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
  display: grid;
  grid-template-columns: 1fr 1fr;

  .item {
    display: flex;

    .label {
      width: 100px;
      font-weight: bold;
    }
  }
}
</style>
