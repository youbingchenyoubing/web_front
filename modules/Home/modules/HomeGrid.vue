<template>
  <el-row :gutter="20">
    <el-col :span="6"
      ><div
        class="grid-content ep-bg-purple"
        :style="{ backgroundImage: 'url(' + gird1 + ')' }"
      >
        <dd>企业总数</dd>
        <dt>
          <span>{{ total.companyCounts }}</span> 个
        </dt>
      </div></el-col
    >
    <el-col :span="6"
      ><div
        class="grid-content ep-bg-purple"
        :style="{ backgroundImage: 'url(' + gird2 + ')' }"
      >
        <dd>企业档案数</dd>
        <dt>
          <span>{{ total.archivesCounts }}</span> 件
        </dt>
      </div></el-col
    >
    <el-col :span="6"
      ><div
        class="grid-content ep-bg-purple"
        :style="{ backgroundImage: 'url(' + gird3 + ')' }"
      >
        <dd>本年度综合能源消费用量等价值</dd>
        <dt>
          <span>{{ total.complexEquivalenceValue }}</span> 吨标准煤
        </dt>
      </div></el-col
    >
    <el-col :span="6"
      ><div
        class="grid-content ep-bg-purple"
        :style="{ backgroundImage: 'url(' + gird4 + ')' }"
      >
        <dd>本年度综合能源消费总量当量值</dd>
        <dt>
          <span>{{ total.complexEquivalentValue }}</span> 吨标准煤
        </dt>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { ApiHomeGrid } from "../api"
import { formatStamp } from "@share/helper/formatDate"
import { useGlobalUserStore } from "@store/UserGlobalStore"
import { mapState } from "pinia"
import gird1 from "@assets/images/gird1.png"
import gird2 from "@assets/images/gird2.png"
import gird3 from "@assets/images/gird3.png"
import gird4 from "@assets/images/gird4.png"
export default {
  data() {
    return {
      total: {},
      nowTime: "",
      gird1,
      gird2,
      gird3,
      gird4
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
    async init() {
      // this.setNowTime()
      const res = await ApiHomeGrid({})
      this.total = res
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
// :deep(.el-alert__content) {}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  height: 176px;
  // background: linear-gradient(270deg, #8a6cfe 0%, #6e46ff 100%);
  background-position: right 0;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  font-size: 21px;
  font-weight: 600;
  color: #ffffff;
  dt {
    margin-left: 38px;
    font-weight: 400;
    span {
      font-size: 29px;
    }
  }
  dd {
    padding-top: 46px;
    margin-left: 38px;
    margin-bottom: 10px;
    font-size: 17px;
  }
}
</style>
