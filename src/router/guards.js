import { progress } from "@share/progress/progress"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { ElMessage } from "element-plus"

export async function beforeEach (to) {
  progress.start()
  if (to.path === "/login") {
    document.title = "节能监测综合信息平台"
    return
  }

  if (!localStorage.getItem("token")) {
    return "/login"
  }

  try {
    const store = useGlobalUserStore()
    await store.initUserInfoAndConfig()

    if (to.path.startsWith("/link/")) {
      return true
    }

    const { permissions } = useGlobalUserStore()
    if (permissions[0] === "*:*:*") {
      return true
    }

    const { authSlideMenuMap } = useGlobalMenuStore()
    const authRoute = authSlideMenuMap.get(to.path)
    if (!authRoute) {
      ElMessage.error("您没有该路由的权限，请联系管理员开通")
      return false
    }
    if (authRoute.meta.redirect) {
      return authRoute.meta.redirect
    }

    document.title = `${authRoute.meta.title}_节能监测综合信息平台`
    return true
  } catch (e) {
    console.error("router guid beforeEach:", e)
    return "/login"
  }
}

export function afterEach () {
  progress.done()
}
