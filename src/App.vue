<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/es/locale/lang/zh-cn"
export default {
  data() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss"></style>
