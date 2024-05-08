import { getRequest } from "@share/request/basic"

export const ApiServer = data => {
  return getRequest({
    url: "/monitor/server",
    loading: true
  })
}
