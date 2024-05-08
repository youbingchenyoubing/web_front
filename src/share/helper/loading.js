import { ElLoading } from "element-plus"

const startLoadingMap = new Map()
export const Loading = {
  service(...params) {
    let _loading = null
    const timeout = setTimeout(() => {
      _loading = ElLoading.service(...params)
      startLoadingMap.set(timeout, _loading)
    }, 700)
    startLoadingMap.set(timeout, null)

    return {
      close() {
        clearTimeout(timeout)
        _loading && _loading.close()
        startLoadingMap.delete(timeout)
      }
    }
  },
  closeAll() {
    startLoadingMap.forEach((_loading, timeout) => {
      _loading && _loading.close()
      clearTimeout(timeout)
    })
    startLoadingMap.clear()
  }
}
