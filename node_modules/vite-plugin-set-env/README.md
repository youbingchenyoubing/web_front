# vite-plugin-set-env
用于便捷设置vite的环境变量

该插件可以指定，参数行内变量，packages.json中的变量，指定路径中导出的变量

这样就不用在根目录下减少些内容了，因为可以使用 js 导出变量也会让设置变得更加灵活


## 基本使用


```ts
import SetEnv from "vite-plugin-set-env"
export default defineConfig({
  plugins: [
    // 所有选项都是可选的
    SetEnv({
      //环境变量前缀
      envPrefix: "$",
      // 行内变量
      env: {
        development: {
          msg: "行内变量"
        }
      },
      //在指定的 js 文件，根目录为当前项目的根目录
      loadPath: ["env.js"]
    })
  ]
})
```
```vue
<script setup>
//这是上边设置的行内变量
//前缀会自动拼接在前边
console.log(import.env.$msg)
</script>
```


## 自动读取 package.json 的环境变量

会自动使用 packages.json > vite-env 字段的值
然后根据当前开发模式自动注入对应环境的变量
```json
{
  "vite-env": {
    "development": {
      "msg": "这是开发环境"
    },
    "production": {
      "msg": "这是生产环境"
    }
  }
}
```
