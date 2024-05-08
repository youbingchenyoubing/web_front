<template>
  <div class="SystemRoleAssigned">
    <Filters :show="showSearch" @search="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="danger"
          :disabled="disabledBatchAction"
          @click="onBatchRoleCancel"
          v-auth="'system:role:grant'"
        >
          <el-icon><CircleClose /></el-icon>
          批量取消授权
        </el-button>
        <el-button type="primary" @click="$router.push('/system/role')">
          <el-icon><Close /></el-icon>
          关闭
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

    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名称" align="center" />
      <el-table-column prop="realName" label="用户昵称" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="phone" label="手机" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="danger"
              :underline="false"
              @click="onRoleCancel(row)"
              v-auth="'system:role:grant'"
            >
              <el-icon><CircleClose /></el-icon>
              取消授权
            </el-link>
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
</template>

<script>
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import { ApiAssignedRole, ApiCancelRole } from "./api"
export default {
  data() {
    return {
      showSearch: true,
      /* -------------- table -------------- */
      tableData: [],
      /* --------------  -------------- */
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
    disabledBatchAction() {
      const d = this.tableData
      return d.length === 0 ? true : this.selectedRows.length === 0
    }
  },
  methods: {
    async init() {
      const { roleId } = this.$route.query
      const res = await ApiAssignedRole({
        current: this.pageIndex,
        size: this.pageSize,
        roleId,
        ...this.searchQuery
      })
      this.tableData = res.records
    },
    async onRoleCancel({ id }) {
      ElMessageBox.confirm(`您确定要取消授权用户吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { roleId } = this.$route.query
          return ApiCancelRole([{ roleId, userId: id }])
        })
        .then(() => {
          ElMessage.success("取消授权用户成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRoleCancel() {
      ElMessageBox.confirm(`您确定要取消授权用户吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { roleId } = this.$route.query
          return ApiCancelRole(
            this.selectedRows.map(({ id }) => ({ roleId, userId: id }))
          )
        })
        .then(() => {
          ElMessage.success("批量取消授权用户成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(query) {
      this.searchQuery = query
      this.init()
    },
    onPageChange() {
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
