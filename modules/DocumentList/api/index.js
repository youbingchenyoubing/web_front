import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/archives/page",
    loading: true,
    data
  })
}

export const ApiPostDelete = data => {
  return getRequest({
    url: "/archives/delete/" + data.id,
    loading: true
  })
}

export const ApiPostGet = data => {
  return getRequest({
    url: "/archives/get/" + data.id,
    loading: true
  })
}

export const ApiPostAdd = data => {
  return postRequest({
    url: "/archives/add",
    loading: true,
    data
  })
}

export const ApiCompanyGet = data => {
  return getRequest({
    url: "/company/page",
    loading: true,
    data
  })
}

export const ApiDeleteFile = data => {
  return getRequest({
    url: "/upload/deleteFile",
    loading: true,
    data
  })
}
