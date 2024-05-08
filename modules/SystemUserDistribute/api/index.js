import { getRequest, postRequest } from "@share/request/basic"

export const ApiUserChecked = data => {
  return getRequest({
    url: "/system/user/checked/" + data.id,
    loading: true
  })
}

export const ApiUserGrant = data => {
  return postRequest({
    url: "/system/user/grant",
    data,
    loading: true
  })
}
