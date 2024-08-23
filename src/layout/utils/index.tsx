import { Link } from 'react-router-dom'
import Iconify from '@/components/Icon/Iconify'
import type { Route, RouteList } from '@/router/types'

export const handleMenuFormat = (list: RouteList) =>
  list.map((item) => {
    const itemConfig = {
      label: item.meta?.title,
      key: item.path,
      icon: <Iconify icon={item.meta!.icon!} />,
      children: null,
    }

    if (item?.children?.length) {
      itemConfig.children = handleMenuFormat(item.children!)
    }

    return itemConfig
  })

export function getOpenKeys(path: string): string[] {
  let currentKey: string = ''
  let openKeys: string[] = []
  let pathSegments: string[] = path.split('/').map((segment: string) => '/' + segment)

  // eg: ['/', '/menu', '/menu2', '/menu21'] -> ['/menu', '/menu/menu2']
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i]
    openKeys.push(currentKey)
  }

  return openKeys
}

export const getAllBreadcrumbList = (
  menuList: Route[],
  parent: Route[] = [],
  result: Recordable<Route[]> = {}
) => {
  for (const item of menuList) {
    result[item.name] = [...parent, item]
    if (item.children) getAllBreadcrumbList(item.children, result[item.name], result)
  }
  return result
}

export const renderTitle = (item: Route, isLink: boolean = true) => {
  const title = item.meta?.title || ''
  return { title: isLink ? <Link to={item.path}>{title}</Link> : title }
}
