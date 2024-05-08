<template>
  <BlockTitle>角色信息</BlockTitle>

  <el-table ref="newsTab" :data="tableData" style="width: 100%" stripe border>
    <el-table-column width="40" align="center">
      <template #header>
        <el-checkbox v-model="checkedAll" />
      </template>

      <template #default="{ row }">
        <el-checkbox v-model="row.checked" />
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      type="index"
      width="80"
      label="序号"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      align="center"
    ></el-table-column>
    <el-table-column prop="rolePerm" label="权限字符" align="center">
      <template #default="{ row }">
        <el-link :underline="false" @click="setCopy(row.rolePerm)">
          {{ row.rolePerm }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center"
    ></el-table-column>
  </el-table>

  <div class="submitForm">
    <el-button type="primary" @click="onEmpowerRoles">提交</el-button>
    <el-button @click="$router.push('/system/user')">返回</el-button>
  </div>
</template>

<script>
import { setClipboard } from "@share/helper/setClipboard"
import { formatStamp } from "@share/helper"
import { ApiUserChecked, ApiUserGrant } from "../api/index"
import BlockTitle from "@components/BlockTitle.vue"
export default {
  data() {
    return {
      tableData: [],
      userRole: []
    }
  },
  methods: {
    async init() {
      const { userId } = this.$route.query
      const { roles, checkedRoleIds } = await ApiUserChecked({ id: userId })
      roles.forEach(item => {
        item.checked = checkedRoleIds.includes(item.id)
        item.createTime = formatStamp("YYYY-MM-DD", item.createTime)
      })
      this.tableData = roles
      this.userRole = checkedRoleIds
    },
    async onEmpowerRoles() {
      const { userId } = this.$route.query
      await ApiUserGrant(
        this.tableData
          .filter(row => row.checked)
          .map(({ id }) => ({ userId, roleId: id }))
      )

      ElMessage.success("分配角色成功")
      this.$router.push("/system/user")
    },
    setCopy(perms) {
      setClipboard(perms)
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
    }
  },
  components: { BlockTitle },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.submitForm {
  padding-top: 18px;
  display: flex;
  justify-content: center;
}
</style>
