export const normalizeDepartList = (list, cb = () => null) => {
  const result = []
  const departMap = new Map(
    list.map(depart => {
      depart.children = []
      return [depart.id, depart]
    })
  )

  list.forEach(depart => {
    cb(depart)
    const parent = departMap.get(depart.parentId)
    parent ? parent.children.push(depart) : result.push(depart)
  })
  return result
}
