<template>
  <div class="SystemLoggerLoginLog">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="danger"
          @click="onRemoveRow"
          :disabled="shouldDisableBatch"
          v-auth="'logger:login:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
        <el-button
          type="danger"
          @click="onClearRow"
          :disabled="tableData.length === 0"
          v-auth="'logger:login:clean'"
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
      v-auth="'logger:login:page'"
    >
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>

      <el-table-column prop="userName" label="用户账号" align="center" />

      <el-table-column prop="ipaddr" label="登录ip" align="center" />

      <el-table-column prop="loginLocation" label="登录地点" align="center" />

      <el-table-column prop="browser" label="浏览器" align="center" />

      <el-table-column prop="os" label="操作系统" align="center" />

      <el-table-column prop="msg" label="提示消息" align="center" />

      <el-table-column prop="loginTime" label="访问时间" align="center" />
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
          v-auth="'logger:login:page'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from "element-plus"
import { ApiLoginClear, ApiLoginDelete, ApiLoginPage } from "./api"
import Filters from "./modules/Filters.vue"
export default {
  data() {
    return {
      showSearch: true,
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
    async init() {
      const res = await ApiLoginPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })
      res.records.forEach(row => {
        row.checked = false
      })
      this.tableData = res.records
      this.count = res.total
    },
    async onRemoveRow() {
      ElMessageBox.confirm(`您确定要删除选中的日志吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiLoginDelete(this.selectedRows.map(row => row.id)))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    onClearRow() {
      ElMessageBox.confirm("您确定要清空所有登录日志吗?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(ApiLoginClear)
        .then(() => ElMessage.success("清空所有登录日志成功"))
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
    }
  },
  components: { Filters },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
