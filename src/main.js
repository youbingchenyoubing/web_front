/* -------------- 初始化，相当于 normalize.css -------------- */
import "@assets/css/init.css"
import "element-plus/dist/index.css"
//所有自定义的全局CCS请放在这里进行管理,一定要放在公共CSS最底下
import "@assets/css/custom.init.css"

/* -------------- 路由 -------------- */
import { AppRouter } from "@router/index"

/* -------------- element-plus -------------- */
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

/* -------------- pinia 状态管理 -------------- */
import { createPinia } from "pinia"
const pinia = createPinia()

/* --------------  -------------- */
import EmptyComponent from "@components/EmptyComponent.vue"

/* --------------  -------------- */
import { createApp } from "vue"
import App from "./App.vue"
import { AuthDirective } from "./directives/auth.directive"
import { install } from "element-plus"

const app = createApp(App)
/* -------------- 全局批量注入icon -------------- */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const localIcons = import.meta.globEager("./components/icons/*.vue")
for (const [path, module] of Object.entries(localIcons)) {
  const component = module.default
  app.component(
    component.name ||
      path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf(".")),
    component
  )
}

app.use(AppRouter).use(pinia).component(EmptyComponent)
app.directive(AuthDirective.name, AuthDirective)

/* --------------  -------------- */

app.mount("#app")
