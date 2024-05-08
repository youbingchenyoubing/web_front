import { AppRoutesMap } from "@router/route"

export const resolveMenuPaths = path => {
  let _route = AppRoutesMap.get(path)
  const menuPath = [_route]
  while (_route.parentRoute) {
    _route = _route.parentRoute
    menuPath.push(_route)
  }
  return menuPath.reverse()
}
