<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
      <el-table :data="tableData" stripe :header-cell-style="thStyle">
        <!-- <el-table-column
          width="80"
          :index="indexAdd"
          label="序号"
          align="center"
          type="index"
        /> -->
        <el-table-column
          width="80"
          prop="type"
          label="能耗项目"
          align="center"
        />
        <el-table-column
          width="200"
          prop="shortName"
          label="企业简称"
          align="center"
        />
        <el-table-column prop="year" label="年度" align="center" />
        <el-table-column prop="amount" label="能源配额" align="center" />
        <el-table-column prop="unit" label="能源单位" align="center" />
        <el-table-column
          prop="actualAmount"
          label="当月能耗量"
          align="center"
        />
        <el-table-column prop="percentage" label="超出百分比" align="center" />
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
  </div>
</template>

<script>
import moment from "moment"
import { formatStamp } from "@share/helper"
import { ApiPostDelete, ApiPostPage } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"
import finish from "@assets/images/finish.png"
import unfinish from "@assets/images/unfinish.png"
export default {
  data() {
    return {
      thStyle: {
        color: "#9E9FA0",
        fontWeight: "100"
      },
      finish,
      unfinish,
      /* --------------  -------------- */
      showSearch: true,
      editorBox: {
        show: false,
        type: 1, //1新增 2行内修改 3批量修改
        ids: []
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
        // .then(() => ApiPostDelete({ id }))
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
        // .then(() =>
        //   Promise.all(this.selectedRows.map(({ id }) => ApiPostDelete({ id })))
        // )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(searchQuery) {
      var params = searchQuery
      if (searchQuery.year)
        params.year = moment(searchQuery.year).format("YYYY")
      if (searchQuery.month)
        params.month = moment(searchQuery.month).format("YYYY-MM").split("-")[1]
      this.searchQuery = params
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
  components: { Filters },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
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
.sys-table-main-actions {
  display: flex;
  flex-direction: column;
  .finish {
    padding: 3px 7px;
    background: rgba(56, 146, 255, 0.08);
    border-radius: 2px;
  }
  .unfinish {
    padding: 3px 7px;
    background: rgba(255, 172, 56, 0.08);
    border-radius: 2px;
  }
}
:deep(.el-table .cell) {
  /*text-align: center;*/
  white-space: pre-line; /*保留换行符*/
}
</style>
