<template>
  <div class="UserProfile">
    <el-card class="card">
      <template #header> 个人信息 </template>
      <template #default>
        <div class="card-list">
          <section class="list-item">
            <el-upload :http-request="onUploadAvatar" :show-file-list="false">
              <template #trigger>
                <el-avatar :size="120" fit="cover" :src="avatarSrc" />
              </template>
            </el-upload>
          </section>
          <section class="list-item">
            <div class="label">
              <span>用户名称</span>
            </div>
            <div class="content">{{ userInfo.username }}</div>
          </section>
          <section class="list-item">
            <div class="label">
              <span>手机号码</span>
            </div>
            <div class="content">{{ userInfo.phone }}</div>
          </section>
          <section class="list-item">
            <div class="label">
              <span>用户邮箱</span>
            </div>
            <div class="content">{{ userInfo.email }}</div>
          </section>
          <section class="list-item">
            <div class="label">
              <span>所属机构</span>
            </div>
            <div class="content">{{ units.name }}</div>
          </section>
          <section class="list-item">
            <div class="label">
              <span>所属角色</span>
            </div>
            <div class="content">{{ contentRole }}</div>
          </section>
        </div>
      </template>
    </el-card>

    <el-card class="card">
      <template #header> 基本资料 </template>
      <template #default>
        <el-tabs v-model="basicData.cur">
          <el-tab-pane label="基本资料" name="tab-data">
            <TabData />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="tab-pwd">
            <TabPwd />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { mapWritableState } from "pinia"
import default_avatar from "@assets/images/default_avatar.jpeg"
import { ApiUploadFile } from "@api/index.js"
import { buildImageURL } from "@share/request/basic"
import { ApiUpdateAvatar } from "./api"
import TabData from "./TabData.vue"
import TabPwd from "./TabPwd.vue"
import { ElMessage } from "element-plus"

export default {
  data() {
    return {
      basicData: {
        cur: "tab-data"
      }
    }
  },
  computed: {
    ...mapWritableState(useGlobalUserStore, ["userInfo", "roles", "units"]),
    avatarSrc() {
      return this.userInfo && this.userInfo.avatar
        ? buildImageURL(this.userInfo.avatar)
        : default_avatar
    },
    contentRole() {
      return this.roles.map(role => role.roleName).join("，")
    }
  },
  methods: {
    async onUploadAvatar({ file }) {
      const res = await ApiUploadFile({ file })
      await ApiUpdateAvatar({
        id: this.userInfo.id,
        avatar: res.url
      })
      ElMessage.success("头像上传成功")

      this.userInfo = { ...this.userInfo, avatar: buildImageURL(res.url) }
    }
  },
  components: { TabData, TabPwd }
}
</script>

<style lang="scss" scoped>
.UserProfile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  align-items: flex-start;

  .card {
    margin: 0 1rem 1rem 0;
    display: inline-block;
    min-width: 480px;
  }

  .card-list {
    font-size: 0.8rem;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid #e7eaec;

    &:first-child {
      justify-content: center;
    }

    .label {
      font-weight: bold;
    }
  }
}
</style>
