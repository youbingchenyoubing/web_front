<template>
  <div class="SystemDepartment">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onOpenEditorDialog(1)"
          v-auth="'system:unit:add'"
        >
          <el-icon><Plus /></el-icon>
          新增
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
      row-key="id"
      :default-expand-all="true"
      :tree-props="{ hasChildren: 'hasChild' }"
      v-auth="'system:unit:list'"
      stripe
      border
    >
      <el-table-column prop="name" label="机构名称" align="left" />
      <el-table-column label="启用状态" align="center">
        <template #default="{ row }">
          <el-tag>{{ row.enabled === 0 ? "禁用" : "启用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="负责人" align="center" />
      <el-table-column prop="mobile" label="联系电话" align="center" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              @click="onOpenEditorDialog(3, row.id)"
              v-auth="'system:unit:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="primary"
              :underline="false"
              style="margin: 0 4px 0 4px"
              @click="onOpenEditorDialog(2, row.id)"
              v-auth="'system:unit:add'"
            >
              <el-icon><Plus /></el-icon>
              新增
            </el-link>
            <el-link
              v-if="row.system !== 1"
              type="danger"
              :underline="false"
              @click="onRemoveUnit(row)"
              v-auth="'system:unit:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <DepartEditorDialog
      v-model="editorDialog.show"
      :type="editorDialog.type"
      :id="editorDialog.id"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ApiUnit, ApiUnitDelete } from "./api"
import Filters from "./modules/Filters.vue"
import { normalizeDepartList } from "./helper"
import DepartEditorDialog from "./modules/DepartEditorDialog.vue"
import { ElMessage } from "element-plus"
export default {
  data() {
    return {
      /* --------------  -------------- */
      showSearch: true,
      editorDialog: {
        show: false,
        type: 1, //1新增 2行内新增 3修改
        id: 0
      },
      /* -------------- table -------------- */
      tableData: []
    }
  },
  computed: {
    checkedAll: {
      get() {
        return this.tableData.every(item => item.checked)
      },
      set(value) {
        this.tableData.forEach(item => (item.checked = value))
      }
    }
  },
  methods: {
    async init() {
      const res = await ApiUnit(this.searchQuery)
      this.tableData = normalizeDepartList(res, depart => {
        depart.createTime = formatStamp("YYYY-MM-DD", depart.createTime)
      })
    },
    async onRemoveUnit({ id }) {
      ElMessageBox.confirm(`您确定要删除该机构吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiUnitDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
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
    onOpenEditorDialog(type, id) {
      Object.assign(this.editorDialog, {
        show: true,
        type,
        id
      })
    }
  },
  components: { Filters, DepartEditorDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
