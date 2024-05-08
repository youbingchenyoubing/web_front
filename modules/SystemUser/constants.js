export const USER_TYPE = {
  0: "普通账号",
  1: "超级管理员"
}

export const TABLE_COLUMNS = [
  { visible: true, title: "选中列", key: "ColumnCheckbox" },
  { visible: true, title: "用户名称", key: "ColumnUsername" },
  { visible: true, title: "真实姓名", key: "ColumnRealName" },
  { visible: true, title: "用户类型", key: "ColumnUserType" },
  { visible: false, title: "用户邮箱", key: "ColumnEmail" },
  { visible: true, title: "电话号码", key: "ColumnPhone" },
  { visible: true, title: "用户性别", key: "ColumnGender" },
  { visible: false, title: "头像路径", key: "ColumnAvatar" },
  { visible: true, title: "账号状态", key: "ColumnEnabled" },
  { visible: false, title: "最后登录ip", key: "ColumnLoginIp" },
  { visible: false, title: "最后登录时间", key: "ColumnLoginDate" },
  { visible: false, title: "创建时间", key: "ColumnCreateTime" },
  { visible: false, title: "用户备注", key: "ColumnRemark" },
  { visible: true, title: "操作", key: "ColumnAction" }
]
