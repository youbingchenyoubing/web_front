<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :scroll-to-error="true"
    label-width="100px"
  >
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="form.oldPassword" placeholder="请输入旧密码" />
    </el-form-item>

    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="form.newPassword" placeholder="请输入新密码" />
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="请确认新密码" />
    </el-form-item>

    <el-form-item label=" ">
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { enCryptoAES } from "@share/helper/crypto"
import { ApiUpdatePassword } from "@api/index.js"
import { ElMessageBox } from "element-plus"
import { REG_PWD_WORD } from "@constants/regexp"
import { mapActions } from "pinia"
import { useGlobalStore } from "@store/GlobalStore"

export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "旧密码为必填项", trigger: "blur" },
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
        newPassword: [
          { required: true, message: "新密码为必填项", trigger: "blur" },
          {
            message: "新旧密码不能相同",
            trigger: "blur",
            validator: (_, value) => value !== this.form.oldPassword
          }
        ],
        checkPassword: [
          { required: true, message: "确认密码为必填项", trigger: "blur" },
          {
            message: "确认密码必须和新密码一致",
            trigger: "blur",
            validator: (_, value) => value === this.form.newPassword
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ["clearStore"]),
    async onSave() {
      try {
        const { formRef } = this.$refs
        await formRef.validate()
      } catch {
        return
      }

      const { oldPassword, newPassword } = this.form
      await ApiUpdatePassword({
        oldPassword: enCryptoAES(oldPassword),
        newPassword: enCryptoAES(newPassword)
      })
      ElMessageBox.confirm("修改密码成功，请前往登录页重新登录。", "系统提示", {
        confirmButtonText: "确认",
        type: "success",
        showCancelButton: false
      })
        .then(() => this.clearStore())
        .then(() => this.$router.push("/login"))
    }
  }
}
</script>
