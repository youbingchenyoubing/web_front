<template>
  <el-dialog
    v-model="_show"
    :title="title"
    width="600px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="90px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="form.roleName" />
        </el-form-item>

        <el-form-item label="角色编码" prop="rolePerm">
          <el-input placeholder="请输入角色编码" v-model="form.rolePerm" />
        </el-form-item>

        <el-form-item label="状态" prop="enabled">
          <el-radio-group v-model="form.enabled">
            <el-radio
              v-for="item in system_global_status"
              :key="item.v"
              :label="item.v"
            >
              {{ item.k }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单权限">
          <div class="item-menu">
            <el-checkbox
              v-model="permission.openAll"
              @change="toggleTreeCollapse"
            >
              展开/折叠
            </el-checkbox>
            <el-checkbox
              v-model="permission.selectAll"
              @change="toggleTreeChecked"
            >
              全选/全不选
            </el-checkbox>
            <el-checkbox v-model="permission.linkage">
              父子(联动/不联动)
            </el-checkbox>
            <el-tree
              ref="menuTreeRef"
              :data="permission.treeList"
              :props="permission.treeProps"
              :check-strictly="!permission.linkage"
              :default-expand-all="permission.openAll"
              show-checkbox
              default-expand-all
              node-key="id"
              class="tree"
            />
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="descript">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.descript"
            :maxlength="200"
            show-word-limit
          />
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
</template>

<script>
import { ApiMenuPage } from "@modules/SystemMenu/api"
import { normalizeMenuList } from "@modules/SystemMenu/helper"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { ApiAddRole, ApiDetailRole, ApiUpdateRole } from "../api"

export default {
  props: ["show", "type", "id"],
  emits: ["update:show", "onSubmit"],
  data() {
    return {
      permission: {
        openAll: false,
        selectAll: false,
        linkage: false,
        treeList: [],
        treeProps: {
          label: "name"
        }
      },
      form: {
        roleName: "",
        rolePerm: "",
        enabled: 1,
        descript: ""
      },
      formRules: {
        roleName: [
          { required: true, message: "请填写角色名称", trigger: "blur" }
        ],
        rolePerm: [
          { required: true, message: "请填写角色编码", trigger: "blur" }
        ]
      },
      system_global_status: []
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
    },
    title() {
      return this.type === 1 ? "添加角色" : "修改角色"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    init() {
      ApiMenuPage({ current: 1, size: 1000 }).then(res => {
        this.permission.treeList = normalizeMenuList(res.records)
      })

      this.resolveDictItemEnum(["system_global_status"]).then(res => {
        Object.assign(this, res)
        this.form.enabled = res.system_global_status[0].v
      })

      const { type, id } = this
      if (type === 2) {
        ApiDetailRole({ id }).then(async userDetail => {
          Object.assign(this.form, {
            roleName: userDetail.role.roleName,
            rolePerm: userDetail.role.rolePerm,
            enabled: userDetail.role.enabled.toString(),
            descript: userDetail.role.descript ?? ""
          })

          await this.$nextTick()
          const { menuTreeRef } = this.$refs
          menuTreeRef.setCheckedKeys(userDetail.permissions)
        })
      }
    },
    async invokeCreate() {
      const { menuTreeRef } = this.$refs
      const { roleName, rolePerm, enabled, descript } = this.form
      const params = {
        roleName,
        rolePerm,
        enabled,
        descript,
        permissionIds: [
          ...menuTreeRef.getHalfCheckedKeys(),
          ...menuTreeRef.getCheckedKeys()
        ]
      }
      await ApiAddRole(params)
      ElMessage.success("新增用户成功")
    },
    async invokeUpdate() {
      const { menuTreeRef } = this.$refs
      const { roleName, rolePerm, enabled, descript } = this.form
      const { id } = this
      await ApiUpdateRole({
        id,
        roleName,
        rolePerm,
        enabled,
        descript,
        permissionIds: [
          ...menuTreeRef.getHalfCheckedKeys(),
          ...menuTreeRef.getCheckedKeys()
        ]
      })
      ElMessage.success(`修改用户成功`)
    },
    /* --------------  -------------- */
    async onSubmit() {
      try {
        const { formRef, menuTreeRef } = this.$refs
        await formRef.validate()

        if (menuTreeRef.getCheckedNodes().length === 0) {
          return ElMessage.error("权限列表请至少选择一项")
        }
      } catch {
        return
      }

      this.type === 1 ? await this.invokeCreate() : await this.invokeUpdate()
      this.$emit("onSubmit", null)
      this.onCancel()
    },
    onCancel() {
      this._show = false
      this.$refs.formRef.resetFields()
      this.permission.openAll = false
      this.permission.selectAll = false
      this.permission.linkage = true
      this.toggleTreeChecked(false)
      this.toggleTreeCollapse(false)
    },
    /* --------------  -------------- */
    toggleTreeChecked(value) {
      const { menuTreeRef } = this.$refs
      this.permission.linkage
        ? this.permission.treeList.forEach(item => {
            menuTreeRef.setChecked(item, value, true)
          })
        : menuTreeRef.setCheckedKeys(value ? this.resolveTreeListKeys() : [])
    },
    resolveTreeListKeys(list) {
      list = list ?? this.permission.treeList
      return list
        .map(item => {
          return [
            item.id,
            ...(item.children ? this.resolveTreeListKeys(item.children) : [])
          ]
        })
        .flat()
    },
    toggleTreeCollapse(value) {
      const nodesMap = this.$refs.menuTreeRef.store.nodesMap
      Object.keys(nodesMap).forEach(key => (nodesMap[key].expanded = value))
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
.item-menu {
  width: 100%;

  .tree {
    margin-top: 0.5rem;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
</style>
