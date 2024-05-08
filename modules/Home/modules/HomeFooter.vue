<template>
  <div class="HomeFooter">
    <!-- <el-card class="box-card">
      <template #header>
        <div class="card-header">联系方式</div>
      </template>

      <template #default>
        <div class="contact">
          <section class="contact-item">
            <el-icon><Promotion /></el-icon>
            <span class="title">技术支持</span>
            <div class="contact-information">
              <el-link :underline="false" href="#" target="_blank">
                众采在线
              </el-link>
            </div>
          </section>
        </div>
      </template>
    </el-card> -->

    <el-card class="box-card">
      <template #header>
        <div class="card-header">登录日志</div>
      </template>
      <template #default>
        <el-scrollbar height="200px">
          <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column width="40">
              <template #header>
                <el-checkbox v-model="checkedAll" />
              </template>

              <template #default="{ row }">
                <el-checkbox v-model="row.checked" />
              </template>
            </el-table-column>

            <el-table-column prop="userName" label="用户账号" align="center" />

            <el-table-column prop="ipaddr" label="登录ip" align="center" />

            <el-table-column
              prop="loginLocation"
              label="登录地点"
              align="center"
            />

            <el-table-column prop="browser" label="浏览器" align="center" />

            <el-table-column prop="os" label="操作系统" align="center" />

            <el-table-column prop="msg" label="提示消息" align="center" />

            <el-table-column prop="loginTime" label="访问时间" align="center" />
          </el-table>
        </el-scrollbar>
      </template>
    </el-card>
  </div>
  <!-- 日志详情弹出框 -->
  <el-dialog v-model="dialogVisible" title="更新详情" width="30%">
    <el-scrollbar class="journalDetail">
      <p>1.初始提交</p>
      <p>2.添加数据库文件</p>
      <p>3.添加前端vue核心程序</p>
      <p>4.修复些BUG 并添加权限指令</p>
      <p>5.修复环境变量配置问题</p>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ApiLoginPage } from "../api"
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      /* --------------  -------------- */
      pageIndex: 1,
      pageSize: 10,
      count: 2
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await ApiLoginPage({
        current: this.pageIndex,
        size: this.pageSize,
        ...this.searchQuery
      })
      res.records.forEach(row => {
        row.checked = false
      })
      this.tableData = res.records
      this.count = res.total
    },
    onOpenDetail() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.HomeFooter {
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  .box-card {
    height: 310px;
  }

  .contact {
    .contact-item {
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid var(--el-border-color);
      line-height: 35px;

      .svg {
        width: 16px;
      }

      .title {
        width: 80px;
      }

      .contact-information {
        flex: 1;
      }
    }
  }

  .journal {
    .journal-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--el-border-color);
      line-height: 35px;
    }
  }

  .donation {
    .img {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      gap: 8px;

      img {
        width: 180px;
        height: 180px;
      }
    }
  }
}
</style>
