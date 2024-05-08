<template>
  <div class="MonitorTimingLog">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="mon-table-action">
      <div>
        <el-button
          type="danger"
          :disabled="shouldDisabled"
          @click="onRemoveRow(2)"
          v-auth="'task:logger:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
        </el-button>

        <el-button
          type="danger"
          @click="onCleanRow"
          v-auth="'task:logger:clean'"
        >
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
      class="table"
      stripe
      border
      v-auth="'task:logger:list'"
    >
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="jobName" label="任务名称" align="center" />
      <el-table-column prop="jobGroup" label="任务组名" align="center" />
      <el-table-column prop="invokeTarget" label="调用字符串" align="center" />
      <el-table-column prop="jobMessage" label="日志信息" align="center" />
      <el-table-column label="执行状态" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="mon-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onDetailBoxChange(row)"
              v-auth="'task:logger:query'"
            >
              <el-icon><View /></el-icon>
              详情
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 4px 0 4px"
              @click="onRemoveRow(1, row)"
              v-auth="'task:logger:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="mon-table-footer">
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
          v-auth="'task:logger:list'"
        />
      </div>
    </div>

    <TimingDetailDialog v-model:show="detailBox.show" :id="detailBox.id" />
  </div>
</template>

<script>
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import {
  ApiTaskLoggerClean,
  ApiTaskLoggerDelete,
  ApiTaskLoggerPage
} from "./api"
import Filters from "./modules/Filters.vue"
import TimingDetailDialog from "./modules/TimingDetailDialog.vue"
export default {
  data() {
    return {
      showSearch: true,
      detailBox: {
        show: false,
        id: -10
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
        const t = this.tableData
        return t.length === 0
          ? false
          : this.tableData.every(item => item.checked)
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
      const { system_global_expstatus } = await this.resolveDictItemEnum([
        "system_global_expstatus"
      ])
      const STATUS = {}
      for (const item of system_global_expstatus) {
        STATUS[item.v] = item.k
      }

      const res = await ApiTaskLoggerPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })

      res.records.forEach(item => {
        item.checked = false
        item.status = STATUS[item.status]
      })
      this.count = res.total
      this.tableData = res.records
    },
    async onRemoveRow(type, row) {
      let params

      // 1单个，2批量
      if (type === 1) {
        params = [row.id]
      } else if (type === 2) {
        params = this.selectedRows.map(row => row.id)
      }

      ElMessageBox.confirm(`您确定要删除吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiTaskLoggerDelete(params))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onCleanRow() {
      return ElMessageBox.confirm("您确定要清空所有调度日志吗?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(ApiTaskLoggerClean)
        .then(() => ElMessage.success("清空成功"))
        .then(() => this.init())
        .catch(() => null)
    },
    /* --------------  -------------- */
    onPageChange(index, size) {
      this.init()
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    onDetailBoxChange(row) {
      this.detailBox.show = true
      this.detailBox.id = row.id
    }
  },
  components: { Filters, TimingDetailDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
