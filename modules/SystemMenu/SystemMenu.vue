<template>
  <div class="SystemMenu">
    <Filters :show="showSearch" @onSearch="onSearch"></Filters>

    <section class="sys-table-action">
      <div>
        <el-button
          type="primary"
          @click="onChangeMenuDialog(1)"
          v-auth="'system:menu:add'"
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

    <el-table :data="tableData" row-key="id" stripe border>
      <el-table-column prop="name" label="菜单名称" align="left" width="220" />
      <el-table-column label="图标" align="center">
        <template #default="{ row }">
          <el-icon size="1rem">
            <component :is="checkBuiltinIcon(row.icon)" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" align="center" width="190">
        <template #default="{ row }">
          <el-link :underline="false" @click="setCopy(row.perms)">{{
            row.perms
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="菜单类型" align="center" width="100">
        <template #default="{ row }">
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column label="显示状态" align="center" width="100">
        <template #default="{ row }">
          <el-tag>{{ row.visible }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用状态" align="center" width="100">
        <template #default="{ row }">
          <el-tag>{{ row.enabled }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center" width="120">
        <template #default="{ row }">
          <div class="sys-table-main-actions">
            <el-link
              type="primary"
              :underline="false"
              style="margin-right: 4px"
              @click="onChangeMenuDialog(2, row)"
              v-auth="'system:menu:update'"
            >
              <el-icon><EditPen /></el-icon>
              修改
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              @click="onDeleteMenu(row)"
              v-auth="'system:menu:delete'"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <MenuEditorDialog
      v-model="addAndUpdate.show"
      :type="addAndUpdate.type"
      :id="addAndUpdate.id"
      @onSubmit="init"
    />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus"
import { formatStamp } from "@share/helper"
import { setClipboard } from "@share/helper/setClipboard"
import Filters from "./modules/Filters.vue"
import MenuEditorDialog from "./modules/MenuEditorDialog/MenuEditorDialog.vue"
import { ApiMenuDelete, ApiMenuPage } from "./api"
import { normalizeMenuList } from "./helper"
import { ICONS } from "@constants/icons"
import { mapActions } from "pinia"
import { buildVKEnum, useGlobalEnumStore } from "@store/EnumGlobalStore"
export default {
  data() {
    return {
      /* --------------  -------------- */
      showSearch: true,
      addAndUpdate: {
        show: false,
        type: 1,
        id: -10
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
    ...mapActions(useGlobalEnumStore, ["resolveDictItemEnum"]),
    async init() {
      const enums = await this.resolveDictItemEnum([
        "system_global_status",
        "system_global_visibility",
        "system_menu_type"
      ])
      const STATUS = buildVKEnum(enums.system_global_status)
      const VISIBLE = buildVKEnum(enums.system_global_visibility)
      const MENU = buildVKEnum(enums.system_menu_type)
      const res = await ApiMenuPage({
        current: 1,
        size: 2000,
        ...this.searchQuery
      })
      this.tableData = normalizeMenuList(res.records, item => {
        item.type = MENU[item.type]
        item.visible = VISIBLE[item.visible]
        item.enabled = STATUS[item.enabled]
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
      })
    },
    async onDeleteMenu(row) {
      ElMessageBox.confirm("您确定要删除该菜单吗?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await ApiMenuDelete({ id: row.id })
          ElMessage.success({ message: "删除成功" })
          this.init()
        })
        .catch(() => null)
    },
    /* --------------  -------------- */
    onSearch(searchQuery) {
      this.searchQuery = searchQuery
      this.init()
    },
    onChangeMenuDialog(type, row = {}) {
      return Object.assign(this.addAndUpdate, {
        show: true,
        type,
        id: row.id
      })
    },
    /* --------------  -------------- */
    checkBuiltinIcon(icon) {
      return ICONS.includes(icon) ? icon : "EmptyComponent"
    },
    setCopy(perms) {
      setClipboard(perms)
    }
  },
  components: { Filters, MenuEditorDialog },
  created() {
    this.searchQuery = {}
    this.init()
  }
}
</script>
