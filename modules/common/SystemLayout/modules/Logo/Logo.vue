<template>
  <transition name="el-fade-in" mode="out-in">
    <router-link class="system-logo" to="/" key="a" v-if="!slideMenuCollapse">
      <!-- <el-image :src="logoImgSrc" class="img">
        <template #error>
          <el-icon><Picture /></el-icon>
        </template>
      </el-image> -->
      <h1 v-show="!slideMenuCollapse">节能监测综合信息平台</h1>
    </router-link>

    <router-link class="system-logo" to="/" key="b" v-else>
      <el-image :src="logoImgSrc" class="img">
        <template #error>
          <el-icon><Picture /></el-icon>
        </template>
      </el-image>
    </router-link>
  </transition>
</template>

<script>
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { mapState } from "pinia"
import logoImgSrc from "@assets/images/logo.png"

export default {
  data () {
    return {
      logoImgSrc
    }
  },
  computed: {
    ...mapState(useGlobalMenuStore, ["slideMenuCollapse"])
  }
}
</script>

<style lang="scss" scoped>
.system-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 50px;
  color: #fff;

  background: linear-gradient(90deg, #dcac1c 0%, #3ebcfc 100%);
  .img {
    width: 32px;
    height: 32px;
  }

  h1 {
    white-space: nowrap;
  }
}
</style>
