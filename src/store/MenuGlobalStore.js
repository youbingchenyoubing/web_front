import { AppRoutesMap } from "@router/route"
import { ApiGetRouters } from "@api/index.js"
import { defineStore } from "pinia"
import { useGlobalUserStore } from "./UserGlobalStore"
import { REG_HTTP } from "@constants/regexp"

export const useGlobalMenuStore = defineStore("global-menu", {
  state() {
    return {
      slideMenuCollapse: false,
      authSlideMenuList: null,
      authSlideMenuMap: null,
      preRenderSlideMenu: null
    }
  },
  actions: {
    async loadAuthRouters(reload = false) {
      // 存在，并且在非强制重载的期间调用，才会退出
      if (this.authSlideMenuList && !reload) {
        return
      }

      const userStore = useGlobalUserStore()
      const routers = await ApiGetRouters({
        rolePerm: userStore.currentRolePerm
      })

      const slideMenu = normalizeSlideMenu(routers)
      this.authSlideMenuList = slideMenu.authSlideMenuList
      this.authSlideMenuMap = slideMenu.authSlideMenuMap
    },
    async clear() {
      Object.assign(this, {
        slideMenuCollapse: false,
        authSlideMenuList: null,
        authSlideMenuMap: null,
        preRenderSlideMenu: null
      })
    },
    async reloadAuthMenu() {
      this.preRenderSlideMenu = null
      return this.loadAuthRouters(true)
    }
  }
})

function normalizeSlideMenu(routers) {
  const authSlideMenuMap = new Map()
  const authSlideMenuList = routers
    .map(route => normalizeSlideMenuItem(route, authSlideMenuMap))
    .filter(Boolean)

  AppRoutesMap.forEach(route => {
    if (route.meta.commonMenu) {
      authSlideMenuMap.set(route.path, {
        path: route.path,
        meta: { ...route.meta }
      })
    }
  })

  const _authSlideMenuList = [
    // 写死的前置公开路由
    createMenuRoute({
      path: "/",
      meta: {
        title: "首页",
        icon: "HomeFilled"
      }
    }),
    ...authSlideMenuList
  ]
  return { authSlideMenuMap, authSlideMenuList: _authSlideMenuList }
}

function normalizeSlideMenuItem(route, authSlideMenuMap) {
  // 获取不到有两种情况
  // 1:外链，特殊处理
  // 2:添加时添的不对，这是必须要即使发现改正的 BUG
  const origin = AppRoutesMap.get(route.path) || { meta: {} }
  const _route = createMenuRoute(route)

  if (route.type === 0 && route.children) {
    _route.children = route.children
      .map(item => normalizeSlideMenuItem(item, authSlideMenuMap))
      .filter(Boolean)
  }

  authSlideMenuMap.set(_route.path, _route)

  // 放下面是为了让 map 能收集到所有层次的，被转换过后的授权路由
  if (origin && origin.meta.abstractMenu) {
    return false
  }
  if (origin && origin.meta.invalidMenu) {
    console.error(
      "store -> MenuGlobalStore：该路由为无效侧边栏路由，请及时修改",
      route
    )
    return false
  }

  return _route
}

function createMenuRoute(route) {
  const origin = AppRoutesMap.get(route.path) || { meta: {} }
  return {
    path: route.path,
    meta: {
      ...origin.meta,
      ...route.meta,
      alwaysShow: route.alwaysShow,
      hidden: route.hidden,
      query: route.query && JSON.parse(route.query),
      redirect: route.redirect ?? origin.redirect,
      type: route.type,
      outer: REG_HTTP.test(route.path)
    }
  }
}
