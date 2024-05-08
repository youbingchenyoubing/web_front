<template>
  <el-dialog
    v-model="show"
    :title="title"
    width="1000px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
  >
    <template #default>
      <div class="company">企业名称：{{ row.companyName }}</div>
      <el-table :data="tableData" :header-cell-style="thStyle">
        <el-table-column
          width="80"
          :index="indexAdd"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column prop="newFileName" label="文件名称" align="center" />
        <el-table-column
          prop="industryName"
          label="文件类型"
          align="center"
          :formatter="fileTypeFormat"
        />
        <el-table-column prop="time" label="时间" align="center">
          <template #default="{ row }">
            {{
              row.type == 1
                ? `${row.startTime ? row.startTime : ""}${
                    row.endTime ? "~" + row.endTime : ""
                  }`
                : row.time
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          :formatter="areaFormat"
        />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="{ row }">
            <div class="sys-table-main-actions">
              <el-link
                type="primary"
                :underline="false"
                :href="row.url"
                v-auth="'document:list:download'"
                target="_blank"
              >
                下载
              </el-link>
              <el-link
                type="danger"
                :underline="false"
                style="margin: 0 0 0 14px"
                @click="onRemoveRow(row)"
                v-auth="'document:list:delete'"
              >
                删除
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus"
import { ApiPostGet, ApiPostDelete } from "../api"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  //1新增 2行内修改 3批量修改
  props: ["modelValue", "row"],
  data() {
    return {
      file_type: [],
      /* -------------- table -------------- */
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      count: 2
    }
  },
  computed: {
    show: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    },
    title() {
      return "详情"
    }
  },
  mounted() {
    this.getFileType()
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async getFileType() {
      const res = await this.resolveDictItemEnum(["file_type"])
      Object.assign(this, res)
    },
    fileTypeFormat(row) {
      let type = ""
      this.file_type.forEach(item => {
        if (row.type == item.v) {
          type = item.k
        }
      })
      return type
    },
    async init() {
      const res = await ApiPostGet({ id: this.row.companyId })
      this.total = res.length
      this.tableData = res.map(item => {
        item.url = `/api${item.url}`
        return item
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
          this.$emit("refrash")
        })
        .catch(() => null)
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(value) {
        if (value) {
          this.init()
        }
      }
    }
  }
}
</script>
<style scoped>
.upload {
  margin-bottom: 10px;
}
.upload-btn {
  display: flex;
  align-items: center;
}
.link {
  margin-left: 20px;
  color: #207cff;
}
.textarea {
  width: 300px;
}
.company {
  padding: 10px 20px;
  font-weight: 700;
}
</style>
