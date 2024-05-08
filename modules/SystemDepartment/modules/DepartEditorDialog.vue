<template>
  <el-dialog
    v-model="show"
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
        :rules="rules"
        label-width="90px"
        class="form"
      >
        <el-form-item label="上级机构" prop="parentDepart">
          <el-tree-select
            v-model="form.parentDepart"
            :data="parentDepartTreeOptions.options"
            :props="parentDepartTreeOptions.props"
            :render-after-expand="false"
            :check-strictly="true"
            ref="parentDepartTreeRef"
            value-key="id"
            node-key="id"
            placeholder="请选择上级部门"
          />
        </el-form-item>

        <el-form-item label="部门名称" prop="name" class="inline">
          <el-input placeholder="请输入部门名称" v-model="form.name" />
        </el-form-item>

        <el-form-item label="部门领导" prop="leaderId" class="inline">
          <el-input placeholder="请选择该部门领导" :value="leaderName" disabled>
            <template #append>
              <el-button @click="onUserSelectChange">
                <el-icon><Search /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="联系人员" class="inline" prop="contact">
          <el-input placeholder="请输入联系人员" v-model="form.contact" />
        </el-form-item>

        <el-form-item label="联系电话" class="inline" prop="mobile">
          <el-input
            placeholder="请输入联系电话"
            v-model="form.mobile"
            :oninput="formatInputNumber"
          />
        </el-form-item>

        <el-form-item label="机构邮箱" prop="email">
          <el-input placeholder="请输入机构邮箱" v-model="form.email" />
        </el-form-item>

        <el-form-item label="机构网址" prop="web">
          <el-input placeholder="请输入机构网址" v-model="form.web" />
        </el-form-item>

        <el-form-item label="机构地址" prop="address">
          <el-input placeholder="请输入机构地址" v-model="form.address" />
        </el-form-item>

        <el-form-item label="状态" class="inline" prop="enabled">
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
      </el-form>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <UserSelectDialog
    v-model:show="userSelectBox.show"
    title="请选择领导人"
    @onSubmit="onUserSelectSubmit"
  />
</template>

<script>
import { ApiUnitAdd, ApiUnitGet, ApiUnitTree, ApiUnitUpdate } from "../api"
import { formatInputNumber } from "@share/helper/index.js"
import { ElMessage } from "element-plus"

import UserSelectDialog from "@modules/SystemUser/components/UserSelectDialog/UserSelectDialog.vue"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import { REG_EMAIL, REG_PHONE } from "@constants/regexp"

export default {
  //1新增 2行内新增 3修改
  props: ["modelValue", "type", "id"],
  emits: ["update:modelValue", "onSubmit"],
  data() {
    return {
      form: {
        parentDepart: "",
        name: "",
        leaderId: "",
        contact: "",
        mobile: "",
        email: "",
        enabled: 1,
        web: "",
        address: ""
      },
      leaderName: "",
      rules: {
        parentDepart: [
          { required: true, message: "上级机构必须选中一个", trigger: "blur" }
        ],
        name: [
          { required: true, message: "部门名称为必选项", trigger: "blur" }
        ],
        email: [
          {
            message: "邮箱格式不对",
            trigger: "blur",
            validator: (_, value) => {
              return value.length > 0 ? REG_EMAIL.test(value) : true
            }
          }
        ],
        mobile: [
          {
            message: "输入的不是合法手机号",
            trigger: "blur",
            validator: (_, value) =>
              value.length > 0 ? REG_PHONE.test(value) : true
          }
        ]
      },
      system_global_status: [],
      parentDepartTreeOptions: {
        props: { label: "name" },
        options: []
      },
      userSelectBox: {
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
      return this.type === 1 ? "添加机构" : "修改机构"
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    init() {
      this.resolveDictItemEnum(["system_global_status"]).then(res => {
        Object.assign(this, res)
        Object.assign(this.form, { enabled: res.system_global_status[0].v })
      })

      const { type, id } = this

      // 获取上级机构树
      ApiUnitTree().then(async res => {
        this.parentDepartTreeOptions.options = res
        await this.$nextTick()

        const { parentDepartTreeRef } = this.$refs
        // 1新增 && 3修改 上级机构默认是顶级
        if (type === 1 || type === 3) {
          const key = res[0].id
          this.form.parentDepart = key
          parentDepartTreeRef.setCurrentKey(key)
        }
        // 2行内新增 上级机构得是当前机构的
        else if (type === 2) {
          this.form.parentDepart = id
          parentDepartTreeRef.setCurrentKey(id)
        }
        // 防止ID多传错
        else {
          console.error("SystemDepartment > editorDialog > init 未知的类型")
        }
      })

      // 3是修改，需要回显
      if (type === 3) {
        ApiUnitGet({ id }).then(res => {
          if (!this.show) {
            return
          }
          Object.assign(this.form, {
            name: res.name,
            contact: res.contact,
            mobile: res.mobile,
            email: res.email,
            enabled: res.enabled.toString()
          })
        })
      }
    },
    async invokeCreate() {
      const { parentDepartTreeRef } = this.$refs
      const { name, contact, mobile, email, enabled, leaderId, web, address } =
        this.form
      await ApiUnitAdd({
        name,
        contact,
        mobile,
        email,
        enabled,
        web,
        parentId: parentDepartTreeRef.getCurrentNode().id,
        leaderId,
        address
      })

      this.$emit("onSubmit", null)
      ElMessage.success("添加部门成功")
    },
    async invokeUpdate() {
      const { parentDepartTreeRef } = this.$refs
      const { id, form } = this
      const { name, contact, mobile, email, enabled, leaderId, web, address } =
        form
      await ApiUnitUpdate({
        id,
        name,
        contact,
        mobile,
        email,
        web,
        parentId: parentDepartTreeRef.getCurrentNode().id,
        enabled,
        leaderId,
        address
      })

      this.$emit("onSubmit", null)
      ElMessage.success("更新机构成功")
    },
    /* --------------  -------------- */
    async onSubmit() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      await (this.type === 3 ? this.invokeUpdate() : this.invokeCreate())
      this.onCancel()
    },
    onCancel() {
      const { formRef } = this.$refs
      this.show = false
      this.leaderName = ""
      formRef.resetFields()
    },
    onUserSelectChange() {
      this.userSelectBox.show = true
    },
    onUserSelectSubmit(rows) {
      this.form.leaderId = rows[0].id
      this.leaderName = rows[0].realName
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
  components: { UserSelectDialog }
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
