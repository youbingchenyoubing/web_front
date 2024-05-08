import { getRequest, postRequest } from "@share/request/basic"

export const ApiDictItemPage = data => {
  return getRequest({
    url: "/system/dict/item/page",
    data,
    loading: true
  })
}

export const ApiDictItemDelete = data => {
  return getRequest({
    url: "/system/dict/item/delete/" + data.id,
    loading: true
  })
}

export const ApiDictItemGet = data => {
  return getRequest({
    url: "/system/dict/item/get/" + data.id,
    loading: true
  })
}

export const ApiDictItemAdd = data => {
  return postRequest({
    url: "/system/dict/item/add",
    loading: true,
    data
  })
}

export const ApiDictItemUpdate = data => {
  return postRequest({
    url: "/system/dict/item/update",
    data,
    loading: true
  })
}

export const ApiDictItemQuery = data => {
  return getRequest({
    url: "/system/dict/item/query/" + data.dictType,
    loading: false
  })
}

export const ApiDictItemQueryBatch = data => {
  return postRequest({
    url: "/system/dict/item/queryBatch",
    loading: false,
    data
  })
}
