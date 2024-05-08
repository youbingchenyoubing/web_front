<template>
  <el-table-column label="操作" align="center" fixed="right" width="240">
    <template #default="{ row }">
      <div class="sys-table-main-actions">
        <el-link
          type="primary"
          :underline="false"
          class="item"
          @click="actions.onOpenEditorBox(2, row)"
          v-auth="'system:user:update'"
        >
          <el-icon><EditPen /></el-icon>
          修改
        </el-link>

        <el-link
          type="danger"
          :underline="false"
          style="margin: 0 4px"
          class="item"
          @click="actions.onRemoveRow(row)"
          v-auth="'system:user:delete'"
        >
          <el-icon><Delete /></el-icon>
          删除
        </el-link>

        <el-dropdown>
          <el-link type="primary" :underline="false" class="item">
            <el-icon><DArrowRight /></el-icon>
            更多
          </el-link>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link
                  :underline="false"
                  style="margin: 0 4px"
                  class="item"
                  @click="onResetPwd(row)"
                  v-if="vIf_auth('system:user:delete')"
                >
                  <el-icon><Key /></el-icon>
                  重置密码
                </el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link
                  :underline="false"
                  style="margin: 0 4px"
                  class="item"
                  v-if="vIf_auth('system:user:grant')"
                  :to="`/system/user-distribute?userId=${row.id}`"
                >
                  <el-icon><CircleCheck /></el-icon>
                  分配角色
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { ApiUserReset } from "@modules/SystemUser/api"
import { useGlobalAuthStore } from "@store/AuthGlobalStore"
import { ElMessage, ElMessageBox } from "element-plus"
import { mapActions } from "pinia"

export default {
  inheritAttrs: false,
  props: ["actions"],
  methods: {
    ...mapActions(useGlobalAuthStore, ["vIf_auth"]),
    onResetPwd(row) {
      ElMessageBox.confirm(
        `您确定要重置"${row.username}"的密码吗 ?`,
        "系统提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => ApiUserReset({ id: row.id }))
        .then(() => ElMessage.success("重置成功"))
        .catch(() => null)
    }
  }
}
</script>
<style scoped>
.item {
  display: flex;
  align-items: center;
}
</style>
