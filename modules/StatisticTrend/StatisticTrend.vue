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
          ><span class="card-title"> 能源消耗趋势</span>
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
        <div ref="trendRef" style="height: 275px" />
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
        <el-table-column prop="companyName" label="企业名称" align="center" />
        <el-table-column
          prop="area"
          width="130"
          label="所在区划"
          sortable
          align="center"
        />
        <el-table-column
          prop="industry"
          width="130"
          label="行业"
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
      </el-table>

      <div class="sys-table-footer">
        <div></div>
        <el-pagination
          v-model:currentPage="pageIndex"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="onPageChange(pageIndex, $event)"
          @current-change="onPageChange($event, pageSize)"
        />
      </div>
    </div>
    <PostEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import moment from "moment"
import { formatStamp } from "@share/helper"
import { ApiSelectEnergyRanking, ApiSelectEnergyTrend } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import PostEditorDialog from "./modules/PostEditorDialog.vue"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import finish from "@assets/images/finish.png"
import unfinish from "@assets/images/unfinish.png"
import * as echarts from "echarts"
import titleIcon from "@assets/images/title_icon.png"
export default {
  data() {
    return {
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
      /* -------------- echarts -------------- */
      hover: 0,
      energy_type: [],
      type: "水",
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
      const enums = await this.resolveDictItemEnum(["system_global_status"])
      const STATUS = buildVKEnum(enums.system_global_status)
      const res = await ApiSelectEnergyRanking({
        ...this.searchQuery,
        current: this.pageIndex,
        size: this.pageSize
      })

      this.pageIndex = res.current
      this.pageSize = res.size
      this.count = res.total
      this.tableData = res.records.map(post => {
        const { createTime, updateTime } = post
        if (createTime) {
          post.createTime = formatStamp("YYYY-MM-DD", createTime)
        }
        if (updateTime) {
          post.updateTime = formatStamp("YYYY-MM-DD", updateTime)
        }
        post.checked = false
        post.enabled = STATUS[post.enabled]
        return post
      })
      this.initeCharts()
    },
    changeTab(e, value) {
      this.hover = e
      this.type = value
      this.initeCharts()
    },
    async initeCharts() {
      const res = await ApiSelectEnergyTrend({
        ...this.searchQuery,
        type: this.type
      })
      var commandStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      res.map(item => {
        if (item.amountSum) commandStats[item.month - 1] = item.amountSum
      })

      this.trendRef = echarts.init(this.$refs.trendRef, "macarons")
      this.trendRef.setOption({
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
            name: "能源消耗趋势",
            type: "line",
            smooth: true,
            data: commandStats
          }
        ]
      })
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
      if (searchQuery) {
        var params = searchQuery

        if (!searchQuery.endTime && searchQuery.startTime) {
          return ElMessage.error("请选择结束月份")
        }
        if (searchQuery.endTime && !searchQuery.startTime) {
          return ElMessage.error("请选择开始月份")
        }

        if (
          moment(searchQuery.startTime).format("YYYY") !=
          moment(searchQuery.endTime).format("YYYY")
        ) {
          return ElMessage.error("结束月份不能跨年")
        }
        var startTime = 0,
          endTime = 0
        if (searchQuery.startTime)
          startTime = moment(searchQuery.startTime).format("MM")
        if (searchQuery.endTime)
          endTime = moment(searchQuery.endTime).format("MM")
        if (endTime < startTime) {
          return ElMessage.error("开始月份不能大于结束月份")
        }

        if (searchQuery.startTime) {
          params.startTime = moment(searchQuery.startTime).format("YYYY-MM")
        }
        if (searchQuery.endTime) {
          params.endTime = moment(searchQuery.endTime).format("YYYY-MM")
        }
        this.searchQuery = params
      } else {
        this.searchQuery = {}
      }
      this.init()
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
    }
  },
  components: { Filters, PostEditorDialog },
  created() {
    this.init()
  },
  mounted() {
    this.getEnergyType()
  }
}
</script>

<style lang="scss" scoped>
.hr {
  margin: 22px 0;
  height: 8px;
  background: #ededed;
}
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
