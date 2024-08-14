import { FC, useEffect, useState } from 'react'
import {
  RouterProvider,
  RouteObject,
  createHashRouter,
  createBrowserRouter,
} from 'react-router-dom'
import { IRoute } from './types'
import { staticRouterGuard } from './modules/staticRouter'
import { RootState, useSelector } from '@/store'
import { handleRouterFormat } from './utils/handleRouterFormat'
import { usePermission } from './utils'

const mode = import.meta.env.VITE_ROUTER_MODE

const Router: FC = () => {
  const menuList = useSelector((state: RootState) => state.permission.menuList)

  const [routerList, setRouterList] = useState<IRoute[]>(staticRouterGuard)

  const { initPermission } = usePermission()

  useEffect(() => {
    if (!menuList.length) {
      initPermission()
      return
    }

    const dynamicRouter = handleRouterFormat(menuList)

    const allRouter = [...staticRouterGuard, ...dynamicRouter]

    allRouter.forEach((item) => item.path === '*' && (item.element = <div>404</div>))

    // console.log('allRouter', allRouter)

    setRouterList(allRouter)
  }, [menuList])

  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[]),
  }

  return <RouterProvider router={routerMode[mode]()} />
}

export default Router
