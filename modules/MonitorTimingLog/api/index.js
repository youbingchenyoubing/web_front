import { getRequest, postRequest } from "@share/request/basic"

export const ApiTaskLoggerPage = data => {
  return getRequest({
    url: "/task/logger/page",
    data,
    loading: true
  })
}

export const ApiTaskLoggerGet = data => {
  return getRequest({
    url: "/task/logger/get/" + data.id,
    loading: true
  })
}

export const ApiTaskLoggerDelete = data => {
  return postRequest({
    url: "/task/logger/delete",
    data,
    loading: true
  })
}

export const ApiTaskLoggerClean = data => {
  return getRequest({
    url: "/task/logger/clean",
    loading: true
  })
}
