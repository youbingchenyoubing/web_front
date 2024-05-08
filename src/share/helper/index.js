export const noop = v => v
export const noopError = e => {
  throw e
}
export const resolveURLQuery = data => {
  if (Array.isArray(data)) {
    return data.length === 0 ? "" : "?" + JSON.stringify(data)
  }
  const _u = Object.entries(data)
    .map(v => v.join("="))
    .join("&")
  return _u.length === 0 ? "" : "?" + _u
}

export const formatInputNumber = e => {
  const value = e.target.value
  e.target.value = value.replace(/[^0-9]/g, "")
}

export * from "./formatDate"
export * from "./crypto"
export * from "./formatJsonCode"
