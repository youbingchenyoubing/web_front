import Error from "@modules/Error/Error.vue"
import Link from "@modules/Link/Link.vue"
import { markRaw } from "vue"
/* 
  invalidMenu: boolean 
  是否是无效的菜单，无效的不参与侧边栏相关的逻辑，默认是false

  abstractMenu: boolean ，默认false
  是否是抽象菜单，即有用但不直接显示，比如那些隐藏路由，具体怎么显示需要看各自的实际逻辑

  menuPath: Array<{title: string}> 
  配合abstractMenu显示头部的面包屑，如果是抽象菜单，那么面包屑就用这个写死的路径参数

  commonMenu: boolean  默认是 false
  对所有用户公开的可视化路由，在路由跳转期间如果是该标识，会不做任何校验直接通过
*/

/** @type {import("vue-router").RouteRecordRaw[]} */
export const AppRoutes = markRaw([
  {
    path: "/login",
    component: () => import("@modules/Login/Login.vue"),
    meta: {
      invalidMenu: true,
      title: "登录",
      icon: "IconCode"
    }
  },
  {
    path: "/",
    component: () => import("@modules/Home/Home.vue"),
    meta: {
      commonMenu: true,
      title: "首页",
      icon: "IconCode"
    }
  },
  {
    path: "/bigscreen",
    component: () => import("@modules/Bigscreen/Bigscreen.vue"),
    meta: {
      invalidMenu: false,
      title: "综合大屏",
      icon: "IconCode"
    }
  },
  {
    path: "/datas",
    component: () => import("@modules/Datas/Datas.vue"),
    meta: {
      title: "数据管理",
      icon: "IconCode"
    },
    children: [
      {
        path: "list",
        component: () => import("@modules/DatasManagement/DatasManagement.vue"),
        meta: {
          title: "能耗数据录入",
          icon: "IconCode"
        }
      }
    ]
  },
  {
    path: "/company",
    component: () => import("@modules/Company/Company.vue"),
    meta: {
      title: "企业管理",
      icon: "IconCode"
    },
    children: [
      {
        path: "list",
        component: () => import("@modules/CompanyList/CompanyList.vue"),
        meta: {
          title: "企业信息管理",
          icon: "IconCode"
        }
      },
      {
        path: "quota",
        component: () => import("@modules/CompanyQuota/CompanyQuota.vue"),
        meta: {
          title: "企业能耗配额",
          icon: "IconCode"
        }
      }
    ]
  },
  {
    path: "/statistic",
    component: () => import("@modules/Statistic/Statistic.vue"),
    meta: {
      title: "统计查询",
      icon: "IconCode"
    },
    children: [
      {
        path: "search",
        component: () => import("@modules/StatisticSearch/StatisticSearch.vue"),
        meta: {
          title: "企业能耗查询",
          icon: "IconCode"
        }
      },
      {
        path: "trend",
        component: () => import("@modules/StatisticTrend/StatisticTrend.vue"),
        meta: {
          title: "能耗趋势分析",
          icon: "IconCode"
        }
      },
      {
        path: "compare",
        component: () =>
          import("@modules/StatisticCompare/StatisticCompare.vue"),
        meta: {
          title: "企业能耗对比",
          icon: "IconCode"
        }
      },
      {
        path: "area",
        component: () => import("@modules/StatisticArea/StatisticArea.vue"),
        meta: {
          title: "区域能耗对比",
          icon: "IconCode"
        }
      }
    ]
  },
  {
    path: "/warning",
    component: () => import("@modules/Warning/Warning.vue"),
    meta: {
      title: "能耗预警",
      icon: "IconCode"
    },
    children: [
      {
        path: "list",
        component: () => import("@modules/WarningOut/WarningOut.vue"),
        meta: {
          title: "能耗超标预警",
          icon: "IconCode"
        }
      }
    ]
  },
  {
    path: "/document",
    component: () => import("@modules/Document/Document.vue"),
    meta: {
      title: "档案存档",
      icon: "IconCode"
    },
    children: [
      {
        path: "list",
        component: () => import("@modules/DocumentList/DocumentList.vue"),
        meta: {
          title: "档案存档列表",
          icon: "IconCode"
        }
      }
    ]
  },
  {
    path: "/system",
    component: () => import("@modules/System/System.vue"),
    meta: {
      title: "系统管理",
      icon: "IconCode"
    },
    children: [
      {
        path: "user",
        component: () => import("@modules/SystemUser/SystemUser.vue"),
        meta: {
          title: "用户管理",
          icon: "IconCode"
        }
      },
      {
        path: "user-distribute",
        component: () =>
          import("@modules/SystemUserDistribute/SystemUserDistribute.vue"),
        meta: {
          title: "分配角色",
          icon: "IconCode",
          abstractMenu: true,
          menuPath: [
            { title: "系统管理" },
            { title: "用户管理" },
            { title: "分配角色" }
          ]
        }
      },
      {
        path: "role",
        component: () => import("@modules/SystemRole/SystemRole.vue"),
        meta: {
          title: "角色管理",
          icon: "IconCode"
        }
      },
      {
        path: "role-assigned",
        component: () =>
          import("@modules/SystemRoleAssigned/SystemRoleAssigned.vue"),
        meta: {
          title: "角色授权",
          icon: "IconCode",
          abstractMenu: true,
          menuPath: [
            { title: "系统管理" },
            { title: "角色管理" },
            { title: "角色授权" }
          ]
        }
      },
      {
        path: "menu",
        component: () => import("@modules/SystemMenu/SystemMenu.vue"),
        meta: {
          title: "菜单管理",
          icon: "IconCode"
        }
      },
      {
        path: "department",
        component: () =>
          import("@modules/SystemDepartment/SystemDepartment.vue"),
        meta: {
          title: "机构管理",
          icon: "IconCode"
        }
      },
      {
        path: "post",
        component: () => import("@modules/SystemPost/SystemPost.vue"),
        meta: {
          title: "岗位管理",
          icon: "IconCode"
        }
      },
      {
        path: "dict",
        component: () => import("@modules/SystemDictType/SystemDictType.vue"),
        meta: {
          title: "字典管理",
          icon: "IconCode"
        }
      },
      {
        path: "dict-item",
        component: () => import("@modules/SystemDictItem/SystemDictItem.vue"),
        meta: {
          title: "字典项管理",
          icon: "",
          abstractMenu: true,
          menuPath: [
            { title: "系统管理" },
            { title: "字典管理" },
            { title: "字典项管理" }
          ]
        }
      },
      {
        path: "params",
        component: () => import("@modules/SystemParams/SystemParams.vue"),
        meta: {
          title: "参数设置",
          icon: "IconCode"
        }
      },
      {
        path: "notice",
        component: () => import("@modules/SystemNotice/SystemNotice.vue"),
        meta: {
          title: "通用公告",
          icon: "IconCode"
        }
      },
      {
        path: "logger",
        component: () => import("@modules/SystemLogger/SystemLogger.vue"),
        meta: {
          title: "日志管理",
          icon: "IconCode"
        },
        children: [
          {
            path: "operlog",
            component: () =>
              import("@modules/SystemLoggerOperlog/SystemLoggerOperlog.vue"),
            meta: {
              title: "操作日志",
              icon: "IconCode"
            }
          },
          {
            path: "loginlog",
            component: () =>
              import("@modules/SystemLoggerLoginLog/SystemLoggerLoginLog.vue"),
            meta: {
              title: "登录日志",
              icon: "IconCode"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/monitor",
    component: () => import("@modules/Monitor/Monitor.vue"),
    meta: {
      title: "系统监控",
      icon: "IconCode"
    },
    children: [
      {
        path: "server",
        component: () => import("@modules/MonitorServer/MonitorServer.vue"),
        meta: {
          title: "服务监控",
          icon: "IconCode"
        }
      },
      {
        path: "cache",
        component: () => import("@modules/MonitorCache/MonitorCache.vue"),
        meta: {
          title: "缓存监控",
          icon: "IconCode"
        }
      },
      {
        path: "timing",
        component: () => import("@modules/MonitorTiming/MonitorTiming.vue"),
        meta: {
          title: "定时任务",
          icon: "IconCode"
        }
      },
      {
        path: "timing-log",
        component: () =>
          import("@modules/MonitorTimingLog/MonitorTimingLog.vue"),
        meta: {
          title: "调度日志",
          icon: "IconCode",
          abstractMenu: true,
          commonMenu: true,
          menuPath: [
            { title: "系统监控" },
            { title: "定时任务" },
            { title: "调度日志" }
          ]
        }
      }
    ]
  },
  {
    path: "/user",
    component: () => import("@modules/User/User.vue"),
    meta: {
      title: "用户模块",
      invalidMenu: true
    },
    children: [
      {
        path: "profile",
        component: () => import("@modules/UserProfile/UserProfile.vue"),
        meta: {
          title: "个人中心",
          abstractMenu: true,
          commonMenu: true,
          menuPath: [{ title: "用户模块" }, { title: "个人中心" }]
        }
      }
    ]
  },
  {
    path: "/link/:route",
    component: Link,
    meta: {
      invalidMenu: true,
      commonMenu: true
    }
  },
  {
    path: "/:pathMatch(.*)",
    component: Error,
    meta: {
      invalidMenu: true,
      commonMenu: true
    }
  }
])

export const AppRoutesMap = (() => {
  const map = markRaw(new Map())
  const nextRoutes = (routes, option) => {
    const { parentPath, parentRoute } = option
    return routes.map(route => {
      const { path, meta, children } = route
      const _path = parentPath ? `${parentPath}/${path}` : path
      const _route = { path: _path, parentRoute, meta }
      if (Array.isArray(children)) {
        _route.children = nextRoutes(children, {
          parentPath: _route.path,
          parentRoute: _route
        })
      }
      map.set(_path, _route)
      return _route
    })
  }
  nextRoutes(AppRoutes, {})
  return map
})()
