<template>
  <el-dialog
    v-model="_show"
    :title="title"
    width="800px"
    :append-to-body="true"
    :destroy-on-close="true"
    :before-close="onCancel"
    custom-class="UserSelectDialog"
  >
    <template #default>
      <Filters @onSearch="onSearch" :show="true" />

      <el-table :data="tableData" class="table-main" stripe border>
        <el-table-column label="" width="80" align="center">
          <template #header>{{ "选择" }} </template>

          <template #default="{ row }">
            <el-radio :label="row.id" :name="row.id" v-model="selected">
              {{ "" }}
            </el-radio>
          </template>
        </el-table-column>
        <component
          v-for="col in tableColumns"
          :key="col"
          :is="col"
          :tableData="tableData"
        />
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
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { USER_TYPE } from "../../constants"
import { ApiUserPage } from "../../api"
import Filters from "./Filters.vue"
import ColumnUsername from "../UserTableColumns/Column-username.vue"
import ColumnRealName from "../UserTableColumns/Column-realName.vue"
import { useGlobalEnumStore } from "@store/EnumGlobalStore"
import { mapActions } from "pinia"

export default {
  props: ["show", "title"],
  emits: ["update:show", "onSubmit"],
  data() {
    return {
      selected: "1554658069143678976",
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      count: 0,
      tableColumns: ["ColumnUsername", "ColumnRealName"]
    }
  },
  computed: {
    _show: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit("update:show", value)
      }
    }
  },
  methods: {
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum([
        "system_global_status",
        "system_global_gender"
      ])
      const STATUS = {}
      for (const item of enums.system_global_status) {
        STATUS[item.v] = item.k
      }
      const GENDER = {}
      for (const item of enums.system_global_gender) {
        GENDER[item.v] = item.k
      }

      const res = await ApiUserPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })
      res.records.forEach(item => {
        item.checked = false
        item.userType = USER_TYPE[item.userType]
        item.gender = GENDER[item.gender]
        item.enabled = STATUS[item.enabled]
      })

      this.count = res.total
      this.tableData = res.records
    },
    /* --------------  -------------- */
    onColumnChange(columns) {
      this.tableColumns = columns
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    /* --------------  -------------- */
    onSubmit() {
      this.$emit(
        "onSubmit",
        this.tableData.filter(row => row.id === this.selected)
      )
      this.onCancel()
    },
    onCancel() {
      this._show = false
      this.tableData = []
      this.pageIndex = 1
      this.pageSize = 10
      this.count = 0
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
  },
  components: {
    Filters,
    ColumnUsername,
    ColumnRealName
  }
}
</script>

<style lang="scss">
.UserSelectDialog {
  .sys-filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, 280px);
  }

  .sys-table-footer {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
