import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/statistics/selectEnergyContrast",
    loading: true,
    data
  })
}

export const ApiCompanyGet = data => {
  return getRequest({
    url: "/company/getCompanyTree",
    loading: true,
    data
  })
}
