import { getRequest, postRequest } from "@share/request/basic"

export const ApiPostPage = data => {
  return getRequest({
    url: "/statistics/selectCompanyEnergy",
    loading: true,
    data
  })
}
