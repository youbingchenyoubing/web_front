export const normalizeMenuList = (list, cb = () => null) => {
  const menuMap = new Map(list.map(menu => [menu.id, menu]))
  const result = []
  list.forEach(menu => {
    cb(menu)

    if (menu.parentId === "-1") {
      return result.push(menu)
    }

    const parent = menuMap.get(menu.parentId)
    parent && parent.children.push(menu)
  })
  sortMenuList(result)
  return result
}

function sortMenuList(list) {
  list.sort((a, b) => a.sort - b.sort)
  list.forEach(item => {
    if (Array.isArray(item.children) && item.children.length > 1) {
      sortMenuList(item.children)
    }
  })
}
