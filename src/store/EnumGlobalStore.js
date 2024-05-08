import { ApiDictItemQueryBatch } from "@modules/SystemDictItem/api"
import { defineStore } from "pinia"
import { watch } from "vue"

const ENUMS = {
  // 全局允许禁止
  system_global_status: [],
  // 全局性别
  system_global_gender: [],
  // 菜单类型
  system_menu_type: [],
  // 显示隐藏
  system_global_visibility: [],
  // 全局缓存
  system_global_cache: [],
  // 公告类型
  system_notice_type: [],
  // 日志业务类型
  system_operator_type: [],
  // 异常类型
  system_global_expstatus: [],
  // 允许禁止
  system_allow_prohibit: [],
  // 执行策略
  system_misfire_policy: [],
  // 全局是否
  system_global_yesorno: [],
  // 定时任务组名
  system_global_taskgroup: [],
  // 定时任务状态
  system_task_status: [],
  // 行业
  industrys: [],
  // 区域
  system_area: [],
  // 企业类型
  company_type: [],
  // 文件类型
  file_type: [],
  // 能耗类型
  energy_type: []
}

export const useGlobalEnumStore = defineStore("global-enum", {
  state() {
    return { ...ENUMS }
  },
  actions: {
    resolveDictItemEnum(enums) {
      return new Promise(async (resolve, reject) => {
        const result = {}
        const pendingResolve = []
        const tryNext = () => {
          if (enums.length === Object.keys(result).length) {
            resolve(result)
          }
        }

        enums.forEach(item => {
          const enum_ = this[item]
          if (!enum_) {
            console.error(
              `EnumGlobalStore error: '${item}'该枚举尚未在程序中添加, 请前往添加`
            )
            result[item] = []
          } else if (enum_.fetching) {
            const stop = watch(
              () => this[item],
              () => {
                stop()
                result[item] = this[item]
                tryNext()
              }
            )
          } else if (enum_.length === 0) {
            enum_.fetching = true
            pendingResolve.push(item)
          } else {
            result[item] = enum_
          }
        })

        if (pendingResolve.length > 0) {
          const res = await ApiDictItemQueryBatch(pendingResolve)
          Object.assign(this, res)
          Object.keys(res).forEach(key => {
            this[key].fetching = false
            result[key] = res[key]
          })
        }

        tryNext()
      })
    },
    clear() {
      Object.entries(ENUMS).forEach(([key, value]) => {
        value.fetching = false
        this[key] = value
      })
    }
  }
})

export function buildVKEnum(ary) {
  if (!Array.isArray(ary)) {
    return ary
  }

  const result = {}
  for (const item of ary) {
    result[item.v] = item.k
  }
  return result
}
