export function formatJSON(zip_json_str) {
  let m = zip_json_str.length
  if (m < 1) {
    return ""
  }
  let left_symbols = ["[", "{"]
  let right_symbols = ["]", "}"]

  let insert_obj = {}
  let in_string = false
  let layer = 0

  for (let i = 0; i < m; i++) {
    let next = i + 1
    let last = i
    if (left_symbols.indexOf(zip_json_str[i]) > -1) {
      layer += 1
      insert_obj["" + next] = "\n" + new Array(layer + 1).join("  ")
    }
    if (in_string) {
      if ('"' === zip_json_str[i]) {
        in_string = false
      }
      continue
    }
    if ('"' === zip_json_str[i]) {
      in_string = true
      continue
    }
    if ("," === zip_json_str[i]) {
      insert_obj["" + next] = "\n" + new Array(layer + 1).join("  ")
      continue
    }
    if (":" === zip_json_str[i]) {
      insert_obj["" + last] = " "
      insert_obj["" + next] = " "
      continue
    }
    if (right_symbols.indexOf(zip_json_str[i]) > -1) {
      layer -= 1
      insert_obj["" + last] = "\n" + new Array(layer + 1).join("  ")
    }
  }
  // 开始插入到原始字符串中
  let copy_json_arr = zip_json_str.split("")
  let addnum = 0
  for (let k in insert_obj) {
    let index = parseInt(k) + addnum
    copy_json_arr.splice(index, 0, insert_obj[k + ""])
    addnum += 1
  }
  return copy_json_arr.join("")
}
