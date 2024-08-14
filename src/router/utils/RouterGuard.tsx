import { useEffect } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { RootState, useSelector } from '@/store'
import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from '@/config'
import { Meta } from '../types'

const RouterGuard = ({ children }) => {
  const loader = useLoaderData()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  window.$navigate = navigate

  const token = useSelector((state: RootState) => state.user.token)
  const menuList = useSelector((state: RootState) => state.permission.menuList)

  useEffect(() => {
    const meta = loader as Meta

    if (meta) {
      const title = import.meta.env.VITE_TITLE
      document.title = meta?.title ? `${meta.title} - ${title}` : title
    }

    if (ROUTER_WHITE_LIST.includes(pathname)) return

    const isLogin = pathname === LOGIN_URL

    if (isLogin && menuList.length && token) {
      return navigate(HOME_URL)
    }

    if (!token && !isLogin) {
      return navigate(LOGIN_URL, { replace: true })
    }
  }, [loader]) // ????

  return children
}

export default RouterGuard
