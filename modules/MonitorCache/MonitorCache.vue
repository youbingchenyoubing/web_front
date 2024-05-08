<template>
  <div class="MonitorCache">
    <div v-auth="'monitor:cache:list'">
      <el-card class="card-item">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
          </div>
        </template>

        <template #default>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">Redis版本</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.redis_version }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">运行模式</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{
                        cache.info.redis_mode == "standalone" ? "单机" : "集群"
                      }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">端口</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.tcp_port }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">客户端数</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.connected_clients }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">运行时间(天)</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.uptime_in_days }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">使用内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.used_memory_human }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">使用CPU</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{
                        parseFloat(cache.info.used_cpu_user_children).toFixed(2)
                      }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">内存配置</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.maxmemory_human }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">AOF是否开启</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.aof_enabled == "0" ? "否" : "是" }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">RDB是否成功</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.rdb_last_bgsave_status }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">Key数量</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.dbSize">
                      {{ cache.dbSize }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">网络入口/出口</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ cache.info.instantaneous_input_kbps }}kps/{{
                        cache.info.instantaneous_output_kbps
                      }}kps
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </el-card>

      <div class="display-inline">
        <el-card class="card-item">
          <div slot="header"><span>命令统计</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandStarRef" style="height: 420px" />
          </div>
        </el-card>

        <el-card class="card-item">
          <div slot="header">
            <span>内存信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="memoryRef" style="height: 420px" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ApiCache } from "./api"
import * as echarts from "echarts"

export default {
  data() {
    return {
      cache: {
        commandStats: [],
        info: {},
        dbSize: 0
      }
    }
  },
  methods: {
    async init() {
      const res = (this.cache = await ApiCache())
      this.commandStarRef = echarts.init(this.$refs.commandStarRef, "macarons")
      this.commandStarRef.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "命令",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: res.commandStats,
            animationEasing: "cubicInOut",
            animationDuration: 1000
          }
        ]
      })

      this.memoryRef = echarts.init(this.$refs.memoryRef, "macarons")
      this.memoryRef.setOption({
        tooltip: {
          formatter: "{b} <br/>{a} : " + res.info.used_memory_human
        },
        series: [
          {
            name: "峰值",
            type: "gauge",
            min: 0,
            max: 1000,
            detail: {
              formatter: res.info.used_memory_human
            },
            data: [
              {
                value: parseFloat(res.info.used_memory_human),
                name: "内存消耗"
              }
            ]
          }
        ]
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.MonitorCache {
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
