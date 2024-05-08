import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/company/page",
    loading: true,
    data
  })
}

export const ApiPostDelete = data => {
  return getRequest({
    url: "/company/delete/" + data.id,
    loading: true
  })
}

export const ApiPostGet = data => {
  return getRequest({
    url: "/company/get/" + data.id,
    loading: true
  })
}

export const ApiPostAdd = data => {
  return postRequest({
    url: "/company/add",
    loading: true,
    data
  })
}

export const ApiPostUpdate = data => {
  return postRequest({
    url: "/company/update",
    loading: true,
    data
  })
}
