<template>
  <div class="system">
    <section class="system-slideMenu" :style="slideMenuStyle">
      <Logo />
      <SlideMenu />
    </section>

    <div class="system-container">
      <Header />
      <NavigateBar />
      <el-scrollbar class="main-container" view-style="height: 100%">
        <slot />
        <Copyright />
      </el-scrollbar>
    </div>
  </div>

  <Bg />
</template>

<script>
import SlideMenu from "./modules/SlideMenu/SlideMenu.vue"
import Logo from "./modules/Logo/Logo.vue"
import Header from "./modules/Header/Header.vue"
import { mapState } from "pinia"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import NavigateBar from "./modules/NavigateBar/NavigateBar.vue"
import Copyright from "../Copyright.vue"
import Bg from "../Bg.vue"

export default {
  computed: {
    ...mapState(useGlobalMenuStore, ["slideMenuCollapse"]),
    slideMenuStyle() {
      return {
        width: this.slideMenuCollapse ? "64px" : "220px"
      }
    }
  },
  components: { SlideMenu, Logo, Header, NavigateBar, Copyright, Bg }
}
</script>

<style lang="scss" scoped>
.system {
  display: flex;
  background: #fff;
}
.system-slideMenu {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  height: 100vh;
  background: #ffffff;
  border: 1px solid #ffffff;
  transition: width 0.6s;
}

.system-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f0f4f5;
}

.main-container {
  max-height: calc(100vh - 86px);

  .Copyright {
    padding-bottom: 10px;
  }
}
</style>
