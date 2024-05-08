<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
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
            v-for="(item, index) in energy_type"
            :key="index"
            @click="changeTab(index, item.v)"
          >
            {{ item.k }}
          </text>
        </div>
        <div
          ref="companyRef"
          :style="`height:${
            tableData.length ? (areaList.length > 10 ? '500' : '300') : '200'
          }px`"
        />
      </div>
      <div class="hr"></div>
      <el-table :data="tableData" stripe :header-cell-style="thStyle">
        <el-table-column
          width="80"
          :index="indexAdd"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column width="200" prop="area" label="区域" align="center" />
        <el-table-column prop="amountSum" :label="monthLabel" align="center" />
        <el-table-column prop="percentage" label="百分比" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import { formatStamp } from "@share/helper"
import { ApiPostPage } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import finish from "@assets/images/finish.png"
import unfinish from "@assets/images/unfinish.png"
import * as echarts from "echarts"
import titleIcon from "@assets/images/title_icon.png"
export default {
  data() {
    return {
      monthLabel: "选定月份能耗",
      thStyle: {
        color: "#9E9FA0",
        fontWeight: "100"
      },
      finish,
      unfinish,
      /* --------------  -------------- */
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        ids: []
      },
      uploadBox: {
        show: false
      },
      /* -------------- table -------------- */
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      count: 2,
      /* -------------- charts -------------- */
      hover: 0,
      commandStats: [120, 400, 59, 112, 23],
      type: "水",
      energy_type: [],
      titleIcon,
      areaList: []
    }
  },
  computed: {
    checkedAll: {
      get() {
        const d = this.tableData
        return d.length === 0 ? false : d.every(item => item.checked)
      },
      set(value) {
        this.tableData.forEach(item => (item.checked = value))
      }
    },
    selectedRows() {
      return this.tableData.filter(row => row.checked)
    },
    shouldDisabled() {
      return this.selectedRows.length === 0
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async getEnergyType() {
      const res = await this.resolveDictItemEnum(["energy_type"])
      Object.assign(this, res)
    },
    async init() {
      const res = await ApiPostPage({
        ...this.searchQuery,
        current: this.pageIndex,
        size: this.pageSize,
        type: this.type
      })

      this.pageIndex = 1
      this.pageSize = this.pageSize
      this.total = res.length
      this.tableData = res.map(item => ({
        area: item.area != "小计" ? this.areaFormat(item.area) : item.area,
        amountSum: item.amountSum,
        percentage:
          item.percentage != "NaN" && item.percentage
            ? item.percentage + "%"
            : item.area != "小计"
            ? 0 + "%"
            : "0" + "%"
      }))
      this.initeCharts()
    },
    async getSystemArea() {
      const res = await this.resolveDictItemEnum(["system_area"])
      Object.assign(this, res)
    },
    areaFormat(row) {
      let type = ""
      this.system_area.forEach(item => {
        if (row == item.v) {
          type = item.k
        }
      })
      return type
    },
    onSearch(searchQuery) {
      var params = {}
      if (searchQuery.areaList == "") {
        this.tableData = []
        this.searchQuery = {}
        this.monthLabel = "选定月份能耗"
        this.initeCharts()
      } else {
        if (searchQuery.areaList) {
          params.areaList = searchQuery.areaList
            .map(item => {
              return item[0]
            })
            .join(",")
        }
        this.areaList = searchQuery.areaList
        if (searchQuery.startTime)
          params.startTime = moment(searchQuery.startTime).format("YYYY-MM")
        if (searchQuery.endTime)
          params.endTime = moment(searchQuery.endTime).format("YYYY-MM")
        this.searchQuery = params
        this.monthLabel = `${params.startTime}~${params.endTime}`
        this.init()
      }
    },
    onPageChange(index, size) {
      this.init()
    },
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    changeTab(e, val) {
      this.hover = e
      this.type = val
      this.init()
    },
    initeCharts() {
      this.companyRef = echarts.init(this.$refs.companyRef, "macarons")
      if (this.tableData.length) {
        this.companyRef.resize({
          height: this.areaList.length > 10 ? 500 : 300
        })
        this.companyRef.setOption(
          {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} "
            },
            grid: {
              left: "1%",
              top: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            series: [
              {
                name: "区域能耗对比",
                type: "pie",
                radius: [20, 60],
                center: [
                  "50%",
                  this.searchQuery?.areaList?.length > 10 ? "20%" : "50%"
                ],
                top: 0,
                left: "center",
                itemStyle: {
                  borderColor: "#fff",
                  borderWidth: 1
                },
                label: {
                  alignTo: "edge",
                  formatter: params => {
                    console.log("此时params", params)
                    if (params.name !== "") {
                      return (
                        `{name|${params.name}}` +
                        `\n\n{value|${
                          params.percent === undefined ? 0 : params.percent
                        }%}`
                      )
                    }
                    return ""
                  },
                  minMargin: 5,
                  edgeDistance: 10,
                  lineHeight: 15,
                  rich: {
                    time: {
                      fontSize: 10,
                      color: "#999"
                    }
                  }
                },
                labelLine: {
                  length: 15,
                  length2: 0,
                  maxSurfaceAngle: 80
                },
                data: this.tableData.map(item => {
                  if (item.area != "小计")
                    return {
                      name: item.area,
                      value: item.amountSum
                    }
                })
              }
            ]
          },
          true
        )
      } else {
        this.companyRef.resize({
          height: this.areaList.length > 10 ? 500 : 300
        })
        this.companyRef.setOption(
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
    }
  },
  components: { Filters },
  created() {
    // this.init()
    this.getSystemArea()
  },
  mounted() {
    this.initeCharts()
    this.getEnergyType()
  }
}
</script>

<style lang="scss" scoped>
.sys-table-action {
  margin-bottom: 20px;
}
.table-content {
  /* display: flex;
  justify-content: space-between; */
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
.sys-table-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.sys-table-main-actions {
  display: flex;
  flex-direction: column;
  .finish {
    padding: 3px 7px;
    background: rgba(56, 146, 255, 0.08);
    border-radius: 2px;
  }
  .unfinish {
    padding: 3px 7px;
    background: rgba(255, 172, 56, 0.08);
    border-radius: 2px;
  }
}
:deep(.el-table .cell) {
  /*text-align: center;*/
  white-space: pre-line; /*保留换行符*/
}
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
  width: auto;
  text {
    margin: 0 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &.hover {
      color: #207cff;
      border-bottom: 2px solid #207cff;
    }
  }
}
</style>
