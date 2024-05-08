import { getRequest, postRequest, formRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/company/energy/record/page",
    loading: true,
    data
  })
}

export const ApiPostDelete = data => {
  return getRequest({
    url: "/company/energy/record/delete/" + data.id,
    loading: true
  })
}

export const ApiPostGet = data => {
  return getRequest({
    url: "/company/energy/record/get/" + data.id,
    loading: true
  })
}

export const ApiCompanyGet = data => {
  return getRequest({
    url: "/company/page",
    loading: true,
    data
  })
}

export const ApiPostAdd = data => {
  return postRequest({
    url: "/company/energy/record/add",
    loading: true,
    data
  })
}

export const ApiPostUpdate = data => {
  return postRequest({
    url: "/company/energy/record/update",
    loading: true,
    data
  })
}

export const ApiPostAll = () => {
  return getRequest({
    url: "/system/post/all",
    loading: true
  })
}

export const ApiUploadFile = data => {
  return formRequest({
    url: "/company/energy/record/importExcel",
    data,
    loading: true
  })
}
