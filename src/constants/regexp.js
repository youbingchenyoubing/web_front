// 是否是 http(s) 的外链
export const REG_HTTP = /^https?/

// 是否是合法强度的密码字符
export const REG_PWD_WORD =
  /(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]/

// 是否是合法手机号
export const REG_PHONE = /^1[3456789]\d{9}$/

// 是否是邮箱
export const REG_EMAIL =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

// 是否是汉字
export const REG_CHINA_CHAR = /[\u4e00-\u9fa5]/
