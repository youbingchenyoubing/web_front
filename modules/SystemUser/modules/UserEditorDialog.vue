<template>
  <el-dialog
    v-model="_show"
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
        label-width="90px"
        class="user-editor-form"
      >
        <el-form-item label="用户名称" prop="username" class="inline">
          <el-input
            v-model="form.username"
            :maxlength="16"
            show-word-limit
            placeholder="请输入用户名称"
          />
        </el-form-item>

        <el-form-item
          v-if="type !== 2"
          label="密码"
          prop="password"
          class="inline"
        >
          <el-input
            v-model="form.password"
            :maxlength="30"
            :minlength="12"
            show-word-limit
            show-password
            placeholder="请输入用户密码"
          />
        </el-form-item>

        <el-form-item label="真实姓名" prop="realName" class="inline">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email" class="inline">
          <el-input v-model="form.email" placeholder="请输入用户邮箱" />
        </el-form-item>

        <el-form-item label="性别" prop="gender" class="inline">
          <el-select v-model="form.gender" placeholder="请选择用户性别">
            <el-option
              v-for="item in system_global_gender"
              :key="item.v"
              :label="item.k"
              :value="item.v"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone" class="inline">
          <el-input
            v-model="form.phone"
            placeholder="请输入用户手机号码"
            :oninput="formatInputNumber"
          />
        </el-form-item>

        <el-form-item label="账号状态" prop="enabled" class="inline">
          <el-radio-group v-model="form.enabled" class="ml-4">
            <el-radio
              v-for="item in system_global_status"
              :key="item.v"
              :label="item.v"
              >{{ item.k }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="所属机构" prop="unitId" class="inline">
          <el-tree-select
            v-model="form.unitId"
            placeholder="请选择所属机构"
            :render-after-expand="false"
            :data="unitTree"
            :props="{ label: 'name' }"
            :check-strictly="true"
            :auto-expand-parent="true"
            :default-expand-all="true"
            node-key="id"
          />
        </el-form-item>

        <el-form-item label="所属岗位" prop="postIds" class="inline">
          <el-tree-select
            v-model="form.postIds"
            placeholder="请选择所属岗位"
            :render-after-expand="false"
            :data="postTree"
            :props="{ label: 'postName' }"
            :auto-expand-parent="true"
            :default-expand-all="true"
            node-key="id"
            show-checkbox
            multiple
          />
        </el-form-item>

        <el-form-item label="分配角色" prop="roleIds" class="inline">
          <el-tree-select
            v-model="form.roleIds"
            placeholder="请选择分配角色"
            :render-after-expand="false"
            :data="roleTree"
            :props="{ label: 'roleName' }"
            :auto-expand-parent="true"
            :default-expand-all="true"
            node-key="id"
            show-checkbox
            multiple
          />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入用户备注"
            :maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ApiUnitTree } from "@modules/SystemDepartment/api"
import { ApiPostAll } from "@modules/SystemPost/api"
import { ApiRoleAll } from "@modules/SystemRole/api"
import { ElMessage } from "element-plus"
import { ApiUserAdd, ApiUserGet, ApiUserUpdate } from "../api"
import { formatInputNumber } from "@share/helper/index.js"
import { mapActions } from "pinia"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import {
  REG_CHINA_CHAR,
  REG_EMAIL,
  REG_PHONE,
  REG_PWD_WORD
} from "@constants/regexp"

export default {
  props: ["show", "type", "id"],
  emits: ["onSubmit", "update:show"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        phone: "",
        realName: "",
        gender: "",
        enabled: "",
        remark: "",
        email: "",
        roleIds: [],
        postIds: [],
        unitId: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名称为必填项", trigger: "blur" },
          {
            message: "用户名称必须以字母开头",
            trigger: "blur",
            validator: (_, value) => /^[a-z]/.test(value)
          },
          {
            message: "用户名称长度需要,大于等于12 && 小于等于16",
            trigger: "blur",
            validator: (_, value) => 12 <= value.length && value.length <= 16
          },
          {
            message: "用户名称不能出现汉字",
            trigger: "blur",
            validator: (_, value) => !REG_CHINA_CHAR.test(value)
          }
        ],
        password: [
          { required: true, message: "用户密码为必填项", trigger: "blur" },
          {
            message: "用户密码长度需要,大于等于8 && 小于等于30",
            trigger: "blur",
            validator: (_, value) => 8 <= value.length && value.length <= 30
          },
          {
            message: "设置密码需要同时包含大写小写数字特殊符号",
            trigger: "blur",
            validator: (_, value) => REG_PWD_WORD.test(value)
          }
        ],
        realName: [
          { required: true, message: "真实姓名为必填项", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号为必填项", trigger: "blur" },
          {
            message: "输入的不是合法手机号",
            trigger: "blur",
            validator: (_, value) => REG_PHONE.test(value)
          }
        ],
        roleIds: [
          { required: true, message: "请至少选择一项", trigger: "blur" },
          {
            message: "请至少选择一项",
            trigger: "change",
            validator: (_, value) => value.length !== 0
          }
        ],
        postIds: [
          { required: true, message: "请至少选择一项", trigger: "blur" },
          {
            message: "请至少选择一项",
            trigger: "change",
            validator: (_, value) => value.length !== 0
          }
        ],
        unitId: [
          { required: true, message: "请至少选择一项", trigger: "blur" }
        ],
        email: [
          {
            message: "邮箱格式不对",
            trigger: "blur",
            validator: (_, value) => {
              return value.length > 0 ? REG_EMAIL.test(value) : true
            }
          }
        ]
      },
      roleTree: [],
      postTree: [],
      unitTree: [],
      /* --------------  -------------- */
      system_global_status: [],
      system_global_gender: []
    }
  },
  computed: {
    title() {
      return this.type === 1 ? "添加用户" : "修改用户"
    },
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
    init() {
      Promise.all([
        ApiPostAll().then(res => (this.postTree = res)),
        ApiRoleAll().then(res => (this.roleTree = res)),
        ApiUnitTree().then(res => (this.unitTree = res))
      ])
        .then(() => this.$nextTick())
        .then(async () => {
          const { type, id } = this
          if (type === 2) {
            const { user, postIds, roleIds, unitId } = await ApiUserGet({
              id
            })
            Object.assign(this.form, {
              username: user.username,
              password: user.password,
              phone: user.phone,
              realName: user.realName,
              gender: user.gender.toString(),
              enabled: user.enabled.toString(),
              remark: user.remark,
              email: user.email,
              roleIds,
              postIds,
              unitId: user.unitId
            })
          }
        })

      this.resolveDictItemEnum([
        "system_global_status",
        "system_global_gender"
      ]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, {
          gender: res.system_global_gender[0].v,
          enabled: res.system_global_status[0].v
        })
      })
    },
    async invokeCreate() {
      await ApiUserAdd(this.form)
      ElMessage.success("添加用户成功")
    },
    async invokeUpdate() {
      const { id, form } = this
      const {
        username,
        phone,
        realName,
        gender,
        enabled,
        remark,
        email,
        roleIds,
        postIds,
        unitId
      } = form
      await ApiUserUpdate({
        id,
        username,
        phone,
        realName,
        gender,
        enabled,
        remark,
        email,
        roleIds,
        postIds,
        unitId
      })
      ElMessage.success("修改用户成功")
    },
    /* --------------  -------------- */
    async onSubmit() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      this.type === 1 ? await this.invokeCreate() : await this.invokeUpdate()
      this.onCancel()
      this.$emit("onSubmit")
    },
    /* --------------  -------------- */
    onCancel() {
      this._show = false
      this.roleTree = []
      this.postTree = []
      this.unitTree = []

      const { formRef } = this.$refs
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
.user-editor-form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }

  .treeList {
    padding: 2px;
    width: 100%;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
  }
}
</style>
