import { getRequest, postRequest } from "@share/request/basic"

export const ApiLoginPage = data => {
  return getRequest({
    url: "/logger/login/page",
    data,
    loading: true
  })
}

export const ApiLoginGet = data => {
  return getRequest({
    url: "/logger/login/get/" + data.id,
    loading: true
  })
}

export const ApiLoginDelete = data => {
  return postRequest({
    url: "/logger/login/delete",
    loading: true,
    data
  })
}

export const ApiLoginClear = () => {
  return getRequest({
    url: "/logger/login/clean",
    loading: true
  })
}
