<template>
  <div class="SystemUser">
    <DepartTree
      @onChange="onDepartChange"
      v-if="vIf_auth('system:unit:tree')"
    />

    <div class="SystemUser-r" ref="SystemUser-r">
      <Filters :show="showSearch" @onSearch="onSearch"></Filters>

      <section class="sys-table-action">
        <div>
          <el-button
            type="primary"
            @click="onOpenEditorBox(1)"
            v-auth="'system:user:add'"
          >
            <el-icon><Plus /></el-icon>
            新增
          </el-button>
          <el-button
            type="danger"
            :disabled="shouldDisabled"
            @click="onBatchRemoveRow"
            v-auth="'system:user:delete'"
          >
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>

        <div>
          <el-tooltip
            effect="dark"
            :content="`${showSearch ? '隐藏' : '显示'}搜索`"
            placement="top"
          >
            <el-button circle @click="showSearch = !showSearch">
              <el-icon><Search /></el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="刷新表格" placement="top">
            <el-button circle plain @click="init">
              <el-icon><RefreshRight /></el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="隐藏指定列" placement="top">
            <el-button circle plain @click="onOpenConfigColumn">
              <el-icon><Grid /></el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </section>

      <el-table
        :data="tableData"
        class="table-main"
        stripe
        border
        v-auth="'system:user:page'"
      >
        <component
          v-for="col in tableColumns"
          :key="col"
          :is="col"
          :tableData="tableData"
          :actions="{ onRemoveRow, onOpenEditorBox, init }"
        />
      </el-table>

      <div class="sys-table-footer">
        <div></div>
        <div>
          <el-pagination
            v-model:currentPage="pageIndex"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            @size-change="onPageChange(pageIndex, $event)"
            @current-change="onPageChange($event, pageSize)"
            v-auth="'system:user:page'"
          />
        </div>
      </div>
    </div>

    <ConfigTableColumnDialog
      v-model:show="configTableBox.show"
      :tableColumns="tableColumns"
      @onChange="onColumnChange"
    />

    <UserEditorDialog
      v-model:show="editorBox.show"
      :type="editorBox.type"
      :id="editorBox.id"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import Filters from "./modules/Filters.vue"
import DepartTree from "./modules/DepartTree.vue"
import ConfigTableColumnDialog from "./modules/ConfigTableColumnDialog.vue"
import UserEditorDialog from "./modules/UserEditorDialog.vue"
import ColumnCheckbox from "./components/UserTableColumns/Column-checkbox.vue"
import ColumnUsername from "./components/UserTableColumns/Column-username.vue"
import ColumnRealName from "./components/UserTableColumns/Column-realName.vue"
import ColumnUserType from "./components/UserTableColumns/Column-userType.vue"
import ColumnEmail from "./components/UserTableColumns/Column-email.vue"
import ColumnPhone from "./components/UserTableColumns/Column-phone.vue"
import ColumnGender from "./components/UserTableColumns/Column-gender.vue"
import ColumnAvatar from "./components/UserTableColumns/Column-avatar.vue"
import ColumnEnabled from "./components/UserTableColumns/Column-enabled.vue"
import ColumnLoginIp from "./components/UserTableColumns/Column-loginIp.vue"
import ColumnLoginDate from "./components/UserTableColumns/Column-loginDate.vue"
import ColumnCreateTime from "./components/UserTableColumns/Column-createTime.vue"
import ColumnRemark from "./components/UserTableColumns/Column-remark.vue"
import ColumnAction from "./components/UserTableColumns/Column-action.vue"

import { ApiUserDelete, ApiUserPage } from "./api"
import { USER_TYPE } from "./constants"
import { formatStamp } from "@share/helper"
import { mapActions, mapState } from "pinia"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
import { useGlobalMenuStore } from "@store/MenuGlobalStore"
import { useGlobalAuthStore } from "@store/AuthGlobalStore"

export default {
  data() {
    return {
      showSearch: true,
      /* --------------  -------------- */
      tableData: [],
      tableColumns: [],
      tableWidth: "100%",
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 10,
      count: 2,
      /* --------------  -------------- */
      configTableBox: {
        show: false
      },
      editorBox: {
        show: false,
        type: 1,
        id: -10
      }
    }
  },
  computed: {
    ...mapState(useGlobalMenuStore, ["slideMenuCollapse"]),
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
    ...mapActions(useGlobalAuthStore, ["vIf_auth"]),
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum([
        "system_global_status",
        "system_global_gender"
      ])
      const STATUS = buildVKEnum(enums.system_global_status)
      const GENDER = buildVKEnum(enums.system_global_gender)
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
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
        item.updateTime = formatStamp("YYYY-MM-DD", item.updateTime)
      })

      this.count = res.total
      this.tableData = res.records
    },
    onRemoveRow({ id }) {
      ElMessageBox.confirm(`您确定要删除该用户吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => ApiUserDelete({ id }))
        .then(() => {
          ElMessage.success("删除成功")
          this.init()
        })
        .catch(() => null)
    },
    onBatchRemoveRow() {
      ElMessageBox.confirm(`您确定要删除选中的用户吗 ?`, "系统提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() =>
          Promise.all(this.selectedRows.map(({ id }) => ApiUserDelete({ id })))
        )
        .then(() => {
          ElMessage.success("批量删除成功")
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onPageChange(index, size) {
      this.init()
    },
    onColumnChange(columns) {
      this.tableColumns = columns
    },
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    onOpenConfigColumn() {
      this.configTableBox.show = true
    },
    onOpenEditorBox(type, row) {
      this.editorBox.show = true
      this.editorBox.type = type

      if (type === 2) {
        this.editorBox.id = row.id
      }
    },
    onDepartChange(query) {
      Object.assign(this.searchQuery, query)
      this.init()
    }
  },
  watch: {
    slideMenuCollapse(collapse) {
      //  this.slideMenuCollapse ? "64px" : "200px"
      const curWidth = Number(this.tableWidth.split("px")[0])
      this.tableWidth = (collapse ? curWidth + 136 : curWidth - 136) + "px"
    }
  },
  components: {
    Filters,
    DepartTree,
    ColumnCheckbox,
    ColumnUsername,
    ColumnRealName,
    ColumnUserType,
    ColumnEmail,
    ColumnPhone,
    ColumnGender,
    ColumnAvatar,
    ColumnEnabled,
    ColumnLoginIp,
    ColumnLoginDate,
    ColumnCreateTime,
    ColumnRemark,
    ColumnAction,
    ConfigTableColumnDialog,
    UserEditorDialog
  },
  created() {
    this.searchQuery = {}
    this.init()
  },
  mounted() {
    this.tableWidth = this.$refs["SystemUser-r"].offsetWidth + "px"
  }
}
</script>

<style lang="scss" scoped>
.SystemUser {
  display: flex;

  .SystemUser-r {
    flex: 1;
    overflow: hidden;
  }
}

.filters {
  margin-bottom: 1rem;

  :deep(.el-form-item) {
    width: 300px;
  }
}

.table-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-main {
  max-width: v-bind(tableWidth);
  overflow: hidden;
}
.table-footer {
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>
