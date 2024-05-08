<template>
  <el-collapse-transition>
    <el-form
      v-show="show"
      class="sys-filters"
      ref="formRef"
      inline
      :model="form"
    >
      <el-form-item label="用户账号" prop="userName">
        <el-input
          placeholder="请输入用户账号"
          clearable
          v-model="form.userName"
        />
      </el-form-item>

      <el-form-item label="ip地址" prop="ipaddr">
        <el-input
          placeholder="请输入登录ip地址"
          clearable
          v-model="form.ipaddr"
        />
      </el-form-item>

      <el-form-item label="ip归属地" prop="loginLocation">
        <el-input
          placeholder="请输入ip归属地"
          clearable
          v-model="form.loginLocation"
        />
      </el-form-item>

      <el-form-item label="操作时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          clearable
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="[
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 1, 1, 23, 59, 59)
          ]"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
        <el-button @click="handleReset">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-collapse-transition>
</template>

<script>
export default {
  props: ["show"],
  emits: ["onSearch"],
  data() {
    return {
      form: {
        userName: "",
        ipaddr: "",
        loginLocation: "",
        date: []
      }
    }
  },
  methods: {
    handleReset() {
      this.$emit("onSearch", {})
      this.$refs.formRef.resetFields()
    },
    handleSearch() {
      const { userName, ipaddr, loginLocation, date } = this.form
      const query = Object.entries({
        userName,
        ipaddr,
        loginLocation,
        beginTime: date[0],
        endTime: date[1]
      }).reduce((query, [key, value]) => {
        value !== "" && value !== undefined && (query[key] = value)
        return query
      }, {})
      this.$emit("onSearch", query)
    }
  }
}
</script>
