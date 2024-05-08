import { getRequest, postRequest } from "@share/request/basic"

export const ApiNoticePage = data => {
  return getRequest({
    url: "/system/notice/page",
    loading: true,
    data
  })
}

export const ApiNoticeDelete = data => {
  return getRequest({
    url: "/system/notice/delete/" + data.id,
    loading: true
  })
}

export const ApiNoticeGet = data => {
  return getRequest({
    url: "/system/notice/get/" + data.id,
    loading: true
  })
}

export const ApiNoticeAdd = data => {
  return postRequest({
    url: "/system/notice/add",
    data,
    loading: true
  })
}

export const ApiNoticeUpdate = data => {
  return postRequest({
    url: "/system/notice/update",
    data,
    loading: true
  })
}
