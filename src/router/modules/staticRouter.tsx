import { Navigate } from 'react-router-dom'
import RouterGuard from '../utils/RouterGuard'
import { HOME_URL, LOGIN_URL } from '@/config'
import { RouteList } from '../types'
import Login from '@/views/user/login'
import { Loading } from '@/components/Loading'

export const staticRouter: RouteList = [
  {
    path: '/',
    element: <Navigate to={HOME_URL} />,
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      title: '登录',
    },
  },
  // 刷新页面的时候 动态路由等 先匹配到这里来
  {
    path: '*',
    element: <Loading />,
  },
]

export const staticRouterGuard = staticRouter.map((route) => {
  return {
    ...route,
    element: <RouterGuard>{route.element}</RouterGuard>,
    loader: () => {
      return { ...route.meta }
    },
  }
})
