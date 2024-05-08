import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/statistics/selectCompanyEnergy",
    loading: true,
    data
  })
}

export const ApiPostDelete = data => {
  return getRequest({
    url: "/system/post/delete/" + data.id,
    loading: true
  })
}

export const ApiPostGet = data => {
  return getRequest({
    url: "/system/post/get/" + data.id,
    loading: true
  })
}

export const ApiPostAdd = data => {
  return postRequest({
    url: "/system/post/add",
    loading: true,
    data
  })
}

export const ApiPostUpdate = data => {
  return postRequest({
    url: "/system/post/update",
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

export const ApiSelectEnergyTrend = data => {
  return getRequest({
    url: "/statistics/selectEnergyTrend",
    data,
    loading: true
  })
}

export const ApiSelectEnergyRanking = data => {
  return getRequest({
    url: "/statistics/selectEnergyRanking",
    data,
    loading: true
  })
}

export const ApiSystemDict = data => {
  return getRequest({
    url: "/system/dict/item/page",
    data,
    loading: true
  })
}
