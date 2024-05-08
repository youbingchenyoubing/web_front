import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import setEnv from "vite-plugin-set-env"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import DefineOptions from "unplugin-vue-define-options/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    // JSX
    vueJsx(),
    // 设置环境变量，注意会覆盖 vite 默认的
    // 使用文档：https://www.npmjs.com/package/vite-plugin-set-env
    setEnv({
      envPrefix: "$",
      loadPath: ["./src/constants/env.config.js"]
    }),
    // 自动引入相关
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 允许 script setup 写 options api
    DefineOptions()
  ],
  resolve: {
    alias: {
      "@router": "/src/router",
      "@share": "/src/share",
      "@constants": "/src/constants",
      "@components": "/src/components",
      "@store": "/src/store",
      "@modules": "/modules",
      "@assets": "/src/assets",
      "@api": "/src/api"
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://xx.dev.hubeis.cn/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    },
    host: true
  }
})
