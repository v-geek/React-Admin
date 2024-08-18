import { RouteList } from '@/router/types'
import Iconify from '@/components/Icon/Iconify'

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
