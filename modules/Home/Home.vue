<template>
  <SystemLayout>
    <div class="Home">
      <HomeHelper />
      <HomeGrid />
      <AlarmList />
      <EnergyRanking />
    </div>
  </SystemLayout>
</template>

<script>
import SystemLayout from "@modules/common/SystemLayout/SystemLayout.vue"
import HomeHelper from "./modules/HomeHeader.vue"
import HomeGrid from "./modules/HomeGrid.vue"
import AlarmList from "./modules/AlarmList.vue"
import EnergyRanking from "./modules/EnergyRanking.vue"
export default {
  components: {
    SystemLayout,
    HomeHelper,
    HomeGrid,
    AlarmList,
    EnergyRanking
  }
}
</script>

<style lang="scss" scoped>
.Home {
  min-height: calc(100% - 28px);
  padding: 1rem 1rem 2rem 1rem;
  font-size: 13px;
  color: #676a6c;
}
</style>
