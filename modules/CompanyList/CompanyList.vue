<template>
  <div class="SystemPost">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>
    <div class="table-content">
      <section class="sys-table-action">
        <div>
          <el-button
            type="primary"
            @click="onEditorChange(1)"
            v-auth="'company:list:add'"
          >
            <el-icon><Plus /></el-icon>
            新增企业
          </el-button>
          <el-button
            type="danger"
            :disabled="shouldDisabled"
            @click="onBatchRemoveRow"
            v-auth="'company:list:delete'"
          >
            <el-icon><Delete /></el-icon>
            批量删除
          </el-button>
        </div>
      </section>

      <el-table
        :data="tableData"
        stripe
        :header-cell-style="thStyle"
        v-auth="'company:list:page'"
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
        <el-table-column prop="name" label="企业名称" align="center" />
        <el-table-column prop="shortName" label="企业简称" align="center" />
        <el-table-column
          prop="industry"
          label="所属行业"
          align="center"
          :formatter="industryFormat"
        />
        <el-table-column
          prop="type"
          label="企业类型"
          align="center"
          :formatter="typeFormat"
        />
        <el-table-column
          prop="area"
          label="行政区域"
          align="center"
          :formatter="areaFormat"
        />
        <el-table-column prop="contactPerson" label="负责人" align="center" />
        <el-table-column prop="contactPhone" label="联系电话" align="center" />
        <el-table-column
          prop="isQuota"
          label="是否限额"
          align="center"
          :formatter="getQuota"
        />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="{ row }">
            <div class="sys-table-main-actions">
              <el-link
                type="primary"
                :underline="false"
                @click="onEditorChange(4, row.id)"
                v-auth="'company:list:detail'"
              >
                详情
              </el-link>
              <el-link
                type="primary"
                :underline="false"
                style="margin: 0 0 0 14px"
                @click="onEditorChange(2, row.id)"
                v-auth="'company:list:update'"
              >
                修改
              </el-link>
              <el-link
                type="danger"
                :underline="false"
                style="margin: 0 0 0 14px"
                @click="onRemoveRow(row)"
                v-auth="'company:list:delete'"
              >
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
      :company_type="company_type"
      :industrys="industrys"
      :system_area="system_area"
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
      thStyle: {
        color: "#9E9FA0",
        fontWeight: "100"
      },
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
    getQuota(e) {
      if (e.isQuota) {
        return "是"
      } else {
        return "否"
      }
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
    onEditorChange(type, ids, record) {
      if ([2, 4].indexOf(type) > -1) {
        ids = [ids]
      } else if (type === 3) {
        ids = this.selectedRows.map(row => row.id)
      }
      this.editorBox.show = true
      if ([2, 3, 4].indexOf(type) > -1) {
        this.editorBox.ids = ids
      } else {
        this.editorBox.ids = []
      }
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
  components: { Filters, PostEditorDialog },
  created() {
    this.init()
    this.getIndustrys()
    this.getSystemArea()
    this.getCompanyType()
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
