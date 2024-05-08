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
          ><span class="card-title"> 企业能耗对比</span>
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
        <div ref="companyRef" style="height: 275px" />
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
        <el-table-column
          width="240"
          prop="companyName"
          label="企业名称"
          align="center"
        />
        <el-table-column
          prop="amountSum"
          :label="amountSumTitle"
          align="center"
        />
        <el-table-column
          prop="momAmountSum"
          :label="momAmountSumTitle"
          align="center"
        />
        <el-table-column prop="momIncrease" label="	环比增幅量" align="center" />
        <el-table-column
          prop="yoyAmountSum"
          :label="yoyAmountSumTitle"
          align="center"
        />
        <el-table-column prop="yoyIncrease" label="同比增幅量" align="center" />
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
      amountSumTitle: "选定月份能耗",
      momAmountSumTitle: "环比月份能耗",
      yoyAmountSumTitle: "同比月份能耗",
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
      titleIcon
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
      this.pageSize = res.length
      this.total = res.length
      this.tableData = res
      this.initeCharts()
    },
    async onRemoveRow({ id }) {
      ElMessageBox.confirm(`您确定要删除该数据吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        // .then(() => ApiPostDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要批量删除选中的数据吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        // .then(() =>
        //   Promise.all(this.selectedRows.map(({ id }) => ApiPostDelete({ id })))
        // )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(searchQuery) {
      var params = {}
      if (searchQuery.companyName == "") {
        this.tableData = []
        this.searchQuery = {}
        this.amountSumTitle = "选定月份能耗"
        this.momAmountSumTitle = "环比月份能耗"
        this.yoyAmountSumTitle = "同比月份能耗"
        this.initeCharts()
      } else {
        if (searchQuery.companyName) {
          params.companyIdList = searchQuery.companyName
            .map(item => {
              return item[1]
            })
            .join(",")
        }
        if (searchQuery.month)
          params.time = moment(searchQuery.month).format("YYYY-MM")
        this.searchQuery = params

        const month = params.time
        this.amountSumTitle = `${month}`
        this.momAmountSumTitle = `${moment(searchQuery.month - 1).format(
          "YYYY-MM"
        )}`
        this.yoyAmountSumTitle = `${
          moment(searchQuery.month).format("YYYY") - 1
        }-${moment(searchQuery.month).format("MM")}`
        this.init()
      }
    },
    onEditorChange(type, ids) {
      if (type === 2) {
        ids = [ids]
      } else if (type === 3) {
        ids = this.selectedRows.map(row => row.id)
      }
      this.editorBox.show = true
      this.editorBox.ids = ids
      this.editorBox.type = type
    },
    onUploadChange() {
      this.uploadBox.show = true
    },
    upload() {},
    onPageChange(index, size) {
      this.init()
    },
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    changeTab(e, value) {
      this.hover = e
      this.type = value
      this.init()
    },
    initeCharts() {
      this.companyRef = echarts.init(this.$refs.companyRef, "macarons")
      var types = {
        amountSum: this.amountSumTitle,
        momAmountSum: this.momAmountSumTitle,
        momIncrease: "环比增幅量",
        yoyAmountSum: this.yoyAmountSumTitle,
        yoyIncrease: "同比增幅量"
      }
      const labelOption = {
        show: false,
        position: "insideBottom",
        distance: 15,
        align: "left",
        verticalAlign: "middle",
        rotate: 90,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {}
        }
      }

      const series = Object.keys(types).map(key => {
        return {
          name: types[key],
          type: "bar",
          barGap: "30%",
          label: labelOption,
          emphasis: {
            focus: "series"
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)"
          },
          data: this.tableData.map(item => item[key])
        }
      })
      if (this.tableData.length) {
        this.companyRef.setOption(
          {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            grid: {
              show: false,
              left: "3%",
              right: "3%",
              bottom: "3%",
              top: "3%",
              containLabel: true
            },
            toolbox: {
              show: false
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true,
                data: this.tableData.map(item => item.companyName)
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: series
          },
          true
        )
      } else {
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
  },
  mounted() {
    this.getEnergyType()
    this.initeCharts()
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
