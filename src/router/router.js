import { createRouter, createWebHistory } from "vue-router"
import { AppRoutes } from "./route"
import { beforeEach, afterEach } from "./guards"

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes: AppRoutes,
  scrollBehavior: () => ({ top: 0 })
})

AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(afterEach)
