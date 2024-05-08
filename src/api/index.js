//获取路由
import {
  BASIC_CONFIG,
  fileRequest,
  formRequest,
  getRequest,
  postRequest
} from "@share/request/basic"
export const ApiGetRouters = data => {
  return getRequest({
    url: "/personal/getRouters/" + data.rolePerm,
    loading: true
  })
}
//获取图形验证码
export const ApiCaptchaImageCode = data => {
  return fileRequest({
    url: "/captcha/imageCode",
    loading: false,
    data
  })
}
//登录
export const ApiLogin = data => {
  return postRequest({
    url: "/u/loginByJson",
    data,
    loading: true
  })
}
//获取个人信息
export const ApiGetInfo = data => {
  return getRequest({
    url: "/personal/getInfo",
    data,
    loading: true
  })
}
//修改个人信息
export const ApiUpdatePersonal = data => {
  return postRequest({
    url: "/personal/updatePersonal",
    data,
    loading: true
  })
}
//修改密码
export const ApiUpdatePassword = data => {
  return postRequest({
    url: "/personal/updatePassword",
    data,
    loading: true
  })
}

export const ApiUploadFile = data => {
  return formRequest({
    url: "/upload/uploadFile",
    data,
    loading: true
  })
}

export const ApiUpdateFiles = data => {
  return formRequest({
    url: "/upload/uploadFiles",
    data,
    loading: true
  })
}
