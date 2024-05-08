import { getRequest, postRequest } from "@share/request/basic"

export const ApiUnit = data => {
  return getRequest({
    url: "/system/unit/list",
    loading: true,
    data
  })
}

export const ApiUnitTree = data => {
  return getRequest({
    url: "/system/unit/tree",
    loading: true,
    data
  })
}

export const ApiUnitAdd = data => {
  return postRequest({
    url: "/system/unit/add",
    loading: true,
    data
  })
}

export const ApiUnitUpdate = data => {
  return postRequest({
    url: "/system/unit/update",
    loading: true,
    data
  })
}

export const ApiUnitDelete = data => {
  return getRequest({
    url: "/system/unit/delete/" + data.id,
    loading: true
  })
}

export const ApiUnitGet = data => {
  return getRequest({
    url: "/system/unit/get/" + data.id,
    loading: true
  })
}
