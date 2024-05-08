<template>
  <el-dialog
    v-model="show"
    title="操作日志详情"
    width="650px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <section class="block-item">
        <div class="label">操作模块</div>
        <div>{{ detail.title }}</div>
      </section>

      <section class="block-item">
        <div class="label">请求地址</div>
        <div>{{ detail.operUrl }}</div>
      </section>

      <section class="block-item">
        <div class="label">操作信息</div>
        <div>{{ loginInfo }}</div>
      </section>

      <section class="block-item">
        <div class="label">请求方式</div>
        <div>{{ detail.requestMethod }}</div>
      </section>

      <section class="block-item">
        <div class="label">请求参数</div>
        <code>
          {{ detail.operParam ? detail.operParam.trim() : detail.operParam }}
        </code>
      </section>

      <section class="block-item">
        <div class="label">操作状态</div>
        <div>{{ detail.status }}</div>
      </section>

      <section class="block-item">
        <div class="label">操作时间</div>
        <div>{{ detail.operTime }}</div>
      </section>

      <section class="block-item block">
        <div class="label">响应数据</div>
        <JSON :code="detail.jsonResult" />
      </section>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import { ApiOperateGet } from "../api"
import JSON from "@components/JSON.vue"

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue"],
  data() {
    return {
      detail: {}
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
    loginInfo() {
      const { operName, operIp, operLocation } = this.detail
      return [operName, operIp, operLocation].filter(Boolean).join(" / ")
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum(["system_global_expstatus"])
      const EXPSTATUS = buildVKEnum(enums.system_global_expstatus)
      const res = await ApiOperateGet({ id: this.id })
      Object.assign(this.detail, { ...res, status: EXPSTATUS[res.status] })
    },
    /* --------------  -------------- */
    onCancel() {
      this.show = false
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
  },
  components: { JSON }
}
</script>

<style lang="scss" scoped>
.block-item {
  display: inline-flex;
  align-items: flex-start;
  gap: 1rem;
  min-width: 50%;
  margin-bottom: 1rem;

  .json {
    white-space: pre;
  }

  .label {
    flex-shrink: 0;
    width: 80px;
    font-weight: bold;
    text-align: right;
    color: #606266;

    &::after {
      content: ":";
    }
  }
}

.block {
  display: flex;
}
</style>
