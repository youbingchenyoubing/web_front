import { getRequest, postRequest } from "@share/request/basic"

export const ApiUserPage = data => {
  return getRequest({
    url: "/system/user/page",
    data,
    loading: true
  })
}

export const ApiUserDelete = data => {
  return getRequest({
    url: "/system/user/delete/" + data.id,
    loading: true
  })
}

export const ApiUserGet = data => {
  return getRequest({
    url: "/system/user/get/" + data.id,
    loading: true
  })
}

export const ApiUserAdd = data => {
  return postRequest({
    url: "/system/user/add",
    data,
    loading: true
  })
}

export const ApiUserUpdate = data => {
  return postRequest({
    url: "/system/user/update",
    data,
    loading: true
  })
}

export const ApiUserReset = data => {
  return getRequest({
    url: "/system/user/reset/" + data.id,
    loading: true
  })
}
