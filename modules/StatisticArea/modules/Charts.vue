<template>
  <div class="box-card">
    <div class="card-header">
      <el-image :src="titleIcon" class="img"
        ><template #error>
          <el-icon><Picture /></el-icon>
        </template> </el-image
      ><span class="card-title"> 区域能耗对比</span>
    </div>
    <div class="type">
      <text
        :class="index == hover ? 'hover' : ''"
        v-for="(item, index) in types"
        :key="index"
        @click="changeTab(index)"
      >
        {{ item.label }}
      </text>
    </div>
    <div class="flex-charts">
      <div style="width: 31%">
        <div ref="company1Ref" style="height: 275px" />
        <div class="name">深圳市浩天投资有限公司</div>
      </div>
      <div style="width: 31%">
        <div ref="company2Ref" style="height: 275px" />
        <div class="name">国民淀粉化学贸易(上海)有限公司北京分公司</div>
      </div>
      <div style="width: 31%">
        <div ref="company3Ref" style="height: 275px" />
        <div class="name">小计</div>
      </div>
    </div>
  </div>
  <div class="hr"></div>
</template>

<script>
import * as echarts from "echarts"
import titleIcon from "@assets/images/title_icon.png"
export default {
  props: ["show"],
  data() {
    return {
      hover: 0,
      commandStats: [120, 400, 59, 112, 23],
      types: [
        { label: "水", value: "水" },
        { label: "电", value: "电" },
        { label: "煤", value: "煤" },
        { label: "天然气", value: "天然气" }
      ],
      titleIcon
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    changeTab(e) {
      this.hover = e
    },
    init() {
      this.initeCharts1()
      this.initeCharts2()
      this.initeCharts3()
    },
    async initeCharts1() {
      this.company1Ref = echarts.init(this.$refs.company1Ref, "macarons")
      this.company1Ref.setOption({
        color: ["#2EA3FF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} "
        },
        grid: {
          left: "1%",
          top: "3%",
          right: "1.5%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "环比增幅量",
            "同比增幅量",
            "1月-5月能耗",
            "环比能耗",
            "同比能耗"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            data: this.commandStats
          }
        ]
      })
    },
    async initeCharts2() {
      this.company2Ref = echarts.init(this.$refs.company2Ref, "macarons")
      this.company2Ref.setOption({
        color: ["#2EA3FF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        grid: {
          left: "1%",
          top: "3%",
          right: "1.5%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "环比增幅量",
            "同比增幅量",
            "1月-5月能耗",
            "环比能耗",
            "同比能耗"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            data: this.commandStats
          }
        ]
      })
    },
    async initeCharts3() {
      this.company3Ref = echarts.init(this.$refs.company3Ref, "macarons")
      this.company3Ref.setOption({
        color: ["#2EA3FF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        grid: {
          left: "1%",
          top: "3%",
          right: "1.5%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "环比增幅量",
            "同比增幅量",
            "1月-5月能耗",
            "环比能耗",
            "同比能耗"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            data: this.commandStats
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hr {
  margin: 22px 0;
  height: 8px;
  background: #ededed;
}
:deep(.el-card__header) {
  border-bottom: 0;
}
.img {
  width: 16px;
  height: 16px;
}
.box-card {
  position: relative;
  height: 350px;
  background: #ffffff;
  border-radius: 4px;
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 28px;
  }
  .card-title {
    margin-left: 10px;
    color: #000000;
    font-size: 16px;
  }
}
.type {
  position: absolute;
  right: 0;
  top: 10px;
  display: flex;
  justify-content: space-around;
  width: 200px;
  text {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 16px;
    width: 42px;
    height: 28px;
    text-align: center;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &.hover {
      color: #207cff;
      border-bottom: 2px solid #207cff;
    }
  }
}
.flex-charts {
  display: flex;
  justify-content: space-between;
  .name {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #207cff;
    line-height: 16px;
    text-align: center;
  }
}
</style>
