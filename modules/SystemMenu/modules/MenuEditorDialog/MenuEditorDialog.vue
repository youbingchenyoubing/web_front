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
        :rules="formRules"
        label-width="100px"
        class="form"
      >
        <el-form-item label="上级菜单" prop="parentMenu">
          <el-tree-select
            v-model="form.parentMenu"
            :data="parentMenuTreeOptions.options"
            :props="parentMenuTreeOptions.props"
            :render-after-expand="false"
            :check-strictly="true"
            value-key="id"
          />
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input placeholder="请输入菜单名称" v-model="form.name" />
        </el-form-item>

        <el-form-item label="显示排序" prop="sort" class="inline">
          <el-input-number v-model="form.sort" :min="1" />
        </el-form-item>

        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <component :is="activeTab" ref="subFormItemRef" />
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
import TabDir from "./TabDir.vue"
import TabMenu from "./TabMenu.vue"
import TabButton from "./TabButton.vue"
import {
  ApiMenuAdd,
  ApiMenuGet,
  ApiMenuTree,
  ApiMenuUpdate
} from "@modules/SystemMenu/api"
import { ElMessage } from "element-plus"
export default {
  // type 1新增 2修改
  props: ["modelValue", "update", "type", "id"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        parentMenu: "",
        name: "",
        sort: 1,
        type: 0
      },
      formRules: {
        name: [
          { required: true, message: "菜单名称为必填项", trigger: "blur" }
        ],
        sort: [{ required: true, message: "显示顺序为必填项", trigger: "blur" }]
      },
      parentMenuTreeOptions: {
        options: [],
        props: { children: "children", label: "name" }
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
    dialogTitle() {
      return this.type === 0 ? "添加菜单" : "更改菜单"
    },
    activeTab() {
      return { 0: "TabDir", 1: "TabMenu", 2: "TabButton" }[this.form.type]
    },
    title() {
      return this.type === 1 ? "添加菜单" : "修改菜单"
    }
  },
  methods: {
    async init() {
      const res = await ApiMenuTree()
      this.parentMenuTreeOptions.options = [
        {
          id: "-1",
          name: "根目录",
          children: res
        }
      ]
      this.form.parentMenu = "-1"

      const { type, id } = this
      if (type === 2) {
        const res = await ApiMenuGet({ id })
        Object.assign(this.form, {
          parentMenu: res.parentId,
          name: res.name,
          sort: res.sort,
          type: res.type
        })
        await this.$nextTick()
        this.$refs.subFormItemRef.setValues({
          ...res,
          enabled: res.enabled.toString(),
          visible: res.visible.toString(),
          cache: res.cache.toString()
        })
      }
    },
    async invokeCreate() {
      const { parentMenu, name, sort, type } = this.form
      const { form } = this.$refs.subFormItemRef

      await ApiMenuAdd({
        parentId: parentMenu,
        type,
        name,
        sort,
        path: form.path,
        query: form.query ? form.query : "{}",
        component: form.component,
        cache: form.cache,
        visible: form.visible,
        enabled: form.enabled,
        perms: form.perms,
        icon: form.icon ? form.icon : "IconEmpty",
        remark: form.remark,
        redirect: form.redirect
      })
      ElMessage.success("添加菜单成功")
    },
    async invokeUpdate() {
      const { parentMenu, name, sort, type } = this.form
      const { form } = this.$refs.subFormItemRef

      await ApiMenuUpdate({
        id: this.id,
        parentId: parentMenu,
        type,
        name,
        sort,
        path: form.path,
        query: form.query ? form.query : "{}",
        component: form.component,
        cache: form.cache,
        visible: form.visible,
        enabled: form.enabled,
        perms: form.perms,
        icon: form.icon ? form.icon : "IconEmpty",
        remark: form.remark,
        redirect: form.redirect
      })
      ElMessage.success("修改菜单成功")
    },
    async onSubmit() {
      const { formRef, subFormItemRef } = this.$refs
      try {
        await formRef.validate()
        await subFormItemRef.validate()
      } catch {
        return
      }

      this.type === 1 ? await this.invokeCreate() : await this.invokeUpdate()
      this.$emit("onSubmit")
      this.onCancel()
    },
    onCancel() {
      const { formRef, subFormItemRef } = this.$refs
      formRef.resetFields()
      subFormItemRef.resetFields()
      this.show = false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        show && this.init()
      }
    }
  },
  components: { TabDir, TabMenu, TabButton }
}
</script>

<style lang="scss" scoped>
.form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }
}
</style>
