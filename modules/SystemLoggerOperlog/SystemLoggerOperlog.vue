<template>
  <div class="SystemLoggerOperlog">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="danger"
          :disabled="shouldDisableBatch"
          @click="onRemoveRow"
          v-auth="'logger:operate:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
        </el-button>

        <el-button
          type="danger"
          :disabled="tableData.length === 0"
          @click="onClearRow"
          v-auth="'logger:operate:clean'"
        >
          <el-icon><Delete /></el-icon>
          清空
        </el-button>
      </div>

      <div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="`${showSearch ? '隐藏' : '显示'}搜索`"
          placement="top"
        >
          <el-button circle plain @click="showSearch = !showSearch">
            <el-icon><Search /></el-icon>
          </el-button>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="刷新表格"
          placement="top"
        >
          <el-button circle plain @click="init">
            <el-icon><RefreshRight /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </section>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border
      v-auth="'logger:operate:page'"
    >
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>

      <el-table-column prop="title" label="模块名称" align="center" />

      <el-table-column prop="businessType" label="业务类型" align="center" />

      <el-table-column prop="operatorType" label="操作类别" align="center" />

      <el-table-column prop="operUrl" label="请求地址" align="center">
        <template #default="{ row }">
          <code>{{ row.operUrl }}</code>
        </template>
      </el-table-column>

      <el-table-column prop="requestMethod" label="请求方式" align="center" />

      <el-table-column prop="operName" label="操作人员" align="center" />

      <el-table-column prop="operIp" label="主机地址" align="center" />

      <el-table-column prop="operLocation" label="操作地点" align="center" />

      <el-table-column label="状态" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="operTime" label="操作时间" align="center" />

      <el-table-column label="操作" align="center" width="80">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onOpenDetail(row)"
              v-auth="'logger:operate:get'"
            >
              <el-icon><View /></el-icon>
              详情
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="sys-table-footer">
      <div></div>
      <div>
        <el-pagination
          v-model:currentPage="pageIndex"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="onPageChange(pageIndex, $event)"
          @current-change="onPageChange($event, pageSize)"
          v-auth="'logger:operate:page'"
        />
      </div>
    </div>

    <OperlogDetailDialog v-model="detailBox.show" :id="detailBox.id" />
  </div>
</template>

<script>
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import { ApiOperateClean, ApiOperateDelete, ApiOperatePage } from "./api"
import Filters from "./modules/Filters.vue"
import OperlogDetailDialog from "./modules/OperlogDetailDialog.vue"

export default {
  data() {
    return {
      showSearch: true,
      detailBox: {
        id: 0,
        show: false
      },
      /* -------------- table -------------- */
      tableData: [],
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 10,
      count: 2
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
    shouldDisableBatch() {
      return this.selectedRows.length === 0
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum([
        "system_operator_type",
        "system_global_expstatus"
      ])
      const OPERATOR = buildVKEnum(enums.system_operator_type)
      const EXPSTATUS = buildVKEnum(enums.system_global_expstatus)
      const res = await ApiOperatePage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })
      res.records.forEach(item => {
        item.checked = false
        item.businessType = OPERATOR[item.businessType]
        item.status = EXPSTATUS[item.status]
        item.operatorType = {
          0: "其它",
          1: "后台用户",
          2: "手机端用户"
        }[item.operatorType]
      })
      this.count = res.total
      this.tableData = res.records
    },
    async onRemoveRow() {
      ElMessageBox.confirm(`您确定要删除选中的日志吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiOperateDelete(this.selectedRows.map(row => row.id)))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    onClearRow() {
      ElMessageBox.confirm("您确定要清空所有操作日志吗?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(ApiOperateClean)
        .then(() => ElMessage.success("清空所有操作日志成功"))
        .then(() => this.init())
        .catch(() => null)
    },
    /* --------------  -------------- */
    onPageChange() {
      this.init()
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    onOpenDetail(row) {
      this.detailBox.show = true
      this.detailBox.id = row.id
    }
  },
  components: { Filters, OperlogDetailDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
