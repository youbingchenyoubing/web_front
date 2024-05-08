import { getRequest, postRequest } from "@share/request/basic"

export const ApiDictTypePage = data => {
  return getRequest({
    url: "/system/dict/type/page",
    loading: true,
    data
  })
}

export const ApiDictTypeDelete = data => {
  return getRequest({
    url: "/system/dict/type/delete/" + data.id,
    loading: true
  })
}

export const ApiDictTypeGet = data => {
  return getRequest({
    url: "/system/dict/type/get/" + data.id,
    loading: true
  })
}

export const ApiDictTypeAdd = data => {
  return postRequest({
    url: "/system/dict/type/add",
    loading: true,
    data
  })
}

export const ApiDictTypeUpdate = data => {
  return postRequest({
    url: "/system/dict/type/update",
    loading: true,
    data
  })
}
