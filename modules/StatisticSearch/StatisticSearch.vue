<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
      <el-table :data="tableData" stripe :header-cell-style="thStyle">
        <el-table-column
          width="80"
          :index="indexAdd"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column
          width="200"
          prop="companyName"
          label="企业名称"
          align="center"
        />
        <el-table-column prop="year" label="年度" align="center" />
        <el-table-column prop="month" label="月份" align="center" />
        <el-table-column
          prop="complexEquivalenceValue"
          width="180"
          :label="'综合能源消费总量等价值 \n（吨标准煤）'"
          align="center"
        />
        <el-table-column
          prop="complexEquivalentValue"
          width="180"
          :label="'综合能源消费总量当量值\n（吨标准煤）'"
          align="center"
        />
        <el-table-column
          prop="outputValue"
          width="130"
          :label="'产值/营业收入\n（万元）'"
          align="center"
        />
        <el-table-column
          prop="unitEquivalenceValue"
          width="160"
          :label="'单位产值能耗等价值\n（吨标准煤/万元）'"
          align="center"
        />
        <el-table-column
          prop="unitEquivalentValue"
          width="160"
          :label="'单位产值能耗当量值\n（吨标准煤/万元）'"
          align="center"
        />
        <el-table-column
          prop="electricityAmount"
          width="140"
          :label="'用电量\n（万千瓦时）'"
          sortable
          :render-header="renderHeader"
          align="center"
        />
        <el-table-column
          prop="coalAmount"
          width="110"
          :label="'用煤量\n（万吨）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="oilAmount"
          width="110"
          sortable
          :label="'用油量\n（万吨）'"
          align="center"
        />
        <el-table-column
          prop="gasAmount"
          width="140"
          :label="'用气量\n（万立方米）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="waterAmount"
          width="110"
          :label="'用水量\n（万吨）'"
          align="center"
          sortable
        />
        <el-table-column
          prop="steamAmount"
          width="150"
          :label="'用水蒸气量\n（百万千焦）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="otherAmount"
          width="110"
          :label="'其他\n（万吨）'"
          align="center"
          sortable
        />
        <el-table-column
          prop="outputEquivalentValue"
          width="140"
          :label="'产出能源量当量值\n（吨标准煤）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="outputEquivalenceValue"
          width="160"
          :label="'产出能源量等价值\n（吨标准煤）'"
          sortable
          align="center"
        />
        <el-table-column
          label="上报状态"
          align="center"
          width="120"
          fixed="right"
        >
          <template #default="{ row }">
            <div class="sys-table-main-actions">
              <div class="finish" v-if="row.reportStatus == 1">
                <el-link type="primary" :underline="false">
                  <img
                    :src="finish"
                    style="width: 12px; height: 12px; margin-right: 5px"
                  />
                  已上报
                </el-link>
              </div>
              <div class="unfinish" v-if="row.reportStatus < 1">
                <el-link
                  type="danger"
                  :underline="false"
                  style="color: #ff9f49"
                >
                  <img
                    :src="unfinish"
                    style="width: 12px; height: 12px; margin-right: 5px"
                  />
                  未上报
                </el-link>
              </div>
              <div class="finish" v-if="row.reportStatus == 2">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="onEditorChange(2, row.id)"
                >
                  <img
                    :src="finish"
                    style="width: 12px; height: 12px; margin-right: 5px"
                  />
                  部分上报
                </el-link>
              </div>
            </div>
          </template>
        </el-table-column>
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
      count: 0
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
    async init() {
      const res = await ApiPostPage({
        ...this.searchQuery,
        current: this.pageIndex,
        size: this.pageSize
      })

      this.pageIndex = res.current
      this.pageSize = res.size
      this.count = res.total
      this.tableData = res.records
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
      var params = searchQuery
      if (
        moment(searchQuery.startMonth).format("YYYY") !=
        moment(searchQuery.endMonth).format("YYYY")
      ) {
        return ElMessage.error("结束月份不能跨年")
      }
      if (searchQuery.year) {
        params.year = moment(searchQuery.year).format("YYYY")
      } else {
        if (searchQuery.startMonth)
          params.year = moment(searchQuery.startMonth).format("YYYY")
      }

      if (searchQuery.startMonth)
        params.startMonth = moment(searchQuery.startMonth).format("MM")
      if (searchQuery.endMonth)
        params.endMonth = moment(searchQuery.endMonth).format("MM")
      if (params.endMonth < params.startMonth) {
        return ElMessage.error("开始月份不能大于结束月份")
      }
      if (!params.endMonth && params.startMonth) {
        return ElMessage.error("请选择结束月份")
      }
      if (params.endMonth && !params.startMonth) {
        return ElMessage.error("请选择开始月份")
      }
      this.searchQuery = params
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
  components: { Filters },
  created() {
    this.init()
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
</style>
