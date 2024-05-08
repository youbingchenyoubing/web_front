<template>
  <div class="SystemDictType">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorChange(1)"
          v-auth="'system:dicttype:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="shouldDisableBatch"
          @click="onBatchRemoveRow"
          v-auth="'system:dicttype:delete'"
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

    <el-table :data="tableData" stripe border v-auth="'system:dicttype:page'">
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="字典名称" align="center" />
      <el-table-column prop="type" label="类型编码" align="center">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">
            <router-link :to="`/system/dict-item?type=${row.type}`">
              {{ row.type }}
            </router-link>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="字典描述" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onEditorChange(2, row.id)"
              v-auth="'system:dicttype:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 0 0 4px"
              @click="onRemoveRow(row)"
              v-auth="'system:dicttype:delete'"
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

    <DictTypeEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ElMessage } from "element-plus"
import { ApiDictTypeDelete, ApiDictTypePage } from "./api"
import Filters from "./modules/Filters.vue"
import DictTypeEditorDialog from "./modules/DictTypeEditorDialog.vue"
export default {
  data() {
    return {
      /* --------------  -------------- */
      showSearch: true,
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
      const res = await ApiDictTypePage({
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
      ElMessageBox.confirm(`您确定要删除该字典类型吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiDictTypeDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要批量删除选中的字典类型吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(
            this.selectedRows.map(({ id }) => ApiDictTypeDelete({ id }))
          )
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
  components: { Filters, DictTypeEditorDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
