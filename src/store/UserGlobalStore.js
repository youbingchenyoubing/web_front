import { ApiGetInfo } from "@api/index.js"
import { defineStore } from "pinia"
import { useGlobalMenuStore } from "./MenuGlobalStore"

export const useGlobalUserStore = defineStore("global-user", {
  state: () => ({
    userInfo: null,
    roles: [],
    units: null,
    permissions: null,
    currentRolePerm: sessionStorage.getItem("currentRolePerm") ?? ""
  }),
  actions: {
    async initUserInfoAndConfig() {
      // 获取用户信息
      if (!this.userInfo) {
        const { permissions, roles, units, userInfo } = await ApiGetInfo()
        this.roles = roles
        this.units = units
        this.userInfo = userInfo
        this.permissions = permissions

        if (!this.currentRolePerm) {
          this.toggleCurrentRolePerm(roles[0].rolePerm)
        }

        if (roles.length === 0) {
          return ElMessage.error("该用户不存在任何权限，请联系管理员添加")
        }
      }

      // 获取该用户的路由
      await useGlobalMenuStore().loadAuthRouters()
    },
    async reloadUserInfo() {
      const res = await ApiGetInfo()
      Object.assign(this, res)
    },
    async clear() {
      this.userInfo = null
      this.roles = []
      this.units = []
      this.permissions = null
      this.currentRolePerm = ""
      localStorage.removeItem("token")
    },
    toggleCurrentRolePerm(rolePerm) {
      this.currentRolePerm = rolePerm
      sessionStorage.setItem("currentRolePerm", rolePerm)
    }
  }
})
