/**
 * @param {"YYYY-MM" | "YYYY-MM-DD" | "YYYY-MM-DD HH:MM:SS" | "YYYY年MM月DD日 HH时MM分SS秒"} format
 * @param {string | undefined} time
 */
export function formatStamp(format, time) {
  const date = time ? new Date(time) : new Date()
  const year = date.getFullYear() // 年
  const month = (date.getMonth() + 1).toString() // 月
  const day = date.getDate().toString() // 日
  const hour = date.getHours().toString() // 时
  const minutes = date.getMinutes().toString() // 分
  const seconds = date.getSeconds().toString() //秒

  if (format === "YYYY-MM") {
    return `${year}-${padZero(month)}`
  } else if (format === "YYYY-MM-DD") {
    return `${year}-${padZero(month)}-${padZero(day)}`
  } else if (format === "YYYY-MM-DD HH:MM:SS") {
    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(
      hour
    )}:${padZero(minutes)}:${padZero(seconds)}`
  } else if (format === "YYYY年MM月DD日 HH时MM分SS秒") {
    return `${year}年${padZero(month)}月${padZero(day)}日 ${padZero(
      hour
    )}时${padZero(minutes)}分${padZero(seconds)}秒`
  } else {
    console.error("formatStamp: 没有相关格式")
  }
}

/**
 * @param {string} value
 */
export function padZero(value) {
  return value.padStart(2, "0")
}
