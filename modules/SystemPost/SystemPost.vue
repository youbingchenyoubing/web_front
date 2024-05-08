<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onEditorChange(1)"
          v-auth="'system:post:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button
          type="danger"
          :disabled="shouldDisabled"
          @click="onBatchRemoveRow"
          v-auth="'system:post:delete'"
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

    <el-table :data="tableData" stripe border v-auth="'system:post:page'">
      <el-table-column width="40">
        <template #header>
          <el-checkbox v-model="checkedAll" />
        </template>

        <template #default="{ row }">
          <el-checkbox v-model="row.checked" />
        </template>
      </el-table-column>
      <el-table-column prop="postName" label="岗位名称" align="center" />
      <el-table-column prop="postCode" label="岗位编码" align="center" />
      <el-table-column prop="sort" label="岗位排序" align="center" />
      <el-table-column prop="enabled" label="启用状态" align="center">
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
              @click="onEditorChange(2, row.id)"
              v-auth="'system:post:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              style="margin: 0 0 0 4px"
              @click="onRemoveRow(row)"
              v-auth="'system:post:delete'"
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

    <PostEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ApiPostDelete, ApiPostPage } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import PostEditorDialog from "./modules/PostEditorDialog.vue"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
export default {
  data() {
    return {
      /* --------------  -------------- */
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        ids: []
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
      const enums = await this.resolveDictItemEnum(["system_global_status"])
      const STATUS = buildVKEnum(enums.system_global_status)
      const res = await ApiPostPage({
        ...this.searchQuery,
        current: this.pageIndex,
        size: this.pageSize
      })

      this.pageIndex = res.current
      this.pageSize = res.size
      this.count = res.total
      this.tableData = res.records.map(post => {
        const { createTime, updateTime } = post
        if (createTime) {
          post.createTime = formatStamp("YYYY-MM-DD", createTime)
        }
        if (updateTime) {
          post.updateTime = formatStamp("YYYY-MM-DD", updateTime)
        }
        post.checked = false
        post.enabled = STATUS[post.enabled]
        return post
      })
    },
    async onRemoveRow({ id }) {
      ElMessageBox.confirm(`您确定要删除该岗位吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiPostDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    async onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要批量删除选中的岗位吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(this.selectedRows.map(({ id }) => ApiPostDelete({ id })))
        )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
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
    onPageChange(index, size) {
      this.init()
    }
  },
  components: { Filters, PostEditorDialog },
  created() {
    this.init()
  }
}
</script>
