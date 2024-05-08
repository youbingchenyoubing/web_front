import { getRequest } from "@share/request/basic"

export const ApiCache = () => {
  return getRequest({
    url: "/monitor/cache",
    loading: true
  })
}
