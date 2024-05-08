<template>
  <div class="UserAvatar">
    <el-dropdown trigger="click">
      <template #default>
        <div class="content">
          <el-avatar :size="32" fit="cover" :src="avatarSrc" />
          <div>{{ userInfo?.username }}</div>
          <el-icon><CaretBottom /></el-icon>
        </div>
      </template>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in userRoles"
            :key="item.rolePerm"
            @click="onToggleRole(item)"
          >
            <el-link
              :underline="false"
              :type="currentRolePerm === item.rolePerm ? 'primary' : 'default'"
            >
              <el-icon v-if="currentRolePerm === item.rolePerm" size="1rem">
                <StarFilled />
              </el-icon>
              <el-icon v-else></el-icon>
              <span>{{ item.roleName }}</span>
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><User /></el-icon>
            <router-link to="/user/profile">
              <span>个人中心</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <el-icon><IconQuit /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import default_avatar from "@assets/images/default_avatar.jpeg"
import { buildImageURL } from "@share/request/basic"
import { useGlobalStore } from "@store/GlobalStore"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { mapActions, mapWritableState } from "pinia"

export default {
  computed: {
    ...mapWritableState(useGlobalUserStore, [
      "userInfo",
      "roles",
      "currentRolePerm"
    ]),
    avatarSrc() {
      return this.userInfo && this.userInfo.avatar
        ? buildImageURL(this.userInfo.avatar)
        : default_avatar
    },
    userRoles() {
      const current = this.currentRolePerm
      const roles = [...this.roles]
      const curRole = roles.splice(
        roles.findIndex(r => r.rolePerm === current),
        1
      )
      return [curRole[0], ...roles]
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ["clearStore"]),
    ...mapActions(useGlobalMenuStore, ["reloadAuthMenu"]),
    ...mapActions(useGlobalUserStore, ["toggleCurrentRolePerm"]),
    async logout() {
      await this.clearStore()
      this.$router.push("/login")
    },
    async onToggleRole({ rolePerm }) {
      if (this.currentRolePerm === rolePerm) {
        return
      }
      ElMessageBox.confirm(
        `您正在进行切换角色操作，如需切换请点击确认，否则取消。`,
        "系统提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.toggleCurrentRolePerm(rolePerm)
          this.reloadAuthMenu()
          this.$router.push("/")
        })
        .then(() => {
          ElMessage.success("切换成功")
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.UserAvatar {
  .content {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .el-avatar--square {
    border-radius: 12px;
  }

  img {
    border-radius: 12px;
  }
}
</style>
