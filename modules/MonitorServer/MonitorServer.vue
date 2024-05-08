<template>
  <div class="MonitorServer">
    <div v-auth="'monitor:server:list'">
      <div class="display-inline">
        <el-card class="card-item">
          <template #header>
            <div class="card-header">
              <span>CPU</span>
            </div>
          </template>

          <template #default>
            <el-table :data="serverInfo.cpu" stripe border>
              <el-table-column align="center" prop="key" label="属性">
                <template #default="{ row }">
                  <span class="key-title">{{ row.key }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="value" label="值" />
            </el-table>
          </template>
        </el-card>

        <el-card class="card-item">
          <template #header>
            <div class="card-header">
              <span>内存</span>
            </div>
          </template>

          <template #default>
            <el-table :data="serverInfo.mem" stripe border>
              <el-table-column align="center" prop="key" label="属性">
                <template #default="{ row }">
                  <span class="key-title">{{ row.key }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="value" label="值" />
            </el-table>
          </template>
        </el-card>
      </div>

      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <span>系统状态</span>
          </div>
        </template>

        <template #default>
          <el-table :data="serverInfo.sys" :show-header="false">
            <el-table-column align="center" prop="key" label="属性">
              <template #default="{ row }">
                <span class="key-title">{{ row.key }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="value" label="值" />
          </el-table>
        </template>
      </el-card>

      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <span>Java虚拟机信息</span>
          </div>
        </template>

        <template #default>
          <el-table :data="serverInfo.jvm" :show-header="false">
            <el-table-column align="center" prop="key" label="属性">
              <template #default="{ row }">
                <span class="key-title">{{ row.key }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="value" label="值" />
          </el-table>
        </template>
      </el-card>

      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <span>磁盘状态</span>
          </div>
        </template>

        <template #default>
          <el-table :data="serverInfo.sysFiles" stripe border>
            <el-table-column align="center" prop="dirName" label="盘符路径" />
            <el-table-column align="center" prop="typeName" label="文件系统" />
            <el-table-column
              align="center"
              prop="sysTypeName"
              label="盘符类型"
            />
            <el-table-column align="center" prop="total" label="总大小" />
            <el-table-column align="center" prop="free" label="可用大小" />
            <el-table-column align="center" prop="used" label="已用大小" />
            <el-table-column align="center" prop="usage" label="已用百分比" />
          </el-table>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ApiServer } from "./api"
import { CPU, MEM, SYS } from "./constants"

export default {
  data() {
    return {
      _serverInfo: {},
      serverInfo: {
        cpu: [],
        mem: [],
        sys: [],
        jvm: [],
        sysFiles: []
      }
    }
  },
  methods: {
    async init() {
      const info = (this._serverInfo = await ApiServer())

      this.serverInfo.cpu = Object.keys(info.cpu).map(key => ({
        key: CPU[key],
        value: info.cpu[key]
      }))
      this.serverInfo.mem = Object.keys(info.mem).map(key => ({
        key: MEM[key],
        value: info.mem[key]
      }))
      this.serverInfo.sys = Object.keys(info.sys).map(key => ({
        key: SYS[key],
        value: info.sys[key]
      }))
      this.serverInfo.sysFiles = info.sysFiles
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.MonitorServer {
  .card-item {
    margin-bottom: 1rem;
  }

  .display-inline {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
</style>
