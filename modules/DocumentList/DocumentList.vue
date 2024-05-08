<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
      <section class="sys-table-action">
        <div>
          <el-button
            type="primary"
            @click="onEditorChange(1)"
            v-auth="'document:list:add'"
          >
            档案存档
          </el-button>
        </div>
      </section>

      <el-table
        :data="tableData"
        stripe
        :header-cell-style="thStyle"
        v-auth="'document:list:page'"
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
        <el-table-column prop="companyName" label="企业名称" align="center" />
        <el-table-column
          prop="industryName"
          label="所属行业"
          align="center"
          :formatter="industryFormat"
        />
        <!-- <el-table-column
          prop="type"
          label="企业类型"
          align="center"
          :formatter="typeFormat"
        /> -->
        <el-table-column
          prop="areaName"
          label="行政区域"
          align="center"
          :formatter="areaFormat"
        />
        <el-table-column prop="counts" label="文件数量" align="center" />
        <el-table-column prop="updateTime" label="更新时间" align="center" />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="{ row }">
            <div class="sys-table-main-actions">
              <el-link
                type="primary"
                :underline="false"
                @click="onDetailChange(row)"
                v-auth="'document:list:detail'"
              >
                详情
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
      :company_type="company_type"
      :industrys="industrys"
      :system_area="system_area"
      @onSubmit="init"
    />
    <DetailDialog
      v-model="detailBox.show"
      :row="detailBox.row"
      @refrash="refrash"
    />
  </div>
</template>

<script>
import { formatStamp } from "@share/helper"
import { ApiPostDelete, ApiPostPage } from "./api"
import Filters from "./modules/Filters.vue"
import { ElMessage } from "element-plus"
import PostEditorDialog from "./modules/PostEditorDialog.vue"
import DetailDialog from "./modules/DetailDialog.vue"
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
      detailBox: {
        show: false,
        ids: []
      },
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
      count: 2,
      company_type: [],
      industrys: [],
      system_area: []
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
      const res = await ApiPostPage({
        ...this.searchQuery,
        current: this.pageIndex,
        size: this.pageSize
      })

      this.pageIndex = res.current
      this.pageSize = res.size
      this.count = res.total
      this.tableData = res.records.map(post => {
        const { updateTime } = post
        if (updateTime) {
          post.updateTime = formatStamp("YYYY-MM-DD", updateTime)
        }
        post.industryName = this.industryFormat(post)
        post.areaName = this.areaFormat(post)
        return post
      })
    },
    industryFormat(row) {
      let type = ""
      this.industrys.forEach(item => {
        if (row.industry == item.v) {
          type = item.k
        }
      })
      return type
    },
    typeFormat(row) {
      let type = ""
      this.company_type.forEach(item => {
        if (row.type == item.v) {
          type = item.k
        }
      })
      return type
    },
    areaFormat(row) {
      let type = ""
      this.system_area.forEach(item => {
        if (row.area == item.v) {
          type = item.k
        }
      })
      return type
    },
    async getIndustrys() {
      const res = await this.resolveDictItemEnum(["industrys"])
      Object.assign(this, res)
    },
    async getSystemArea() {
      const res = await this.resolveDictItemEnum(["system_area"])
      Object.assign(this, res)
    },
    async getCompanyType() {
      const res = await this.resolveDictItemEnum(["company_type"])
      Object.assign(this, res)
    },
    industryFormat(row) {
      let type = ""
      this.industrys.forEach(item => {
        if (row.industry == item.v) {
          type = item.k
        }
      })
      return type
    },
    typeFormat(row) {
      let type = ""
      this.company_type.forEach(item => {
        if (row.type == item.v) {
          type = item.k
        }
      })
      return type
    },
    areaFormat(row) {
      let type = ""
      this.system_area.forEach(item => {
        if (row.area == item.v) {
          type = item.k
        }
      })
      return type
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
      this.searchQuery = searchQuery
      this.init()
    },
    onEditorChange(ids, record) {
      this.editorBox.show = true
      this.editorBox.ids = ids
      this.editorBox.type = type
    },
    onDetailChange(row) {
      this.detailBox.show = true
      this.detailBox.row = row
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
    },
    refrash() {
      this.init()
    }
  },
  components: { Filters, PostEditorDialog, DetailDialog },
  created() {
    this.init()
    this.getIndustrys()
    this.getSystemArea()
    // this.getCompanyType()
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
</style>
