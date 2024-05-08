import { getRequest, postRequest } from "@share/request/basic"

export const ApiOperatePage = data => {
  return getRequest({
    url: "/logger/operate/page",
    data,
    loading: true
  })
}

export const ApiOperateGet = data => {
  return getRequest({
    url: "/logger/operate/get/" + data.id,
    loading: true
  })
}

export const ApiOperateDelete = data => {
  return postRequest({
    url: "/logger/operate/delete",
    data,
    loading: true
  })
}

export const ApiOperateClean = () => {
  return getRequest({
    url: "/logger/operate/clean",
    loading: true
  })
}
