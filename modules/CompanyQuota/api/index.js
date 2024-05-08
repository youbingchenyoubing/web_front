import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/company/energy/config/page",
    loading: true,
    data
  })
}

export const ApiPostDelete = data => {
  return getRequest({
    url: "/company/energy/config/delete/" + data.id,
    loading: true
  })
}

export const ApiPostGet = data => {
  return getRequest({
    url: "/company/energy/config/get/" + data.id,
    loading: true
  })
}

export const ApiPostAdd = data => {
  return postRequest({
    url: "/company/energy/config/add",
    loading: true,
    data
  })
}

export const ApiPostUpdate = data => {
  return postRequest({
    url: "/company/energy/config/update",
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
