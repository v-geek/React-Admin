import { getMenuListApi } from '@/api/modules/user'
import { store, useDispatch } from '@/store'
import { setMenuList } from '@/store/modules/permission'
import { setToken } from '@/store/modules/user'
import { IRoute } from '../types'

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

export function getFlatMenuList(menuList: IRoute[]): IRoute[] {
  const newMenuList: IRoute[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ])
}
