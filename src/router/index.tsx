import { FC, useEffect, useState } from 'react'
import {
  RouterProvider,
  RouteObject,
  createHashRouter,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom'
import { RouteList } from './types'
import { staticRouterGuard } from './modules/staticRouter'
import { RootState, useSelector } from '@/store'
import { handleRouterFormat } from './utils/handleRouterFormat'
import { usePermission } from './utils'
import useMessage from '@/hooks/useMessage'
import useTheme from '@/hooks/useTheme'

const mode = import.meta.env.VITE_MODE

const Router: FC = () => {
  useMessage()
  useTheme()

  const menuList = useSelector((state: RootState) => state.permission.menuList)
  const [routerList, setRouterList] = useState<RouteList>(staticRouterGuard)
  const { initPermission } = usePermission()

  useEffect(() => {
    if (!menuList.length) {
      initPermission()
      return
    }

    const dynamicRouter = handleRouterFormat(menuList)

    const allRouter = [...staticRouterGuard, ...dynamicRouter]

    // 替换404路由的组件  优化 to-do : 需要添加静态路由 /error/403 /error/404
    allRouter.forEach(
      (item) => item.path === '*' && (item.element = <Navigate to="/error/404" />)
    )

    setRouterList(allRouter)
  }, [menuList])

  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[]),
  }

  return <RouterProvider router={routerMode[mode]()} />
}

export default Router
