import { getRequest, postRequest } from "@share/request/basic"

export const ApiJobAdd = data => {
  return postRequest({
    url: "/task/job/add",
    data,
    loading: true
  })
}

export const ApiJobUpdate = data => {
  return postRequest({
    url: "/task/job/update",
    data,
    loading: true
  })
}

export const ApiJobPage = data => {
  return getRequest({
    url: "/task/job/page",
    loading: true,
    data
  })
}

export const ApiJobGet = data => {
  return getRequest({
    url: "/task/job/get/" + data.id,
    loading: true
  })
}

export const ApiJobChangeStatus = data => {
  return getRequest({
    url: "/task/job/changeStatus",
    loading: true,
    data
  })
}

export const ApiJobRun = data => {
  return getRequest({
    url: "/task/job/run/" + data.id,
    loading: true
  })
}

export const ApiJobDelete = data => {
  return postRequest({
    url: "/task/job/delete",
    loading: true,
    data
  })
}
