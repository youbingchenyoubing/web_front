import { getRequest, postRequest } from "@share/request/basic"

export const ApiMenuPage = data => {
  return getRequest({
    url: "/system/menu/page",
    loading: true,
    data
  })
}

export const ApiMenuDelete = data => {
  return getRequest({
    url: "/system/menu/delete/" + data.id,
    loading: true
  })
}

export const ApiMenuGet = data => {
  return getRequest({
    url: "/system/menu/get/" + data.id,
    loading: true,
    data
  })
}

export const ApiMenuAdd = data => {
  return postRequest({
    url: "/system/menu/add",
    data,
    loading: true
  })
}

export const ApiMenuUpdate = data => {
  return postRequest({
    url: "/system/menu/update",
    data,
    loading: true
  })
}

export const ApiMenuTree = data => {
  return getRequest({
    url: "/system/menu/tree",
    loading: true
  })
}
