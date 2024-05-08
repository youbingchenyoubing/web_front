<template>
  <div class="big-screen" :style="`height:${height}px`">
    <div class="top" :style="{ backgroundImage: 'url(' + bigTop + ')' }">
      <div>
        <!-- <iframe
          width="300"
          scrolling="no"
          height="30"
          frameborder="0"
          allowtransparency="true"
          src="https://i.tianqi.com?c=code&id=34&color=%23ffffff&icon=1&py=nanning&site=16"
        ></iframe> -->
      </div>
      <div style="display: flex">
        <iframe
          width="230"
          scrolling="no"
          height="30"
          frameborder="0"
          allowtransparency="true"
          src="/time.html"
        ></iframe>
        <a
          href="/"
          style="
            color: rgb(255, 255, 255);
            margin-top: 3px;
            font-size: 14px;
            color: #00a6fe;
          "
          >返回</a
        >
      </div>
    </div>
    <div ref="echartMap" class="echartMap" :style="`height:${height}px`"></div>
    <div class="main" id="body">
      <div class="left" :style="{ backgroundImage: 'url(' + left + ')' }">
        <div class="box" :style="{ backgroundImage: 'url(' + bgbox + ')' }">
          <div class="h3">
            <img :src="iconArrow" /><span class="title">能耗预警</span
            ><span class="en">Energy consumption warning</span>
          </div>
          <div class="regional_table">
            <div class="loading_div" v-show="!showFlag">
              <!-- Loading样式自己写，不需要，直接删除即可 -->
              <div>Loading...</div>
            </div>
            <div class="success_info_body" v-show="showFlag">
              <div class="table_head">
                <div class="tr1 tr">企业简称</div>
                <div class="tr2 tr">能耗项目</div>
                <div class="tr3 tr">能耗配额</div>
                <div class="tr4 tr">超出百分比</div>
              </div>
              <div class="table_body">
                <!-- tableTop随时间推移不对增减，即列表不断往上 -->
                <div class="table_list" :style="{ top: tableTop + 'px' }">
                  <div
                    class="tr_div"
                    v-for="(item, index) in tableList"
                    :key="index"
                  >
                    <div class="tr1 tr">
                      {{ item.shortName }}
                    </div>
                    <div class="tr2 tr">
                      {{ item.type }}
                    </div>
                    <div class="tr3 tr">
                      {{ item.amount }}
                    </div>
                    <div class="tr4 tr">
                      {{ item.percentage }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <el-table
              :data="tableData"
              :header-cell-style="thStyle"
              :cell-style="cellStyle"
              :style="`height:${height / 2 - 60}px`"
              style="background: transparent"
              stripe
              ref="multipleTable"
            >
              <el-table-column
                prop="companyName"
                label="企业简称"
                align="center"
              />
              <el-table-column prop="type" label="能耗项目" align="center" />
              <el-table-column prop="amount" label="能耗配额" align="center" />
              <el-table-column
                prop="percentage"
                label="超出百分比"
                align="center"
              />
            </el-table> -->
          </div>
        </div>
        <div class="nbsp"></div>
        <div class="box" :style="{ backgroundImage: 'url(' + bgbox + ')' }">
          <div class="h3">
            <img :src="iconArrow" /><span class="title">档案存档</span
            ><span class="en">Archiving</span>
          </div>
          <div style="position: relative">
            <div
              style="
                position: absolute;
                top: -20px;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                color: #d1deee;
                pointer-events: none;
              "
            >
              <span
                style="font-size: 34px; font-family: Acens; color: #d1deee"
                >{{ archivesAllCounts }}</span
              ><span>档案总数</span>
            </div>
            <div
              ref="archivingRef"
              style="height: 240px"
              class="pie"
              :style="{ backgroundImage: 'url(' + pie + ')' }"
            />
          </div>

          <div class="ul">
            <div
              class="li"
              v-for="(item, index) in archivesCounts"
              :key="index"
              :style="{ backgroundImage: 'url(' + bgItem + ')' }"
            >
              <span><i class="color"></i>{{ item.typeName }}</span
              ><span>{{ item.counts }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right" :style="{ backgroundImage: 'url(' + right + ')' }">
        <div class="box" :style="{ backgroundImage: 'url(' + bgbox + ')' }">
          <div class="h3">
            <img :src="iconArrow" /><span class="title">能耗排名</span
            ><span class="en">Energy consumption ranking</span>
          </div>
          <div
            ref="energyRef"
            style="height: 345px; max-height: 380px"
            class="bar"
          />
        </div>
        <div class="nbsp"></div>
        <div class="box" :style="{ backgroundImage: 'url(' + bgbox + ')' }">
          <div class="h3">
            <img :src="iconArrow" /><span class="title">能耗统计</span
            ><span class="en">Energy consumption statistics</span>
          </div>
          <div class="tab-box">
            <div class="tabs">
              <div
                class="img"
                v-for="(item, index) in cates"
                :key="index"
                @mouseover="changeIndex(index)"
                @mouseout="changeIndexBack(index)"
                @click="chooseIndex(index)"
              >
                <img
                  :src="item.src"
                  v-show="!item.show && current != index"
                /><img
                  :src="item.srchover"
                  v-show="item.show || current == index"
                /><span :class="item.show || current == index ? 'hover' : ''">{{
                  item.name
                }}</span>
              </div>
            </div>
            <div class="count">
              <h4>能耗值</h4>
              <ul class="fp-box">
                <li
                  v-for="(item, index) in countNum"
                  :key="index"
                  :style="{ backgroundImage: 'url(' + card + ')' }"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ApiPostPage,
  ApiArchivesCounts,
  ApiEnergyRanking,
  ApiEnergyStatistics
} from "./api/index.js"
import bigTop from "@assets/images/big/top.png"
import bgbox from "@assets/images/big/box.png"
import iconArrow from "@assets/images/big/icon_arrow.png"
import bgItem from "@assets/images/big/bg_item.png"
import pie from "@assets/images/big/pie.png"
import water from "@assets/images/big/water.png"
import waterHover from "@assets/images/big/water_hover.png"
import elect from "@assets/images/big/elect.png"
import electHover from "@assets/images/big/elect_hover.png"
import coal from "@assets/images/big/coal.png"
import coalHover from "@assets/images/big/coal_hover.png"
import gas from "@assets/images/big/gas.png"
import gasHover from "@assets/images/big/gas_hover.png"
import waterv from "@assets/images/big/waterv.png"
import watervHover from "@assets/images/big/waterv_hover.png"
import other from "@assets/images/big/other.png"
import otherHover from "@assets/images/big/other_hover.png"
import oil from "@assets/images/big/oil.png"
import oilHover from "@assets/images/big/oil_hover.png"
import card from "@assets/images/big/card.png"
import left from "@assets/images/big/left.png"
import right from "@assets/images/big/right.png"
import geoJson from "./nanning.json"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

import * as echarts from "echarts"

export default {
  name: "BigScreen",
  data() {
    return {
      key: 0,
      height: document.body.clientHeight,
      searchQuery: {
        area: ""
      },
      timer: null,
      left,
      right,
      card,
      water,
      waterHover,
      elect,
      electHover,
      coal,
      coalHover,
      gas,
      gasHover,
      other,
      otherHover,
      pie,
      bgItem,
      bigTop,
      bgbox,
      iconArrow,
      cellStyle: {
        padding: "12px 0",
        background: "rgba(255,255,255,0.04)"
      },
      thStyle: {
        color: "#D1DEEE",
        fontWeight: "100",
        background: "rgba(255,255,255,0.04)"
      },
      /* -------------- table -------------- */
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      count: 2,
      archivesCounts: [
        {
          type: "1",
          typeName: "企业评估报告",
          counts: 0,
          percentage: 0
        },
        {
          type: "2",
          typeName: "专项监察文件",
          counts: 0,
          percentage: 0
        },
        {
          type: "3",
          typeName: "日常监察文件",
          counts: 0,
          percentage: 0
        }
      ],
      archivesAllCounts: 0,
      cates: [
        {
          id: 1,
          name: "水",
          src: water,
          srchover: waterHover,
          show: false
        },
        {
          id: 2,
          name: "电",
          src: elect,
          srchover: electHover,
          show: false
        },
        {
          id: 3,
          name: "煤",
          src: coal,
          srchover: coalHover,
          show: false
        },
        {
          id: 4,
          name: "天然气",
          src: gas,
          srchover: gasHover,
          show: false
        },
        {
          id: 5,
          name: "水蒸气",
          src: waterv,
          srchover: watervHover,
          show: false
        },
        {
          id: 6,
          name: "油",
          src: oil,
          srchover: oilHover,
          show: false
        },
        {
          id: 7,
          name: "其他",
          src: other,
          srchover: otherHover,
          show: false
        }
      ],
      current: 0,
      countNum: [],
      system_area: [],
      tableTimer: null,
      tableTop: 0, //列表向上移动的像素
      tableList: [], //tableList是列表的数据对象
      showFlag: false,
      componentTimer: null,
      maxCanSee: 6, //maxCanSee代表可视范围内的最大完整数据条数
      tableLineHeight: 45 //tableLineHeight代表列表中一行的高度
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async getArchivesCounts() {
      const res = await ApiArchivesCounts(this.searchQuery)
      this.archivesCounts = res.length
        ? res
        : [
            {
              type: "1",
              typeName: "企业评估报告",
              counts: 0,
              percentage: 0
            },
            {
              type: "2",
              typeName: "专项监察文件",
              counts: 0,
              percentage: 0
            },
            {
              type: "3",
              typeName: "日常监察文件",
              counts: 0,
              percentage: 0
            }
          ]
      this.archivesAllCounts = 0
      res.forEach(vm => {
        this.archivesAllCounts += vm.counts
      })
      this.initeCharts()
    },
    async init() {
      
      this.tableTop = 0
      this.showFlag = false
      let ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf("msie")) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      document.getElementById("body").style.zoom = 100 / Number(ratio)

      const res = await ApiPostPage(this.searchQuery)
      this.pageIndex = res.current
      this.pageSize = res.size
      this.count = res.total
      this.tableList = res.records
      this.showFlag = true
      this.actionFun()
    },
    actionFun() {
      if (this.tableList.length > 6) {
        this.tableTimerFun()
      } else {
        this.fillTableList()
      }
      this.showFlag = true
    },
    fillTableList() {
      var addLength = this.maxCanSee - this.tableList.length
      for (var i = 0; i < addLength; i++) {
        this.tableList.push({
          orderNo: "-",
          projectName: "-",
          needVol: "-",
          completeDate: "-",
          process: "-"
        })
      }
    },
    tableTimerFun() {
      var count = 0 //每滚动一次，count加1
      if (this.tableList.length > this.maxCanSee) {
        //tableList是列表的数据对象，maxCanSee代表可视范围内的最大完整数据条数
        this.tableTimer = setInterval(() => {
          if (count < this.tableList.length - this.maxCanSee) {
            //如果还没滚动到最后一条数据，则列表向上移动以上的高度
            this.tableTop -= this.tableLineHeight //tableLineHeight代表列表中一行的高度
            count++ //每滚动一次，count加1
          } else {
            //如果滚动到最后一条，则恢复初始状态
            count = 0
            this.tableTop = 0
          }
        }, 3000)
      }
    },
    componentTimerFun() {
      this.componentTimer = setInterval(() => {
        this.bsGetOrderProcessList()
      }, 3600000)
    },
    initeCharts() {
      const seriesData = this.archivesCounts.map(item => ({
        value: item.counts,
        name: item.typeName
      }))
      this.archivingRef = echarts.init(this.$refs.archivingRef, "macarons")
      this.archivingRef.setOption({
        color: ["#95D2FD", "#005EFE", "#F4A761"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: false,
          top: "1%",
          left: "center"
        },
        series: [
          {
            name: "档案存档",
            type: "pie",
            radius: ["65%", "82%"],
            center: ["50%", "43%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: "#121a47",
              borderWidth: 5
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: seriesData
          }
        ]
      })
    },
    async getEnergyRanking() {
      const res = await ApiEnergyRanking(this.searchQuery)
      const datas = res.reverse()
      var seriesData = []
      if (datas.length)
        seriesData = datas.map(item => item.complexEquivalenceValueSum)
      var yData = []
      if (datas.length) yData = datas.map(item => item.areaName) || []
      this.energyRef = echarts.init(this.$refs.energyRef, "macarons")
      if (seriesData.length) {
        this.energyRef.setOption(
          {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c}"
            },
            legend: { show: false },
            grid: {
              show: false,
              left: "3%",
              right: "4%",
              bottom: "3%",
              top: "3%",
              containLabel: true
            },
            xAxis: {
              type: "value",
              boundaryGap: [0, 0.01],
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#D1DEEE"
                }
              }
            },
            yAxis: {
              type: "category",
              show: yData.length > 0 ? true : false,
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.5)"
                },
                label: {
                  color: "#fff"
                }
              },
              data: yData
            },
            series: [
              {
                name: "能耗数值",
                type: "bar",
                barWidth: 8,
                itemStyle: {
                  normal: {
                    barBorderRadius: [0, 2, 2, 0],
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "#24DDFF"
                      },
                      {
                        offset: 1,
                        color: "#146DD3"
                      }
                    ])
                  }
                },
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(255, 255, 255, 0.08)"
                },
                data: seriesData
              }
            ]
          },
          true
        )
      } else {
        this.energyRef.setOption(
          {
            title: {
              text: "暂无数据",
              x: "center",
              y: "center",
              textStyle: {
                fontSize: 12,
                fontWeight: "normal",
                color: "#909399"
              }
            }
          },
          true
        )
      }
    },
    changeIndex(e) {
      console.log(e, "移入")
      this.cates[e].show = !this.cates[e].show
    },
    changeIndexBack(e) {
      console.log(e, "移除")
      this.cates[e].show = !this.cates[e].show
    },
    chooseIndex(e) {
      this.current = e
      this.countTransform()
    },
    async countTransform() {
      const res = await ApiEnergyStatistics(this.searchQuery)
      let countNum = []
      switch (this.current) {
        case 0:
          countNum = res.waterAmountSum
          break
        case 1:
          countNum = res.electricityAmountSum
          break
        case 2:
          countNum = res.coalAmountSum
          break
        case 3:
          countNum = res.gasAmountSum
          break
        case 4:
          countNum = res.steamAmountSum
          break
        case 5:
          countNum = res.oilAmountSum
          break
        case 6:
          countNum = res.otherAmountSum
          break
      }
      this.countNum = ("000000000" + countNum).slice(-10).split("")
    },
    async getEchartMap() {
      const res = await this.resolveDictItemEnum(["system_area"])
      echarts.registerMap("ISD", geoJson)
      var chart = echarts.init(this.$refs.echartMap, "macarons")
      chart.setOption({
        title: {
          show: false,
          text: "各区县",
          left: "left",
          padding: [10, 0, 10, 30],
          textStyle: {
            color: "#fff",
            fontSize: 24
          }
        },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b}"
        },
        visualMap: {
          type: "continuous",
          min: 0,
          max: 20,
          // text: ["High", "Low"],
          realtime: false,
          calculable: true,
          borderColor: "#5376B4", //边框颜色
          borderWidth: 3,
          inRange: {
            color: ["#106dd3"] // 面积填充颜色
          },
          show: false
        },
        series: [
          {
            type: "map",
            mapType: "ISD",
            top: "14%",
            roam: false, //禁止缩放
            label: {
              normal: {
                show: true,
                color: "rgba(255,255,255,.7)" // 区域名称颜色
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(18, 26, 71, 1)", // 边界颜色
                borderWidth: 1,
                // areaColor: {
                //   type: "radial",
                //   x: 0.5,
                //   y: 0.5,
                //   r: 0.8,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: "#1940aa" // 0% 处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: "#1940aa" // 100% 处的颜色
                //     }
                //   ],
                //   globalCoord: false // 缺省为 false
                // },
                shadowColor: "rgba(18, 26, 71, .5)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 1
              },
              emphasis: {
                areaColor: "#00c2ff",
                label: { show: true, color: "#fff" }
              } // 选中区域颜色
            },
            data: res.system_area.map(item => ({
              value: item.v,
              name: item.k
            }))
          }
        ]
      })
      var flag = true // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
      var _this = this
      var index = 0
      // 鼠标移动上去的时候的高亮动画
      chart.on("click", function (param) {
        flag = false
        // clearInterval(_this.startCharts)
        //取消之前高亮图形
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index
        })

        index = param.dataIndex
        let area = index + 1
        //**解决文章所述问题**// //记录上一次选中值重新进入时取消高亮
        if (_this.searchQuery.area === area) {
          _this.searchQuery.area = ""
          _this.initPage()
          if (!flag) {
            flag = true
          }
        } else {
          _this.searchQuery.area = area
          _this.initPage()

          //高亮当前图形
          chart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: param.dataIndex
          })
          //显示tooltip
          chart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: param.dataIndex
          })
        }
      })

      //图标随窗口大小缩放
      window.addEventListener("resize", function () {
        chart.resize()
      })

      //自动高亮显示
      /*
      var chartHover = function () {
        var dataLen = 12

        // 取消之前高亮的图形
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index
        })
        index = (index + 1) % dataLen

        // 高亮当前图形
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index
        })
        // 显示 tooltip
        chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index
        })
      }

      _this.startCharts = setInterval(chartHover, 5000)
      */
      // 4、鼠标移出之后，恢复自动高亮
      // chart.on("mouseout", function (param) {
      //   if (!flag) {
      //     _this.startCharts = setInterval(chartHover, 5000)
      //     flag = true
      //   }
      // })
    },
    initPage() {
      this.init()
      this.getArchivesCounts()
      this.getEnergyRanking()
      this.countTransform()
    },
    pageResize() {
      this.$nextTick(() => {
        window.screenHeight = document.body.clientHeight
        this.height = window.screenHeight
      })
    }
  },
  mounted() {
    this.timer = setInterval(this.initPage, 1000)
    let _this = this //赋值vue的this
    window.onresize = () => {
      _this.pageResize()
    }

    this.$nextTick(() => {
      _this.getEchartMap()
    })
  },
  //注销window.onresize事件
  destroyed() {
    window.onresize = null
  },
  watch: {
    height(val) {
      this.height = val
      this.key++ //当窗口宽度变化时，增加key值，从而刷新d
    },
    activeFactoryId(val, oldVal) {
      clearInterval(this.componentTimer)
      this.bsGetOrderProcessList()
      this.componentTimerFun()
    }
  },
  beforeDestroy() {
    clearInterval(this.componentTimer)
    clearInterval(this.tableTimer)
  }
}
</script>
<style>
body {
  background: #121a47;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.big-screen {
  height: 100vh;
  .top {
    width: 100%;
    height: 84px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .h3 {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 30px;
    img {
      width: 22px;
      height: 25px;
    }
    .title {
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d1deee;
      line-height: 21px;
      margin: 0 8px 0 4px;
    }
    .en {
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(209, 222, 238, 0.6);
      line-height: 14px;
      text-transform: uppercase;
    }
  }
  .main {
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
    .left,
    .right {
      padding-top: 84px;
      padding-left: 20px;
      width: 580px;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .left {
      padding-right: 49px;
    }
    .right {
      padding-right: 20px;
      padding-left: 49px;
    }
    .box {
      width: 515px;
      padding: 0 30px;
      height: 460px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center 0;
      pointer-events: auto;
      overflow: hidden;
    }
    .nbsp {
      height: 26px;
    }
  }
}

.pie {
  margin: 0 auto;
  width: 206px;
  height: 206px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ul {
  display: flex;
  flex-flow: wrap;
  margin-top: 1%;
  .li {
    width: 195px;
    padding: 0 14px;
    height: 37px;
    margin-left: 16px;
    margin-bottom: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #d1deee;
    span {
      display: flex;
      align-items: center;
    }
    i {
      margin-right: 10px;
      display: block;
      width: 14px;
      height: 14px;
      background: #00b9fe;
    }
    &:nth-child(2) {
      i {
        background: #0081fe;
      }
    }
    &:nth-child(3) {
      i {
        background: #edaf76;
      }
    }
  }
}

.tab-box {
  .tabs {
    display: flex;
    align-items: center;
    flex-flow: wrap;
    margin: 20px 10px 10px;
    .img {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #00a6fe;
      margin-bottom: 10px;
      cursor: pointer;
      &.hover {
        color: #d1deee;
      }
      img {
        width: 56px;
        height: 56px;
        margin-bottom: 5px;
        margin-top: 10px;
      }
      span {
        &.hover {
          color: #d1deee;
        }
      }
    }
  }
}

.fp-box {
  display: flex;
  align-items: center;
  li {
    display: block;
    background-size: 100% 100%;
    background-position: 0 0;
    width: 32px;
    height: 33px;
    line-height: 33px;
    margin-right: 6px;
    font-size: 30px;
    font-family: Acens;
    color: #ffffff;
    text-align: center;
  }
}

.count {
  margin: 3% 0 0 40px;
  h4 {
    padding: 11px 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #d1deee;
    line-height: 20px;
  }
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
  font-size: 12px;
  border: 0;
}
::v-deep .el-table td.el-table__cell,
::v-deep .el-table th.el-table__cell.is-leaf {
  border-bottom: 0;
}

::v-deep.el-table--enable-row-transition .el-table__body td.el-table__cell {
  background-color: transparent !important;
  border: 0;
}
::v-deep.el-table td.el-table__cell div.cell {
  background-color: transparent !important;
  border: 0;
}
::v-deep .el-table {
  background-color: transparent !important;
  border: 0;
}

::v-deep .el-table__row {
  background-color: transparent !important;
  border: 0;
}
/* 去除底部白线 */
.el-table::before {
  background-color: transparent;
  border: 0;
}
::v-deep .el-table__empty-text {
  font-size: 12px;
  border: 0;
}
::v-deep .el-table__inner-wrapper::before {
  width: 0;
}
::v-deep .el-table td.el-table__cell div.cell {
  color: #d1deee;
}

::v-deep
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
  td {
  background-color: rgba(255, 255, 255, 0.04) !important; /*隔行变色*/
}

.echartMap {
  width: 100%;
  height: 100vh;
}
.regional_table {
  height: 350px;
}
.loading_div {
  color: #eee;
  padding-top: 100px;
}
.table_head {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  color: #eee;
  text-align: center;
  font-size: 15px;
}
.tr1 {
  width: 25%;
}
.tr2 {
  width: 25%;
}
.tr3 {
  width: 18%;
}

.tr4 {
  width: 18%;
}
.tr5 {
  flex: 1;
}
.tr {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 5px;
  text-align: center;
  font-size: 14px;
}

.table_body {
  width: 100%;
  height: 270px;
  overflow: hidden;
  position: relative;
}

.table_list {
  width: 100%;
  position: absolute;
  transition: all 0.5s;
}

.tr_div {
  width: 100%;
  display: flex;
  color: #eee;
  text-align: center;
  line-height: 45px;
  font-size: 13px;
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.04);
  }
}
.exception_style_tr {
  animation: exception_style_tr 0.8s linear;
  -moz-animation: exception_style_tr 0.8s linear;
  -webkit-animation: exception_style_tr 0.8s linear;
  -o-animation: exception_style_tr 0.8s linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@keyframes exception_style_tr {
  0% {
    background: rgba(3, 145, 167, 0.1);
  }
  50% {
    background: rgba(250, 4, 4, 0.15);
  }
  100% {
    background: rgba(3, 145, 167, 0.1);
  }
}

@-moz-keyframes exception_style_tr {
  0% {
    background: rgba(3, 145, 167, 0.1);
  }
  50% {
    background: rgba(250, 4, 4, 0.15);
  }
  100% {
    background: rgba(3, 145, 167, 0.1);
  }
}
@-webkit-keyframes exception_style_tr {
  0% {
    background: rgba(3, 145, 167, 0.1);
  }
  50% {
    background: rgba(250, 4, 4, 0.15);
  }
  100% {
    background: rgba(3, 145, 167, 0.1);
  }
}
@-o-keyframes exception_style_tr {
  0% {
    background: rgba(3, 145, 167, 0.1);
  }
  50% {
    background: rgba(250, 4, 4, 0.15);
  }
  100% {
    background: rgba(3, 145, 167, 0.1);
  }
}
.exception_style {
  font-weight: bold;
  animation: exception_style 0.8s linear;
  -moz-animation: exception_style 0.8s linear;
  -webkit-animation: exception_style 0.8s linear;
  -o-animation: exception_style 0.8s linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@keyframes exception_style {
  0% {
    color: #eee;
  }
  50% {
    color: #fa0404;
  }
  100% {
    color: #eee;
  }
}

@-moz-keyframes exception_style {
  0% {
    color: #eee;
  }
  50% {
    color: #fa0404;
  }
  100% {
    color: #eee;
  }
}
@-webkit-keyframes exception_style {
  0% {
    color: #eee;
  }
  50% {
    color: #fa0404;
  }
  100% {
    color: #eee;
  }
}
@-o-keyframes exception_style {
  0% {
    color: #eee;
  }
  50% {
    color: #fa0404;
  }
  100% {
    color: #eee;
  }
}
.notice_style {
  font-weight: bold;
  color: #d1ce02;
}
</style>
