import { defineStore } from "pinia"
import { useGlobalAuthStore } from "./AuthGlobalStore"
import { useGlobalEnumStore } from "./EnumGlobalStore"
import { useGlobalHistoryStore } from "./HistoryGlobalStore"
import { useGlobalMenuStore } from "./MenuGlobalStore"
import { useGlobalUserStore } from "./UserGlobalStore"

export const useGlobalStore = defineStore("global", {
  state() {
    return {
      menu: useGlobalMenuStore(),
      user: useGlobalUserStore(),
      enums: useGlobalEnumStore(),
      auth: useGlobalAuthStore(),
      history: useGlobalHistoryStore()
    }
  },
  actions: {
    async clearStore() {
      for (const [key, value] of Object.entries(this)) {
        if (value.clear) {
          await Promise.resolve(value.clear())
        }
      }
    }
  }
})
