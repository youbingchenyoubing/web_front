<template>
  <div class="Login">
    <div id="mainContainer" class="container">
      <div class="logo-title">
        <img :src="logoTitle" style="width: 559px; height: 75px" />
      </div>
      <div class="login-content">
        <img :src="banner" style="width: 814px; height: 620px" />
        <el-form class="login-form" ref="formRef" :model="form" :rules="rules">
          <el-form-item>
            <div class="login-h3">
              <h2 class="login-title">欢迎登录</h2>
              <div class="bline"></div>
            </div>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              size="large"
              v-model="form.username"
              placeholder="用户名"
              @keyup.enter="onSubmit"
              class="inputDeep"
            >
              <template #prefix>
                <IconUser />
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              size="large"
              v-model="form.password"
              placeholder="密码"
              show-password
              @keyup.enter="onSubmit"
              class="inputDeep"
            >
              <template #prefix>
                <IconPwd></IconPwd>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="captcha">
            <div class="form-code">
              <el-input
                class="code-input inputDeep"
                size="large"
                v-model="form.captcha"
                :maxlength="4"
                show-word-limit
                placeholder="验证码"
                @keyup.enter="onSubmit"
              >
                <template #prefix>
                  <IconCode></IconCode>
                </template>
              </el-input>
              <el-image
                :src="verificationCode.src"
                class="code-img"
                @click="loadVerificationCodeImg"
              >
                <template #error>
                  <el-icon><Picture /></el-icon>
                </template>
              </el-image>
            </div>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="memoPassword" @change="onMemoPasswordChange">
              记住密码
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button
              size="large"
              type="primary"
              class="form-submit"
              @click="onSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

  <div class="Copyright">© 2024 节能监测综合信息平台</div>
</template>

<script>
import { enCryptoAES } from "@share/helper/crypto"
import { ApiCaptchaImageCode, ApiLogin } from "@api/index.js"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import Copyright from "../common/Copyright.vue"
import logoTitle from "@assets/images/logo_title_2.png"
import banner from "@assets/images/banner_3.jpeg"

export default {
  name: "Login",
  data () {
    return {
      logoTitle,
      banner,
      rules: {
        username: [
          { required: true, message: "用户名是必填项", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码是必填项", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      form: {
        username: "",
        password: "",
        captcha: ""
      },
      verificationCode: {
        src: "default",
        curKey: ""
      },
      memoPassword:
        localStorage.getItem("memoPassword") === "true" ? true : false
    }
  },
  methods: {
    init () {
      this.loadVerificationCodeImg()
    },
    async loadVerificationCodeImg () {
      const key = new Date().getTime()
      const src = await ApiCaptchaImageCode({ key })
      this.verificationCode.src = src
      this.verificationCode.curKey = key
    },
    async onSubmit () {
      try {
        // 登录
        await this.$refs.formRef.validate()
        const store = useGlobalUserStore()
        const { username, password, captcha } = this.form
        const params = {
          username: enCryptoAES(username),
          password: enCryptoAES(password),
          key: this.verificationCode.curKey,
          captcha
        }
        const token = await ApiLogin(params)
        localStorage.setItem("token", token)

        await store.initUserInfoAndConfig()

        this.setMemoPassword()
        this.$router.push("/")
      } catch (e) {
        if (typeof e === "object" && ["10013", "10022"].includes(e.code)) {
          this.loadVerificationCodeImg()
        }
        return
      }
    },
    /* --------------  -------------- */
    setMemoPassword () {
      this.memoPassword
        ? localStorage.setItem(
          "user-pwd",
          JSON.stringify({
            name: this.form.username,
            pwd: this.form.password
          })
        )
        : localStorage.removeItem("user-pwd")
    },
    onMemoPasswordChange (value) {
      localStorage.setItem("memoPassword", (this.memoPassword = value))
    },
    recoverPwd () {
      if (!this.memoPassword) {
        return
      }

      const userInfo = localStorage.getItem("user-pwd")
      if (!userInfo) {
        return
      }

      const { name, pwd } = JSON.parse(userInfo)
      this.form.username = name
      this.form.password = pwd
    }
  },
  components: { Copyright },
  mounted () {
    this.recoverPwd()
    this.init()

    var browerWidth = window.innerWidth //浏览器可视宽度
    var baseWidth = 1920 //设计稿宽度
    var zoomValue = browerWidth / baseWidth //缩放比例计算
    document.getElementById("mainContainer").style.transform =
      "scale(" + zoomValue + "," + zoomValue + ")" //mainContainer为主容器id
    window.onresize = function () {
      //窗口尺寸变化时，重新计算和缩放
      browerWidth = window.innerWidth
      zoomValue = browerWidth / baseWidth
      document.getElementById("mainContainer").style.transform =
        "scale(" + zoomValue + "," + zoomValue + ")"
    }
  }
}
</script>
<style>
body {
  background: linear-gradient(45deg, #9a8d03 0%, #3477f2 100%);
}
</style>
<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 100vh;
  // background: url("@assets/images/login_bg.webp") no-repeat center top;
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-items: center;
  align-items: center;
  .container {
    width: 1214px;
    margin: 0 auto 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-h3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0 auto 20px auto;
  }
  .bline {
    width: 120px;
    height: 2px;
    margin-top: 5px;
    background: #207cff;
  }
  .logo-title {
    width: 1214px;
    margin-bottom: 20px;
    img {
      margin-left: 20px;
    }
  }
  .login-content {
    background: #fff;
    height: 620px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    border-radius: 20px !important;
  }
}

.login-form {
  padding: 3rem 3rem;
  background: #fff;

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login-title {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .form-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;

    .code-input {
      flex: 1;
    }

    .code-img {
      width: 100px;
      height: 40px;
      cursor: pointer;
    }
  }

  .form-submit {
    width: 100%;
  }
}

.Copyright {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset;
    border-bottom: 1px solid #b5b5b5;
    border-radius: 0;
    cursor: default;
    .el-input__inner {
      cursor: default !important;
    }
  }
}
.Copyright {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  font-size: 12px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
