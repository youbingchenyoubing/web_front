import { postRequest } from "@share/request/basic"

export const ApiUpdateAvatar = data => {
  return postRequest({
    url: "/personal/updateAvatar",
    data,
    loading: true
  })
}
