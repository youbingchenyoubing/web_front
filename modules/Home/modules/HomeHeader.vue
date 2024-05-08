<template>
  <div class="welcome">
    <div>
      <span class="blod">您好，{{ title }}</span> 欢迎回来！
    </div>
    <!-- <div>{{ nowTime }}</div> -->
  </div>
  <!-- <el-alert :title="title" type="success" :closable="false">
    {{ nowTime }}
  </el-alert> -->
</template>

<script>
import { formatStamp } from "@share/helper/formatDate"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { mapState } from "pinia"
export default {
  data() {
    return {
      nowTime: ""
    }
  },
  computed: {
    ...mapState(useGlobalUserStore, ["userInfo"]),
    title() {
      const username = this.userInfo ? this.userInfo.username : ""
      return username
    }
  },
  methods: {
    init() {
      this.setNowTime()
    },
    setNowTime() {
      this.timer = setInterval(() => {
        this.nowTime = formatStamp("YYYY年MM月DD日 HH时MM分SS秒")
      }, 1000)
    }
  },
  created() {
    this.init()
  },
  unmounted() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-alert__content) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.welcome {
  display: flex;
  justify-content: space-between;
  color: #4e5969;
  padding-top: 10px;
  padding-bottom: 27px;
  .blod {
    font-size: 20px;
    color: #000000;
    margin-right: 10px;
    margin-left: 22px;
  }
}
</style>
