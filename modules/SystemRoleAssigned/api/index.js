import { getRequest, postRequest } from "@share/request/basic"

export const ApiAssignedRole = data => {
  return getRequest({
    url: "/system/role/assigned",
    data,
    loading: true
  })
}

export const ApiCancelRole = data => {
  return postRequest({
    url: "/system/role/cancel",
    data,
    loading: true
  })
}
