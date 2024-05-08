<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
      <section class="sys-table-action">
        <div>
          <el-button
            type="primary"
            @click="onEditorChange(1)"
            v-auth="'datas:list:add'"
          >
            <el-icon><Plus /></el-icon>
            手动录入
          </el-button>
          <el-button
            type="default"
            @click="onUploadChange(1)"
            style="color: #207cff; border-color: #207cff"
          >
            <el-icon><Upload /></el-icon>
            批量导入
          </el-button>
          <el-button
            type="danger"
            :disabled="shouldDisabled"
            @click="onBatchRemoveRow"
            v-auth="'datas:list:delete'"
          >
            <el-icon><Delete /></el-icon>
            批量删除
          </el-button>
        </div>

        <!-- <div>
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
        </div> -->
      </section>

      <el-table
        :data="tableData"
        :header-cell-style="thStyle"
        stripe
        v-auth="'datas:list'"
      >
        <el-table-column width="40">
          <template #header>
            <el-checkbox v-model="checkedAll" />
          </template>

          <template #default="{ row }">
            <el-checkbox v-model="row.checked" />
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          :index="indexAdd"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column
          prop="companyName"
          width="150"
          label="企业名称"
          align="center"
        />
        <el-table-column prop="year" label="年度" align="center" />
        <el-table-column prop="month" label="月份" align="center" />
        <el-table-column
          prop="electricityAmount"
          width="140"
          :label="'用电量 \n（万千瓦时）'"
          sortable
          :render-header="renderHeader"
          align="center"
        />
        <el-table-column
          prop="coalAmount"
          width="120"
          :label="'用煤量\n（万吨）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="oilAmount"
          width="110"
          :label="'用油量\n（万吨）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="gasAmount"
          width="140"
          :label="'用气量\n（万立方米）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="waterAmount"
          width="120"
          :label="'用水量\n（万吨）'"
          align="center"
          sortable
        />
        <el-table-column
          prop="steamAmount"
          width="140"
          :label="'用水蒸气量\n（百万千焦）'"
          sortable
          align="center"
        />
        <el-table-column
          prop="otherAmount"
          width="110"
          :label="'其他\n（万吨）'"
          align="center"
          sortable
        />
        <el-table-column
          prop="createName"
          width="130"
          label="录入人"
          align="center"
        />
        <el-table-column
          prop="createTime"
          width="120"
          label="录入时间"
          align="center"
        />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="{ row }">
            <div class="sys-table-main-actions">
              <el-link
                type="primary"
                :underline="false"
                @click="onEditorChange(4, row.id)"
                v-auth="'datas:list:detail'"
              >
                详情
              </el-link>
              <el-link
                type="primary"
                style="margin: 0 0 0 14px"
                :underline="false"
                @click="onEditorChange(2, row.id)"
                v-auth="'datas:list:update'"
              >
                <!-- <el-icon><EditPen /></el-icon> -->
                修改
              </el-link>
              <el-link
                type="danger"
                :underline="false"
                style="margin: 0 0 0 14px"
                @click="onRemoveRow(row)"
                v-auth="'datas:list:delete'"
              >
                <!-- <el-icon><Delete /></el-icon> -->
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
    </div>
    <PostEditorDialog
      v-model="editorBox.show"
      :type="editorBox.type"
      :ids="editorBox.ids"
      :record="editorBox.record"
      @onSubmit="init"
    />
    <UploadDialog @init="init" v-model="uploadBox.show" @onSubmit="upload" />
  </div>
</template>

<script>
import moment from "moment"
import { formatStamp } from "@share/helper"
import { ApiPostPage, ApiPostDelete } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import PostEditorDialog from "./modules/PostEditorDialog.vue"
import UploadDialog from "./modules/UploadDialog.vue"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
export default {
  data() {
    return {
      thStyle: {
        color: "#9E9FA0",
        fontWeight: "100"
      },
      /* --------------  -------------- */
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        ids: [],
        record: []
      },
      uploadBox: {
        show: false
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
      ElMessageBox.confirm(`您确定要删除该数据吗 ?`, "系统提示", {
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
      ElMessageBox.confirm(`您确定要批量删除选中的数据吗 ?`, "系统提示", {
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
      var params = searchQuery
      if (searchQuery.year) {
        params.year = moment(searchQuery.year).format("YYYY")
      } else {
        if (searchQuery.month)
          params.year = moment(searchQuery.month).format("YYYY")
      }

      if (searchQuery.month)
        params.month = moment(searchQuery.month).format("MM")
      if (searchQuery.createTime) {
        const createTime = searchQuery.createTime
        params.startTime = moment(createTime[0]).format("YYYY-MM-DD HH:mm:ss")
        params.endTime = moment(createTime[1]).format("YYYY-MM-DD HH:mm:ss")
      }
      delete params.createTime
      this.searchQuery = params
      this.init()
    },
    onEditorChange(type, ids) {
      if ([2, 4].indexOf(type) > -1) {
        ids = [ids]
      } else if (type === 3) {
        ids = this.selectedRows.map(row => row.id)
      }
      this.editorBox.show = true
      this.editorBox.ids = ids
      this.editorBox.type = type
    },
    onUploadChange() {
      this.uploadBox.show = true
    },
    upload() {},
    onPageChange(index, size) {
      this.init()
    },
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    }
  },
  components: { Filters, PostEditorDialog, UploadDialog },
  created() {
    this.init()
  }
}
</script>

<style scoped>
.sys-table-action {
  margin-bottom: 20px;
}
.table-content {
  /* display: flex;
  justify-content: space-between; */
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
.sys-table-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
:deep(.el-table .cell) {
  /*text-align: center;*/
  white-space: pre-line; /*保留换行符*/
}
</style>
