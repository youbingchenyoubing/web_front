import { defineStore } from "pinia"
import { useGlobalUserStore } from "./UserGlobalStore"

export const useGlobalAuthStore = defineStore("global-auth", {
  actions: {
    vIf_auth(value) {
      const permissions = useGlobalUserStore().permissions
      if (!value) {
        throw "authGlobalStore: value 参数必传"
      }
      if (!permissions) return false
      if (permissions.includes("*:*:*")) return true
      if (permissions.includes(value)) return true

      return false
    }
  }
})
