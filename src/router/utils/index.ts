import { store } from '@/store'
import { Route, RouteList } from '../types'
import { getUrlWithParams } from '@/utils'

export function getFlatMenuList(menuList: RouteList): RouteList {
  const newMenuList: RouteList = JSON.parse(JSON.stringify(menuList))

  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ])
}

export function getShowMenuList(menuList: RouteList) {
  const newMenuList: RouteList = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.hide
  })
}

export function getMenuItemByPath(
  menulist: Route[] = store.getState().permission.flatMenuList,
  path: string = getUrlWithParams()
) {
  const menuItem = menulist.find((menu) => {
    // 匹配动态路由
    const regex = new RegExp(`^${menu.path?.replace(/:.[^/]*/, '.*')}$`)
    return regex.test(path)
  })
  return menuItem || {}
}
