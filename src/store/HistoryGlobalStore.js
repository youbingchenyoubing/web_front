import { defineStore } from "pinia"

export const useGlobalHistoryStore = defineStore("history", {
  state() {
    return {
      historyList: [{ title: "首页", path: "/" }]
    }
  },
  actions: {
    async clear() {
      this.historyList = [{ title: "首页", path: "/" }]
    }
  }
})
