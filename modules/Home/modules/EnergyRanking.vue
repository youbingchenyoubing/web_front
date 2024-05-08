<template>
  <el-card class="box-card" shadow="never" :body-style="bodyStyle">
    <template #header>
      <div class="card-header">
        <el-image :src="titleIcon" class="img"
          ><template #error>
            <el-icon><Picture /></el-icon>
          </template>
        </el-image>
        <div class="card-title">能源消耗排名<span>（2022年度）</span></div>
      </div>
    </template>
    <template #default>
      <el-scrollbar width="1660px">
        <el-table
          :data="tableData"
          style="width: 100%; --el-table-border-color: none"
          :stripe="false"
          :cell-style="cellStyle"
          :header-cell-style="thStyle"
        >
          <el-table-column
            width="80"
            prop="id"
            label="序号"
            align="center"
            type="index"
          />
          <el-table-column
            prop="companyName"
            width="200"
            label="企业名称"
            align="center"
          />
          <el-table-column
            prop="area"
            width="130"
            label="所在区划"
            sortable
            align="center"
          />
          <el-table-column
            prop="electricityAmountSum"
            width="140"
            :label="'用电量\n（万千瓦时）'"
            sortable
            :render-header="renderHeader"
            align="center"
          />
          <el-table-column
            prop="coalAmountSum"
            width="110"
            :label="'用煤量\n（万吨）'"
            sortable
            align="center"
          />
          <el-table-column
            prop="oilAmountSum"
            width="110"
            sortable
            :label="'用油量\n（万吨）'"
            align="center"
          />
          <el-table-column
            prop="gasAmountSum"
            width="140"
            :label="'用气量\n（万立方米）'"
            sortable
            align="center"
          />
          <el-table-column
            prop="waterAmountSum"
            width="110"
            :label="'用水量\n（万吨）'"
            align="center"
            sortable
          />
          <el-table-column
            prop="steamAmountSum"
            width="150"
            :label="'用水蒸气量\n（百万千焦）'"
            sortable
            align="center"
          />
          <el-table-column
            prop="otherAmountSum"
            width="110"
            :label="'其他\n（万吨）'"
            align="center"
            sortable
          />
          <el-table-column
            prop="outputEquivalentValueSum"
            width="140"
            :label="'产出能源量当量值\n（吨标准煤）'"
            sortable
            align="center"
          />
          <el-table-column
            prop="outputEquivalenceValueSum"
            width="160"
            :label="'产出能源量当等价值\n（吨标准煤）'"
            sortable
            align="center"
          />
        </el-table>
      </el-scrollbar>
    </template>
  </el-card>
</template>

<script>
import { ApiSelectEnergyRanking } from "../api"
import * as echarts from "echarts"
import titleIcon from "@assets/images/title_icon.png"
export default {
  data() {
    return {
      titleIcon,
      bodyStyle: {
        padding: "0 12px"
      },
      thStyle: {
        color: "#9E9FA0",
        fontWeight: "100"
      },
      cellStyle: {
        padding: "12px 0",
        color: "#4E5969"
      },
      dialogVisible: false,
      tableData: [],
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 7,
      count: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await ApiSelectEnergyRanking({})
      res.records.forEach(row => {
        row.checked = false
      })
      this.tableData = res.records
      this.count = res.total
    },
    // render 事件
    renderheader(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [
        h("span", {}, column.label.split("|")[0]),
        h("br"),
        h("span", {}, column.label.split("|")[1])
      ])
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
  margin-top: 20px;
  padding-bottom: 10px;
}
.card-header {
  display: flex;
  align-items: center;
}
.card-title {
  margin-left: 10px;
  color: #000000;
  font-size: 16px;
  span {
    font-size: 12px;
    color: #9e9fa0;
  }
}
:deep(.el-table .cell) {
  /*text-align: center;*/
  white-space: pre-line; /*保留换行符*/
}
</style>
