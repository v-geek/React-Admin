import { getMenuListApi } from '@/api/modules/user'
import { store, useDispatch } from '@/store'
import { setMenuList } from '@/store/modules/permission'
import { setToken } from '@/store/modules/user'
import { RouteList } from '../types'

export const usePermission = () => {
  const dispatch = useDispatch()

  const initPermission = async () => {
    const token = store.getState().user.token

    if (!token) return

    try {
      const { data: menuList } = await getMenuListApi()

      dispatch(setMenuList(menuList))

      if (!menuList.length) {
        // notification.warning({
        //   message: '无权限访问',
        //   description: '当前账号无任何菜单权限，请联系系统管理员！',
        // })
        console.log('当前账号无任何菜单权限，请联系系统管理员！')
        dispatch(setToken(''))
        return Promise.reject('No permission')
      }
    } catch (err) {
      dispatch(setToken(''))
      return Promise.reject(err)
    }
  }

  return { initPermission }
}

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
    return item.meta?.showInMenu !== false
  })
}
