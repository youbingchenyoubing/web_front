<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card" shadow="never" :body-style="bodyStyle">
        <template #header>
          <div class="card-header">
            <el-image :src="titleIcon" class="img"
              ><template #error>
                <el-icon><Picture /></el-icon>
              </template> </el-image
            ><span class="card-title"> 能耗告警记录</span>
          </div>
        </template>
        <template #default>
          <el-scrollbar>
            <el-table
              :data="tableData"
              style="width: 100%; --el-table-border-color: none"
              :stripe="false"
              :cell-style="cellStyle"
              :header-cell-style="thStyle"
            >
              <el-table-column
                width="200"
                prop="companyName"
                label="企业名称"
                align="center"
              />
              <el-table-column prop="type" label="能源项目" align="center" />
              <el-table-column prop="amount" label="分配配额" align="center" />
              <el-table-column
                prop="actualAmount"
                label="实际消耗"
                align="center"
              />
              <el-table-column
                prop="percentage"
                label="超出额度"
                align="center"
              />
            </el-table>
          </el-scrollbar>
        </template> </el-card
    ></el-col>
    <el-col :span="12">
      <el-card class="box-card" shadow="never" :body-style="bodyStyle">
        <template #header>
          <el-row :gutter="20">
            <el-col :span="18">
              <div class="card-header">
                <el-image :src="titleIcon" class="img"
                  ><template #error>
                    <el-icon><Picture /></el-icon>
                  </template> </el-image
                ><span class="card-title">
                  能源消耗趋势
                  <i style="font-style: normal; color: #9e9fa0"
                    >({{ year }}年度)</i
                  ></span
                >
              </div></el-col
            >
            <el-col :span="6">
              <el-select
                v-model="type"
                class="m-2"
                @change="changeType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in energy_type"
                  :key="item.v"
                  :label="item.k"
                  :value="item.v"
                />
              </el-select>
            </el-col>
          </el-row>
        </template>
        <template #default>
          <div ref="commandStarRef" style="height: 275px" />
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ApiAlarmList, ApiSelectEnergyTrend } from "../api"
import * as echarts from "echarts"
import { mapActions } from "pinia"
import titleIcon from "@assets/images/title_icon.png"
var t = new Date()
export default {
  data() {
    return {
      energy_type: [],
      year: t.getFullYear(),
      titleIcon,
      bodyStyle: {
        padding: "0 12px"
      },
      thStyle: {
        backgroundColor: "#f2f4f7",
        fontWeight: "100"
      },
      cellStyle: {
        padding: "12px 0"
      },
      dialogVisible: false,
      tableData: [],
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 5,
      count: 1,
      type: "水",
      options: [
        {
          label: "水",
          value: "水"
        },
        {
          label: "电",
          value: "电"
        },
        {
          label: "煤",
          value: "煤"
        },
        {
          label: "天然气",
          value: "气"
        }
      ],
      commandStats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  created() {
    this.init()
    this.getEnergyType()
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async getEnergyType() {
      const res = await this.resolveDictItemEnum(["energy_type"])
      Object.assign(this, res)
    },
    async init() {
      const res = await ApiAlarmList({
        current: this.pageIndex,
        size: this.pageSize
      })
      res.records.forEach(row => {
        row.checked = false
      })
      this.tableData = res.records
      this.count = res.total
      this.initeCharts()
    },
    changeType(e) {
      console.log("e", e)
      this.initeCharts()
    },
    async initeCharts() {
      const res = await ApiSelectEnergyTrend({
        type: this.type
      })
      var commandStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      res.map(item => {
        if (item.amountSum) commandStats[item.month - 1] = item.amountSum
      })

      this.commandStarRef = echarts.init(this.$refs.commandStarRef, "macarons")
      this.commandStarRef.setOption({
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
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: this.type,
            type: "line",
            smooth: true,
            data: commandStats
          }
        ]
      })
    },
    onOpenDetail() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-card__header) {
  border-bottom: 0;
}
.img {
  width: 16px;
  height: 16px;
}
.box-card {
  height: 350px;
  background: #ffffff;
  border-radius: 4px;
  .card-header {
    display: flex;
    align-items: center;
  }
  .card-title {
    margin-left: 10px;
    color: #000000;
    font-size: 16px;
  }
}
</style>
