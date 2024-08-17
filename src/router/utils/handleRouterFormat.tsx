import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '@/layout'
import { getFlatMenuList } from '.'
import { RouteList } from '../types'
import RouterGuard from './RouterGuard'
import SuspenseComponent from '@/components/Base/Suspense'

const modules = import.meta.glob('@/views/**/*.tsx') as Recordable<
  Parameters<typeof lazy>[number]
>

export const handleRouterFormat = (menuList: RouteList) => {
  const dynamicRouter: RouteList = [{ element: <Layout />, children: [] }]

  const flatMenuList = getFlatMenuList(menuList)

  const formatFlatMenuList = flatMenuList.map((item) => {
    item.children && delete item.children

    if (item.redirect) item.element = <Navigate to={item.redirect} />

    if (item.component && typeof item.component === 'string') {
      const Component = SuspenseComponent(
        lazy(modules['/src/views' + item.component + '.tsx'])
      )
      item.element = <RouterGuard>{Component}</RouterGuard>
    }

    item.loader = () => {
      return { ...item.meta }
    }

    return item
  })

  formatFlatMenuList.forEach((item) => {
    if (item.meta?.isFull) dynamicRouter.push(item)
    else dynamicRouter[0].children?.push(item)
  })

  return dynamicRouter
}
