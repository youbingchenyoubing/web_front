import useClipboard from "vue-clipboard3"
const { toClipboard } = useClipboard()

import { ElMessage } from "element-plus"

export function setClipboard(content, options = {}) {
  toClipboard(content)
    .then(() => {
      ElMessage({
        message: options.success ?? "复制成功",
        type: "success"
      })
    })
    .catch(() => {
      ElMessage({
        message: options.error ?? "复制失败",
        type: "error"
      })
    })
}
