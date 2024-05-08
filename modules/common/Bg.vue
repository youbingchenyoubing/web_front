<template>
  <div class="bg-info">
    <section class="bg-info-card" v-for="item in size" :key="item">
      <section class="bg-info-item">
        <section>{{ userName }}</section>
        <section>{{ now }}</section>
        <section>{{ unit }}</section>
      </section>
    </section>
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { mapState } from "pinia"
export default {
  data() {
    return {
      x: Math.ceil(window.innerWidth / 120),
      y: Math.ceil(window.innerHeight / 160)
    }
  },
  computed: {
    ...mapState(useGlobalUserStore, ["userInfo", "units"]),
    userName() {
      return this.userInfo ? this.userInfo.realName : ""
    },
    now() {
      return formatStamp("YYYY-MM-DD", new Date().getTime())
    },
    unit() {
      const unit = this.units
      return unit ? unit.name : ""
    },
    size() {
      return this.x * this.y
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-info {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: grid;
  // grid-template-columns: repeat(v-bind(x), 240px);
  color: #e2e2e2;
  font-size: 12px;
  font-weight: 200;
  user-select: none;

  .bg-info-card {
    height: 160px;
  }

  .bg-info-item {
    width: 200px;
    transform: rotate(-30deg);
  }
}
</style>
