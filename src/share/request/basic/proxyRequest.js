import LoginVue from "@modules/Login/Login.vue"
import { resolveURLQuery } from "@share/helper"
import { basicRequestWrapper, streamRequestWrapper } from "./request"

export const getRequest = ({ url, data = {}, loading }) => {
  return basicRequestWrapper(
    {
      url: url + resolveURLQuery(data),
      method: "GET"
    },
    { loading }
  )
}

export const postRequest = ({ url, data = {}, loading }) => {
  return basicRequestWrapper(
    { url, data: JSON.stringify(data), method: "POST" },
    { loading }
  )
}

export const formRequest = ({ url, data = {}, loading }) => {
  return basicRequestWrapper(
    {
      url,
      data: Object.entries(data).reduce((data, [key, value]) => {
        Array.isArray(value)
          ? value.forEach(file => data.append(key, file))
          : data.append(key, value)
        return data
      }, new FormData()),
      method: "POST",
      headers: { "Content-Type": null }
    },
    { loading }
  )
}

export const fileRequest = ({ url, data = {}, loading }) => {
  return streamRequestWrapper(
    { url: url + resolveURLQuery(data) },
    { loading }
  ).then(({ data, headers }) => {
    return new Promise(resolve => {
      const type = headers["content-type"].split(";")[0].trim()
      const blob = new Blob([data], { type })
      let reader = new FileReader()
      reader.onload = function (e) {
        resolve(e.target.result)
      }
      reader.readAsDataURL(blob)
    })
  })
}
