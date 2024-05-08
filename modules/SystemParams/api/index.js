import { getRequest, postRequest } from "@share/request/basic"

export const ApiConfigPage = data => {
  return getRequest({
    url: "/system/config/page",
    data,
    loading: true
  })
}

export const ApiConfigAll = data => {
  return getRequest({
    url: "/system/config/all",
    loading: true,
    data
  })
}

export const ApiConfigDelete = data => {
  return getRequest({
    url: "/system/config/delete/" + data.id,
    loading: true
  })
}

export const ApiConfigGet = data => {
  return getRequest({
    url: "/system/config/get/" + data.key,
    loading: true
  })
}

export const ApiConfigAdd = data => {
  return postRequest({
    url: "/system/config/add",
    data,
    loading: true
  })
}

export const ApiConfigUpdate = data => {
  return postRequest({
    url: "/system/config/update",
    data,
    loading: true
  })
}
