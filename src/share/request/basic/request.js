import { noop } from "@share/helper"
import { Loading } from "@share/helper/loading"
import axios from "axios"
import { ElMessage, ElMessageBox } from "element-plus"

export const BASIC_CONFIG = {
  baseURL: import.meta.env.$BASIC_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
}

export const request = axios.create(BASIC_CONFIG)

// 挂 token
request.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token")
    }
    return config
  },
  err => Promise.reject(err)
)

// 防止弹出多个去登录的框框
let hasToLoginBox = false

/* 
  普通请求包装器，用于包装普通请求，做一些所有请求的统一的处理
*/
export function basicRequestWrapper(options, { loading = true }) {
  const _loading = loading ? Loading.service({ lock: true }) : { close: noop }
  return request(options)
    .then(res => {
      const { code, msg, data } = res.data
      if (code === "200") {
        return data
      }
      if (["50001", "50002", "50003"].includes(code)) {
        if (hasToLoginBox) {
          return
        }
        Loading.closeAll()

        hasToLoginBox = true
        return ElMessageBox.confirm(
          "登录状态已过期，点击确定按钮去重新登录。",
          "系统提示",
          {
            type: "error",
            confirmButtonText: "确认",
            showCancelButton: false
          }
        ).then(() => {
          localStorage.removeItem("token")
          hasToLoginBox = false
          window.location.href = "/login"
        })
      }
      if (msg) {
        ElMessage({ type: "error", message: msg })
      }
      throw res.data
    })
    .finally(() => _loading.close())
}

/* 
  二进制流包装器，适用于文件下载，图片等
*/
/**
 * @param {import("axios").AxiosRequestConfig} options
 * @param {{ loading: boolean }}
 */
export function streamRequestWrapper(options, { loading, fileType }) {
  const _loading = loading ? Loading.service({ lock: true }) : { close: noop }
  return request({ ...options, responseType: "arraybuffer" })
    .then(res => {
      const { data, headers } = res
      if (
        typeof data === "object" &&
        data.code &&
        ["50001", "50002", "50003"].includes(data.code)
      ) {
        if (hasToLoginBox) {
          return
        }
        Loading.closeAll()

        hasToLoginBox = true
        return ElMessageBox.confirm(
          "登录状态已过期，点击确定按钮去重新登录。",
          "系统提示",
          {
            type: "error",
            confirmButtonText: "确认",
            showCancelButton: false
          }
        ).then(() => {
          localStorage.removeItem("token")
          hasToLoginBox = false
          window.location.href = "/login"
        })
      }

      return { data, headers }
    })
    .finally(() => _loading.close())
}
