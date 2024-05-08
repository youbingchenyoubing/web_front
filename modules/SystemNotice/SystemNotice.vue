<template>
  <div class="SystemNotice">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorChange(1)"
          v-auth="'system:notice:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="shouldDisabled"
          @click="onBatchRemoveRow"
          v-auth="'system:notice:delete'"
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
      style="width: 100%"
      stripe
      border
      v-auth="'system:notice:page'"
    >
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="公告标题" align="center" />
      <el-table-column label="公告类型" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用状态" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.enabled }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center" width="120">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onEditorChange(2, row.id)"
              v-auth="'system:notice:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 0 0 4px"
              @click="onRemoveRow(row)"
              v-auth="'system:notice:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
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
          v-auth="'system:notice:page'"
        />
      </div>
    </div>

    <NoticeEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { ApiNoticeDelete, ApiNoticePage } from "./api"
import Filters from "./modules/Filters.vue"
import NoticeEditorDialog from "./modules/NoticeEditorDialog.vue"
import { formatStamp } from "@share/helper"
import { mapActions } from "pinia"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
export default {
  data() {
    return {
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        ids: []
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
      const enums = await this.resolveDictItemEnum([
        "system_global_status",
        "system_notice_type"
      ])
      const STATUS = buildVKEnum(enums.system_global_status)
      const NOTICE = buildVKEnum(enums.system_notice_type)
      const res = await ApiNoticePage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })

      res.records.forEach(item => {
        item.checked = false
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
        item.enabled = STATUS[item.enabled]
        item.type = NOTICE[item.type]
      })
      this.count = res.total
      this.tableData = res.records
    },
    async onRemoveRow({ id }) {
      ElMessageBox.confirm(`您确定要删除该公告吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiNoticeDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要批量删除选中的公告吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(
            this.selectedRows.map(({ id }) => ApiNoticeDelete({ id }))
          )
        )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
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
    onEditorChange(type, ids) {
      if (type === 2) {
        ids = [ids]
      }
      this.editorBox.ids = ids
      this.editorBox.type = type
      this.editorBox.show = true
    }
  },
  components: { Filters, NoticeEditorDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
