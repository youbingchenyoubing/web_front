<template>
  <BlockTitle>基本信息</BlockTitle>
  <el-form class="tabForm" ref="form" label-width="80px" inline>
    <el-form-item class="tabForm-item" label="真实姓名">
      <el-input v-model="userInfo.realName" disabled></el-input>
    </el-form-item>
    <el-form-item class="tabForm-item" label="用户名称">
      <el-input v-model="userInfo.username" disabled></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import BlockTitle from "@components/BlockTitle.vue"
import { ApiUserGet } from "../../SystemUser/api/index"

export default {
  data() {
    return {
      userInfo: []
    }
  },
  methods: {
    async init() {
      const { userId } = this.$route.query
      const res = await ApiUserGet({ id: userId })
      this.userInfo = res.user
    }
  },
  components: { BlockTitle },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.tabForm {
  padding-top: 18px;
  display: flex;
  justify-content: space-evenly;

  .tabForm-item {
    width: 400px;
  }
}
</style>
