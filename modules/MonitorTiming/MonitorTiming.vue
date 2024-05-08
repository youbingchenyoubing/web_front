<template>
  <div class="MonitorTiming">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="mon-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorChange(1)"
          v-auth="'task:job:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="shouldDisabled"
          @click="onRemoveRow(2)"
          v-auth="'task:job:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
        </el-button>

        <router-link to="/monitor/timing-log" style="margin-left: 12px">
          <el-button type="primary">
            <el-icon><Document /></el-icon>
            日志
          </el-button>
        </router-link>
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
      v-auth="'task:job:list'"
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
      <el-table-column
        prop="invokeTarget"
        label="调用目标字符串"
        align="center"
      />
      <el-table-column
        prop="cronExpression"
        label="cron表达式"
        align="center"
      />
      <el-table-column label="启用状态" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="concurrent" label="是否并行" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="mon-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onEditorChange(2, row.id)"
              v-auth="'task:job:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 4px 0 4px"
              @click="onRemoveRow(1, row)"
              v-auth="'task:job:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-link>

            <el-dropdown>
              <template #default>
                <el-link type="primary" :underline="false">
                  <el-icon><DArrowRight /></el-icon>
                  更多
                </el-link>
              </template>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="vIf_auth('task:job:run')">
                    <span @click="onRunOnce(row)">执行一次</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="vIf_auth('task:job:query')">
                    <span @click="onDetailBoxChange(row)">任务详细</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="mon-table-footer">
      <div></div>
      <div></div>
      <el-pagination
        v-model:currentPage="pageIndex"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        @size-change="onPageChange(pageIndex, $event)"
        @current-change="onPageChange($event, pageSize)"
        v-auth="'task:job:list'"
      />
    </div>

    <TimingEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :id="editorBox.id"
      @onSubmit="init"
    />

    <TimingDetailDialog v-model:show="detailBox.show" :id="detailBox.id" />
  </div>
</template>

<script>
import { ElMessage } from "element-plus"
import { ApiJobDelete, ApiJobPage, ApiJobRun } from "./api"
import Filters from "./modules/Filters.vue"
import TimingEditorDialog from "./modules/TimingEditorDialog.vue"
import TimingDetailDialog from "./modules/TimingDetailDialog.vue"
import { mapActions } from "pinia"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { useGlobalAuthStore } from "@store/AuthGlobalStore"
export default {
  data() {
    return {
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        id: -10
      },
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
    ...mapActions(useGlobalAuthStore, ["vIf_auth"]),
    async init() {
      const enums = await this.resolveDictItemEnum([
        "system_task_status",
        "system_global_yesorno"
      ])
      const STATUS = buildVKEnum(enums.system_task_status)
      const YES_NO = buildVKEnum(enums.system_global_yesorno)
      const res = await ApiJobPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })

      res.records.forEach(item => {
        item.checked = false
        item.concurrent = YES_NO[item.concurrent]
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

      ElMessageBox.confirm(`您确定要删除吗?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiJobDelete(params))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onRunOnce({ id }) {
      await ApiJobRun({ id })
      ElMessage.success("运行成功")
    },
    /* --------------  -------------- */
    onPageChange(index, size) {
      this.init()
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    onEditorChange(type, id) {
      this.editorBox.id = id
      this.editorBox.type = type
      this.editorBox.show = true
    },
    onDetailBoxChange(row) {
      this.detailBox.show = true
      this.detailBox.id = row.id
    }
  },
  components: { Filters, TimingEditorDialog, TimingDetailDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
