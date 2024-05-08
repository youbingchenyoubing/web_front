<template>
  <div>
    <Filters :show="showSearch" @search="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorBoxChange(1)"
          v-auth="'system:role:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="disabledBatchAction"
          @click="onBatchRemoveRole"
          v-auth="'system:role:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
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
      class="table"
      stripe
      border
      v-auth="'system:role:page'"
    >
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center" />
      <el-table-column prop="rolePerm" label="角色编码" align="center" />
      <el-table-column label="是否启用" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.enabled }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onEditorBoxChange(2, row)"
              v-auth="'system:role:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 8px"
              @click="onRemoveRole(row)"
              v-auth="'system:role:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-link>
            <el-dropdown>
              <el-link type="primary" :underline="false">
                更多
                <el-icon><DArrowRight /></el-icon>
              </el-link>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="vIf_auth('system:role:assigned')">
                    <router-link
                      :to="`/system/role-assigned?roleId=${row.id}`"
                      class="action-drop-item"
                    >
                      <el-icon><User /></el-icon>
                      <span>分配用户</span>
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          v-auth="'system:role:page'"
        />
      </div>
    </div>

    <RoleEditorDialog
      v-model:show="editorBox.show"
      :id="editorBox.id"
      :type="editorBox.type"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ApiDeleteRole, ApiRoleList } from "./api"
import Filters from "./modules/Filters.vue"
import RoleEditorDialog from "./modules/RoleEditorDialog.vue"
import { ElMessage } from "element-plus"
import { mapActions } from "pinia"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { useGlobalAuthStore } from "@store/AuthGlobalStore"
export default {
  data() {
    return {
      showSearch: true,
      editorBox: {
        show: false,
        type: 1,
        id: -10
      },
      updateRoleDialog: {
        show: false,
        userIds: []
      },
      /* -------------- table -------------- */
      tableData: [],
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 10,
      count: 0
      /* --------------  -------------- */
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
    ...mapActions(useGlobalAuthStore, ["vIf_auth"]),
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum(["system_global_status"])
      const STATUS = buildVKEnum(enums.system_global_status)

      const res = await ApiRoleList({
        current: Number(this.pageIndex),
        size: Number(this.pageSize),
        ...this.searchQuery
      })

      res.records.forEach(item => {
        item.checked = false
        item.enabled = STATUS[item.enabled]
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
      })
      Object.assign(this, {
        tableData: res.records,
        pageIndex: res.current,
        pageSize: res.size,
        count: res.total
      })
    },
    onRemoveRole({ id }) {
      ElMessageBox.confirm(`您确定要删除该角色吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiDeleteRole({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    onBatchRemoveRole() {
      ElMessageBox.confirm(`您确定要删除选中的角色吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(selectedRows.map(({ id }) => ApiDeleteRole({ id })))
        )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(query) {
      this.searchQuery = query
      this.init()
    },
    onPageChange(pageIndex, pageSize) {
      this.init()
    },
    onEditorBoxChange(type, row) {
      Object.assign(this.editorBox, {
        show: true,
        type,
        id: row?.id
      })
    }
    /* --------------  -------------- */
  },
  components: { Filters, RoleEditorDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;

  :global(.action-drop-item) {
    display: flex;
    align-items: center;
  }
}
</style>
