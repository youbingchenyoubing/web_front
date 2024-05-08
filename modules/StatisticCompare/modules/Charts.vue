<template>
  <div class="box-card">
    <div class="card-header">
      <el-image :src="titleIcon" class="img"
        ><template #error>
          <el-icon><Picture /></el-icon>
        </template> </el-image
      ><span class="card-title"> 企业能耗对比</span>
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
    <div ref="companyRef" style="height: 275px" />
  </div>
  <div class="hr"></div>
</template>

<script>
import * as echarts from "echarts"
import titleIcon from "@assets/images/title_icon.png"
export default {
  props: ["searchQuery"],
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
  watch: {
    searchQuery: {}
  },
  mounted() {
    this.init()

    console.log(
      "%cMyProject%cline:44%csearchQuery",
      "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
      "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
      "color:#fff;background:rgb(89, 61, 67);padding:3px;border-radius:2px",
      this.searchQuery
    )
  },
  methods: {
    changeTab(e) {
      this.hover = e
    },
    init() {
      this.initeCharts()
    },
    async initeCharts() {
      this.companyRef = echarts.init(this.$refs.companyRef, "macarons")
      this.companyRef.setOption({
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
            name: "公司",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            emphasis: {
              focus: "series"
            },
            data: [100, 50, 90, 30, 123]
          },
          {
            name: "公司1",
            stack: "公司",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            emphasis: {
              focus: "series"
            },
            data: [120, 400, 50, 110, 23]
          },
          {
            name: "小计",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            emphasis: {
              focus: "series"
            },
            data: [220, 450, 140, 140, 146]
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
