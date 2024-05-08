import { getRequest, postRequest } from "@share/request/basic"

export const ApiRoleList = data => {
  return getRequest({
    url: "/system/role/page",
    loading: true,
    data
  })
}

export const ApiDeleteRole = data => {
  return getRequest({
    url: "/system/role/delete/" + data.id,
    loading: true
  })
}

export const ApiAddRole = data => {
  return postRequest({
    url: "/system/role/add",
    loading: true,
    data
  })
}

export const ApiUpdateRole = data => {
  return postRequest({
    url: "/system/role/update",
    loading: true,
    data
  })
}

export const ApiDetailRole = data => {
  return getRequest({
    url: "/system/role/get/" + data.id,
    loading: true
  })
}

export const ApiRoleAll = () => {
  return getRequest({
    url: "/system/role/all",
    loading: true
  })
}
