<template>
  <div class="SystemDictItem">
    <Filters
      :show="showSearch"
      v-model:dictTypeInfo="dictTypeInfo"
      @onSearch="onSearch"
    />

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorChange(1)"
          v-auth="'system:dictitem:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="shouldDisableBatch"
          @click="onBatchRemoveRow"
          v-auth="'system:dictitem:delete'"
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

    <el-table :data="tableData" stripe border v-auth="'system:dictitem:page'">
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="k" label="字典键名" align="center" />
      <el-table-column prop="v" label="字典键值" align="center" />
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column prop="remark" label="字典描述" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onEditorChange(2, row.id)"
              v-auth="'system:dictitem:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 0 0 4px"
              @click="onRemoveRow(row)"
              v-auth="'system:dictitem:delete'"
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

    <DictItemEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      :dictTypeInfo="dictTypeInfo"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ElMessage } from "element-plus"
import Filters from "./modules/Filters.vue"
import DictItemEditorDialog from "./modules/DictItemEditorDialog.vue"
import { ApiDictItemDelete, ApiDictItemPage } from "./api"
export default {
  data() {
    return {
      /* --------------  -------------- */
      showSearch: true,
      dictTypeInfo: {},
      editorBox: {
        show: false,
        ids: [],
        type: 1 //1创建 2行内修改 3批量修改
      },
      /* -------------- table -------------- */
      tableData: [],
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
    shouldDisableBatch() {
      return this.selectedRows.length === 0
    }
  },
  methods: {
    async init() {
      const res = await ApiDictItemPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })
      res.records.forEach(item => {
        item.checked = false
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
      })
      this.count = res.total
      this.tableData = res.records
    },
    async onRemoveRow({ id }) {
      ElMessageBox.confirm(`您确定要删除该字典项吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiDictItemDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要批量删除选中的字典项吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(this.selectedRows(({ id }) => ApiDictItemDelete({ id })))
        )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    onEditorChange(type, ids = []) {
      if (type === 2) {
        ids = [ids]
      }
      this.editorBox.show = true
      this.editorBox.ids = ids
      this.editorBox.type = type
    },
    /* --------------  -------------- */
    onPageChange(pageIndex, pageSize) {
      this.init()
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    }
  },
  components: { Filters, DictItemEditorDialog },
  created() {
    const { type } = this.$route.query
    if (!type) {
      ElMessage.error("非法进入页面")
      this.$router.go(-1)
      return
    }
    this.searchQuery = { dictType: type }
    this.init()
  }
}
</script>
