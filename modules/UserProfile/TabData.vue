<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="用户昵称" prop="realName">
      <el-input v-model="form.realName" placeholder="请输入用户昵称" />
    </el-form-item>

    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号码" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>

    <el-form-item label="头像" prop="avatar">
      <el-input v-model="form.avatar" placeholder="请输入用户头像" />
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio
          v-for="item in system_global_gender"
          :key="item.v"
          :label="item.v"
        >
          {{ item.k }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label=" ">
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ApiUpdatePersonal } from "@api/index.js"
import { REG_EMAIL, REG_PHONE } from "@constants/regexp"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions, mapWritableState } from "pinia"

export default {
  data() {
    return {
      form: {
        realName: "",
        phone: "",
        email: "",
        gender: 0,
        avatar: ""
      },
      rules: {
        realName: [
          { required: true, message: "用户昵称为必填项", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码为必填项", trigger: "blur" },
          {
            message: "输入的不是合法手机号",
            trigger: "blur",
            validator: (_, value) => REG_PHONE.test(value)
          }
        ],
        email: [
          { required: true, message: "邮箱为必填项", trigger: "blur" },
          {
            message: "邮箱格式不对",
            trigger: "blur",
            validator: (_, value) => REG_EMAIL.test(value)
          }
        ]
      },
      system_global_gender: []
    }
  },
  computed: {
    ...mapWritableState(useGlobalUserStore, ["userInfo"])
  },
  methods: {
    ...mapActions(useGlobalUserStore, ["reloadUserInfo"]),
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const res = await this.resolveDictItemEnum(["system_global_gender"])
      Object.assign(this, res)
    },
    async onSave() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      const { realName, phone, email, gender, avatar } = this.form
      await ApiUpdatePersonal({
        id: this.userInfo.id,
        realName,
        phone,
        email,
        gender,
        avatar
      })
      ElMessage.success("修改用户信息成功")
      this.reloadUserInfo()
    }
  },
  created() {
    this.init()

    const { realName, phone, email, gender, avatar } = this.userInfo
    Object.assign(this.form, {
      realName,
      phone,
      email,
      gender: gender.toString(),
      avatar
    })
  }
}
</script>
